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
    var Box = /** @class */ (function (_super) {
        __extends(Box, _super);
        // CONSTRUCTOR
        function Box(x, y) {
            if (x === void 0) { x = 200; }
            if (y === void 0) { y = 200; }
            var _this = _super.call(this, "./Assets/images/box.png", x, y, true) || this;
            // PRIVATE INSTANCE MEMBERS
            _this._life = 5;
            _this._broken = false;
            return _this;
        }
        Object.defineProperty(Box.prototype, "Life", {
            // PUBLIC PROPERTIES
            get: function () {
                return this._life;
            },
            set: function (newLife) {
                this._life = newLife;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Box.prototype, "Broken", {
            get: function () {
                return this._broken;
            },
            set: function (newBroken) {
                this._broken = newBroken;
            },
            enumerable: true,
            configurable: true
        });
        // PRIVATE METHODS
        Box.prototype._checkBounds = function () {
        };
        // PUBLIC METHODS
        Box.prototype.Start = function () {
        };
        Box.prototype.Update = function () {
            if (this._life == 0) {
                this._broken = true;
            }
        };
        Box.prototype.Reset = function () {
        };
        return Box;
    }(objects.GameObject));
    objects.Box = Box;
})(objects || (objects = {}));
//# sourceMappingURL=Box.js.map