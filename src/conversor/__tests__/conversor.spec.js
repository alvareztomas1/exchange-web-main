import { handleConvesorButtonClick } from "../conversor.js";
import exchangeFixture from "../../exchange.fixture.js";
import USD from "../../../cypress/fixtures/latest-USD.json";
import Currency from "../../entitites/Currency.js";

jest.mock("../../entitites/Currency.js");

const MyClassMocked = Currency;

MyClassMocked.mockImplementation(()=>{
    return {
        calculateConversion: jest.fn(() => 5)
    }
});

describe("tests the functioning of the conversor button reciving clicks", () => {
    document.body.innerHTML = exchangeFixture;
    handleConvesorButtonClick();
    document.querySelector("#conversor-button").click();


    it("verifies the elements are being hidden", () => {
        expect(document.querySelector("#home-buttons").className).toContain("hidden");
        expect(document.querySelector("#conversor").className).toEqual("conversor");

    });

    it("verifies conversor is showing correct conversion amount", () => {

        document.querySelector("#selected-from").innerHTML = "<option>USD - United States Dollar</option>";
        document.querySelector("#selected-to").innerHTML = "<option>AUD - Australian Dollar</option>";
        document.querySelector("#from").value = 5;

        document.querySelector("#confirm-conversor-button").click();


    });

    it("verifies conversor is showing error when you type an unacceptable amont", () => {

        document.querySelector("#selected-from").innerHTML = "<option>USD - United States Dollar</option>";
        document.querySelector("#selected-to").innerHTML = "<option>AUD - Australian Dollar</option>";
        document.querySelector("#from").value = -5;

        document.querySelector("#confirm-conversor-button").click();

        expect(document.querySelector("#conversor-result").className).toContain("hidden");
        expect(document.querySelector("#conversor-error").className).toEqual("text-error");

    });

    it("verifies clear button functioning",()=>{
        document.querySelector("#selected-from").innerHTML = "<option>USD - United States Dollar</option>";
        document.querySelector("#selected-to").innerHTML = "<option>AUD - Australian Dollar</option>";
        document.querySelector("#from").value = 5;

        document.querySelector("#clear-button").click();

        expect(document.querySelector("#conversor-result").className).toContain("hidden");
        expect(document.querySelectorAll("#conversor select")[0].selectedIndex).toEqual(0);
        expect(document.querySelectorAll("#conversor select")[1].selectedIndex).toEqual(0);
        expect(document.querySelector("#from").value).toEqual("");




    });
    it("verifies back button functioning", ()=>{
        document.querySelector("#back-conversor-button").click();

        expect(document.querySelector("#conversor-result").className).toContain("hidden");
        expect(document.querySelectorAll("#conversor select")[0].selectedIndex).toEqual(0);
        expect(document.querySelectorAll("#conversor select")[1].selectedIndex).toEqual(0);
        expect(document.querySelector("#conversor-error").className).toEqual("text-error");
        expect(document.querySelector("#home-buttons").className).toEqual("");
        expect(document.querySelector("#from").value).toEqual("");



    });
});

/*  hideElement("#rate-list");
    hideElement("#rate-list-results");
    hideElement("#conversor");
    showElement("#home-buttons");
    hideElement("#conversor-result");*/