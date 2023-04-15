import { 
    OBJECTS,
    KOSARELEMEI,
} from "./datas.js";

$(function(){
    
    kever(OBJECTS);
    const ARTICLE = $("article");
    ARTICLE.eq(0).html(``);
    let txt = megjelenit(OBJECTS, "fooldal");
    ARTICLE.eq(0).html(txt);

    mutat(ARTICLE);
    vissza(ARTICLE);
    kosarba();
    kosar(ARTICLE);
})

function megjelenit(mit, hol){
    let megj = `<div class="container mt-3 row">`;
    let vegosszeg = 0;
    for (let i = 0; i < mit.length; i++) {
        megj += `<div class="card col-lg-3 col-md-4 col-sm-6 p-0">`;
        megj += `<div class="card-header"><h4>${mit[i].nev}</h4><br>-${mit[i].kategoria}`;
        if (hol == "kosar"){
            megj +=`<br>${mit[i].db}db`;
        }
        megj += `</div><div class="card-body"><img src="${mit[i].eleres}" alt="${mit[i].kategoria}"></div> `;
        if (hol == "fooldal"){
            megj += `<div class="card-footer">${OBJECTS[i].ar} HUF<br><button class="show" id="${i}">Mutat</button>
                     <button class="kosar" id="${i}">Kosárba</button></div>`;
        } else if (hol == "kosar"){
            megj += `<div class="card-footer">${mit[i].ar} HUF&nbsp&nbsp&nbsp&nbsp
                    <button class="torles" id="cartRemove-${i}">X</button></div>`;
        }
        
        megj += `</div>`;
        if (hol == "kosar"){
            let szam = parseInt(`${mit[i].ar}`)*parseInt(`${mit[i].db}`);
            vegosszeg += szam;
        }
    }
    megj += "</div>";
    if (hol == "kosar"){
        megj += `<div id="vegosszeg"><h3>Végösszeg: </h3>${vegosszeg} HUF</div>`;
    }
    return megj;
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

function kosar(ARTICLE){
    const KOSARSECTION = $("#kosar");
    KOSARSECTION.eq(0).html(`<button id="kosargomb">KOSÁR</button>`);
    const KOSAR = $("#kosargomb");
    KOSAR.on("click", function () {
        ARTICLE.eq(0).html(megjelenit(KOSARELEMEI, "kosar"));
        vissza(ARTICLE);
        torles(ARTICLE);
    });
}

function vissza(ARTICLE){
    const KOSARSECTION = $("#kosar");
    KOSARSECTION.eq(0).html(`<button class="vissza">VISSZA</button>`);
    const VISSZA = $(".vissza");
    VISSZA.on("click", function () {
        ARTICLE.eq(0).html(megjelenit(OBJECTS, "fooldal"));
        kosar(ARTICLE);
        kosarba();
        mutat(ARTICLE);
    });
}

function kosarba(){
    $(".kosar").on("click", function (event){
        let melyik = parseInt($(event.target).attr("id"));
        var index = KOSARELEMEI.findIndex(item => item.nev === OBJECTS[melyik].nev);
        if (index === -1) {
        KOSARELEMEI.push({
                nev: `${OBJECTS[melyik].nev}`, 
                kategoria: `${OBJECTS[melyik].kategoria}`,
                ar: `${OBJECTS[melyik].ar}`,
                eleres: `${OBJECTS[melyik].eleres}`,
                db: `1`,
            });
        } else {
            KOSARELEMEI[index].db++;
        }
    });
}

function mutat(ARTICLE){
    let currentIndex;
    $(".show").on("click", function (event){
        currentIndex = parseInt($(event.target).attr("id"));
        ARTICLE.eq(0).html(`<div id="nagykep"><button id="elozo">Előző termék</button>
                            <div class="nagykep"><img src="${OBJECTS[currentIndex].eleres}" alt=""></div>
                            <button id="kovetkezo">Következő termék</button></div><br>
                            <button class="vissza">VISSZA</button>`);
        
        
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

        $(".vissza").on("click", function () {
            ARTICLE.eq(0).html(megjelenit(OBJECTS, "fooldal"));
            kosar(ARTICLE);
            kosarba();
            mutat(ARTICLE);
          });
    });
}

function torles(ARTICLE){
    $(".torles").on("click", function (event) {
        $(".torles").off("click");
        let id = parseInt(event.target.id.split("-")[1]);
        if (KOSARELEMEI[id].db > 1){
            KOSARELEMEI[id].db--;
        } else{
            KOSARELEMEI.splice(id, 1);
        }
        ARTICLE.eq(0).html(megjelenit(KOSARELEMEI, "kosar"));
        torles(ARTICLE);
    });
}
