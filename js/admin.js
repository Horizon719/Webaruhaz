import {
    OBJECTS
} from "./datas.js";

$(function(){
    main();
})

let priceDiff;
let notNeededKeys = ["eleres"];
let currentOrder = "ASC";
let orderKey;

function main() {
    rangeLisener();
    listItems();
    addItemButtonLisener();
}


function rangeLisener() {
    const RANGE_DOTS = $(".priceSelectorRange");
    const MIN_NUM_INPUT = $("#priceMinNum");
    const MAX_NUM_INPUT = $("#priceMaxNum");
    
    changeMaxForPriceRange(RANGE_DOTS);

    priceDiff = getPriceAverage() / 2;

    RANGE_DOTS.off("input");

    RANGE_DOTS.on("input", (event) => {        
        if (event.target == RANGE_DOTS[0] && parseInt(RANGE_DOTS[1].value) - priceDiff < parseInt(event.target.value)) {
            event.target.value = parseInt(RANGE_DOTS[1].value) - priceDiff;
            return;
        }else if (event.target == RANGE_DOTS[1] && parseInt(RANGE_DOTS[0].value) + priceDiff > parseInt(event.target.value)) {
            event.target.value = parseInt(RANGE_DOTS[0].value) + priceDiff;
            return;
        }
        let min = RANGE_DOTS[0].value;
        let max = RANGE_DOTS[1].value;

        updateSliderValues(min, max);
        updateInputNumValues(min, max);
    });

    MIN_NUM_INPUT.on("input", (event) => {
        let min = event.target.value;
        let max = MAX_NUM_INPUT.attr("value");

        //console.log("asd",min, event.target.max);
        if (min > max) {
            event.target.value = min;
            return;
        }else if (min < 0) {
            event.target.value = 0;
            return;
        }

        updateSliderValues(min, max);
    });

    MAX_NUM_INPUT.on("input", (event) => {
        let min = MIN_NUM_INPUT.attr("value");
        let max = event.target.value;

        //console.log("asd",max, event.target.max);
        if (min > max) {
            event.target.value = min;
            return;
        }else if (max < event.target.max) {
            event.target.value = max;
            return;
        }
        updateSliderValues(min, max);
    });

}

function updateSliderValues(min, max) {
    const RANGE_MIN = $("#priceMin");
    const RANGE_MAX = $("#priceMax");
    const PROGRESS_BAR = $("#sliderFill");

    //console.log(min, max);
    RANGE_MIN.attr("value", min);
    RANGE_MAX.attr("value", max);

    PROGRESS_BAR.css("left", (min / RANGE_MIN.attr("max")) * 100 + "%");
    PROGRESS_BAR.css("right", 100 - (max / RANGE_MAX.attr("max")) * 100 + "%");
}

function updateInputNumValues(min, max) {
    const RANGE_MIN = $("#priceMinNum");
    const RANGE_MAX = $("#priceMaxNum");

    RANGE_MIN.attr("value", min);
    RANGE_MAX.attr("value", max);
}

function changeMaxForPriceRange(RANGE_DOTS) {
    const MAX_PRICE = getMaxPrice();
    const PROGRESS_BAR = $("#sliderFill");

    const MIN_NUM_INPUT = $("#priceMinNum");
    const MAX_NUM_INPUT = $("#priceMaxNum");
    
    RANGE_DOTS[0].max = MAX_PRICE;
    RANGE_DOTS[0].value = 0;
    MIN_NUM_INPUT.attr("max", MAX_PRICE);
    MIN_NUM_INPUT.attr("value", 0);
    
    RANGE_DOTS[1].max = MAX_PRICE;
    RANGE_DOTS[1].value = MAX_PRICE;
    MAX_NUM_INPUT.attr("max", MAX_PRICE);
    MAX_NUM_INPUT.attr("value", MAX_PRICE);

    PROGRESS_BAR.css("left", 0);
    PROGRESS_BAR.css("right", 0);

}
function listItems() {
    const DIV = $("#datas");

    DIV.html(getTableWithItems(OBJECTS));
    deleteButtonLisener();
    sortKeyLisener();

}


