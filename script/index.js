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

let form = document.getElementById("form");
let success = document.getElementById("success");

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
    console.log(typeof(evt))
    let elem = evt.currentTarget;
    if (elem.value === "") {
        revertToDefault(elem);
    } else if (elem === cardDateMonthInput || elem === cardDateYearInput) {
        cardDatePreview.innerText = `${cardDateMonthInput.value}/${cardDateYearInput.value}`;
    } else {
        previewElements[reactiveElements.indexOf(elem)].innerText = elem.value.trim().toUpperCase();
    }
}


function validateForm(evt) {
    let elem = evt.target;
    let invalidErrorElem = document.createElement("p");
    let numberRegexp = /\D/gi;
    let letterRegexp = /[^a-z]/i;
    let errorFlag = false;
    invalidErrorElem.className = "invalidity-message";

    if (elem.parentElement.querySelector(".invalidity-message") && !(elem === cardDateMonthInput || elem === cardDateYearInput)) {
        elem.parentElement.querySelector(".invalidity-message").remove();
    } else if (elem.parentElement.parentElement.querySelector(".invalidity-message") && (elem === cardDateMonthInput || elem === cardDateYearInput)) {
        elem.parentElement.parentElement.querySelector(".invalidity-message").remove();
    }

    console.log(letterRegexp.test(elem.value));
    if (elem.value === "") {
        invalidErrorElem.innerText = "Can't be blank";
        errorFlag = true;
    } else if (elem === cardNameInput && letterRegexp.test(elem.value)) {
        invalidErrorElem.innerText = "Wrong format, letters only";
        errorFlag = true;
        console.log("Made it here !!")
    } else if (elem === cardNumInput) {
        if (numberRegexp.test(elem.value.trim().split(" ").join(""))) {
            invalidErrorElem.innerText = "Wrong format, numbers only";
            errorFlag = true;
        } else if (elem.value.trim().split(" ").length !== 4) {
            invalidErrorElem.innerText = "Wrong spacing between digits";
            errorFlag = true;
        }
    } else if ((elem === cardCvcInput || elem === cardDateMonthInput || elem === cardDateYearInput) && numberRegexp.test(elem.value)) {
        invalidErrorElem.innerText = "Wrong format, numbers only";
        errorFlag = true;
    }
    if (errorFlag) {
        elem.className = "invalid";
        if (elem === cardDateMonthInput || elem === cardDateYearInput) {
            elem.parentElement.parentElement.appendChild(invalidErrorElem);
        } else {
            elem.parentElement.appendChild(invalidErrorElem);
        }
        invalidErrorElem.style.display = "block";
    } else {
        invalidErrorElem.style.display = "none";
        elem.className = "";
    }
}

for (let element of reactiveElements) {
    element.addEventListener("input", updateCardPreview);
    element.addEventListener("focusout", validateForm);
}

function refreshValidation() {
    for (let element of reactiveElements) {
       element.dispatchEvent(new Event("input"));
    }
}

window.onload = refreshValidation();

let globalErrorFlag;

function validateFormGlobal() {
    for (let element of reactiveElements) {
        element.dispatchEvent(new Event("focusout"));
    }
    if (document.querySelector(".invalidity-message")) {
        globalErrorFlag = true;
    } else {
        globalErrorFlag = false;
    }
    return (!globalErrorFlag);
}

form.onclick = (e) => {
    if (validateFormGlobal()) {
        form.className = "hidden"
        success.className ="success";
        e.preventDefault();
    } else {
        form.className = ""
        success.className ="hidden success";
    }
};