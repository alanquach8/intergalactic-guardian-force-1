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
            _this.logoImage = new createjs.Bitmap("Assets/images/ui/logo.png");
            _this.logoImage.regX = _this.logoImage.getBounds().width * 0.5;
            _this.logoImage.scaleX = 0.6;
            _this.logoImage.scaleY = 0.6;
            _this.logoImage.x = 320;
            _this.logoImage.y = 10;
            _this.play1 = new objects.Button();
            _this.play2 = new objects.Button();
            _this.companyLabel = new objects.Label();
            _this.Start();
            return _this;
        }
        // PUBLIC METHODS
        Start.prototype.Start = function () {
            this.play1 = new objects.Button("./Assets/images/ui/buttons/1player.png", 320, 240, true);
            this.play2 = new objects.Button("./Assets/images/ui/buttons/2player.png", 320, 320, true);
            this.companyLabel = new objects.Label("MACK Address Games", "15px", "Consolas", "Green", 320, 90, true);
            this.Main();
        };
        Start.prototype.Update = function () {
        };
        Start.prototype.Main = function () {
            // a hacky way to set the screen's background color
            this.addChild(new objects.Rectangle(0, 0, 640, 480, "#000"));
            this.addChild(this.logoImage);
            this.addChild(this.companyLabel);
            this.addChild(this.play1);
            this.addChild(this.play2);
            config.Game.PLAYER_IMAGES = [];
            this.play1.on("click", function () {
                // config.Game.SCENE_STATE = scenes.State.QUOTE;
                config.Game.NO_OF_PLAYERS = 1;
                config.Game.SCENE_STATE = scenes.State.CHARACTER_SELECTION;
            });
            this.play2.on("click", function () {
                // config.Game.SCENE_STATE = scenes.State.QUOTE;
                config.Game.NO_OF_PLAYERS = 2;
                config.Game.SCENE_STATE = scenes.State.CHARACTER_SELECTION;
            });
        };
        return Start;
    }(objects.Scene));
    scenes.Start = Start;
})(scenes || (scenes = {}));
//# sourceMappingURL=Start.js.map