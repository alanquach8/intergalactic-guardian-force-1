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
            _this.playLabel = new objects.Label();
            _this.nextButton = new objects.Button();
            _this.player = new objects.Player();
            _this.enemies = new Array();
            _this.Start();
            return _this;
        }
        // PUBLIC METHODS
        Play.prototype.Start = function () {
            this.playLabel = new objects.Label("Game Started", "10px", "Consolas", "#000000", 320, 200, true);
            this.nextButton = new objects.Button("./Assets/images/nextButton.png", 320, 400, true);
            this.player = new objects.Player();
            // Add Enemies to the array
            for (var i = 0; i < 5; i++) { //TODO add a Variable for number of enemies currently hardcoded to 5
                this.enemies.push(new objects.Enemy());
            }
            this.Main();
        };
        Play.prototype.Update = function () {
            // Reference to the Play Scene Object
            var that = this;
            this.player.Update();
            this.enemies.forEach(function (enemy) {
                enemy.Update(that.player.x, that.player.y);
                // Bullets and Enemy Collision Check
                that.player.bullets.forEach(function (bullet) {
                    managers.Collision.AABBCheck(bullet, enemy);
                    if (enemy.isColliding) {
                        if (enemy.isDead) {
                            // remove the enemy
                            that.enemies.splice(that.enemies.indexOf(enemy), 1);
                            that.removeChild(enemy);
                        }
                        // remove the bullet
                        that.player.bullets.splice(that.player.bullets.indexOf(bullet), 1);
                        that.removeChild(bullet);
                    }
                });
                // Enemy and Player Collision Check
                managers.Collision.AABBCheck(enemy, that.player);
                if (that.player.isColliding) {
                    that.player.Reset();
                }
            });
        };
        Play.prototype.Main = function () {
            var that = this;
            this.addChild(this.playLabel);
            this.addChild(this.nextButton);
            this.nextButton.on("click", function () {
                config.Game.SCENE_STATE = scenes.State.END;
            });
            this.addChild(this.player);
            this.enemies.forEach(function (enemy) {
                that.addChild(enemy);
            });
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=Play.js.map