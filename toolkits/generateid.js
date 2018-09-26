/**
 * Created by timer on 2015/4/8.
 */

var generator = function () {

};

var record = {};
generator.getID = function (name) {
    // console.log(name);
    var buf = Buffer.alloc(12);
    var host = 1;// process.env.RISKEYS_HOST;
    var pid = process.pid;
    var time = Math.round((new Date()).getTime() / 1000);

    if (record[name] == null) record[name] = {time: 0, seq: 0};
    // console.log(record[name].time,time);
    if (record[name].time != time) {
        record[name].time = time;
        record[name].seq = 0;
    } else {
        record[name].seq++;
    }
    var seq = record[name].seq;
    var pname = name + "\0";
    buf.write(pname, 0, 2);
    // buf.writeUInt8(name.charCodeAt(0));
    // buf.writeUInt8(name.charCodeAt(1),1);
    buf.writeUInt16LE(host, 2);
    buf.writeUInt16LE(pid & 0xffff, 4);
    buf.writeUInt32LE(time, 6);
    buf.writeUInt16LE(seq, 10);
    var id = buf.toString("hex").toUpperCase();
    return id;
};

generator.getID_old = function (name, tp, cb) {
    // console.log(name);
    var buf = Buffer.alloc(12);
    var host = 1;// process.env.RISKEYS_HOST;
    var pid = process.pid;
    var time = Math.round((new Date()).getTime() / 1000);

    if (record[name] == null) record[name] = {time: 0, seq: 0};
    // console.log(record[name].time,time);
    if (record[name].time != time) {
        record[name].time = time;
        record[name].seq = 0;
    } else {
        record[name].seq++;
    }
    var seq = record[name].seq;
    var pname = name + "\0";
    buf.write(pname, 0, 2);
    // buf.writeUInt8(name.charCodeAt(0));
    // buf.writeUInt8(name.charCodeAt(1),1);
    buf.writeUInt16LE(host, 2);
    buf.writeUInt16LE(pid & 0xffff, 4);
    buf.writeUInt32LE(time, 6);
    buf.writeUInt16LE(seq, 10);
    var id = buf.toString("hex").toUpperCase();

    if (cb) cb(id);
    else return id;
};

module.exports = generator;
