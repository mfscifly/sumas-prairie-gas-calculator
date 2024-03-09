// api below

let rate = 0;

fetch('https://v6.exchangerate-api.com/v6/438c32fe52e2d246e758724b/latest/USD')
    .then (res=>res.json())
    .then (data=> {
        console.log(data);
        rate = data.conversion_rates.CAD;
        document.querySelector("#ratetoday").innerText=`Today's USD-CAD exchange rate: ${rate}`;
    })
    .catch (err=>{
        console.log(`error ${err}`);
    });

document.querySelector("#convert").addEventListener("click", whichConversion);

function whichConversion(){
    if (document.querySelector("#cad").value && document.querySelector("#usd").value) {
        alert ("too much to convert");
    } else if (document.querySelector("#cad").value) {
        convertFromCad();
    } else if (document.querySelector("#usd").value) {
        convertFromUsd();
    } else {
        alert ("nothing to convert");
    }
}

function convertFromCad(){
    let priceInCanada = document.querySelector("#cad").value;
    document.querySelector("#usd").value = conversionInCanada(priceInCanada);
}

function convertFromUsd(){
    let priceInUSA = document.querySelector("#usd").value;
    document.querySelector("#cad").value = conversionInUsa(priceInUSA);
}

// conversion maths below, from Canada

function conversionInCanada(costPerL){
    return "$"+Math.round((convertCadToUsd(costPerL)*convertLitresToGallons(1))*100)/100+" USD/gallon";
}

function convertCadToUsd(cad) {
    return cad*(1/rate);
}

function convertLitresToGallons(litres){
    return litres*3.785;
}

// conversion maths below, from USA

function convertUsdToCad(usd){
    return usd*rate;
}

function convertGallonsToLitres(gal){
    return gal/3.785;
}

function conversionInUsa(costPerGal){
    return "$"+Math.round((convertUsdToCad(costPerGal)*convertGallonsToLitres(1))*100)/100+" cad/litre";
}

// SAVINGS CALCULATOR - below
// convert USA price to CDN, then subtract the prevailing CDN price, then multiply by size of gas tank. then round.

document.querySelector("#calculate").addEventListener("click", calcSavings);

function calcSavings(){
    document.querySelector("#savings").innerText = `$${Math.floor((document.querySelector("#cad-cost").value - (convertUsdToCad(document.querySelector("#usd-cost").value)*convertGallonsToLitres(1))) * document.querySelector("#tank-size").value*100)/100} CAD`;
}

//to add - if calcSavings result is negative, display "trip not worth it, it will cost X more in the USA"