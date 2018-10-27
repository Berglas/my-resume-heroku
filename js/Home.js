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

//滾動事件
$(window).scroll(function() {
    var x = $('#page0').offset().top;
    var x1 = $('#page1').offset().top;
    var x2 = $('#page2').offset().top;
    var x3 = $('#page3').offset().top;
    if ($(this).scrollTop() >= x && $(this).scrollTop() <= x1 * 0.8) {
        // $('#home_menu')[0].classList.remove('show-bg');
    } else if ($(this).scrollTop() >= x1 * 0.8 && $(this).scrollTop() <= x2) {
        // console.log("page1");
        // $('#home_menu')[0].classList.add('hide-bg');
        $('.profile-info>div')[0].classList.add('animation-text-show');
        setTimeout(function() { $('.profile-about>div')[0].classList.add('animation-text-show'); }, 600);
        setTimeout(function() { $('.profile-education>div')[0].classList.add('animation-text-show'); }, 1200);
    } else if ($(this).scrollTop() >= x2 && $(this).scrollTop() <= x3) {
        // console.log("page2");
    }

});

//設定錨點
$(function() {
    $('a[href*=#]:not([href=#])').click(function() {
        if ($(this)[0].hash != "#protfolio_carousel") {
            var target = $(this.hash);
            $('html, body').animate({
                scrollTop: target.offset().top

            }, 400);

            return false;
        };
    });
});

//進行翻譯
$(function() {
    $('.translate').click(function() {
        $('.translate').each(function(index, el) {
            el.classList.remove("language-select");
        });
        setCookie("language", this.id, 24);
        this.classList.add("language-select");
    });
});

//設定expanded-box開關
$(function() {
    $('.expanded-switch').on('click', function() {
        $(this).parent()[0].classList.toggle('is-expanded');
    })
});

$(function() {
    $('.expanded-button').on('click', function() {
        $($($(this).parent()[0]).parent()[0]).parent()[0].classList.toggle('is-expanded');
    })
});

//設定bootstrap輪播
$(function() {
    var li = "";
    var total = $('.carousel .carousel-inner div.carousel-item').size();
    var carousel_ID = $(".carousel")[0].id;

    for (var i = 0; i <= total - 1; i++) {
        if (i == 0) {
            li += "<li data-target='#" + carousel_ID + "' data-slide-to='" + i + "' class='active'></li>";
        } else {
            li += "<li data-target='#" + carousel_ID + "' data-slide-to='" + i + "' class=''></li>";
        }
    }

    $(".carousel-indicators").append(li);

    //輪播秒數與滑入停止
    $('.carousel').carousel({
        interval: false
    });
});

//初始化has-animation
$(function() {
    $('.has-animation').each(function(index) {
        $(this).delay($(this).data('delay')).queue(function() {
            $(this).addClass('animate-in');
        });
    });
});

//傳送mail表單
function send_mail() {
    if (confirm("確認送出?")) {
        $('#mail_form').submit();
    } else {}

}

//初始化sliding-menu
$(function() {
    $('.sliding-menu').append("<div class='menu-icon'><span></span></div>");
    $('.menu-icon').on('click', function() {
        $(".menu-icon")[0].classList.toggle("active");
        $(".sliding-menu>nav")[0].classList.toggle("active");
    })
});