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
    var Powerup = /** @class */ (function (_super) {
        __extends(Powerup, _super);
        function Powerup(image, x, y) {
            var _this = _super.call(this, image, x, y) || this;
            _this._activation_event = function () { console.log("No action event specified"); };
            return _this;
        }
        Powerup.prototype._checkBounds = function () {
        };
        Powerup.prototype.Reset = function () {
        };
        Powerup.prototype.Start = function () {
        };
        Powerup.prototype.Update = function () {
        };
        Powerup.prototype.Main = function () {
        };
        Powerup.prototype.ExecuteAction = function () {
            this._activation_event();
        };
        Object.defineProperty(Powerup.prototype, "ActivationEvent", {
            get: function () {
                return this._activation_event;
            },
            set: function (callback) {
                this._activation_event = callback;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Powerup.prototype, "Scale", {
            set: function (factor) {
                this.scaleX = factor;
                this.scaleY = factor;
                this.width *= factor;
                this.height *= factor;
            },
            enumerable: true,
            configurable: true
        });
        return Powerup;
    }(objects.GameObject));
    objects.Powerup = Powerup;
})(objects || (objects = {}));
//# sourceMappingURL=Powerup.js.map