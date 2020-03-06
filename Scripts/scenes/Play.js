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
    var Play = /** @class */ (function (_super) {
        __extends(Play, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Play() {
            var _this = _super.call(this) || this;
            // initialization
            _this._player = new objects.Player();
            _this._enemies = new Array();
            _this._deadEnemies = new Array();
            _this._explosion = [];
            _this._noOfEnemies = 5;
            _this._gernadeManager = new objects.GrenadeManager();
            _this.addEventListener("click", function (evt) {
                _this.SendGrenade(evt.stageX, evt.stageY);
            });
            _this.Start();
            return _this;
        }
        // PUBLIC METHODS
        Play.prototype.Start = function () {
            this._player = new objects.Player();
            // Add Enemies to the array
            for (var i = 0; i < this._noOfEnemies; i++) { //TODO add a Variable for number of enemies currently hardcoded to 5
                this._enemies.push(new objects.Enemy());
            }
            this.Main();
        };
        Play.prototype.SendGrenade = function (x, y) {
            if (this._gernadeManager.GrenadeCount <= 0)
                return;
            this.ChangeGrenades(-1);
            var exp = new objects.Explosion(x, y);
            this._explosion.push(exp);
            this.addChild(exp);
        };
        Play.prototype.SetGrenades = function (count) {
            var _this = this;
            this._gernadeManager.GrenadeCount = count;
            var grenadeThumbs = this._gernadeManager.GrenadeThumbs;
            grenadeThumbs.forEach(function (grenade) {
                _this.removeChild(grenade);
            });
            for (var i = 0; i < count; i++) {
                var img = new createjs.Bitmap("./Assets/images/ui/grenade.png");
                img.x += i * img.getBounds().width + 10;
                img.y = 460;
                grenadeThumbs.push(img);
                this.addChild(img);
            }
        };
        Play.prototype.ChangeGrenades = function (delta) {
            console.log(delta, this._gernadeManager.GrenadeCount);
            this.SetGrenades(this._gernadeManager.GrenadeCount + delta);
        };
        Play.prototype.Update = function () {
            var _this = this;
            // Reference to the Play Scene Object
            var that = this;
            // add more enemies if one dies
            if (this._enemies.length < this._noOfEnemies) {
                this._enemies.push(new objects.Enemy());
                this.addChild(this._enemies[this._enemies.length - 1]);
            }
            if (this._player.visible) {
                this._player.Update();
            }
            else {
                // game over
                config.Game.SCENE_STATE = scenes.State.END;
            }
            this._explosion.forEach(function (exp) {
                if (exp.Done)
                    _this.removeChild(exp);
                exp.Update();
            });
            this._enemies.forEach(function (enemy) {
                enemy.Update(that._player.x, that._player.y);
                // Bullets and Enemy Collision Check
                that._player.Bullets.forEach(function (bullet) {
                    managers.Collision.AABBCheck(bullet, enemy);
                    if (enemy.isColliding) {
                        enemy.hitPoints--;
                        console.log(enemy.hitPoints);
                        if (enemy.hitPoints == 0) {
                            enemy.Die();
                            that._deadEnemies.push(enemy);
                            that._enemies.splice(that._enemies.indexOf(enemy), 1);
                        }
                        // remove the bullet
                        if (enemy.IsAlive) {
                            that._player.Bullets.splice(that._player.Bullets.indexOf(bullet), 1);
                            that.removeChild(bullet);
                        }
                    }
                });
                that._explosion.forEach(function (exp) {
                    managers.Collision.AABBCheck(exp, enemy);
                    if (enemy.isColliding)
                        enemy.Die();
                });
                // Enemy and Player Collision Check
                managers.Collision.AABBCheck(enemy, that._player);
                if (that._player.isColliding && !that._player.IsReviving) {
                    that._player.Life--;
                    console.log(that._player.Life);
                    if (that._player.Life == 0) {
                        that.removeChild(that._player);
                        that._player.Die();
                    }
                    else {
                        that._player.Reset();
                    }
                }
            });
            this._deadEnemies.forEach(function (enemy) {
                enemy.Update();
                if (enemy.isDead) {
                    that._deadEnemies.splice(that._deadEnemies.indexOf(enemy), 1);
                    that.removeChild(enemy);
                }
            });
        };
        Play.prototype.Main = function () {
            var that = this;
            this.addChild(new objects.Rectangle(0, 0, 15, 480, "DarkGrey"));
            this.addChild(new objects.Rectangle(625, 0, 15, 480, "DarkGrey"));
            this.addChild(new objects.Rectangle(15, 0, 610, 480, "GhostWhite"));
            this.addChild(this._player);
            this.SetGrenades(2);
            this._gernadeManager.GrenadeCount = 2;
            this._enemies.forEach(function (enemy) {
                that.addChild(enemy);
            });
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=Play.js.map