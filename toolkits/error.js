class BaseError extends Error {
    constructor (message) {
        // Calling parent constructor of base Error class.
        super(message);
        // Saving class name in the property of our custom error as a shortcut.
        this.name = this.constructor.name;
        // Capturing stack trace, excluding constructor call from it.
        Error.captureStackTrace(this, this.constructor);
    }
};

class NotImplementError extends BaseError {
    constructor (fn) {
        let message = `${fn} is not implemented`;
        super(message);
    }
}

class ValidateError extends BaseError {}

// 核保失败
class VerifyError extends BaseError {
    constructor (product_id, reason) {
        let message = `产品[${product_id}]核保失败，原因: ${reason}`;
        super(message);
    }
}

// 确认保单失败
class ConfirmError extends BaseError {
    constructor (reason) {
        let message = `确认出保失败: ${reason}`;
        super(message);
    }
}

// 未登录或者登录异常
class UnauthorizedError extends BaseError {}

// 数据库数据不存在的异常
class ObjectNotFound extends BaseError {
    constructor (objId) {
        var message = `${objId} Not Found`;
        super(message);
    }
}

class HTTPError extends BaseError {
    constructor (code, body) {
        var message = `[${code}], ${body}`;
        super(message);
    }
}

class ConnectError extends BaseError {} // 连接错误

class OrderNotFound extends ObjectNotFound {}

class PolicyNotFound extends ObjectNotFound {}

class ProductNotFound extends ObjectNotFound {}

// 已知的异常，消息经过了可读性的优化，与未知的、未处理的异常区分开来
class KnownError extends BaseError {}

module.exports = {
    ValidateError,
    UnauthorizedError,
    VerifyError,
    ConfirmError,
    OrderNotFound,
    PolicyNotFound,
    ProductNotFound,
    NotImplementError,
    HTTPError,
    ConnectError,
    KnownError
};
