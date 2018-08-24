(function () {
    "use strict";
    angular
        .module("twilightAPP")
        .controller("twilightCompareCtrl", ['$scope', '$http', 'APIServices', twilightMonitoring]);



    function twilightMonitoring($scope, $http, APIServices) {
        var self = $scope;

        //===========================声明的参数===================================
        self.serverIP = "http://10.24.34.180/";
        self.loadCNName = "风场测量雷达仿真";
        self.loadEnName = "";

        //定义配置的内容
        self.configObj = {};
        //目前选择日期
        self.selectedDate_start = moment().format("YYYYMMDDHHmm");
        self.selectedDate_end = moment().format("YYYYMMDDHHmm");
        //风场测量雷达仿真配置
        self.WINDRAD_Sim_processType = "";
        self.WINDRAD_Sim_bandType = "";
        self.WINDRAD_Sim_processDirection = "";

        //风场测量雷达仿真
        self.WINDRAD_DPPS_bandType = "";

        self.is_loading_start = true;
        self.is_loading_end = false;

        //定义各个载荷对应的配置显示隐藏
        self.is_MERSI_Simulation_config = false;
        self.is_HIRAS_Simulation_config = false;
        self.is_WINDRAD_Sim_config = true;
        self.is_MWTS_Simulation_config = false;

        self.is_HIRAS_DPPS_config = false;
        self.is_NPP_VIIRS_config = false;
        self.is_WINDRAD_DPPS_config = false;

        //定义各个载荷对应的流程显示隐藏
        self.is_MERSI_Simulation_process = false;
        self.is_HIRAS_Simulation_process = false;
        self.is_WINDRAD_Sim_process = true;
        self.is_MWTS_Simulation_process = false;

        self.is_HIRAS_DPPS_process = false;
        self.is_NPP_VIIRS_process = false;
        self.is_WINDRAD_DPPS_process = false;

        /*定义菜单栏名称*/
        self.CN_Menu_Name = [
            "红外高光谱仿真", "微光成像仪仿真", "风场测量雷达仿真", "微波温度计仿真",
            "红外高光谱预处理", "微光成像仪预处理", "风场测量雷达预处理"
        ];

        //声明英文载荷数组
        self.EN_Menu_NameAry = [
            "HIRAS_Simulation", "MERSI_Simulation", "WINDRAD_Sim", "MWTS_Simulation", "HIRAS_DPPS", "NPP_VIIRS", "WINDRAD_DPPS"
        ]

        //默认显示的载荷   中文名
        self.tabChart_processNameCN = self.CN_Menu_Name[2];

        //设置默认显示的流程，绑定div
        //self.tabChart_processName = self.is_WINDRAD_Sim_process;
        self.tabChart_processName = processDivName(self.tabChart_processNameCN);

        //定义配置中select的内容
        self.WINDRAD_Sim_processTypeContent = ["海面", "陆表"];
        self.WINDRAD_Sim_bandTypeContent = ["KUBAND", "CBAND"];
        self.WINDRAD_Sim_processDirectionContent = ["前向", "后向"];
        self.WINDRAD_DPPS_bandTypeContent = ["KUBAND", "CBAND"];

        //定义配置select
        self.WINDRAD_Sim_processType = self.WINDRAD_Sim_processTypeContent[1];
        self.WINDRAD_Sim_bandType = self.WINDRAD_Sim_bandTypeContent[1];
        self.WINDRAD_Sim_processDirection = self.WINDRAD_Sim_processDirectionContent[1];
        self.WINDRAD_DPPS_bandType = self.WINDRAD_DPPS_bandTypeContent[1];

        //默认的配置内容
        self.configObj = getConfigInfo(self.tabChart_processNameCN);

        //定义各个载荷分别有哪些流程
        /*红外仿真*/
        self.HIRAS_Simulation_process_Ary = [{
                processName: "仿真数据准备",
                percentage: "0%",
                percentageNum: "0",
                loading_start: false,
                loading_end: true
            },
            {
                processName: "轨道参数模拟",
                percentage: "0%",
                percentageNum: "0",
                loading_start: false,
                loading_end: true
            },
            {
                processName: "正演仿真",
                percentage: "0%",
                percentageNum: "0",
                loading_start: false,
                loading_end: true
            },
            {
                processName: "仿真L1结果",
                percentage: "0%",
                percentageNum: "0",
                loading_start: false,
                loading_end: false
            }
        ]
        /*微光成像仪仿真*/
        self.MERSI_Simulation_process_Ary = [{
                processName: "仿真数据准备",
                percentage: "0%",
                percentageNum: "0",
                loading_start: false,
                loading_end: true
            },
            {
                processName: "轨道参数模拟",
                percentage: "0%",
                percentageNum: "0",
                loading_start: false,
                loading_end: true
            },
            {
                processName: "正演仿真",
                percentage: "0%",
                percentageNum: "0",
                loading_start: false,
                loading_end: true
            },
            {
                processName: "仿真L1结果",
                percentage: "0%",
                percentageNum: "0",
                loading_start: false,
                loading_end: false
            }
        ]
        /*风场仿真*/
        self.WINDRAD_Sim_process_Ary = [{
                processName: "仿真数据准备",
                percentage: "0%",
                percentageNum: "0",
                loading_start: false,
                loading_end: true
            },
            {
                processName: "轨道参数模拟",
                percentage: "0%",
                percentageNum: "0",
                loading_start: false,
                loading_end: true
            },
            {
                processName: "正演仿真",
                percentage: "0%",
                percentageNum: "0",
                loading_start: false,
                loading_end: true
            },
            {
                processName: "仿真L1结果",
                percentage: "0%",
                percentageNum: "0",
                loading_start: false,
                loading_end: false
            }
        ]
        /*微波温度计仿真*/
        self.MWTS_Simulation_process_Ary = [{
                processName: "仿真数据准备",
                percentage: "0%",
                percentageNum: "0",
                loading_start: false,
                loading_end: true
            },
            {
                processName: "轨道参数模拟",
                percentage: "0%",
                percentageNum: "0",
                loading_start: false,
                loading_end: true
            },
            {
                processName: "正演仿真",
                percentage: "0%",
                percentageNum: "0",
                loading_start: false,
                loading_end: true
            },
            {
                processName: "仿真L1结果",
                percentage: "0%",
                percentageNum: "0",
                loading_start: false,
                loading_end: false
            }
        ]

        /*红外高光谱预处理*/
        self.HIRAS_DPPS_process_Ary = [{
                processName: "轨道模拟",
                percentage: "0%",
                percentageNum: "0",
                loading_start: false,
                loading_end: true
            },
            {
                processName: "质检",
                percentage: "0%",
                percentageNum: "0",
                loading_start: false,
                loading_end: true
            },
            {
                processName: "定位",
                percentage: "0%",
                percentageNum: "0",
                loading_start: false,
                loading_end: true
            },
            {
                processName: "干涉数据处理",
                percentage: "0%",
                percentageNum: "0",
                loading_start: false,
                loading_end: true
            },
            {
                processName: "辐射定标和光谱定标",
                percentage: "0%",
                percentageNum: "0",
                loading_start: false,
                loading_end: true
            },
            {
                processName: "L1数据生成",
                percentage: "0%",
                percentageNum: "0",
                loading_start: false,
                loading_end: false
            }
        ]

        /*微光成像仪预处理*/
        self.NPP_VIIRS_process_Ary = [{
                processName: "轨道模拟",
                percentage: "0%",
                percentageNum: "0",
                loading_start: false,
                loading_end: true
            },
            {
                processName: "质检",
                percentage: "0%",
                percentageNum: "0",
                loading_start: false,
                loading_end: true
            },
            {
                processName: "定位",
                percentage: "0%",
                percentageNum: "0",
                loading_start: false,
                loading_end: true
            },
            {
                processName: "定标",
                percentage: "0%",
                percentageNum: "0",
                loading_start: false,
                loading_end: true
            },
            {
                processName: "杂散光去除",
                percentage: "0%",
                percentageNum: "0",
                loading_start: false,
                loading_end: true
            },
            {
                processName: "图像增强处理",
                percentage: "0%",
                percentageNum: "0",
                loading_start: false,
                loading_end: false
            }
        ]

        /*风场测量雷达预处理*/
        self.WINDRAD_DPPS_process_Ary = [{
                processName: "轨道模拟",
                percentage: "0%",
                percentageNum: "0",
                loading_start: false,
                loading_end: true
            },
            {
                processName: "定位",
                percentage: "0%",
                percentageNum: "0",
                loading_start: false,
                loading_end: true
            },
            {
                processName: "外定标",
                percentage: "0%",
                percentageNum: "0",
                loading_start: false,
                loading_end: true
            },
            {
                processName: "重采样",
                percentage: "0%",
                percentageNum: "0",
                loading_start: false,
                loading_end: true
            },
            {
                processName: "大气校正",
                percentage: "0%",
                percentageNum: "0",
                loading_start: false,
                loading_end: true
            },
            {
                processName: "L1数据生成",
                percentage: "0%",
                percentageNum: "0",
                loading_start: false,
                loading_end: false
            }
        ]

        //设置默认显示的进度，绑定内容
        self.tabChart_process_Ary = self.WINDRAD_Sim_process_Ary;

        //初始化
        initData();

        //===========================自调用一次的初始化函数===================================
        //初始化数据
        function initData() {
            $(document).ready(function () {
                //初始化圆圈
                openCricle();
                //初始化日历
                initDataPicker();
            });
        }


        /**
         * 点击菜单栏函数
         * 界面显示点击对应的载荷，并且更改模态框对应的配置信息
         * @param $event 点击的元素
         */
        self.changeMenu = function ($event) {
            for (var i = 0; i < self.CN_Menu_Name.length; i++) {
                if ($event.target.innerText == self.CN_Menu_Name[i]) {
                    self.loadCNName = $event.target.innerText;
                    var _getEnName = CN_EN_Name(self.loadCNName);
                    //console.log(_getEnName);
                    showModal(_getEnName);
                }
            }
        };

        /*中英文名称切换*/
        function CN_EN_Name(loadName) {
            switch (loadName) {
                case self.CN_Menu_Name[0]:
                    var loadEnName = self.EN_Menu_NameAry[0];
                    return loadEnName;
                case self.CN_Menu_Name[1]:
                    var loadEnName = self.EN_Menu_NameAry[1];
                    return loadEnName;
                case self.CN_Menu_Name[2]:
                    var loadEnName = self.EN_Menu_NameAry[2];
                    return loadEnName;
                case self.CN_Menu_Name[3]:
                    var loadEnName = self.EN_Menu_NameAry[3];
                    return loadEnName;
                case self.CN_Menu_Name[4]:
                    var loadEnName = self.EN_Menu_NameAry[4];
                    return loadEnName;
                case self.CN_Menu_Name[5]:
                    var loadEnName = self.EN_Menu_NameAry[5];
                    return loadEnName;
                case self.CN_Menu_Name[6]:
                    var loadEnName = self.EN_Menu_NameAry[6];
                    return loadEnName;
            }
        }

        /**
         * 传入英文名，控制对应载荷的模态框配置进行显示,控制对应的流程进行显示
         * @param loadEnName
         */
        function showModal(loadEnName) {
            var joinName_config = "is_" + loadEnName + "_config";
            var joinName_process = "is_" + loadEnName + "_process";
            var joinName_click = loadEnName + "_process_Ary";

            //console.log();
            //配置 先将所有置为隐藏，然后将对应的置为显示
            self.is_MERSI_Simulation_config = false;
            self.is_HIRAS_Simulation_config = false;
            self.is_WINDRAD_Sim_config = false;
            self.is_MWTS_Simulation_config = false;

            self.is_HIRAS_DPPS_config = false;
            self.is_NPP_VIIRS_config = false;
            self.is_WINDRAD_DPPS_config = false;

            self[joinName_config] = true;

            //流程 将所有置为隐藏，将对应的设置为显示
            self.is_MERSI_Simulation_process = false;
            self.is_HIRAS_Simulation_process = false;
            self.is_WINDRAD_Sim_process = false;
            self.is_MWTS_Simulation_process = false;

            self.is_HIRAS_DPPS_process = false;
            self.is_NPP_VIIRS_process = false;
            self.is_WINDRAD_DPPS_process = false;

            self[joinName_process] = true;

            //console.log(self[joinName_process]);
            //console.log(self.is_HIRAS_DPPS_process);

            self.tabChart_processName = self[joinName_process];
            self.tabChart_process_Ary = self[joinName_click];
            //console.log(self.tabChart_processName);
            //console.log(self.tabChart_process_Ary);

            openCricle();
        }

        /**
         *初始化圆圈
         */
        function openCricle() {
            $(document).ready(function () {
                $('.processCricle').circliful();
            });
        }

        /**
         * 点击"配置模拟"按钮
         */
        self.updateModal_simulation = function (loadCNName) {
            self.configObj = {};
            var newsconfigObj = getConfigInfo(loadCNName);
            console.log(newsconfigObj);
        }

        /**
         * 点击"配置开始"按钮
         */
        self.updateModal_start = function (loadCNName) {
            self.configObj = {};
            var newsconfigObj = getConfigInfo(loadCNName);
            console.log(newsconfigObj);
            config_startPost(newsconfigObj);
        }

        //获取配置信息
        function getConfigInfo(loadCNName) {
            self.configObj.selectName = loadCNName;
            switch (loadCNName) {
                case self.CN_Menu_Name[0]:
                    self.configObj.selectedDate_start = self.selectedDate_start;
                    self.configObj.selectedDate_end = self.selectedDate_end;
                    //console.log(self.configObj);
                    return self.configObj;
                case self.CN_Menu_Name[1]:
                    self.configObj.selectedDate_start = self.selectedDate_start;
                    self.configObj.selectedDate_end = self.selectedDate_end;
                    //console.log(self.configObj);
                    return self.configObj;
                case self.CN_Menu_Name[2]:
                    self.configObj.selectedDate_start = self.selectedDate_start;
                    self.configObj.selectedDate_end = self.selectedDate_end;
                    self.configObj.processType = self.WINDRAD_Sim_processType;
                    self.configObj.bandType = self.WINDRAD_Sim_bandType;
                    self.configObj.processDirection = self.WINDRAD_Sim_processDirection;
                    //console.log(self.configObj);
                    return self.configObj;
                case self.CN_Menu_Name[3]:
                    self.configObj.selectedDate_start = self.selectedDate_start;
                    self.configObj.selectedDate_end = self.selectedDate_end;
                    //console.log(self.configObj);
                    return self.configObj;
                case self.CN_Menu_Name[4]:
                    self.configObj.selectedDate_start = self.selectedDate_start;
                    self.configObj.selectedDate_end = self.selectedDate_end;
                    //console.log(self.configObj);
                    return self.configObj;
                case self.CN_Menu_Name[5]:
                    self.configObj.selectedDate_start = self.selectedDate_start;
                    self.configObj.selectedDate_end = self.selectedDate_end;
                    //console.log(self.configObj);
                    return self.configObj;
                case self.CN_Menu_Name[6]:
                    self.configObj.bandType = self.WINDRAD_DPPS_bandType;
                    self.configObj.selectedDate_start = self.selectedDate_start;
                    self.configObj.selectedDate_end = self.selectedDate_end;
                    //console.log(self.configObj);
                    return self.configObj;
            }
        }

        /** 
         * 各配置select点击事件
         */
        self.WINDRAD_Sim_processTypeChange = function () {
            //console.log(self.WINDRAD_Sim_processType);
        }

        self.WINDRAD_Sim_bandTypeChange = function () {
            //console.log(self.WINDRAD_Sim_bandType);
        }

        self.WINDRAD_Sim_processDirectionChange = function () {
            //console.log(self.WINDRAD_Sim_processDirection);
        }

        self.WINDRAD_DPPS_bandTypeChange = function () {
            //console.log(self.WINDRAD_DPPS_bandType);
        }

        /**
         *点击"配置开始"按钮 后发送的请求
         * @param {*} _data 
         */
        function config_startPost(_data) {
            APIServices.config_start(_data, function successCallback(res) {
                if (res.status === 200) {
                    //console.log(res.data);
                }
            }, function (err) {
                console.log(err);
            });
        }

        /**
         *点击"开始"按钮
         * @param loadCNName
         */
        self.process_start = function (loadCNName) {
            //console.log(self.configObj);
            var timeStamp = moment().format("YYYYMMDDHHmm");
            APIServices.start_process(self.configObj, timeStamp, function successCallback(res) {
                if (res.status === 200) {
                    console.log(res.data);
                    /*实时数据*/
                    var _txtContents = res.data.txtContents;
                    var _txtContentsAry = _txtContents.split("\r\n");
                    var tabChart_process_Ary = [];
                    for (var i = 0; i< _txtContentsAry.length; i ++ ) {
                        var tabChart_process_obj = {};
                        //_txtContentsAry[i].split(";")    [stepsFirst:100%,loadingStart:false,loadingEnd:true]
                        tabChart_process_obj[processName] = _txtContentsAry[i].split(";")[0].split(":")[0];
                        if (_txtContentsAry[i].split(";")[0].split(":")[1] == "?") {
                            //需要程序计算百分数的情况
                            tabChart_process_obj[percentage] = res.data.resNum + "%";
                            tabChart_process_obj[percentageNum] = res.data.resNum;
                        } else {
                            //0%和100%的情况
                            tabChart_process_obj[percentage] = _txtContentsAry[i].split(";")[0].split(":")[1];
                            tabChart_process_obj[percentageNum] = _txtContentsAry[i].split(";")[0].split(":")[1].split("%")[0];
                        }
                        tabChart_process_obj[loading_start] = _txtContentsAry[i].split(";")[1].split(":")[1];
                        tabChart_process_obj[loading_end] = _txtContentsAry[i].split(";")[2].split(":")[1];
                        tabChart_process_Ary.push(tabChart_process_obj);
                    }
                    $scope.tabChart_process_Ary = tabChart_process_Ary;
                    $scope.fileAry = res.data.successFileList;
                    $scope.photoName = res.data.photoAry[res.data.photoAry.length - 1];
                    $scope.photoURL = self.serverIP + "outPhoto/" + res.data.loadEnName + "/" + res.data.photoAry[res.data.photoAry.length - 1];
                }
            }, function (err) {
                console.log(err);
            });
        }

        /**
         *点击"模拟流程"按钮
         * @param loadCNName
         */
        self.process_simulation = function (loadCNName) {
            console.log(self.configObj);
            APIServices.start_simulation(EN_Name);
        }

        /**
         * 根据中文名 动态拼接要显示的流程div名称
         * eg : self.is_WINDRAD_Sim_process
         * @param loloadCNName
         */
        function processDivName(loadCNName) {
            switch (loadCNName) {
                case self.CN_Menu_Name[0]:
                    self.loadEnName = "HIRAS_Simulation";
                case self.CN_Menu_Name[1]:
                    self.loadEnName = "MERSI_Simulation";
                case self.CN_Menu_Name[2]:
                    self.loadEnName = "WINDRAD_Sim";
                case self.CN_Menu_Name[3]:
                    self.loadEnName = "MWTS_Simulation";
                case self.CN_Menu_Name[4]:
                    self.loadEnName = "HIRAS_DPPS";
                case self.CN_Menu_Name[5]:
                    self.loadEnName = "NPP_VIIRS";
                case self.CN_Menu_Name[6]:
                    self.loadEnName = "WINDRAD_DPPS";
            }
            var tabChart_processName = "is_" + self.loadEnName + "_process";
            return tabChart_processName;
        }

        //初始化数据传输
        function initDataPicker() {
            $("#process_datarangepicker").daterangepicker({
                    //"singleDatePicker": true,
                    "showDropdowns": true,
                    "timePicker": true,
                    "timePicker24Hour": true,
                    "autoApply": true,
                    "drops": "down",
                    //"timePickerIncrement ":10,
                    startDate: self.selectedDate_start,
                    endDate: self.selectedDate_end,
                    locale: {
                        format: "YYYY-MM-DD HH:mm",
                        //applyLabel: '确认',
                        //cancelLabel: '取消',
                        //fromLabel: '从',
                        //toLabel: '到',
                        //weekLabel: 'W',
                        //customRangeLabel: 'Custom Range',
                        daysOfWeek: ["日", "一", "二", "三", "四", "五", "六"],
                        monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                    }
                },
                function (start, end, label) {
                    //alert('A date range was chosen: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
                    self.selectedDate_start = start.format('YYYYMMDDHHmm');
                    self.selectedDate_end = end.format('YYYYMMDDHHmm');
                }
            );
        }
    }
})();