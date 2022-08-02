function volumeUp(element) {
    element.style.display = "none";
    document.getElementById("showcase-video").muted = false;
    document.getElementById("volume-up").style.display = "block";
}

function volumeDown(element) {
    element.style.display = "none";
    document.getElementById("showcase-video").muted = true;
    document.getElementById("volume-down").style.display = "block";
}

function searchButton() {
    document.getElementById("nav-search").classList.toggle("nav-search-hidden");
}

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