$(document).ready(setTimeout(function () { // 延迟1s执行，保证其余的先加载
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
            var timesSet = [];
            var timesBodyMap = {};
            var timesSetMap = {};
            var resultMap = {};
            var resultArr = [];
            $.ajaxSettings.async = false;
            // sort=comments可以按评论数排序，此处更适合按更新时间排序,可以根据updated排序，但是0条评论的也会出来，所以此处还是全部查出来，内存排序
            // per_page 每页数量，根据需求配置
            $.getJSON("https://api.github.com/repos/removeif/blog_comment/issues?per_page=100&sort=comments", function (result) {
                $.each(result, function (i, item) {
                    var commentsCount = item.comments;
                    if (commentsCount > 0) {
                        $.ajaxSettings.async = false;
                        // 此处保证是最后一条，api没有排序参数，只能分页取最后一条，保证最少的数据量传输，快速处理
                        $.getJSON(item.comments_url + "?page=2&per_page=" + (commentsCount - 1), function (commentResult) {
                            var item1 = commentResult[0];
                            var contentStr = item1.body.trim();
                            if (contentStr.length > 50) {
                                contentStr = contentStr.substr(0, 60);
                                contentStr += "...";

                            }
                            timesSet.push(new Date(item1.created_at).getTime());
                            timesBodyMap[item1.created_at] = {
                                "title": item.title.substr(0, item.title.indexOf("-") - 1),
                                "url": item.body.substr(0, item.body.indexOf("\n") - 1),
                                "content": contentStr,
                                "date": item1.created_at,
                                "userName": item1["user"].login,
                                "userUrl": item1["user"].html_url,
                                "commentCount": commentsCount
                            };
                            timesSetMap[new Date(item1.created_at).getTime()] = item1.created_at;
                        });
                    }
                });
            });

            if (timesSet.length > 0) {
                timesSet.sort();
            }

            if (timesSet.length > 10) {
                for (var i = timesSet.length - 1; i >= 0 && resultArr.length < 10; i--) {
                    resultArr.push(timesBodyMap[timesSetMap[timesSet[i]]]);
                }
            }
            else {
                // 只需要取10条
                for (var i = timesSet.length - 1; i >= 0; i--) {
                    resultArr.push(timesBodyMap[timesSetMap[timesSet[i]]]);
                }
            }
            resultMap["date"] = new Date().getTime();
            resultMap["data"] = resultArr;
            COMMENT_ARR = resultArr;
            if (COMMENT_ARR.length > 0) {
                document.cookie = "comment=" + JSON.stringify(resultMap) + ";path=/";
            }
        }

        var htmlContent = "";
        var hotDiv = $("#index_hot_div");
        var hotContent = "";
        var classDiv = "";
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
                "<a href =\"" + item.url + "\"target=\"_blank\">" + item.title + "&nbsp;&nbsp;✉️" + item.commentCount + "</a>" +
                "<br>&nbsp;&nbsp;&nbsp;<div class=\"tag is-success\" style='margin-top: 5px;background-color:#f9f9f9;color:#3d3d3d;'>" + contentStr + "</div><br><hr>";

            // 标签配色
            if (i % 4 == 0) {
                classDiv = "class=\"tag is-danger\"";
            } else if (i % 4 == 2) {
                classDiv = "class=\"tag is-warning\"";
            } else if (i % 4 == 1) {
                classDiv = "class=\"tag is-success\"";
            } else {
                classDiv = "class=\"tag is-white\"";
            }
            hotContent += "<a href =\"" + item.url + "\"target=\"_blank\"" + classDiv + ">" + item.title + "&nbsp;&nbsp;✉️" + item.commentCount + "</a>&nbsp;&nbsp;"
        }
        if (hotDiv != undefined) {
            hotDiv.html("");
            hotDiv.append(hotContent);
        }
        $("#myContent").html("");
        $("#myContent").append(htmlContent);
    }
    ,
    1000
))
;