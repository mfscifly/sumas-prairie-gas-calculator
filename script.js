//add an event listener for the button press
document.querySelector("#convert").addEventListener("click", simpleConvert);

//when the button is pressed, take the value from the corresponding button, perform the conversion, and input the value in the opposite field



function simpleConvert(){
    let priceInCanada = document.querySelector("#cad").value;
    document.querySelector("#usd").value = conversionInCanada(priceInCanada);
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