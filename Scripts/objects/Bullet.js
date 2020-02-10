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
    var Bullet = /** @class */ (function (_super) {
        __extends(Bullet, _super);
        // constructors
        function Bullet(imagePath, x, y, isCentered) {
            if (imagePath === void 0) { imagePath = "./Assets/images/bulletPlaceHolder.png"; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (isCentered === void 0) { isCentered = true; }
            var _this = _super.call(this, imagePath, x, y, isCentered) || this;
            _this._speed = 20;
            _this.position = new objects.Vector2(-1, -1);
            _this._direction = new objects.Vector2(0, -1);
            return _this;
        }
        Object.defineProperty(Bullet.prototype, "direction", {
            // public properties
            get: function () {
                return this._direction;
            },
            set: function (newDirection) {
                this._direction = newDirection;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Bullet.prototype, "speed", {
            get: function () {
                return this._speed;
            },
            set: function (newSpeed) {
                this._speed = newSpeed;
            },
            enumerable: true,
            configurable: true
        });
        //private methods
        Bullet.prototype._checkBounds = function () {
        };
        Bullet.prototype.Start = function () {
        };
        Bullet.prototype.Update = function () {
            this.x += this.direction.x * this.speed;
            this.position.x += this.direction.x * this.speed;
            this.y += this.direction.y * this.speed;
            this.position.y += this.direction.x * this.speed;
        };
        Bullet.prototype.Reset = function () {
        };
        return Bullet;
    }(objects.GameObject));
    objects.Bullet = Bullet;
})(objects || (objects = {}));
//# sourceMappingURL=Bullet.js.map