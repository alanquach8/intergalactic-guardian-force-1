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
    var SubBoss = /** @class */ (function (_super) {
        __extends(SubBoss, _super);
        function SubBoss() {
            var _this = _super.call(this, "./Assets/images/enemy/subboss/subboss.png", 64, 64, true) || this;
            _this._isAlive = true;
            _this._state = 1;
            _this._hp = 10;
            _this._delta = 3;
            _this._deathEvent = function () { console.log("No action event specified"); };
            return _this;
        }
        Object.defineProperty(SubBoss.prototype, "HP", {
            get: function () {
                return this._hp;
            },
            set: function (hp) {
                this._hp = hp;
            },
            enumerable: true,
            configurable: true
        });
        SubBoss.prototype.ExecuteDeathEvent = function () {
            this._deathEvent();
        };
        Object.defineProperty(SubBoss.prototype, "DeathEvent", {
            get: function () {
                return this._deathEvent;
            },
            set: function (callback) {
                this._deathEvent = callback;
            },
            enumerable: true,
            configurable: true
        });
        SubBoss.prototype.ChangeHP = function (delta) {
            this._hp += delta;
            if (this._hp <= 0) {
                this.image = new createjs.Bitmap("./Assets/images/enemy/subboss/subboss_dead.png").image;
                this._state = -1;
                this.ExecuteDeathEvent();
            }
        };
        Object.defineProperty(SubBoss.prototype, "IsAlive", {
            get: function () {
                return this._isAlive;
            },
            enumerable: true,
            configurable: true
        });
        SubBoss.prototype._checkBounds = function () {
        };
        SubBoss.prototype.Start = function () {
        };
        SubBoss.prototype.Update = function () {
            if (this._state == 1) {
                this.rotation += this._delta;
                this.LateralMovement();
            }
        };
        SubBoss.prototype.LateralMovement = function () {
            if (this.x < 64 || this.x > 576)
                this._delta *= -1;
            this.x += this._delta;
            this.position = new objects.Vector2(this.x, this.y);
        };
        SubBoss.prototype.Reset = function () {
        };
        return SubBoss;
    }(objects.GameObject));
    objects.SubBoss = SubBoss;
})(objects || (objects = {}));
//# sourceMappingURL=SubBoss.js.map