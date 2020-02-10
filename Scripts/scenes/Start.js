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
    var Start = /** @class */ (function (_super) {
        __extends(Start, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Start() {
            var _this = _super.call(this) || this;
            // initialization
            _this.startLabel = new objects.Label();
            _this.startButton = new objects.Button();
            _this.player = new objects.Player();
            _this.enemy = new objects.Enemy();
            _this.bullet = new objects.Bullet();
            _this.Start();
            return _this;
        }
        // PUBLIC METHODS
        Start.prototype.Start = function () {
            this.startLabel = new objects.Label("The Game", "80px", "Consolas", "#000000", 320, 200, true);
            this.startButton = new objects.Button("./Assets/images/startButton.png", 320, 400, true);
            this.player = new objects.Player();
            this.enemy = new objects.Enemy();
            this.bullet = new objects.Bullet();
            this.Main();
        };
        Start.prototype.Update = function () {
            console.log("PLAYER X:" + this.player.x + " " + this.player.position.x); //position is never updated...
            console.log("ENEMY X:" + this.enemy.x + " " + this.enemy.position.x);
            this.player.Update();
            this.enemy.Update(this.player.x, this.player.y);
            this.bullet.Update();
            //managers.Collision.squaredRadiusCheck(player, startButton);
            managers.Collision.AABBCheck(this.player, this.enemy);
            if (this.enemy.isColliding) {
                this.enemy.position = new objects.Vector2(400, 400);
                this.enemy.isColliding = false;
            }
        };
        Start.prototype.Main = function () {
            var _this = this;
            this.addChild(this.startLabel);
            this.addChild(this.startButton);
            this.startButton.on("click", function () {
                config.Game.SCENE_STATE = scenes.State.PLAY;
            });
            this.addChild(this.player);
            this.enemy.position = new objects.Vector2(300, 300);
            this.addChild(this.enemy);
            this.addChild(this.bullet);
            window.addEventListener('keydown', function (e) {
                if (e.code == "Space") {
                    console.log("space pressed");
                    _this.bullet.x = _this.player.x;
                    _this.bullet.y = _this.player.y;
                    _this.bullet.direction = _this.player.direction;
                }
            });
        };
        return Start;
    }(objects.Scene));
    scenes.Start = Start;
})(scenes || (scenes = {}));
//# sourceMappingURL=Start.js.map