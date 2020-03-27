"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var objects;
(function (objects) {
    var Trail = /** @class */ (function (_super) {
        __extends(Trail, _super);
        function Trail(imagePath, x, y, isCentered, ttl) {
            if (imagePath === void 0) { imagePath = "./Assets/images/vehicle/segway.png"; }
            if (x === void 0) { x = 100; }
            if (y === void 0) { y = 100; }
            if (isCentered === void 0) { isCentered = true; }
            if (ttl === void 0) { ttl = 2; }
            var _this = _super.call(this, imagePath, x, y, isCentered) || this;
            _this._state = 0;
            _this._startTime = (new Date()).getTime() / 1000;
            _this._ttl = ttl;
            return _this;
        }
        Trail.prototype.GetTimeAlive = function () {
            return ((new Date()).getTime() / 1000) - this._startTime;
        };
        Trail.prototype._checkBounds = function () {
        };
        Trail.prototype.Start = function () {
        };
        Trail.prototype.Update = function () {
            switch (this._state) {
                case 0:
                    if (this.GetTimeAlive() >= this._ttl)
                        this._state = 1;
                    break;
                case 1:
                    this.alpha -= 0.05;
                    if (this.alpha <= 0)
                        this._state = 2;
                    break;
            }
        };
        Trail.prototype.Reset = function () {
        };
        Trail.prototype.CanDelete = function () {
            return this._state == 2;
        };
        return Trail;
    }(objects.GameObject));
    objects.Trail = Trail;
})(objects || (objects = {}));
//# sourceMappingURL=Trail.js.map