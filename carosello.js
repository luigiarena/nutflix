const sliders = document.querySelector(".carouselBox")
var scrollPerClick;
var ImagePadding = 400

showMovieData()

var scrollAmount = 0;
function sliderScrollLeft() {
    sliders.scrollTo({
        top: 0,
        left: (scrollAmount -=scrollPerClick),
        behavior: "smooth"
    });

    if(scrollAmount < 0) {
        scrollAmount = 0
    }
}

function sliderScrollRight() {
    if(scrollAmount <= sliders.scrollWidth - sliders.clientWidth) {
        sliders.scrollTo({
            top: 0,
            left: (scrollAmount += scrollPerClick),
            behavior: "smooth",
        })
    }
}



async function showMovieData() {
    const api_key = "1268590fd0b518ebdddbeb4a3e70199c";
 
    var result = await axios.get(
        "https://api.themoviedb.org/3/discover/movie?api_key="+
        api_key+
        "&sort_by=popularity.desc"
    );
    
    result = result.data.results;
    result.map(function(cur,index) {
        sliders.insertAdjacentHTML(
            "beforeend",
            `<img class="img-${index} slider-img" src=https://image.tmdb.org/t/p/w220_and_h330_face${cur.poster_path} />`
        )
    })
    scrollPerClick = document.querySelector(".img-1").clientWidth + ImagePadding;
}