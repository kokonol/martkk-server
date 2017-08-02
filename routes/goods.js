var express = require('express');
var router = express.Router();
var HttpReq=require('../modules/HttpRequestHelper');

/* GET home page. */
router.get('/', function(req, res, next) {

    var callback = function (data) {
      console.log("callback:"+data);
      res.send(JSON.parse(data));
    };
    // HttpReq.get("https://r5x.ren5xing.com","/test",{},callback);
    var attr = {"category":"","pageNum":0,"pageSize":10,"goodsName":"\u978b","sortColumn":"virtualSales","sortOrder":"desc"};
    HttpReq.post("r5x.ren5xing.com","/sch/goods",attr,callback);
    //HttpReq.post("",{},callback);
});

module.exports = router;
