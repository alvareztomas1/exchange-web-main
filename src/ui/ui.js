import { clearConversorHud } from "../conversor/conversor.js";
import { clearRateListHud } from "../rate-list/rate-list.js";
import { getCurrencies } from "../api/api.js";

export async function setBaseOptions(currencies){
    const $selectors = document.querySelectorAll("select"); 

    currencies.shortened.forEach((currency, index) => {
        const $currency = document.createElement("option");
        $currency.textContent = `${currencies.shortened[index]} - ${currencies.name[index]}`;

        $selectors[0].appendChild($currency);
    });
    
    $selectors[1].innerHTML = $selectors[0].innerHTML;
    $selectors[2].innerHTML = $selectors[0].innerHTML;

};
export function uiReset(){
    
    hideElement("#rate-list");
    hideElement("#conversor");
    clearConversorHud();
    clearRateListHud();
    showElement("#home-buttons");
   
};

export function showDateError(){
    document.querySelector("#rate-date").classList.add("error");
};
export function showInputError(){
    document.querySelector("#from").classList.add("error");

}

export function removeDateError(){
    document.querySelector("#rate-date").classList.remove("error");;
};
export function removeInputError(){
    document.querySelector("#from").classList.remove("error");;
};

export function hideElement(elementName){
    document.querySelector(`${elementName}`).classList.add("hidden");
}
export function showElement(elementName){
    document.querySelector(`${elementName}`).classList.remove("hidden");
}
