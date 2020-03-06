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
    var Explosion = /** @class */ (function (_super) {
        __extends(Explosion, _super);
        function Explosion(x, y) {
            if (x === void 0) { x = 320; }
            if (y === void 0) { y = 250; }
            var _this = _super.call(this, "Assets/images/environment/explosion.png", x, y, true) || this;
            _this._delta = 0.05;
            _this._done = false;
            _this.alpha = 0;
            return _this;
        }
        Object.defineProperty(Explosion.prototype, "Done", {
            get: function () {
                return this._done;
            },
            enumerable: true,
            configurable: true
        });
        Explosion.prototype._checkBounds = function () {
        };
        Explosion.prototype.Start = function () {
        };
        Explosion.prototype.Update = function () {
            this.alpha += this._delta;
            if (this.alpha >= 1) {
                this._delta *= -1;
            }
            if (this.alpha <= 0) {
                this._done = true;
            }
        };
        Explosion.prototype.Reset = function () {
        };
        return Explosion;
    }(objects.GameObject));
    objects.Explosion = Explosion;
})(objects || (objects = {}));
//# sourceMappingURL=Explosion.js.map