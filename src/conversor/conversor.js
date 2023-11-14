import { getBaseResults } from "../api/api.js";
import  Currency  from "../entitites/Currency.js";
import { hideElement, showElement, uiReset } from "../ui/ui.js";
import { validateConversorInput } from "../validation/validation.js";

export function handleConvesorButtonClick(){
    const $conversorButton = document.querySelector("#conversor-button");

    $conversorButton.onclick = ()=>{
        hideElement("#home-buttons");
        showElement("#conversor");
        handleConversorSelection();
    };
};

function handleConversorSelection(){
    const $confirmConversorButton = document.querySelector("#confirm-conversor-button");
    const $backConversorButton = document.querySelector("#back-conversor-button");
    const $clearButton = document.querySelector("#clear-button");
   
    $confirmConversorButton.onclick = async () => {
        handleConfirmConversion();
    };
    $clearButton.onclick = () => {
        clearConversorHud();
    };
    $backConversorButton.onclick = () => {
        uiReset();
    };
};
async function handleConfirmConversion(){
    const $selectedFrom = document.querySelectorAll("#selected-from option")[document.querySelector("#selected-from").selectedIndex].textContent.split("-")[0];
    const $selectedTo = document.querySelectorAll("#selected-to option")[document.querySelector("#selected-to").selectedIndex].textContent.split("-")[0];
    const $fromValue = Number(document.querySelector("#from").value);    

    if(validateConversorInput($fromValue)){
        const baseResult = await getBaseResults("latest", $selectedFrom );
        const currency = new Currency(baseResult);
        const result = currency.calculateConversion($selectedFrom, $selectedTo, $fromValue);

        setConversion(result, $selectedFrom, $selectedTo, $fromValue);
        showElement("#conversor-result");
    }else{
        hideElement("#conversor-result");

    };
};
function setConversion(result, selectedFrom, selectedTo, fromValue){
    document.querySelector("#conversion").textContent = `${fromValue} ${selectedFrom} = ${Number(result.toFixed(3))} ${selectedTo}`  
};
export function clearConversorHud(){
    document.querySelector("#from").value = "";
    document.querySelectorAll("#conversor select")[0].selectedIndex = 0;
    document.querySelectorAll("#conversor select")[1].selectedIndex = 0;
    document.querySelector("#from").classList.remove("error");
    hideElement("#conversor-result");


};