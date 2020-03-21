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
    var Civilian = /** @class */ (function (_super) {
        __extends(Civilian, _super);
        // CONSTRUCTOR
        function Civilian(x, y) {
            if (x === void 0) { x = 200; }
            if (y === void 0) { y = 200; }
            var _this = _super.call(this, "./Assets/images/civilian.png", x, y, true) || this;
            // PRIVATE INSTANCE MEMBERS
            _this._life = 100;
            _this._saved = false;
            _this.Start();
            return _this;
        }
        Object.defineProperty(Civilian.prototype, "Life", {
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
        Object.defineProperty(Civilian.prototype, "Saved", {
            get: function () {
                return this._saved;
            },
            set: function (newSaved) {
                this._saved = newSaved;
            },
            enumerable: true,
            configurable: true
        });
        // PRIVATE METHODS
        Civilian.prototype._checkBounds = function () {
        };
        // PUBLIC METHODS
        Civilian.prototype.Start = function () {
        };
        Civilian.prototype.Update = function () {
            if (this._life == 0) {
                //civilian dies and is not saved
                config.Game.SCORE -= 10;
            }
            if (this._saved) {
                //civilian is saved
                config.Game.SCORE += 10;
            }
        };
        Civilian.prototype.Reset = function () {
        };
        return Civilian;
    }(objects.GameObject));
    objects.Civilian = Civilian;
})(objects || (objects = {}));
//# sourceMappingURL=Civilian.js.map