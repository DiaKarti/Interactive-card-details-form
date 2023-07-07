let cardNameInput = document.getElementById("cardName");
let cardNumInput = document.getElementById("cardNum");
let cardCvcInput = document.getElementById("cvc");
let cardDateMonthInput = document.getElementById("dateMonth");
let cardDateYearInput = document.getElementById("dateYear");

let cardNamePreview = document.getElementById("cardNamePreview");
let cardNumPreview = document.getElementById("cardNumPreview");
let cardCvcPreview = document.getElementById("cvcPreview");
let cardDatePreview = document.getElementById("cardDatePreview");

let reactiveElements = [cardNameInput, cardNumInput, cardCvcInput, cardDateMonthInput, cardDateYearInput]
let previewElements = [cardNamePreview, cardNumPreview, cardCvcPreview, cardDatePreview];

function revertToDefault(element) {
    switch (reactiveElements.indexOf(element)) {
        case 0:
            previewElements[0].innerText = "JANE APPLESEED";
            break;
        case 1:
            previewElements[1].innerText = "0000 0000 0000 0000";
            break;
        case 2:
            previewElements[2].innerText = "000";
            break;
        case 3:
        case 4:
            previewElements[3].innerText = "00/00";
            break;
    }
}

function updateCardPreview(evt) {
    let elem = evt.currentTarget;
    console.log(elem.value);
    if (elem.value === "") {
        revertToDefault(elem);
    } else if (elem === cardDateMonthInput || elem === cardDateYearInput) {
        cardDatePreview.innerText = `${cardDateMonthInput.value}/${cardDateYearInput.value}`;
    } else if (elem === cardNameInput) {
        previewElements[reactiveElements.indexOf(elem)].innerText = elem.value.toUpperCase();
    } else {
        previewElements[reactiveElements.indexOf(elem)].innerText = elem.value;
    }
}

for (let element of reactiveElements) {
    element.addEventListener("input", updateCardPreview);
}
