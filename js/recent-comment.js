 function getComment() {
    var COMMENT_ARR = [];
    var COMMENT = {};
     if (COMMENT_ARR.length == 0 || new Date().getTime() - COMMENT["date"] > 60 * 1000 * 10) { // flush per one 10 mins
        $.ajaxSettings.async = false;
        var timesSet = [];
        var timesBodyMap = {};
        var timesSetMap = {};
        var resultMap = {};
        var resultArr = [];
        $.getJSON("https://api.github.com/repos/removeif/blog_comment/issues?per_page=80", function (result) {
            $.each(result, function (i, item) {
                var commentsCount = item.comments;
                console.log("flush-data...");
                if (commentsCount > 0) {
                    $.getJSON(item.comments_url, function (commentResult) {
                        $.each(commentResult, function (k, item1) {
                            timesSet.push(new Date(item1.created_at).getTime());
                            timesBodyMap[item1.created_at] = {
                                "title": item.title.substr(0, item.title.indexOf("-") - 1),
                                "url": item.body.substr(0, item.body.indexOf("\n") - 1),
                                "content": item1.body,
                                "date": item1.created_at
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
        if (timesSet.length > 5) {
            for (var i = timesSet.length - 1; i > timesSet.length - 6; i--) {
                // resultMap[timesSetMap[timesSet[i]]] = timesBodyMap[timesSetMap[timesSet[i]]];
                resultArr.push(timesBodyMap[timesSetMap[timesSet[i]]]);
            }
        } else {
            for (var i = timesSet.length - 1; i >= 0; i--) {
                // resultMap[timesSetMap[timesSet[i]]] = timesBodyMap[timesSetMap[timesSet[i]]];
                resultArr.push(timesBodyMap[timesSetMap[timesSet[i]]]);
            }
        }
        console.log(resultMap);
        resultMap["date"] = new Date().getTime();
        resultMap["data"] = resultArr;
        COMMENT_ARR = resultArr;
        COMMENT = resultMap;
        return resultArr;
    } else {
        return COMMENT_ARR;
    }
}

