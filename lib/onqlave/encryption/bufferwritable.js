"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Writable = require("stream").Writable;
var BufferWritable = /** @class */ (function (_super) {
    __extends(BufferWritable, _super);
    function BufferWritable() {
        var _this = _super.call(this) || this;
        _this._buffer = Buffer.alloc(0);
        return _this;
    }
    BufferWritable.prototype._write = function (chunk, encoding, callback) {
        this._buffer = Buffer.concat([this._buffer, chunk]);
        callback();
    };
    BufferWritable.prototype.buffer = function () {
        return this._buffer;
    };
    return BufferWritable;
}(Writable));
module.exports = {
    BufferWritable: BufferWritable
};
//# sourceMappingURL=bufferwritable.js.map