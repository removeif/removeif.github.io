// author by removef
// https://removeif.github.io/
$(function () { //获取处理友链数据
    ajaxReqForGitHubNoToken("https://api.github.com/repos/removeif/issue_database/issues/2/comments?per_page=100", function (data) {
        loadFriends(data);
    });
});

function loadFriends(source) {
    var data = [];
    var source1;
    source1 = source;
    source1.reverse();
    $.each(source1, function (i, e) {
        data.push(...JSON.parse(e.body));
    });
    // var data0 = data[0];
    $('.links-content').html("");

    // 随机排序过滤失效的
    let notValid = data.filter((item, a, b) => item.valid == 0);

    let hasWeightData = data.filter((item, a, b) => item.valid != 0 && item.weight != undefined && item.weight > 0).sort(function (a, b) {
        if (b.weight == a.weight) {
            return a.date.localeCompare(b.date);
        }
        return b.weight - a.weight;
    });

    // 随机排序无权重的
    let randomData = data.filter((item, a, b) => item.valid != 0 && (item.weight == undefined || item.weight == 0)).sort(function (a, b) {
        return Math.random() > .5 ? -1 : 1;
    });

    data = hasWeightData;
    data.push(...randomData);

    $('.links-content').append("<div class='friend-title-item'><br>大佬们<br><br><hr></div>");
    $.each(data, function (i, e) {
        var html = "<div class=\"friend-card-item\">";
        if (e.src == undefined) {
            html += "    <img class=\"ava\" src=\"/img/links/nopic.jpg\" title=\"图片链接不可用，使用的默认图片\">";
        } else {
            html += "    <img class=\"ava\" src=\"" + e.src + "\">";
        }
        html +=
            "<div class='text-desc' title=\"" + e.desc + "\">    网址：<a href=\"" + e.url + "\" target=\"_blank\">" + e.name + "</a>" +
            "    <br>时间：" + e.date +
            "<br>简介：" + e.desc + "</div>" +
            "    </div>";

        $('.links-content').append(html);
    });

    // 过期的
    if (notValid.length > 0) {
        $('.links-content').append("<div class='friend-title-item'><br>异常的大佬们<br><br><hr></div></div>");
        $.each(notValid, function (i, e) {
            var html = "<div class=\"friend-card-item\">";
            html += "    <img class=\"ava\" src=\"/img/links/nopic.jpg\" title=\"图片链接不可用，使用的默认图片\">";
            html +=
                "<div class='text-desc' title=\"" + e.desc + "\">    网址：<a href=\"" + e.url + "\" target=\"_blank\">" + e.name + "</a>" +
                "    <br>访问时间：" + e.stopTime +
                "<br>简介：" + e.desc + "</div>" +
                "    </div>";

            $('.links-content').append(html);
        })
    }

    $('.links-content').append("</div>");
}
