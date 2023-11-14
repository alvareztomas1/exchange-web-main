/// <reference types="Jest" />
import { getBaseResults, getCurrencies } from "../api.js";


global.fetch = jest.fn();

global.fetch.mockImplementationOnce(() => new Promise((resolve) => {
    const jsonPromise = new Promise((r) => {
        r({});
    });
    resolve({ json: () => jsonPromise });
}));




describe("getBaseResults", () => {

    it("Tests obtaining baseResults from API", ()=>{

        const date = "";
        const base = "AUD";
    
        getBaseResults(date, base);
    
        expect(global.fetch).toHaveBeenCalled();
    
        expect(global.fetch).toHaveBeenCalledWith(`https://api.frankfurter.app/latest?from=${base}`);
    });

    
});

describe("getCurrencies", () => {
    it("tests obtaining currencies names with getCurrencies", ()=> {
        

        const URL = `https://api.frankfurter.app/currencies`;

        getCurrencies();

        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith(URL);
    });
    it("tests not obtaining data from api", () => {
        getCurrencies("asd", "asd").catch(e => expect(e).toMatch("FAILED"));
    });
    
});
