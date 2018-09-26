/**
 * Created by qi.wang on 2018/08/20.
 */
const v = require("validator");
// console.log(v);

/**
 * 重写 isNull function
 */
v.isNull = function (str) {
    if (v.toString(str).trim(str) === 'undefined') {
        return true;
    } else if (v.toString(str).trim(str) === '') {
        return true;
    } else if (v.toString(str).trim(str) === 'null') {
        return true;
    } else {
        return false;
    }
};
/**
 * is Object Null
 * @param obj
 * @returns {boolean}
 */
v.isNullObject = function (obj) {
    if (typeof (obj) === 'undefined') {
        return true;
    } else if (obj === 'undefined') {
        return true;
    } else if (obj === null) {
        return true;
    } else if (obj === 'null') {
        return true;
    } else if (Object.keys(obj).length === 0) {
        return true;
    } else {
        return false;
    }
};
/**
 * num equal
 * @param num
 * @param num2
 * @returns {boolean}
 */
v.equals_num = function (num, num2) {
    if (v.isNull(num) || v.isNull(num2))
        return false;
    return num.toString() === num2.toString();
};
/**
 * 求得x的y次方
 * @param x
 * @param y
 * @returns {number}
 */
var square = function (x, y) {
    var i = 1;
    for (var j = 1; j <= y; j++) {
        i *= x;
    }
    return i;
};
/**
 * 18位身份证号最后一位校验
 * @param Num
 * @returns {*}
 * @constructor
 */
var idCard = function (Num) {
    var x = 0;
    for (var i = 18; i >= 2; i--) {
        x = x
            + (square(2, (i - 1)) % 11)
            * parseInt(Num.charAt(19 - i - 1));
    }
    x %= 11;
    var y = 12 - x;
    if (x == 0) {
        y = '1';
    }
    if (x == 1) {
        y = '0';
    }
    if (x == 2) {
        y = 'X';
    }
    return y;
};
/**
 * 验证身份证的有效性
 * @param num
 * @returns {boolean}
 */
v.isCardId = function (num) {
    if (!v.isLength(num.toString(), 18, 18)) {
        return false;
    }
    var valid_code = num.charAt(17);
    return v.equals_num(idCard(num), valid_code);
};
/**
 * is Date
 * @param str
 * @returns {boolean}
 */
v.isDate = function (str) {
    return !isNaN(Date.parse(str));
};
/**
 * is Birthday
 * @param birthday
 * @returns {boolean}
 */
v.isBirthday = function (birthday) {
    var _RegExp = /^(\d{4})-(\d{2})-(\d{2})$/;
    if (v.isNull(birthday)) {
        return false;
    } else {
        var _is_true = _RegExp.test(birthday);
        if (!_is_true) {
            return false;
        }
        var _text_value = _RegExp.exec(birthday);
        if (!(parseInt(_text_value[2]) >= 1 && parseInt(_text_value[2]) <= 12)) {
            return false;
        } else if (!(parseInt(_text_value[3]) >= 1 && parseInt(_text_value[3]) <= 31)) {
            return false;
        } else {
            return true;
        }
    }

};
/**
 * is Sex
 * @param sex
 * @returns {*}
 */
v.isSex = function (sex) {
    if (v.isNull(sex)) {
        return false;
    } else {
        return v.equals(sex.toString(), "0") || v.equals(sex.toString(), "1");
    }
};
/**
 * 是否在区间内
 * @param num
 * @param d1
 * @param d2
 */
v.isInterval = function (num, d1, d2) {
    if (v.isNull(num) || v.isNull(d1) || v.isNull(d2)) {
        return false;
    } else {
        return num > d1 && num < d2;
    }
};
/**
 * 是否在闭区间内
 * @param num
 * @param d1
 * @param d2
 */
v.isIntervalClosed = function (num, d1, d2) {
    if (v.isNull(num) || v.isNull(d1) || v.isNull(d2)) {
        return false;
    } else {
        return num >= d1 && num <= d2;
    }
};
/**
 * 是否在左闭区间内
 * @param num
 * @param d1
 * @param d2
 */
v.isLIntervalClosed = function (num, d1, d2) {
    if (v.isNull(num) || v.isNull(d1) || v.isNull(d2)) {
        return false;
    } else {
        return num >= d1 && num < d2;
    }
};
/**
 * 是否在右闭区间内
 * @param num
 * @param d1
 * @param d2
 */
v.isRIntervalClosed = function (num, d1, d2) {
    if (v.isNull(num) || v.isNull(d1) || v.isNull(d2)) {
        return false;
    } else {
        return num > d1 && num <= d2;
    }
};

/**
 * 投保人姓名的有效验证
 * 规则：20字内的中文，和20字母内的英文和空格
 */
v.isName = function (name) {
    if (v.isNull(name)) {
        return false;
    } else {
        var _regexp = /^([\u4E00-\u9FA5·]{1,20}|[a-zA-Z. ]{1,20})$/;
        return !_regexp.test(name);
    }
};

/**
 * is DateTime
 * @param str_date_time  2018-01-19
 * @returns {boolean}
 */
v.isDate = function (str_date_time) {
    var _RegExp = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/;
    if (v.isNull(str_date_time)) {
        return false;
    } else {
        var _is_true = _RegExp.test(str_date_time);
        if (!_is_true) {
            return false;
        }
        var _text_value = _RegExp.exec(str_date_time);
        if (!(parseInt(_text_value[2]) >= 1 && parseInt(_text_value[2]) <= 12)) {
            return false;
        } else if (!(parseInt(_text_value[3]) >= 1 && parseInt(_text_value[3]) <= 31)) {
            return false;
        } else {
            return true;
        }
    }
};

/**
 * is DateTime
 * @param str_date_time  2018-01-19 12:00:00
 * @returns {boolean}
 */
v.isDateTime = function (str_date_time) {
    var _RegExp = /^([0-9]{4})-([0-9]{2})-([0-9]{2}) ([0-9]{2}):([0-9]{2}):([0-9]{2})$/;
    if (v.isNull(str_date_time)) {
        return false;
    } else {
        var _is_true = _RegExp.test(str_date_time);
        if (!_is_true) {
            return false;
        }
        var _text_value = _RegExp.exec(str_date_time);
        if (!(parseInt(_text_value[2]) >= 1 && parseInt(_text_value[2]) <= 12)) {
            return false;
        } else if (!(parseInt(_text_value[3]) >= 1 && parseInt(_text_value[3]) <= 31)) {
            return false;
        } else if (!(parseInt(_text_value[4]) >= 0 && parseInt(_text_value[4]) <= 24)) {
            return false;
        } else if (!(parseInt(_text_value[5]) >= 0 && parseInt(_text_value[5]) <= 59)) {
            return false;
        } else if (!(parseInt(_text_value[6]) >= 0 && parseInt(_text_value[6]) <= 59)) {
            return false;
        } else if (parseInt(_text_value[4]) >= 24 && (parseInt(_text_value[5]) > 0 || parseInt(_text_value[6]) > 0)) {
            return false;
        } else {
            return true;
        }
    }
};

module.exports = v;