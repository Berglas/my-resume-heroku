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



//設定錨點
$(function() {
    $('a[href*=#]:not([href=#])').click(function() {
        if ($(this)[0].hash != "#skill_carousel") {
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
        this.classList.toggle('expanded-cross');
        $(this).parent()[0].classList.toggle('is-expanded');
    })
});

//定義輪播
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

function showSkill(position) {
    $('#w h3').each(function(e) {
        $('#w h3')[0].setAttribute("key", "SKILLS_" + position);
    })

    $('#w p').each(function(e) {
        $('#w p')[e].setAttribute("key", "SKILLS_" + position + "_content_" + (e + 1));
        $('#w').myWindows('open');
        $('#w').myWindows('center');
    })

    var language = getCookie("language");
    if (language == null || language == "") {
        language = "zh-tw";
    }
    $('#' + language)[0].classList.add("language-select");
    $('.lang').each(function(index, element) {
        $(this).text(arrLang[language][$(this).attr('key')]);
    });

}