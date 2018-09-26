const moment = require("moment");
const { assert } = require("chai");
var { suite, test, setup, teardown } = require("mocha");
const generateid = require("../toolkits/generateid");
const { api_requester } = require("../services/requester.gateway");

suite("风险管家保险系统SDK单元测试", function () {
    // 定义全局变量
    var order_id = "";

    test("请求核保测试用例", function () {
        // this.timeout(20000);
        let t = {
            "file": 0,		 					      // 【Y】是否为标准件：通过健康告知测评得出（0表示标准件，1表示非标准件）
            "appid": "test",                           // 【Y】非常重要，该appid由业务分配，不能乱填
            "request_id": generateid.getID(),          // 【Y】请求ID，每次应唯一
            "notify_url": "",                           // 【Y】异步核保通过时的回调API地址
            "total": 337000,                             // 【Y】总价(单位：分)
            
        };

        // 核保请求
        return api_requester.verifyRequest(t).then(result => {
            console.info('result', result.data_info)
            // 第二步需要使用返回结果中的order_id，这里赋值
            order_id = result.data_info.order_id;
            return assert.equal(result.errcode, "0", "请求成功");
        }).catch(e => {
            console.info(e);
            return assert.isOk(false, "出现异常，原因:" + e.message);
        });
    });


    test("请求出保测试用例", function () {
        var t = {
            "appid": "test",
            "order_id": order_id,       // 依赖核保的请求生产的order_id
            "notify_url": "http://*****************/ws_order/client/notify",
            "pay_info": ""
        };

        // 出保请求
        return api_requester.confirmRequest(t).then(result => {
            console.info('result', result)
            return assert.equal(result.errcode, "0", result.data_info);
        }).catch(e => {
            console.info(e);
            return assert.isOk(false, "出现异常，原因:" + e.message);
        });

    });

});
