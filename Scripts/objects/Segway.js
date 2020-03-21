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
    var Segway = /** @class */ (function (_super) {
        __extends(Segway, _super);
        function Segway(imagePath, x, y, isCentered) {
            if (imagePath === void 0) { imagePath = "./Assets/images/vehicle/segway.png"; }
            if (x === void 0) { x = 100; }
            if (y === void 0) { y = 100; }
            if (isCentered === void 0) { isCentered = true; }
            var _this = _super.call(this, imagePath, x, y, isCentered) || this;
            _this.isRiding = false;
            _this.riding = new objects.Player;
            return _this;
        }
        //private methods
        Segway.prototype._checkBounds = function () {
        };
        Segway.prototype.Start = function () {
        };
        Segway.prototype.Update = function () {
            if (this.isRiding) {
                this.position = new objects.Vector2(this.riding.x, this.riding.y);
                this.rotation = this.riding.rotation;
            }
        };
        Segway.prototype.Reset = function () {
        };
        Object.defineProperty(Segway.prototype, "IsRiding", {
            get: function () {
                return this.isRiding;
            },
            enumerable: true,
            configurable: true
        });
        Segway.prototype.SetRider = function (player) {
            this.riding = player;
            this.isRiding = true;
        };
        return Segway;
    }(objects.GameObject));
    objects.Segway = Segway;
})(objects || (objects = {}));
//# sourceMappingURL=Segway.js.map