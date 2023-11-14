export default class Currencies{

    constructor(data){
        this.shortened = Object.keys(data);
        this.name =  Object.values(data);
    };


}