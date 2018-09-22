//設置cookie
//name:cookie名稱、value:cookie值、deadline:cookie有效時間(單位:小時)
function setCookie(name, value, deadline) {
    var exp = new Date();
    exp.setTime(exp.getTime() + deadline * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

//讀取cookie
//name:cookie名稱
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

//删除cookies
function deleteCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}


//定義輪播
$(function() {
    var $item = $('.carousel .item');
    var wHeight = $(window).height() - 40;
    if ($(window).width() > 900) {
        wHeight = $(window).height() - 140;
    }
    $item.height(wHeight);

    $('.carousel img').each(function() {
        var $src = $(this).attr('src');
        var $color = $(this).attr('data-color');
        $(this).parent().css({
            'background-image': 'url(' + $src + ')',
            'background-color': $color
        });
        $(this).remove();
    });

    //下方自動加入控制圓鈕
    var total = $('.carousel .carousel-inner div.item').size();
    append_li();

    function append_li() {
        var li = "";
        var get_ac = $(".carousel .active");
        var ac = $(".carousel .carousel-inner div").index(get_ac);

        for (var i = 0; i <= total - 1; i++) {
            if (i == (ac) / 2) {
                li += "<li data-target='#mycarousel' data-slide-to='" + i + "' class='active'></li>";
            } else {
                li += "<li data-target='#mycarousel' data-slide-to='" + i + "' class=''></li>";
            }
        }
        $(".carousel-indicators").append(li);
    }

    //單則隱藏控制鈕
    if ($('.carousel .carousel-inner div.item').length < 2) {
        $('.carousel-indicators, .carousel-control').hide();
    }

    //縮放視窗調整視窗高度
    $(window).on('resize', function() {
        var wHeight = $(window).height() - 40;
        if ($(window).width() > 900) {
            wHeight = $(window).height() - 140;
        }
        $item.height(wHeight);
    });

    //輪播秒數與滑入停止
    $('.carousel').carousel({
        interval: false
    });
});

//響應式選單開啟事件定義
$(function() {
    $("#openMenu").on("click", function(e) {
        $('body')[0].classList.add("openMenu");
        e.stopPropagation();
        $(document).on("click", function(e) {
            // 如果點擊側邊欄以外的區域，就關閉側邊欄 
            if (!e.target.closest("#Menu-content")) {
                $('body')[0].classList.remove("openMenu");
            }
        });
    });
});

function closeMenu() {
    $('body')[0].classList.remove("openMenu");
}