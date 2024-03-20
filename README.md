# Sumas Prairie Gas Tools
If you live near the 🇨🇦/🇺🇸 border, you are well aware that the price of fuel is often much cheaper in the USA. How much cheaper? Hard to say. You must convert currency (USD-CAD) and volumetric measurements (Gallons-Litres), then compare that to the estimated wait time at the border. Sumas Prairie Gas Tools provides you with all of this information to save you time and money.

**Link to project:** https://gastools.netlify.app

<img src="https://gastools.netlify.app/preview.png" alt="preview" height="200px">

## How It's Made:

**Tech used:** HTML, CSS, JavaScript

Used ExchangeRate-API for real-time exchange rate data. Border camera footage is pulled from DriveBC and Washington State Department of Travel. Conversions and calculations are done using JavaScript. 

## Optimizations:

Once the original product was created in JavaScript, I was able to reduce the amount of code by 50% by refactoring it using Object Oriented Programming. I also stored fuel tank sizes locally using localStorage to save the user time.

## Future Optimizations:

In future will expand this app to have all 🇨🇦/🇺🇸 border crossings available, to open up the potential user base. I will also pull estimated wait time (in minutes) in addition to having border camera footage available to users.

## Lessons Learned:

How to securely pull API data from government websites. Understanding CORS errors. Application of Object Oriented Programming to make the code more efficient.

## Examples:
Take a look at these other projects:

**Codewars:** https://github.com/mfscifly/codewars

**Portfolio:** https://github.com/mfscifly/portfolio