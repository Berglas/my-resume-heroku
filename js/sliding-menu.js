$(function() {
    $('.sliding-menu').append("<div class='menu-icon'><span></span></div>");
    $('.menu-icon').on('click', function() {
        $(".menu-icon")[0].classList.toggle("active");
        $(".sliding-menu>nav")[0].classList.toggle("active");
    })
});