
export async function getBaseResults(date = "latest", base = "USD"){
    if(date === ""){
        date = "latest";
    }

    const URL = `https://api.frankfurter.app/${date}?from=${base}`

    try{
        const response = await fetch(URL);
        return await response.json();
    }catch(e){
        console.error("FAILED", e);
    };
};

export async function getCurrencies(){
    const URL = `https://api.frankfurter.app/currencies`;

    try{
        const response = await fetch(URL);
        return await response.json();
    }catch(e){
        console.error("FAILED", e);
    }
};