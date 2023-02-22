// author by removef
// https://removeif.github.io/
// $(function () { // 获取一句诗
//     $.post("https://api.gushi.ci/all.json", {}, function (data, status) {
//         var htmlC = "<blockquote>" + data.origin + "<br>\"" + data.content + "\"<br>–" + data.author + "</blockquote>";
//         $("#poetry-container-time").append("<p>" + new Date().Format("yyyy.MM.dd/hh:mm:ss") + "</p>" + htmlC);
//     })
// });

$(function () {
    ajaxReqForGitHubNoToken("https://api.github.com/repos/removeif/issue_database/issues/5/comments?per_page=100",function (data) {
        loadRecord(data);
    });
});

function loadRecord(source) {

    var data = [];
    var source1;
    source1 = source;
    source1.reverse();
    $.each(source1, function (i, e) {
        data.push(...JSON.parse(e.body));
    });
    $.each(data, function (i, e) {
        var html = '<li class="time-axis-item">' +
            '<div class="time-axis-date">' + e.date + '<span></span></div>' +
            '<div class="time-axis-title">' + e.title + '</div>' +
            '<p class="time-axis-achievement">' + e.achievement + '</p>' +
            '</li>';
        $('.time-axis').append(html);
    });
}

