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
    var Loose = /** @class */ (function (_super) {
        __extends(Loose, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Loose() {
            var _this = _super.call(this) || this;
            // initialization
            _this.endLabel = new objects.Label();
            _this.endButton = new objects.Button();
            _this.Start();
            return _this;
        }
        // PUBLIC METHODS
        Loose.prototype.Start = function () {
            this.endLabel = new objects.Label("You Loose!", "80px", "Consolas", "Green", 320, 200, true);
            this.endButton = new objects.Button("./Assets/images/ui/buttons/menu.png", 320, 400, true);
            this.RewindSound("menu");
            this.PlaySound("menu");
            this.Main();
        };
        Loose.prototype.Update = function () {
        };
        Loose.prototype.Main = function () {
            // a hacky way to set the screen's background color
            this.addChild(new objects.Rectangle(0, 0, 640, 480, "#000"));
            this.addChild(this.endLabel);
            this.addChild(this.endButton);
            this.endButton.on("click", function () {
                config.Game.SCENE_STATE = scenes.State.START;
            });
        };
        return Loose;
    }(objects.Scene));
    scenes.Loose = Loose;
})(scenes || (scenes = {}));
//# sourceMappingURL=Loose.js.map