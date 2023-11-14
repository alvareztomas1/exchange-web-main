import { getCurrencies } from "./api/api.js";
import { handleRateListButtonClick } from "./rate-list/rate-list.js";
import { handleConvesorButtonClick } from "./conversor/conversor.js";
import { setBaseOptions } from "./ui/ui.js";
import Currencies from "./entitites/Currencies.js";

export default async function init(){

    {const currenciesData = await getCurrencies();
    const currencies = new Currencies(currenciesData);
    setBaseOptions(currencies);}
    
    handleRateListButtonClick();
    handleConvesorButtonClick();

};
