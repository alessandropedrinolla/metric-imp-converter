/*
*
*
*       Complete the handler logic below
*       
*       
*/

let unitsString = {
  "gal": "gallons",
  "lbs": "libres",
  "mi": "miles",
  "L": "liters",
  "kg": "kilograms",
  "km": "kilometers",
}

function ConvertHandler() {
  
  this.getNum = function(input) {    
    var result = input.match(/.*(?=(gal|lbs|mi|L|kg|km)$)/);
    
    if(result)
    {
        result = result[0];

        if(result == "")
          return 1;

        console.log("getnum res: " + result);

        // If it's not a number
        if(!/^[0-9]*(\.[0-9]+)?(\/[0-9]+(\.[0-9]+)?)?$/.test(result)) 
          return NaN;

        // If contains a '/'
        if(result.indexOf('/')!=-1)
        {
          let parts = result.split('/');
          return parseFloat(parts[0]) / parseFloat(parts[1]);
        }
        return result;
    }
    else
      return NaN;
  };

  this.getUnit = function(input) {
    var result;
    result = input.match(/(gal|lbs|mi|L|kg|km)$/);

    if(result && unitsString[result[0]])
      return result[0];
    return -1;
  };
  
  this.getReturnUnit = function(initUnit) {
    let units = ["gal","lbs","mi","L","kg","km"];
    var result;
    switch(initUnit)
    {
      case "gal":case "lbs":case "mi": 
      {
        result = units[units.indexOf(initUnit) + 3];
      }; break;
      case "L":case "kg":case "km": {
        result = units[units.indexOf(initUnit) - 3];
      }; break;
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    return unitsString[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    let ops = {
      "gal": (num) => { return num * galToL; },
      "lbs": (num) => { return num * lbsToKg; },
      "mi": (num) => { return num * miToKm; },
      "L": (num) => { return num / galToL; },
      "kg": (num) => { return num / lbsToKg; },
      "km": (num) => { return num / miToKm; },
    }

    console.log("convert: initunit:" + initUnit + " initnum:" + initNum);

    var result = ops[initUnit](initNum);
    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    var result;

    result = `${initNum} ${unitsString[initUnit]} converts to ${returnNum} ${unitsString[returnUnit]}`;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
