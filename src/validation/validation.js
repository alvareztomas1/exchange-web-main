import { showDateError, removeDateError, hideElement, showElement, showInputError, removeInputError } from "../ui/ui.js";

export function validateDate(date){
    const actualYear = new Date().getFullYear();
    date = date.split("-");
    

    
    if(date[0] <= actualYear && date[0] >= 1999 || date.length === 1){
        removeDateError();
        hideElement("#text-error")


        return true;
    }else{
        showDateError();
        showElement("#text-error");
        return false;   
    }
};

export function validateConversorInput(value){
    if(value > 0){
        removeInputError()
        hideElement("#conversor-error");
        return true;
    }else{
        showInputError();
        showElement("#conversor-error");

        return false;
    };
};

