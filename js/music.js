// var play  =new mePlayer({
//     music: {
//         src: 'http://sc1.111ttt.cn/2018/1/03/13/396131232171.mp3',
//         title: '那个人',
//         author: '那英',
//         loop: true,
//         cover: '',
//         lrc:
//             '[00:24.600]温柔的晚风\n[00:27.830]轻轻吹过 爱人的梦中\n[00:36.690]温柔的晚风\n[00:39.129]轻轻吹过 故乡的天空\n[00:47.690]温柔的晚风\n[00:50.749]轻轻吹过 城市的灯火\n[00:59.119]今夜的晚风\n[01:02.439]你去哪里 请告诉我\n[01:08.249]\n[01:10.879]温柔的晚风\n[01:14.590]轻轻吹过 爱人的梦中\n[01:22.179]温柔的晚风\n[01:25.549]轻轻吹过 故乡的天空\n[01:33.809]温柔的晚风\n[01:37.539]轻轻地吹过 城市的灯火\n[01:46.509]今夜的晚风\n[01:49.919]你要去哪里 请告诉我\n[01:56.419]\n[02:37.140]温柔的晚风\n[02:40.740]轻轻吹过 爱人的梦中\n[02:49.060]温柔的晚风\n[02:52.370]轻轻吹过 故乡的天空\n[03:00.680]温柔的晚风\n[03:03.860]轻轻吹过 城市的灯火\n[03:12.190]今夜的晚风\n[03:15.440]你要去哪里 请告诉我\n[03:21.370]\n[03:23.620]温柔的晚风\n[03:27.090]轻轻吹过 爱人的梦中\n[03:35.280]温柔的晚风\n[03:39.570]轻轻吹过 故乡的天空\n[03:47.620]温柔的晚风\n[03:50.880]轻轻地吹过 城市的灯火\n[03:59.180]今夜的晚风\n[04:02.680]你要去哪里 请告诉我\n[04:08.800]\n[04:33.830]温柔的晚风\n[04:37.350]请你带走 我昨天的梦\n[04:45.350]今夜的晚风\n[04:48.960]我要去哪里 请告诉我\n[04:59.690]\n'
//     },
//     target: '.music',
//     autoplay: false
// });
//
// document.querySelector('button').addEventListener('click', function () {
//     $.getJSON("/json_data/music.json",function (data) {
//         console.log(data);
//     })
//     play.toggleTheme()
// })
//
// window.setTimeout(play.pause, 1500)
//
//
var lastIndex;
var musicJsons;
$.getJSON("../json_data/music.json", function (data) {
    musicJsons = data;
    for (var i = 0; i < musicJsons.length; i++) {
        musicJsons[i].loop = false;
        var $li = $('<li><span>' + musicJsons[i].title + '</span>&nbsp;&nbsp;&nbsp;&nbsp;时长：' + musicJsons[i].time + '&nbsp;&nbsp;&nbsp;&nbsp; 歌手：' + musicJsons[i].author + '</li>')
        $li.attr('id', i);
        $li.css('list-style-type', 'none');
        $li.css('height', '40px');
        $li.css('color', '#888888');
        $li.click(function (event) {
            playMusic(musicJsons[this.id]);
            $('#musiclist #' + lastIndex).css('color', '#888888');
            $(this).css('color', '#3273dc');
            lastIndex = this.id;
            mePlayerMethod.play();
        });
        var $musiclist = $('#musiclist');
        $musiclist.append($li);
    }
    var $loopbutton = $('#musicarea #music-loop');
    $loopbutton.text('列表循环')
    $loopbutton.click(function () {
        if (window.Notification && Notification.permission !== "denied" && Notification.permission !== "granted") {
            Notification.requestPermission(function (status) {
            });
        }
        if ('单曲循环' == $(this).text()) {
            $(this).text('列表循环')
            for (var j = 0; j < musicJsons.length; j++) {
                musicJsons[j].loop = true;
            }
        } else {
            if ('列表循环' == $(this).text()) {
                $(this).text('随机播放');
            } else {
                $(this).text('单曲循环');
            }
            for (var j = 0; j < musicJsons.length; j++) {
                musicJsons[j].loop = false;
            }
        }
    })
    var index = Math.floor(Math.random() * musicJsons.length);
    $('#musiclist #' + index).css('color', '#3273dc');
    lastIndex = index;
    playMusic(musicJsons[index]);
    //document.querySelector('button').addEventListener('click', function() {
    //  mePlayerMethod.toggleTheme()
    //})
});

function playMusic(data, playendcallback) {
    document.title = data.title + '--' + data.author;
    $("#music_story_message").text(data.message);
    $("#p_message").hide();
    mePlayer({
        theme: 'default',
        music: data,
        target: '.music',
        autoplay: false
    }, function () {
        if ('单曲循环' == $('#musicarea #loop').text()) {
            playMusic(musicJsons[lastIndex]);
        } else {
            var index;
            if ('列表循环' == $('#musicarea #loop').text()) {
                index = lastIndex + 1;
                if (index >= musicJsons.length) {
                    index = 0;
                }
            } else {
                index = Math.floor(Math.random() * musicJsons.length);
            }
            playMusic(musicJsons[index]);
            $('#musiclist #' + lastIndex).css('color', '#888888');
            $('#musiclist #' + index).css('color', '#3273dc');
            lastIndex = index;
        }
        mePlayerMethod.play();
    });
    var descr = data.desc;
    if (descr == undefined) {
        $('#desc').html("");
    } else {
        $('#desc').html("<blockquote>" + descr + "</blockquote>");
    }
    //window.setTimeout(mePlayerMethod.play, 500);
}



