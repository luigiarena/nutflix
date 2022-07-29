$(document).ready(function(){
    $("body").css("background", "#555555 !important")
    $(window).scroll(function(){
        var scroll = $(window).scrollTop();
        if(scroll > 100){
            $(".nutflix-navbar").addClass("scrolled");
        }else{
            $(".nutflix-navbar").removeClass("scrolled");
        }
    })
})