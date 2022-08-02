const api_key = "1268590fd0b518ebdddbeb4a3e70199c";
const tmdb_url = "https://api.themoviedb.org";

var boxes = [
    {   tag: 'film_populatiry',
        type: 0, 
        obj: document.querySelector(".carouselBox_film_popularity"),
        query: tmdb_url+"/3/discover/movie?api_key="+api_key+"&sort_by=popularity.desc",
        scrollAmount: 0
    },
    {   tag: 'tv_populatiry',
        type: 1,
        obj: document.querySelector(".carouselBox_tv_popularity"),
        query: tmdb_url+"/3/discover/tv?api_key="+api_key+"&sort_by=popularity.desc",
        scrollAmount: 0
    },
];

var scrollPerClick;
var ImagePadding = 12;

boxes.forEach(function(box, index) {

    showMovieData(index);

    var scrollAmount = 0;


});

/* Questa funzione oltre a interrogare il database di TMDB popola anche
la pagina principale con le varie liste di film e serie tv */
async function showMovieData(box_index) {

    var result = await axios.get(boxes[box_index].query+"&page=1");
    var result2 = await axios.get(boxes[box_index].query+"&page=2");

    result = result.data.results;
    result2 = result2.data.results;
    result = result.concat(result2);

    result.map(function(cur,index) {
        var opera_year; 
        if(boxes[box_index].type == 0) opera_year=parseInt(cur.release_date)
        else opera_year=parseInt(cur.first_air_date);
        var opera_title; 
        if(boxes[box_index].type == 0) opera_title=cur.title
        else opera_title=cur.name;

        boxes[box_index].obj.insertAdjacentHTML(
            "beforeend",
            `<div id="${cur.id}" class="opera">
                <img src="https://image.tmdb.org/t/p/w220_and_h330_face${cur.poster_path}" class="opera-img img-${boxes[box_index].tag}-${index}" alt="">
                <div class="opera-overlay">
                    <i class="bi bi-play-circle"></i>
                </div>
                <div class="opera-body">
                    <section class="d-flex justify-content-between">
                        <div class="opera-info">
                            <p>Anno: ${opera_year}</p>
                            <p>Voto: ${cur.vote_average}</p>
                        </div>
                        <div class="opera-more-info"><i class="bi bi-info-circle opera-icon"></i></div>
                    </section>
                    <div class="opera-title text-white m-0">
                        <p>${opera_title}</p>
                    </div>
                </div>
            </div>`
        )
        boxes[box_index].obj.insertAdjacentHTML(
            "afterend",
            `<a class="switchLeft sliderButton" onclick="sliderScrollLeft(${box_index})"><span class="bi bi-caret-left-fill"></span></a>
            <a class="switchRight sliderButton" onclick="sliderScrollRight(${box_index})"><span class="bi bi-caret-right-fill"></span></a>`
        )
    })

    var box_width = document.querySelector(`.carouselBox`).clientWidth;
    var opera_width = (document.querySelector(`.img-${boxes[box_index].tag}-1`).clientWidth + ImagePadding);
    scrollPerClick = Math.floor(box_width, opera_width) - opera_width ;
}

function sliderScrollLeft(box_index) {
    boxes[box_index].obj.scrollTo({
        top: 0,
        left: (boxes[box_index].scrollAmount -=scrollPerClick),
        behavior: "smooth"
    });

    if(boxes[box_index].scrollAmount < 0) {
        boxes[box_index].scrollAmount = 0
    }
}

function sliderScrollRight(box_index) {
    if(boxes[box_index].scrollAmount <= boxes[box_index].obj.scrollWidth - boxes[box_index].obj.clientWidth) {
        boxes[box_index].obj.scrollTo({
            top: 0,
            left: (boxes[box_index].scrollAmount += scrollPerClick),
            behavior: "smooth",
        })
    }
}