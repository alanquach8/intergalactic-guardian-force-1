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
var scenes;
(function (scenes) {
    var Level3 = /** @class */ (function (_super) {
        __extends(Level3, _super);
        function Level3() {
            var _this = _super.call(this, scenes.State.END) || this;
            _this.MaximumEnemies = 10;
            _this.DistanceLeft = 30;
            return _this;
        }
        Level3.prototype.ReachedLevelEnd = function () {
            _super.prototype.ReachedLevelEnd.call(this);
            this.SubBoss.HP = 40;
        };
        return Level3;
    }(scenes.Level1));
    scenes.Level3 = Level3;
})(scenes || (scenes = {}));
//# sourceMappingURL=Level3.js.map