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
            _this._spawnedBoss = false;
            _this._subBoss = new objects.SubBoss(new objects.Player(0), true);
            _this.CanFinish = false;
            return _this;
        }
        Level1.prototype.SpawnBoss = function () {
            var _this = this;
            this._subBoss = new objects.SubBoss(this.Player);
            this.addChild(this._subBoss);
            this._subBoss.DeathEvent = function () {
                _this.CanFinish = true;
            };
        };
        Object.defineProperty(Level1.prototype, "Boss", {
            get: function () {
                return this._subBoss;
            },
            set: function (b) {
                this._subBoss = b;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Level1.prototype, "SubBoss", {
            get: function () {
                return this._subBoss;
            },
            enumerable: true,
            configurable: true
        });
        Level1.prototype.EndGamePrep = function () {
        };
        Level1.prototype.PlayerMovementUpdate = function (y_delta) {
            this._subBoss.y -= y_delta;
            this._subBoss.position = new objects.Vector2(this._subBoss.x, this._subBoss.y);
        };
        Level1.prototype.Update = function () {
            var _this = this;
            _super.prototype.Update.call(this);
            if (this.DistanceLeft <= this._subBoss.height && !this._spawnedBoss) {
                this._spawnedBoss = true;
                this.SpawnBoss();
            }
            if (this._subBoss != undefined) {
                this._subBoss.Update();
                this.Players.forEach(function (player) {
                    player.Bullets.forEach(function (bullet) {
                        managers.Collision.AABBCheck(_this._subBoss, bullet);
                        if (bullet.isColliding && _this._subBoss.HP > 0) {
                            player.Bullets.splice(player.Bullets.indexOf(bullet), 1);
                            _this.removeChild(bullet);
                            _this._subBoss.ChangeHP(-1);
                        }
                    });
                    _this._subBoss.Bullets.forEach(function (bullet) {
                        managers.Collision.AABBCheck(player, bullet);
                        if (bullet.isColliding && !player.IsReviving && !player.SuperHero) {
                            _this._subBoss.Bullets.splice(_this._subBoss.Bullets.indexOf(bullet), 1);
                            _this.removeChild(bullet);
                            _this.PlayerLives--;
                            _this.UpdatePlayerLivesIndicator();
                            if (_this.PlayerLives == 0) {
                                config.Game.SCENE_STATE = scenes.State.LOOSE;
                            }
                            else {
                                player.Reset();
                            }
                        }
                        _this.Enemies.forEach(function (enemy) {
                            managers.Collision.AABBCheck(bullet, enemy);
                            if (enemy.isColliding) {
                                enemy.hitPoints--;
                                if (enemy.hitPoints == 0) {
                                    _this.KillEnemy(enemy);
                                }
                                // remove the bullet
                                if (enemy.IsAlive) {
                                    _this._subBoss.Bullets.splice(_this._subBoss.Bullets.indexOf(bullet), 1);
                                    _this.removeChild(bullet);
                                }
                            }
                        });
                    });
                });
            }
        };
        return Level1;
    }(scenes.LevelParent));
    scenes.Level1 = Level1;
})(scenes || (scenes = {}));
//# sourceMappingURL=Level1.js.map