import {  uiReset, hideElement, showElement } from "../ui/ui.js";
import { getBaseResults } from "../api/api.js";
import { validateDate } from "../validation/validation.js";
import  Currency  from "../entitites/Currency.js";

export function handleRateListButtonClick(){
    const $rateButton = document.querySelector("#rate-button");
    

    $rateButton.onclick = () => {
        hideElement("#home-buttons");
        showElement("#rate-list");
        handleRateListSelection();

    };
    
};
function handleRateListSelection(){
    const $confirmButton = document.querySelector("#confirm-rate-button");
    const $backRateButton = document.querySelector("#back-rate-button");


    $confirmButton.onclick = async () => {
        const date = document.querySelector("#rate-date").value;
        const base = document.querySelectorAll("#currencies option")[document.querySelector("#currencies").selectedIndex].textContent.split("-")[0];
        
        
        if(validateDate(date)){
            {const data = await getBaseResults(date, base);
            const currency = new Currency(data);
            setRateList(currency);}
            
            showElement("#rate-list-results");
        }else{
            hideElement("#rate-list-results");
        };
        
    };
    
    $backRateButton.onclick = () => {
        uiReset();
    };
    
    
};
function setRateList(baseCurrency){

    clearRateList();

    const $rateListResults = document.querySelector("#rate-list-results");
    const title = document.createElement("h2");
    title.id = "results-title";
    
    title.textContent = `${baseCurrency.base} base rate list at ${baseCurrency.date}:`

    $rateListResults.appendChild(title);

    console.log(Object.keys(baseCurrency.rates));

    Object.keys(baseCurrency.rates).forEach((currency) =>{
        console.log(currency.rates);
        const result = document.createElement("ul");
        result.textContent = `${currency}: ${Number(baseCurrency.rates[currency].toFixed(3))}`;
        $rateListResults.appendChild(result);
    })

};
function clearRateList(){
    const $rateListResults = document.querySelector("#rate-list-results");


    
    if($rateListResults.children.length){
        
        while($rateListResults.children.length){
            $rateListResults.removeChild($rateListResults.lastChild);
        }
    };
    
};
export function clearRateListHud(){
    document.querySelector("#currencies").selectedIndex = 0;
    document.querySelector("#rate-date").classList.remove("error");
    document.querySelector("#rate-date").value = "";

    document.querySelector("#rate-list-results").classList.add("hidden");
    document.querySelector("#text-error").classList.add("hidden");
};


