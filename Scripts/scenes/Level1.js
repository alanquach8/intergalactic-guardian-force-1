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
    var Level1 = /** @class */ (function (_super) {
        __extends(Level1, _super);
        function Level1(scene) {
            if (scene === void 0) { scene = scenes.State.LEVEL2; }
            var _this = _super.call(this, scene) || this;
            _this._subBoss = new objects.SubBoss;
            _this.CanFinish = false;
            return _this;
        }
        Level1.prototype.ReachedLevelEnd = function () {
            var _this = this;
            this._subBoss = new objects.SubBoss();
            this.addChild(this._subBoss);
            this._subBoss.DeathEvent = function () {
                _this.CanFinish = true;
            };
        };
        Object.defineProperty(Level1.prototype, "SubBoss", {
            get: function () {
                return this._subBoss;
            },
            enumerable: true,
            configurable: true
        });
        Level1.prototype.Update = function () {
            var _this = this;
            _super.prototype.Update.call(this);
            if (this._subBoss != undefined) {
                this._subBoss.Update();
                this.Player.Bullets.forEach(function (bullet) {
                    managers.Collision.AABBCheck(_this._subBoss, bullet);
                    if (bullet.isColliding) {
                        _this.Player.Bullets.splice(_this.Player.Bullets.indexOf(bullet), 1);
                        _this.removeChild(bullet);
                        _this._subBoss.ChangeHP(-1);
                    }
                });
            }
        };
        return Level1;
    }(scenes.LevelParent));
    scenes.Level1 = Level1;
})(scenes || (scenes = {}));
//# sourceMappingURL=Level1.js.map