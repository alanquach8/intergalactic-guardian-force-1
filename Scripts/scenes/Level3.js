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
            _this.MaximumEnemies = 8;
            _this.DistanceLeft = 50;
            return _this;
        }
        Level3.prototype.ReachedLevelEnd = function () {
            _super.prototype.ReachedLevelEnd.call(this);
            this.SubBoss.HP = 300;
        };
        Level3.prototype.SpawnBoss = function () {
            var _this = this;
            this.Boss = new objects.Boss(this.Player);
            this.Boss.scaleX = 1.5;
            this.Boss.scaleY = 1.5;
            this.addChild(this.Boss);
            this.Boss.DeathEvent = function () {
                _this.CanFinish = true;
                _this.Boss.scaleX = 1.5;
                _this.Boss.scaleY = 1.5;
            };
        };
        return Level3;
    }(scenes.Level1));
    scenes.Level3 = Level3;
})(scenes || (scenes = {}));
//# sourceMappingURL=Level3.js.map