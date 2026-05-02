const Base_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdowns) {
    for(currCode in countryList) {
        let newOptions = document.createElement("option");
        newOptions.innerText = currCode;
        newOptions.value = currCode;
        if(select.name === "from" && currCode === "USD") {
            newOptions.selected = "selected";
        } else if(select.name === "to" && currCode === "INR") {
            newOptions.selected = "selected";
        }
        select.append(newOptions);
    };
    select.addEventListener("change", (event) => {
        updateFlag(event.target);
    });
};

const updateFlag = (el) => {
    let currCode = el.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = el.parentElement.querySelector("img");
    img.src = newSrc;
};

const updateExchangeRate = async () => {
    let amt = document.querySelector(".amount input");
    let amtValue = amt.value;
    if(amtValue === "" || amtValue < 1) {
        amtValue = 1;
        amt.value = "1";
    };

    const URL = `${Base_URL}/${fromCurr.value.toLowerCase()}.json`;
    let res = await fetch(URL);
    console.log(res);
    let data = await res.json();
    let fromCode = fromCurr.value.toLowerCase();
    let toCode = toCurr.value.toLowerCase();
    let rate = data[fromCode][toCode];
    let finalAmt = amtValue * rate;
    msg.innerText = `${amtValue} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
};

window.addEventListener("load", () => {
    updateExchangeRate();
});

btn.addEventListener("click", (event) => {
    event.preventDefault();
    updateExchangeRate();
});