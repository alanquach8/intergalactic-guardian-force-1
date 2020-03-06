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
    var GrenadeManager = /** @class */ (function (_super) {
        __extends(GrenadeManager, _super);
        function GrenadeManager() {
            var _this = _super.call(this, "", 0, 0, true) || this;
            _this._grenadeCount = 0;
            _this._grenadeThumbs = [];
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        GrenadeManager.prototype._checkBounds = function () {
        };
        Object.defineProperty(GrenadeManager.prototype, "GrenadeThumbs", {
            get: function () {
                return this._grenadeThumbs;
            },
            set: function (thumbs) {
                this._grenadeThumbs = thumbs;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GrenadeManager.prototype, "GrenadeCount", {
            get: function () {
                return this._grenadeCount;
            },
            set: function (count) {
                this._grenadeCount = count;
            },
            enumerable: true,
            configurable: true
        });
        // PUBLIC METHODS
        GrenadeManager.prototype.Start = function () {
        };
        GrenadeManager.prototype.Update = function () {
        };
        GrenadeManager.prototype.Reset = function () {
        };
        return GrenadeManager;
    }(objects.GameObject));
    objects.GrenadeManager = GrenadeManager;
})(objects || (objects = {}));
//# sourceMappingURL=GrenadeManager.js.map