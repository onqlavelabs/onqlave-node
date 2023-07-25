"use strict";
var Writable = require("stream").Writable;
var PlainStreamProcessor = /** @class */ (function () {
    function PlainStreamProcessor(stream) {
        if (!(stream instanceof Writable)) {
            throw new Error("cipherStream must be an instance of Writable");
        }
        this.stream = stream;
    }
    PlainStreamProcessor.prototype.writeHeader = function (algorithm) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var header = algorithm.serialize();
            _this.stream.write(header, function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    };
    PlainStreamProcessor.prototype.writePacket = function (packet) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var dataLen = Buffer.alloc(4);
            dataLen.writeUInt32BE(packet.length, 0);
            var buffer = Buffer.concat([dataLen, packet]);
            _this.stream.write(buffer, function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    };
    PlainStreamProcessor.prototype.writePlainPacket = function (packet) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.stream.write(packet, function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    };
    return PlainStreamProcessor;
}());
module.exports = {
    PlainStreamProcessor: PlainStreamProcessor
};
//# sourceMappingURL=plainstreamprocessort.js.map