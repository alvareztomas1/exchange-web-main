import init from "../web.js";
import { getCurrencies } from "../api/api.js";
import { handleConvesorButtonClick } from "../conversor/conversor.js";
import { handleRateListButtonClick } from "../rate-list/rate-list.js";
import { setBaseOptions } from "../ui/ui.js";
import currenciesFixture from "../../cypress/fixtures/currencies.json"

//global.currenciesFixture = currenciesFixture;

jest.mock("../conversor/conversor.js", () => ({
    handleConvesorButtonClick: jest.fn(),
}));

jest.mock("../rate-list/rate-list.js", () => ({
    handleRateListButtonClick: jest.fn(),
}));

jest.mock("../ui/ui.js", () => ({
    setBaseOptions: jest.fn(),
}));

jest.mock("../api/api.js", () => ({
    getCurrencies: jest.fn(() => Promise.resolve()),
}));



it("tests obtaining base options", async () => {

    await init();
    
    expect(handleConvesorButtonClick).toHaveBeenCalledTimes(1);
    expect(handleRateListButtonClick).toHaveBeenCalledTimes(1);
    expect(setBaseOptions).toHaveBeenCalledTimes(1);
    expect(getCurrencies).toHaveBeenCalledTimes(1);
   // expect(setBaseOptions).toHaveBeenCalledWith(currenciesFixture);

});
