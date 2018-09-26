const { BaseRequester } = require("../toolkits/base.requester");
const { VerifyError, ConfirmError, ConnectError } = require("../toolkits/error");

class APIGatewayRequester extends BaseRequester {
    constructor(name, host, app_key, app_secret, defaultHeaders) {
        super(name, host, defaultHeaders);
        this.app_key = app_key;
        this.app_secret = app_secret;
        // 鉴权路由
        this.auth_url = "/tokens";
        this.token = "";
        // 两个测试API路由样例
        this.verify_url = "/apis/verify";       // 核保
        this.confirm_url = "/apis/confirm";     // 确保
    }

    authenticate() {
        var self = this;
        let url = this.host + this.auth_url;
        return super.request("post", url, {
            json: { app_key: this.app_key, app_secret: this.app_secret }
        }).then(result => {
            self.token = result.token;
            return Promise.resolve(self.token);
        });
    }

    ensureToken() {
        if (this.token) {
            return Promise.resolve(this.token);
        } else {
            return this.authenticate().then((token) => {
                return Promise.resolve(token);
            });
        }
    }

    /**
     * 接口请求需要在请求头中加入Authorization，请求值为鉴权token
     * 鉴权方式采用的app_key+app_secret方式，对接口请求建议对参数进行加签请求
     * 加签版本在下一个版本中推出
     **/
    requestWithAuth(method, url, options) {
        return this.ensureToken().then((token) => {
            if (!options.headers) {
                options.headers = {};
            }
            options.headers['Authorization'] = token;
          
            return super.request(method, url, options);
        });
    }

    request(method, url, options) {
        var self = this;
        return this.requestWithAuth(method, url, options).catch(e => {
            if (e.message.includes("expired")) {
                self.token = ""; // token过期，重新授权
                return self.requestWithAuth(method, url, options);
            } else {
                return Promise.reject(e);
            }
        });
    }


    // 样例：核准请求
    verifyRequest(params) {
        var self = this;
        let url = self.host + self.verify_url;
        console.log("请求api", url)
        return self.request("post", url, {
            "json": params,
            "headers": { "Content-Type": "application/json" }
        }).then(r => {
            return Promise.resolve(r);
        }).catch(e => {
            console.error("verify request failed, e", e);
            if (e instanceof VerifyError) {
                return Promise.reject(e);
            } else if (e instanceof ConnectError) {
                return Promise.reject(new VerifyError(params.product.id, e.message))
            }
            return Promise.reject(new VerifyError(params.product.id, "未知错误"));
        });
    }


    // 样例：确认请求
    confirmRequest(params) {
        var self = this;
        let url = self.host + self.confirm_url;

        return self.post(url, {
            json: params
        }).then(r => {
            return Promise.resolve(r);
        }).catch(e => {
            console.error("confirm request failed, e", e);
            if (e instanceof ConfirmError) {
                return Promise.reject(e);
            } else if (e instanceof ConnectError) {
                return Promise.reject(new ConfirmError(params.product.id, e.message))
            }
            return Promise.reject(new ConfirmError(params.product.id, "未知错误"));
        });
    }
}

/**
 * 这里的配置是测试地址，正式部署需要替换为生产环境
 * 建议定义沙箱的方式，生成和测试直接配置在SDK中，用沙箱参数指示请求环境
 * 
 */
let api_requester = new APIGatewayRequester("apigateway",
    "http://api.testdomain.ltd",    // 网关：host
    "test",                         // 网关：app_key
    "4x41LqWxVu45rJB036dnj203kkd"   // 网关：app_secret
);

module.exports = { APIGatewayRequester, api_requester };


