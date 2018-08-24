$(document).ready(function () {
    $(".VerticalMenu>div>div.navigationOne").click(function () {
        $xz = $(".VerticalMenu>div>div:first-child");
        $($xz).not(this).children("i.fa-angle-right").css({ "transform": "rotate(0deg)", "color": "#000000" }).attr("leng", "")
        if ($(this).children("i.fa-angle-right").attr("leng") != "s") {
            $(this).children("i.fa-angle-right").attr("leng", "s")
            $(this).children("i.fa-angle-right").css({ "transform": "rotate(90deg)", "color": "#f9579e" })
        } else {
            $(this).children("i.fa-angle-right").attr("leng", "")
            $(this).children("i.fa-angle-right").css({ "transform": "rotate(0deg)", "color": "#000000" })
        }
        $($xz).not($(this)).siblings("[name='xz']").stop().slideUp(400)
        $(this).siblings("[name='xz']").slideToggle(400)

    })
    $VerticalMenu_scdj = null;
    $(".VerticalMenu>div>div.navigationTwo>div").click(function () {
        //$($VerticalMenu_scdj).css("background-color", "#3e4b5b");
        //$(this).css("background-color","#2c3a4a");
        $($VerticalMenu_scdj).removeClass("active");
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
        $VerticalMenu_scdj=$(this)
    })
})