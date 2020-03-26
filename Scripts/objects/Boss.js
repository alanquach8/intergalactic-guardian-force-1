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
var objects;
(function (objects) {
    var Boss = /** @class */ (function (_super) {
        __extends(Boss, _super);
        function Boss(player, inactive) {
            if (inactive === void 0) { inactive = false; }
            return _super.call(this, player, inactive, "./Assets/images/enemy/boss/boss.png") || this;
        }
        Boss.prototype.SetState = function (state) {
            switch (state) {
                case 1:
                case 2:
                    this.DamageMultiplier = 0;
                    break;
                case 3:
                    this.DamageMultiplier = 1;
                    break;
            }
            this.State = state;
        };
        return Boss;
    }(objects.SubBoss));
    objects.Boss = Boss;
})(objects || (objects = {}));
//# sourceMappingURL=Boss.js.map