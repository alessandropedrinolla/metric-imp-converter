/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');
var helmet      = require('helmet');

module.exports = function (app) {
  app.use(helmet.hidePoweredBy());
  app.use(helmet.xssFilter());
  
  var convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res){
      var input = req.query.input;
      var initNum = convertHandler.getNum(input);
      var initUnit = convertHandler.getUnit(input);

      // Check invalid input

      let err = "";

      console.log("api.js initUnit:"+ initUnit+" initnum:" + initNum);

      if(Number.isNaN(initNum))
      {
        err = "invalid number";
        if(initUnit == -1)
        {
          err = "invalid number and unit";
        }
      }else
      {
        if(initUnit == -1)
          err = "invalid unit";
      }

      if(err!="")
      {
        res.json({error:err});
        return;
      }

      var returnNum = convertHandler.convert(initNum, initUnit);
      var returnUnit = convertHandler.getReturnUnit(initUnit);
      var toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      
      res.json({"initNum": initNum, "initUnit": initUnit, "returnNum": returnNum, "returnUnit": returnUnit, "string": toString});
    });
};
