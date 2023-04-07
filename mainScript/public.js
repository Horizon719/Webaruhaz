import { 
    OBJECTS,
} from "../datas/public.js";

$(function(){
    kever(OBJECTS);
    const ARTICLE = $("article");
    ARTICLE.eq(0).html(``);
    let txt = feltolt(OBJECTS);
    ARTICLE.eq(0).html(txt);
})

function feltolt(OBJECTS){
    let text = `<div class="container mt-3 row">`;
    for (let i = 0; i < OBJECTS.length; i++) {
        text += `<div class="card col-sm-3">`;
        text += `<div class="card-header"><h4>${OBJECTS[i].nev}</h4><br>-${OBJECTS[i].kategoria}</div>`;
        text += `<div class="card-body"><img src="${OBJECTS[i].eleres}" alt="${OBJECTS[i].kategoria}"></div> `;
        text += `<div class="card-footer">${OBJECTS[i].ar} HUF<br><button>Mutat</button><button>Kosárba</button></div>`;
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