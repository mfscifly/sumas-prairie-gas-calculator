// api below

let rate = 0;

//exchange rate API below

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


if (localStorage.getItem("tankSize")){
    document.querySelector("#tank-size").value = localStorage.getItem("tankSize");
}

document.querySelector("#convert").addEventListener("click", whichConversion);

function whichConversion(){
    if (document.querySelector("#cad").value && document.querySelector("#usd").value) {
        alert ("Please just enter one field");
    } else if (document.querySelector("#cad").value) {
        convertFromCad();
    } else if (document.querySelector("#usd").value) {
        convertFromUsd();
    } else {
        alert ("Please enter at least one field");
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
    return Math.round((convertCadToUsd(costPerL)*convertLitresToGallons(1))*100)/100;
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
    return Math.round((convertUsdToCad(costPerGal)*convertGallonsToLitres(1))*100)/100;
}

// SAVINGS CALCULATOR - below

document.querySelector("#calculate").addEventListener("click", calcSavings);

function calcSavings(){
    localStorage.setItem("tankSize",document.querySelector("#tank-size").value);
    let cadPrice = document.querySelector("#cad-cost").value;
    let usdPrice = document.querySelector("#usd-cost").value;
    let tankSize = document.querySelector("#tank-size").value;
    let savings = Math.floor((cadPrice-(convertUsdToCad(usdPrice)*convertGallonsToLitres(1)))*tankSize*100)/100;
    if (savings<=0){
        return document.querySelector("h3").innerText = `Trip not worth it. It will cost $${savings*-1} more in the USA.`
    }
    document.querySelector("h3").innerText = `Estimated Savings: $${savings}`
}
