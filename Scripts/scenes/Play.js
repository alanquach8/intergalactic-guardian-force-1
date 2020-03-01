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
            _this.enemy = new objects.Enemy();
            _this.Start();
            return _this;
        }
        // PUBLIC METHODS
        Play.prototype.Start = function () {
            this.playLabel = new objects.Label("Play Game", "80px", "Consolas", "#000000", 320, 200, true);
            this.nextButton = new objects.Button("./Assets/images/nextButton.png", 320, 400, true);
            this.player = new objects.Player();
            this.enemy = new objects.Enemy();
            this.Main();
        };
        Play.prototype.Update = function () {
            this.player.Update();
            this.enemy.Update(this.player.x, this.player.y);
            //this.bullet.Update();
            //managers.Collision.squaredRadiusCheck(player, startButton);
            // managers.Collision.AABBCheck(this.player, this.enemy);
            // managers.Collision.squaredRadiusCheck(this.player, this.enemy);
            // managers.Collision.AABBCheck(this.bullet, this.enemy);
            // managers.Collision.squaredRadiusCheck(this.bullet, this.enemy);
            for (var i = 0; i < this.player.bullets.length; i++) {
                managers.Collision.AABBCheck(this.player.bullets[i], this.enemy);
            }
            if (this.enemy.isColliding) {
                this.removeChild(this.enemy);
                // console.log(this.player.bullets[0].position);
                // console.log("BULLET (x,y): (" + this.player.bullets[0].x + ", " + this.player.bullets[0].y + ")");
                // console.log("BULLET (regX,regY): (" + this.player.bullets[0].regX + ", " + this.player.bullets[0].regY + ")");
                // console.log(this.enemy.position);
                // console.log("ENEMY (x,y): (" + this.enemy.x + ", " + this.enemy.y + ")");
                // console.log("ENEMY (regX,regY): (" + this.enemy.regX + ", " + this.enemy.regY + ")");
                // console.log(this.player.position);
                // console.log("PLAYER (x,y): (" + this.player.x + ", " + this.player.y + ")");
                // console.log("PLAYER (regX,regY): (" + this.player.regX + ", " + this.player.regY + ")");
                //this.enemy.isColliding = false;
            }
        };
        Play.prototype.Main = function () {
            this.addChild(this.playLabel);
            this.addChild(this.nextButton);
            this.nextButton.on("click", function () {
                config.Game.SCENE_STATE = scenes.State.END;
            });
            this.addChild(this.player);
            this.enemy.position = new objects.Vector2(300, 300);
            this.addChild(this.enemy);
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=Play.js.map