/// <reference types="Cypress" />
beforeEach(() => {
  cy.visit("http://192.168.0.124:8080");
  cy.clearCookies(); 

});

describe('verifies home web works properly', () => {
  
  it('verifies home web', () => {
    cy.get("#title").should("have.text", "Exchange Rate Web");
    cy.get("#home-buttons").should("be.visible");

    cy.get("#rate-button").should("have.class", "button");
    cy.get("#conversor-button").should("have.class", "button");

    cy.get("#rate-button").should("have.text", "Rate List");
    cy.get("#conversor-button").should("have.text", "Conversor");



  });

  
});

describe("verifies rate list functioning", () => {
  beforeEach(()=>{
    cy.get("#rate-button").wait(500).click();

  })
  
  it("verifies that the rate list is showing the correct currencies and elements", () => {
    cy.intercept("GET", `https://api.frankfurter.app/currencies`, {
      fixture: "currencies.json"
    }).as("getCurrenciesNames");




    cy.get("#home-buttons").should("not.be.visible");
    cy.get("#currencies").should("have.class", "select");
    cy.get("#rate-date").should("have.class", "select");
    cy.get("#confirm-rate-button").should("have.class", "button confirm");
    cy.get("#back-rate-button").should("have.class", "button back");
    cy.get("#rate-list-results").should("not.be.visible");
    cy.get("#text-error").should("not.be.visible");


    

    cy.fixture("currencies.json").then((currencies) => {
      cy.get("#currencies option").should("have.length", Object.keys(currencies).length);

      for(let i = 0; i< Object.keys(currencies).length; i++){
        cy.get("#currencies option").eq(i).should("have.text", `${Object.keys(currencies)[i]} - ${Object.values(currencies)[i]}`);
      };

    });

    
  });

  it("verifies that the rate list is working properly on good scenario", () => {

    cy.intercept("GET", "https://api.frankfurter.app/latest?from=USD",{
      fixture: "latest-USD.json"
    }).as("getUsdRates");


    cy.get("#currencies").select("USD - United States Dollar");
    cy.get("#confirm-rate-button").click();
    cy.get("#rate-list-results").should("be.visible");

    cy.fixture("latest-USD.json").then((data) => {
      cy.get("#results-title").should("have.text", `${data.base} base rate list at ${data.date}:`);

      const currencyRateValues = Object.values(data.rates);
      const currencies = Object.keys(data.rates);
      
      for(let i = 0; i < Object.keys(data.rates).length; i++){
        
        cy.get("#rate-list-results ul").eq(i).should("have.text", `${currencies[i]}: ${Number(currencyRateValues[i].toFixed(3))}`)
      };

    });

    cy.get("#back-rate-button").click();
    cy.get("#rate-list-results").should("not.be.visible");
    cy.get("#home-buttons").should("be.visible");


  });

  it("verifies that the rate list is working properly on a bad scenario", () => {

    cy.get("#rate-date").type("1998-10-01");
    cy.get("#confirm-rate-button").click();

    cy.get("#rate-date").should("have.class", "select error");
    cy.get("#text-error").should("be.visible");
    cy.get("#text-error").should("have.text", `¡ERROR! Date must be since January 1, 1999 to actual date`)

    cy.get("#rate-date").clear().type("2000-10-01");
    cy.get("#confirm-rate-button").click();

    cy.get("#rate-date").should("have.class", "select");
    cy.get("#text-error").should("not.be.visible");
    cy.get("#rate-list-results").should("be.visible");

  });
});

describe("verifies conversor functioning", () => {
  beforeEach(()=>{
    cy.get("#conversor-button").wait(500).click();

  })
  
  it("verifies conversor is showing right currencies and elements", () =>{

    
    cy.get("#home-buttons").should("not.be.visible");
    cy.get("#confirm-conversor-button").should("have.class", "button confirm");
    cy.get("#back-conversor-button").should("have.class", "button back");
    cy.get("#clear-button").should("have.class", "button clear");

    cy.get("#conversor-result").should("not.be.visible");


    cy.intercept("GET", `https://api.frankfurter.app/currencies`, {
      fixture: "currencies.json"
    }).as("getCurrenciesNames");


    cy.fixture("currencies.json").then((currencies) => {
      const currenciesList = Object.keys(currencies);
      const completeCurrenciesNames = Object.values(currencies);
      cy.get("#currencies option").should("have.length", currenciesList.length);

      for(let i = 0; i< Object.keys(currencies).length; i++){
        cy.get("#conversor select option").eq(i).should("have.text", `${currenciesList[i]} - ${completeCurrenciesNames[i]}`);
      };

    });

    cy.get("#from").should("have.text", "");

  });

  it("verifies that conversorion is working properly on good scenario", () => {

    cy.intercept("GET", "https://api.frankfurter.app/latest?from=USD",{
      fixture: "latest-USD.json"
    }).as("getUsdRates");

    const FROM_VALUE = 5;


    cy.get("#conversor select").eq(0).select("USD - United States Dollar");
    cy.get("#conversor select").eq(1).select("USD - United States Dollar");

    cy.get("#from").type(FROM_VALUE);

    cy.get("#confirm-conversor-button").click();

    cy.fixture("latest-USD.json").then((data) => {
      
      cy.get("#conversion").should("be.visible");
      console.log(data);
      cy.get("#conversion").should("have.text", `${FROM_VALUE } ${data.base}  = ${Number(FROM_VALUE  * data.amount.toFixed(3))} ${data.base} `)
    });

    cy.get("#from").clear().type(FROM_VALUE);
    cy.get("#conversor select").eq(1).select("AUD - Australian Dollar");
    cy.get("#confirm-conversor-button").click();

    cy.fixture("latest-USD.json").then((data) => {
      const TO_SELECTED_RATE_VALUE = Object.values(data.rates)[0];

      cy.get("#conversion").should("be.visible");
      
      cy.get("#conversion").should("have.text", `${FROM_VALUE } ${data.base}  = ${Number((FROM_VALUE  * TO_SELECTED_RATE_VALUE).toFixed(3))} AUD `)
    });

  });

  it("verifies that conversorion is working properly on bad scenario", () => {

    cy.get("#from").type(-3);
    cy.get("#confirm-conversor-button").click();

    cy.get("#from").should("have.class", "select input error");
    cy.get("#conversion").should("not.be.visible");
    cy.get("#conversor-error").should("be.visible");
    cy.get("#conversor-error").should("have.text", "¡ERROR! Value must be higher than 0");


    cy.get("#from").clear().type(5);
    cy.get("#confirm-conversor-button").click();
    cy.get("#conversion").should("be.visible");
    cy.get("#from").should("have.class", "select input");
    cy.get("#conversor-error").should("not.be.visible");



  });

  it("verifies clear button is working properly", () => {

    cy.get("#from").type(5);
    cy.get("#confirm-conversor-button").click();


    cy.get("#clear-button").click();
    cy.get("#from").should("have.text", "");
    cy.get("#conversor-result").should("not.be.visible");
  });
});