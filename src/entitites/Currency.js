
export default class Currency{

    constructor(data){
        this.base = data.base;
        this.amount = data.amount;
        this.date = data.date;
        this.rates = data.rates;

    };

    calculateConversion (selectedFrom, selectedTo, fromValue){
    
        let result;
        
        console.log(this);
        if(selectedFrom === selectedTo){
            result = fromValue * this.amount;
        }else{
            result = fromValue * this.rates[selectedTo.replace(" ", "")]
        }
        
        return result;
    };
};