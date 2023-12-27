
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
    return cad*.74;
}

function convertLitresToGallons(litres){
    return litres*3.785;
}

// conversion maths below, from USA

function convertUsdToCad(usd){
    return usd*1.35;
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