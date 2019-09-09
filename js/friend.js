Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

$(function () {
    $.getJSON("../json_data/friend.json", function (data) {
        $.each(data, function (i, e) {
            var html = "<div class=\"cardm\">";
            if (e.src != undefined) {
                html += "    <img class=\"ava\" src=\"" + e.src + "\">";
            }
            html +=
                "    <div>网址：<a href=\"" + e.url + "\" target=\"_blank\">" + e.name + "</a></div>" +
                "<div class=\"info\">简介：" + e.desc + "</div>" +
                "    <div>时间：" + e.date + "</div>" +
                "    </div>"

            $('.link-navigation').append(html);
        });
    })
});

