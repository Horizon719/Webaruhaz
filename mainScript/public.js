import { 
    OBJECTS,
} from "../datas/public.js";

$(function(){
    const ARTICLE = $("article");
    ARTICLE.eq(0).html(``);
    let txt = feltolt(OBJECTS);
    ARTICLE.eq(0).html(txt);
})

function feltolt(OBJECTS){
    let text = `<div class="container mt-3 row">`;
    for (let i = 0; i < OBJECTS.length; i++) {
        text += `<div class="card col-sm-3">`;
        text += `<div class="card-header">${OBJECTS[i].nev}<br>${OBJECTS[i].kategoria}</div>`;
        text += `<div class="card-body"><img src="${OBJECTS[i].eleres}" alt="${OBJECTS[i].kategoria}"></div> `;
        text += `<div class="card-footer">${OBJECTS[i].ar} HUF</div>`;
        text += `</div>`;
    }
    text += "</div>";
    return text;
}