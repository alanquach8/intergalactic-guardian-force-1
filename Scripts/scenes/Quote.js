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
    var Quote = /** @class */ (function (_super) {
        __extends(Quote, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Quote() {
            var _this = _super.call(this) || this;
            _this.quote_alpha = -0.251;
            _this.quote_delta = 0.005;
            // initialization
            _this.startLabel = [];
            window.addEventListener('keydown', function (e) {
                if (config.Game.SCENE_STATE == scenes.State.QUOTE)
                    config.Game.SCENE_STATE = scenes.State.LEVEL1;
            });
            _this.Start();
            return _this;
        }
        // PUBLIC METHODS
        Quote.prototype.Start = function () {
            var fontSize = "25px";
            var font = "Consolas";
            var fontColor = "Green";
            var isCentered = false;
            var xPos = 50;
            this.startLabel = [
                new objects.Label("Two possibilities exist:", fontSize, font, fontColor, xPos, 125, isCentered),
                new objects.Label("  Either we are alone in the Universe,", fontSize, font, fontColor, xPos, 165, isCentered),
                new objects.Label("  or we are not.", fontSize, font, fontColor, xPos, 190, isCentered),
                new objects.Label("Both are equally terrifying.", fontSize, font, fontColor, xPos, 230, isCentered),
                new objects.Label("  ― Arthur C. Clarke ", fontSize, font, fontColor, xPos, 270, isCentered)
            ];
            this.Main();
        };
        Quote.prototype.Update = function () {
            var _this = this;
            this.startLabel.forEach(function (label) {
                label.alpha = _this.quote_alpha;
            });
            this.quote_alpha += this.quote_delta;
            if (this.quote_alpha >= 1) {
                this.quote_delta *= -1;
            }
            // -10 used to allow for some delay on animation completion
            if (this.quote_alpha <= -0.25) {
                config.Game.SCENE_STATE = scenes.State.LEVEL1;
            }
        };
        Quote.prototype.Main = function () {
            var _this = this;
            // a hacky way to set the screen's background color
            this.addChild(new objects.Rectangle(0, 0, 640, 480, "#000"));
            this.startLabel.forEach(function (label) {
                _this.addChild(label);
            });
        };
        return Quote;
    }(objects.Scene));
    scenes.Quote = Quote;
})(scenes || (scenes = {}));
//# sourceMappingURL=Quote.js.map