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
            _this.Start();
            return _this;
        }
        // PUBLIC METHODS
        Start.prototype.Start = function () {
            this.startLabel = new objects.Label("The Game", "80px", "Consolas", "#000000", 320, 200, true);
            this.startButton = new objects.Button("./Assets/images/startButton.png", 320, 400, true);
            this.Main();
        };
        Start.prototype.Update = function () {
        };
        Start.prototype.Main = function () {
            this.addChild(this.startLabel);
            this.addChild(this.startButton);
            this.startButton.on("click", function () {
                config.Game.SCENE_STATE = scenes.State.QUOTE;
            });
        };
        return Start;
    }(objects.Scene));
    scenes.Start = Start;
})(scenes || (scenes = {}));
//# sourceMappingURL=Start.js.map