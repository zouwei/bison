/***********************************************************************************************************************
 * @描述 common 模块
 * @关联 ""
 * @单位 上海安逸网络科技有限公司
 * @版权 该文件版权归属上海安逸网络科技有限公司
 * @作者 WangQi
 * @开发日期 2018/01/15
 * @最后更改日期
 * @修改人
 * @复审人
 **********************************************************************************************************************/
var moment = require("moment");

const CARD_TYPE = {
    "01": "01", // 居民身份证
    "02": "02", // 军官证
    "03": "03", // 护照
    "04": "04", // 驾驶执照
    "05": "05", // 返乡证
    "06": "06", // 组织机构代码证
    "07": "07", // 港澳通行证
    "08": "08", // 台湾通行证
    "96": "96", // 营业执照
    "97": "97", // 税务登记证
    "98": "98", // 代理业务员职业证号
    "99": "99" // 其他
};

const SEX_TYPE = {
    "0": "0", // 男
    "1": "1", // 女
    "2": "0" // 不清楚
};

const INSURED_RELATION_MAPPING = {
    "00": "00", // 本人;
    "01": "01", // 配偶;
    "02": "02", // 父母;
    "03": "03", // 子女;
    "05": "05", // 兄弟姐妹;
    "06": "06", // 雇主;
    "07": "07", // 雇员;
    "08": "08", // 祖父母、外祖父母;
    "09": "09", // 祖孙、外祖孙;
    "10": "10", // 监护人;
    "11": "11", // 被监护人;
    "12": "12", // 朋友;
    "17": "17", // 雇佣;
    "98": "98", // 未知;
    "99": "99" // 其他
};

module.exports.getMapping = function (type, value) {
    switch (type) {
    case "sex_type":
        return SEX_TYPE[value];
    case "insured_relation":
        return INSURED_RELATION_MAPPING[value];
    case "card_type":
        return CARD_TYPE[value];
    }
};

module.exports.getAge = function (user_info) {
    let birthdate = exports.getBirth(user_info);
    var now = moment();
    return now.diff(birthdate, "years");
};

module.exports.getSex = function (user_info) {
    let sex;
    if (user_info.card_type == "01") {
        sex = IDCardParser.parseSex(user_info.card_id);
    } else {
        sex = user_info.sex;
    }
    return sex;
};

module.exports.getBirth = function (user_info) {
    let birthdate;
    if (user_info.card_type == "01") {
        birthdate = IDCardParser.parseBirth(user_info.card_id);
    } else {
        birthdate = user_info.birthday;
    }
    return birthdate;
};

class IDCardParser {
    static parseBirth (idcard) {
        let year, month, day;
        if (idcard.length == 18) {
            year = idcard.slice(6, 10);
            month = idcard.slice(10, 12);
            day = idcard.slice(12, 14);
        } else if (idcard.length == 15) {
            year = '19' + idcard.slice(6, 8);
            month = idcard.slice(8, 10);
            day = idcard.slice(10, 12);
        } else {
            throw new Error("invalid idcard");
        }
        return `${year}-${month}-${day}`;
    }

    static parseSex (idcard) {
        if (idcard.length == 18) {
            return parseInt(idcard.charAt(16)) % 2 == 0 ? "1" : "0";
        } else if (idcard.length == 15) {
            return parseInt(idcard.charAt(14)) % 2 == 0 ? "1" : "0";
        } else {
            return "2";
        }
    }
}

module.exports.IDCardParser = IDCardParser;
