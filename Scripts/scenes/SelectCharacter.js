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
    var SelectCharacter = /** @class */ (function (_super) {
        __extends(SelectCharacter, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function SelectCharacter() {
            var _this = _super.call(this) || this;
            // initialization
            _this.title = new objects.Label();
            _this.mButton = new objects.Button();
            _this.aButton = new objects.Button();
            _this.cButton = new objects.Button();
            _this.kButton = new objects.Button();
            _this.Start();
            return _this;
        }
        SelectCharacter.prototype.RefreshTitle = function () {
            this.removeChild(this.title);
            this.title = new objects.Label("Player " + (config.Game.PLAYER_IMAGES.length + 1) + " Character Select", "30px", "Consolas", "Green", 320, 20, true);
            this.addChild(this.title);
        };
        // PUBLIC METHODS
        SelectCharacter.prototype.Start = function () {
            this.RefreshTitle();
            this.mButton = new objects.Button("./Assets/images/player/m/front.png", 125, 300, false);
            this.aButton = new objects.Button("./Assets/images/player/a/front.png", 225, 300, false);
            this.cButton = new objects.Button("./Assets/images/player/c/front.png", 325, 300, false);
            this.kButton = new objects.Button("./Assets/images/player/k/front.png", 425, 300, false);
            this.mButton.ScaleImage(3);
            this.aButton.ScaleImage(3);
            this.cButton.ScaleImage(3);
            this.kButton.ScaleImage(3);
            this.menuTheme = createjs.Sound.play("menu_theme");
            this.menuTheme.loop = -1; // loop forever
            this.Main();
        };
        SelectCharacter.prototype.Update = function () {
        };
        SelectCharacter.prototype.SetSelection = function (letter) {
            var _a;
            config.Game.PLAYER_IMAGES.push("./Assets/images/player/" + letter + "/top.png");
            if (config.Game.PLAYER_IMAGES.length == 1 && config.Game.NO_OF_PLAYERS == 2) {
                this.RefreshTitle();
            }
            else {
                (_a = this.menuTheme) === null || _a === void 0 ? void 0 : _a.stop();
                config.Game.SCENE_STATE = scenes.State.QUOTE;
            }
        };
        SelectCharacter.prototype.Main = function () {
            // a hacky way to set the screen's background color
            this.addChild(new objects.Rectangle(0, 0, 640, 480, "#000"));
            this.addChild(this.title);
            this.addChild(this.mButton);
            this.addChild(this.aButton);
            this.addChild(this.cButton);
            this.addChild(this.kButton);
            var that = this;
            this.mButton.on("click", function () {
                that.SetSelection("m");
                that.removeChild(that.mButton);
            });
            this.aButton.on("click", function () {
                that.SetSelection("a");
                that.removeChild(that.aButton);
            });
            this.cButton.on("click", function () {
                that.SetSelection("c");
                that.removeChild(that.cButton);
            });
            this.kButton.on("click", function () {
                that.SetSelection("k");
                that.removeChild(that.kButton);
            });
        };
        return SelectCharacter;
    }(objects.Scene));
    scenes.SelectCharacter = SelectCharacter;
})(scenes || (scenes = {}));
//# sourceMappingURL=SelectCharacter.js.map