function getMaxPrice() {
    return Math.max.apply(Math, OBJECTS.map( termek => {return termek.ar}));
}

function getPriceAverage() {
    let sum = 0;

    $.each(OBJECTS, function()  {
        sum += this.ar;
    });
    return parseInt(sum / OBJECTS.length);
}

function getTableWithItems(products) {
    let code = "<table><tr>";
    let headers = getHeaderTitles(products);
    let i = 0;
    
    orderByKey(products);

    for (const key of headers) {
        code += `<th id="${key}">${key}</th>`;
    }
    code += "<tr>";

    for (const row of products) {
        code += "<tr>"

        for (const key of headers) {
            let data;

            if (!row[key]) {
                data = "-";
            } else {
                data = row[key];
            }

            code += `<td>${data}</td>`;
        }

        code += `<td><button id="Item-${i}">X</button></td></tr>`;
        i++;
    }


    code += "</table>";
    return code;
}

function orderByKey(products) {
    if (!orderKey) {
        return; 
    }
    let orderOperator = currentOrder === "ASC" ? ">" : "<";

    for(let i = 0; i < products.length-1; i++) {

        for(let j = i+1; j < products.length; j++) {
            let condition = typeof(products[i][orderKey]) == "int" ?
                            `${products[i][orderKey]} ${orderOperator} ${products[j][orderKey]}` :
                            `"${products[i][orderKey]}" ${orderOperator} "${products[j][orderKey]}"`;

            if (eval(condition)) {
                let cs = products[i];
                products[i] = products[j];
                products[j] = cs;
            }
        }
    }

    return products;

    /* return ordered.sort((a, b) => {
        let ret;
        if (currentOrder === "ASC") {
            ret = a[orderKey] > b[orderKey];
        } else {
            ret = a[orderKey] < b[orderKey];
        }
        //console.log(ret);
        return ret;
    }); */
}

function getHeaderTitles(products) {
    let headers = [];

    for (let i = 0; i < products.length; i++) {
        let keys = Object.keys(products[i]);
        for (const key of keys) {
            if (!(headers.includes(key)) && !(key.includes(notNeededKeys))) {
                headers.push(key);
            }
        }
    }
    //console.log(headers);
    return headers;
}

function removeItem(list, index) {
    list.splice(index, 1);
    console.log(list);
}

function addItem(list) {
    const ITEM_NAME = $("#newItemName");
    const ITEM_CATEGORY = $("#newItemCategory");
    const ITEM_PRICE = $("#newItemPrice");

    list.push({
        nev: ITEM_NAME.val(), 
        kategoria: ITEM_CATEGORY.val(),
        ar: ITEM_PRICE.val(),
        eleres: null,
    }); 
    console.log(list);
}

function addItemButtonLisener() {
    const BUTTON = $("#newItemEnter");
    
    BUTTON.on("click", (event) => {
        console.log("asd");
        event.preventDefault();
        addItem(OBJECTS);
        listItems();

    });
}

function deleteButtonLisener() {
    const BUTTONS = $("article #datas button");
    
    BUTTONS.on("click", (event) => {
        let id = (event.target.id).split("-")[1];
        removeItem(OBJECTS, id);
        //console.log(OBJECTS);
        listItems();

        BUTTONS.off("click");
    })
}

function sortKeyLisener() {
    const KEYS = $("article #datas th");

    KEYS.on("click", (event) => {
        if (orderKey == event.target.id) {
            if (currentOrder === "ASC") {
                currentOrder = "DESC";
            } else {
                currentOrder = "ASC";
            }
        } else {
            currentOrder = "ASC";
            orderKey = event.target.id;
        }

        KEYS.off("click");
        listItems();
    });
}