$(document).ready(function () { // 加载页面时同步加载
    $("#myContent").html("loading...please wait a moment!");

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

    var COMMENT_ARR = {};
    var COMMENT_COOKIE = document.cookie;
    var COMMENT = {};

    if (COMMENT_COOKIE != '') {
        console.log("load cache data...");
        COMMENT = JSON.parse(COMMENT_COOKIE.split("=")[1]);
        COMMENT_ARR = COMMENT["data"];
    }


    if (COMMENT_COOKIE == '' || new Date().getTime() - COMMENT["date"] > 60 * 1000 * 10) { // request per 10 minutes
        console.log("load data...");
        $.ajaxSettings.async = false;
        var timesSet = [];
        var timesBodyMap = {};
        var timesSetMap = {};
        var resultMap = {};
        var resultArr = [];
        $.getJSON("https://api.github.com/repos/removeif/blog_comment/issues?per_page=1000", function (result) {
            $.each(result, function (i, item) {
                var commentsCount = item.comments;
                if (commentsCount > 0) {
                    $.getJSON(item.comments_url, function (commentResult) {
                        $.each(commentResult, function (k, item1) {
                            timesSet.push(new Date(item1.created_at).getTime());
                            var contentStr = item1.body.trim();
                            if (contentStr.length > 50) {
                                contentStr = contentStr.substr(0, 60);
                                contentStr += "...";
                            }
                            timesBodyMap[item1.created_at] = {
                                "title": item.title.substr(0, item.title.indexOf("-") - 1),
                                "url": item.body.substr(0, item.body.indexOf("\n") - 1),
                                "content": contentStr,
                                "date": item1.created_at,
                                "userName": item1["user"].login,
                                "userUrl": item1["user"].html_url
                            };
                            timesSetMap[new Date(item1.created_at).getTime()] = item1.created_at;
                        });
                    });
                }
            });
        });
        if (timesSet.length > 0) {
            timesSet.sort();
        }
        if (timesSet.length > 10) {
            for (var i = timesSet.length - 1; i > timesSet.length - 11; i--) {
                // resultMap[timesSetMap[timesSet[i]]] = timesBodyMap[timesSetMap[timesSet[i]]];
                resultArr.push(timesBodyMap[timesSetMap[timesSet[i]]]);
            }
        } else {
            for (var i = timesSet.length - 1; i >= 0; i--) {
                // resultMap[timesSetMap[timesSet[i]]] = timesBodyMap[timesSetMap[timesSet[i]]];
                resultArr.push(timesBodyMap[timesSetMap[timesSet[i]]]);
            }
        }
        resultMap["date"] = new Date().getTime();
        resultMap["data"] = resultArr;
        COMMENT_ARR = resultArr;
        document.cookie = "comment=" + JSON.stringify(resultMap);
    }

    var htmlContent = "";
    for (var i = 0; i < COMMENT_ARR.length; i++) {
        var item = COMMENT_ARR[i];
        var timeStr = new Date(item.date);
        var contentStr = item.content;
        if (contentStr.indexOf(">") != 0) {
            contentStr = ">&nbsp;" + contentStr;
        }
        // 拼上作者
        contentStr = "<a href=\"" + item.userUrl + "\"target=\"_blank\">" + item.userName + "</a>&nbsp;&nbsp;" + contentStr;
        htmlContent += "<div class=\"tag is-warning\" style='background-color: #f5f9fe;color:rgb(164, 164, 164);'>" + timeStr.Format("yyyy-MM-dd hh:mm:ss") + "</div>  " +
            "<a href =\"" + item.url + "\"target=\"_blank\">" + item.title + "</a>" +
            "<br>&nbsp;&nbsp;&nbsp;<div class=\"tag is-success\" style='margin-top: 5px;background-color:#f9f9f9;color:#3d3d3d;'>" + contentStr + "</div><br><hr>";
    }
    $("#myContent").html("");
    $("#myContent").append(htmlContent);
});