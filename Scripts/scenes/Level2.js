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
    var Level2 = /** @class */ (function (_super) {
        __extends(Level2, _super);
        function Level2(scene) {
            if (scene === void 0) { scene = scenes.State.LEVEL3; }
            var _this = _super.call(this, scene, "./Assets/images/environment/background3.png") || this;
            _this.MaximumEnemies = 8;
            return _this;
        }
        Level2.prototype.ReachedLevelEnd = function () {
            // super.ReachedLevelEnd();
            this.SubBoss.HP = 200;
        };
        return Level2;
    }(scenes.Level1));
    scenes.Level2 = Level2;
})(scenes || (scenes = {}));
//# sourceMappingURL=Level2.js.map