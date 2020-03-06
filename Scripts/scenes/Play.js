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
            _this._noOfEnemies = 5;
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
        Play.prototype.Update = function () {
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
                        }
                        // remove the bullet
                        if (enemy.IsAlive) {
                            that._player.Bullets.splice(that._player.Bullets.indexOf(bullet), 1);
                            that.removeChild(bullet);
                        }
                    }
                });
                if (enemy.isDead) {
                    that._enemies.splice(that._enemies.indexOf(enemy), 1);
                    that.removeChild(enemy);
                }
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
        };
        Play.prototype.Main = function () {
            var that = this;
            this.addChild(this._player);
            this._enemies.forEach(function (enemy) {
                that.addChild(enemy);
            });
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=Play.js.map