$(document).ready(function () { // 加载页面时同步加载
    $("#poetry-container").html("loading...please wait a moment!");
    $.post("https://api.gushi.ci/all.json",{},function (data,status) {
        var htmlC = "<blockquote>"+data.origin+"<br>"+data.author+"<br>"+data.content+"</blockquote>";
        $("#poetry-container").html(htmlC);
    })
})