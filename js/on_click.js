$(document).ready(function () { // 加载页面时同步加载
    function xieyi() {
        $("#play").trigger("click");
    }

    $(document).ready(function () {
        window.οnlοad = xieyi;
        console.log("excute")
    });

});