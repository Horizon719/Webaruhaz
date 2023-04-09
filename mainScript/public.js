import { 
    OBJECTS,
    KOSARELEMEI,
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
    

    $(".kosar").on("click", function (event){
        let melyik = parseInt($(event.target).attr("id"));
        KOSARELEMEI.push({
                        nev: `${OBJECTS[melyik].nev}`, 
                        kategoria: `${OBJECTS[melyik].kategoria}`,
                        ar: `${OBJECTS[melyik].ar}`,
                        eleres: `${OBJECTS[melyik].eleres}`,
                    });
    });

    const KOSAR = $("#kosargomb");
    KOSAR.on("click", function () {
        let megj = `<div class="container mt-3 row">`;
        for (let i = 0; i < KOSARELEMEI.length; i++) {
            megj += `<div class="card col-sm-3">`;
            megj += `<div class="card-header"><h4>${KOSARELEMEI[i].nev}</h4><br>-${KOSARELEMEI[i].kategoria}</div>`;
            megj += `<div class="card-body"><img src="${KOSARELEMEI[i].eleres}" alt="${KOSARELEMEI[i].kategoria}"></div> `;
            megj += `<div class="card-footer">${KOSARELEMEI[i].ar} HUF</div>`;
            megj += `</div>`;
        }
        megj += "</div>";
        ARTICLE.eq(0).html(megj);
        const KOSARSECTION = $("#kosar");
        KOSARSECTION.eq(0).html(`<button class="vissza">VISSZA</button>`);
    });
    
    const VISSZA = $(".vissza");
    VISSZA.on("click", function () {
        ARTICLE.eq(0).html(feltolt(OBJECTS));
    });
})

function feltolt(OBJECTS){
    let text = `<div class="container mt-3 row">`;
    for (let i = 0; i < OBJECTS.length; i++) {
        text += `<div class="card col-sm-3">`;
        text += `<div class="card-header"><h4>${OBJECTS[i].nev}</h4><br>-${OBJECTS[i].kategoria}</div>`;
        text += `<div class="card-body"><img src="${OBJECTS[i].eleres}" alt="${OBJECTS[i].kategoria}"></div> `;
        text += `<div class="card-footer">${OBJECTS[i].ar} HUF<br><button class="show" id="${i}">Mutat</button>
                <button class="kosar" id="${i}">Kosárba</button></div>`;
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
