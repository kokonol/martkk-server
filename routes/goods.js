var express = require('express');
var router = express.Router();
var HttpReq=require('../modules/HttpRequestHelper');

/* GET home page. */
router.get('/', function(req, res, next) {

    var callback = function (data) {
      console.log("callback:"+data);
      res.send('HHHHHHHHH');
    };
    // HttpReq.get("https://r5x.ren5xing.com","/test",{},callback);
    HttpReq.post("https://r5x.ren5xing.com","/test",{},callback);
    //HttpReq.post("",{},callback);
});

module.exports = router;
