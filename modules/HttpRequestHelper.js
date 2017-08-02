const https = require('https');
const querystring=require('querystring');
const iconv = require('iconv-lite');
// var querystring=require('querystring');

function HttpRequestHelper(){
    this.get=function(host, path, attr, callback){
        console.log('get');
        var content=querystring.stringify(attr);
        var url=host + path + "?" + content;
        https.get(url, function (res) {
            var datas = [];
            var size = 0;
            res.on('data', function (data) {
                datas.push(data);
                size += data.length;
            });
            res.on("end", function () {
                var buff = Buffer.concat(datas, size);
                //转码
                var result = iconv.decode(buff, "utf8");
                // 不需要转编码,直接tostring
                // var result = buff.toString();
                console.log(result);

                if(typeof(callback) === 'function'){
                    callback(result);
                }

            });
        }).on("error", function (err) {
            console.error(err.stack);
            //callback.apply(null);
        });


    };
    this.post=function(host, path, attr, callback){
        console.log('post');

        a = {"category":"","pageNum":0,"pageSize":10,"goodsName":"\u978b","sortColumn":"virtualSales","sortOrder":"desc"};
        data = JSON.stringify(a);
        console.log(data);
        var opt = {
            method: "POST",
            host: "r5x.ren5xing.com",
            port: 443,
            path: "/sch/goods",
            headers: {
                "ecp-ct": 'wap',
                "ecp-cv": '2.0',
                "Pragma": 'no-cache',
                "Origin": 'https://wx.ren5xing.com',
                "Accept-Encoding": 'gzip, deflate, br',
                "User-Agent": 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
                "Content-Type": 'application/json;charset=UTF-8',
                "Accept-Language": 'zh-CN,zh;q=0.8,en;q=0.6',
                "Accept": 'application/json, text/plain, */*',
                "Cache-Control": 'no-cache',
                "Referer": 'https://wx.ren5xing.com/',
                "Connection": 'keep-alive'
            }
        };

        var req = https.request(opt, function (res) {
            console.log(res.statusCode);
            var datas = [];
            var size = 0;
            res.on('data', function (data) {
                datas.push(data);
                size += data.length;
            });
            res.on("end", function () {
                var buff = Buffer.concat(datas, size);
                //转码
                var result = iconv.decode(buff, "utf8");
                // 不需要转编码,直接tostring
                // var result = buff.toString();
                console.log(result);

                if(typeof(callback) === 'function'){
                    callback(result);
                }

            });
        });

        req.on('error', function(e) {
            console.log('problem with request: ' + e.message);
        });
        req.write(data);
        req.end();

    };
}
var httpRequestHelper=new HttpRequestHelper();
module.exports=httpRequestHelper;