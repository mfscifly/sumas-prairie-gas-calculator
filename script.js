// let rate = 1.35;
// document.querySelector("#ratetoday").innerText=`Default USD-CAD exchange rate: ${rate} ******`;

let rate = 0;
// exchange rate API below
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

class Converter{
    constructor(){
    }
    convertUsdToCad(usd){
        return usd*rate;
    }
    convertCadToUsd(cad){
        return cad*(1/rate);
    }
    convertLToG(l){
        return l*3.785;
    }
    convertGToL(g){
        return g/3.785;
    }
    convertCadPerLToUsdPerG(costPerL){
        return Math.round((this.convertCadToUsd(costPerL)*this.convertLToG(1))*100)/100;
    }
    convertUsdPerGToCadPerL(costPerG){
        return Math.round((this.convertUsdToCad(costPerG)*this.convertGToL(1))*100)/100;
    }
    //convert and insert - canadian to american
    convertFromCad(){
        let priceInCanada = document.querySelector("#cad").value;
        document.querySelector("#usd").value = this.convertCadPerLToUsdPerG(priceInCanada);
    }
    //convert and insert - american to canadian
    convertFromUsd(){
        let priceInUSA = document.querySelector("#usd").value;
        document.querySelector("#cad").value = this.convertUsdPerGToCadPerL(priceInUSA);
    }
    whichConversion(){
        if (document.querySelector("#cad").value && document.querySelector("#usd").value) {
            alert ("Please enter just one field");
        } else if (document.querySelector("#cad").value) {
            priceConverter.convertFromCad();
        } else if (document.querySelector("#usd").value) {
            priceConverter.convertFromUsd();
        } else {
            alert ("Please enter at least one field");
        }
    }
}

class Calculator extends Converter {
    constructor(){
        super();
    }
        calcSavings(){
            localStorage.setItem("tankSize",document.querySelector("#tank-size").value);
            let cadPrice = document.querySelector("#cad-cost").value;
            let usdPrice = document.querySelector("#usd-cost").value;
            let tankSize = document.querySelector("#tank-size").value;
            let savings = Math.floor((cadPrice-(priceConverter.convertUsdToCad(usdPrice)*priceConverter.convertGToL(1)))*tankSize*100)/100;
            if (savings<=0){
                return document.querySelector("h3").innerText = `Trip not worth it. It will cost $${savings*-1} more in the USA.`
            }
            document.querySelector("h3").innerText = `Estimated Savings: $${savings}`
            console.log(typeof(savings));
        }
}

let priceConverter = new Converter();
let calcSavings = new Calculator();

document.querySelector("#convert").addEventListener("click", priceConverter.whichConversion);

document.querySelector("#calculate").addEventListener("click", calcSavings.calcSavings);