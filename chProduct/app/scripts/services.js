(function () {

    "use strict";
    angular.module("twilightAPP")
        .factory("APIServices", APIServices);
    APIServices.$inject = ['$http'];

    function APIServices($http) {
        var baseIP = "http://10.24.44.100:3001";
        var self = {
            //点击"模拟"按钮
            start_simulation : _start_simulation,
            //点击"开始"按钮
            start_process : _start_process,
            //点击"配置模拟"
            config_simulation : _config_simulation,
            //点击"配置开始"
            config_start : _config_start,
        };
        return self;

        //点击"配置模拟"按钮
        function _config_simulation(){

        };

        //点击"配置开始"按钮
        function _config_start(_data, successFn, errorFn){
            var _url= baseIP +'/postmonitor/' + 'config_start' + '/er/30270422';
            console.log(_url);
            console.log(_data);
            $http({
                "method": "POST",
                "url": _url,
                "data": _data
            }).then(successFn, errorFn);
        };

        //点击"模拟"按钮
        function _start_simulation(_data, successFn, errorFn) {
            $http({
                "method": "GET",
                //"url": baseIP + '/getmonitor/' + 'start_simulation/' + _date
            }).then(successFn, errorFn);
        };

        //点击"开始"按钮
        function _start_process(_data, timeStamp, successFn, errorFn){
            var _url = baseIP +'/postmonitor/' + 'start_process/' + 'er/' + timeStamp;
            console.log(_url);
            $http({
                'method':'POST',
                "url": _url,
                "data": _data
            }).then(successFn, errorFn);
        }
    }
})();