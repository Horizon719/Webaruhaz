import { 
    OBJECTS,
} from "../datas/public.js";

$(function(){
    let currentIndex;
    kever(OBJECTS);
    const ARTICLE = $("article");
    ARTICLE.eq(0).html(``);
    let txt = feltolt(OBJECTS);
    ARTICLE.eq(0).html(txt);

    $(".show").on("click", function (event){
        currentIndex = parseInt($(event.target).attr("id"));
        ARTICLE.eq(0).html(`<div id="nagykep"><button id="elozo">Előző termék</button>
                            <div class="nagykep"><img src="${OBJECTS[currentIndex].eleres}" alt=""></div>
                            <button id="kovetkezo">Következő termék</button></div>`);
        
        const NAGYKEP = $(".nagykep img").eq(0);
        const ELOZO = $("#elozo").eq(0);
        ELOZO.on("click", function () {
            currentIndex = leptetes(-1, currentIndex);
            NAGYKEP.attr("src", OBJECTS[currentIndex].eleres);
        });
        const KOVETKEZO = $("#kovetkezo").eq(0);
        KOVETKEZO.on("click", function () {
            currentIndex = leptetes(+1, currentIndex);
            NAGYKEP.attr("src", OBJECTS[currentIndex].eleres);
        });
    });
    
    
})

function feltolt(OBJECTS){
    let text = `<div class="container mt-3 row">`;
    for (let i = 0; i < OBJECTS.length; i++) {
        text += `<div class="card col-sm-3">`;
        text += `<div class="card-header"><h4>${OBJECTS[i].nev}</h4><br>-${OBJECTS[i].kategoria}</div>`;
        text += `<div class="card-body"><img src="${OBJECTS[i].eleres}" alt="${OBJECTS[i].kategoria}"></div> `;
        text += `<div class="card-footer">${OBJECTS[i].ar} HUF<br><button class="show" id="${i}">Mutat</button><button>Kosárba</button></div>`;
        text += `</div>`;
    }
    text += "</div>";
    return text;
}

function kever(OBJECTS){
    for (let i = 0; i < 100; i++) {
        let indEgy = Math.floor(Math.random() * OBJECTS.length);
        let indKetto = Math.floor(Math.random() * OBJECTS.length);
        let z = "";
        z = OBJECTS[indEgy];
        OBJECTS[indEgy] = OBJECTS[indKetto];
        OBJECTS[indKetto] = z;
    }
}

function leptetes(ertek, currentIndex){
    currentIndex += ertek;
    if (currentIndex > OBJECTS.length - 1) {
      currentIndex = 0;
    }
    if (currentIndex < 0) {
      currentIndex = OBJECTS.length - 1;
    }
    return currentIndex;
}