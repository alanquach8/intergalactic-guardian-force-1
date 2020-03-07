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
        function SubBoss(player, inactive) {
            if (inactive === void 0) { inactive = false; }
            var _this = _super.call(this, "./Assets/images/enemy/subboss/subboss.png", 64, -64, true) || this;
            _this._isAlive = true;
            _this._state = 1;
            _this._hp = 100;
            _this._delta = 3;
            _this._deathEvent = function () { console.log("No action event specified"); };
            _this._bullets = [];
            _this._reloadSpeed = 10;
            _this._damageMultiplier = 1;
            _this._direction = new objects.Vector2(0, 1);
            _this._facing = 90;
            _this._player = player;
            _this._inactive = inactive;
            _this._reloadCounter = _this._reloadSpeed;
            setInterval(function () { _this.CycleState(); }, 5 * 1000);
            return _this;
        }
        Object.defineProperty(SubBoss.prototype, "DamageMultiplier", {
            get: function () {
                return this._damageMultiplier;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubBoss.prototype, "Bullets", {
            get: function () {
                return this._bullets;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SubBoss.prototype, "Facing", {
            get: function () {
                return this._facing;
            },
            set: function (newFacing) {
                this._facing = newFacing;
            },
            enumerable: true,
            configurable: true
        });
        SubBoss.prototype.Rotate = function (degrees) {
            this.rotation += degrees;
            this.Facing += degrees;
            this.RecalculateDirection();
        };
        SubBoss.prototype.SetRotation = function (degrees) {
            this.rotation = degrees;
            this.Facing = degrees;
            this.RecalculateDirection();
        };
        SubBoss.prototype.FacePoint = function (x, y) {
            var theta = Math.atan((y - this.y) / (x - this.x)) * (180 / Math.PI);
            this.SetRotation(theta);
        };
        SubBoss.prototype.FacePlayer = function () {
            this.FacePoint(this._player.x, this._player.y);
        };
        SubBoss.prototype.RecalculateDirection = function () {
            this._direction = new objects.Vector2(Math.cos(this.Facing * Math.PI / 180), Math.sin(this.Facing * Math.PI / 180));
        };
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
        SubBoss.prototype.SetState = function (state) {
            switch (state) {
                case 1:
                case 2:
                    this._damageMultiplier = 1;
                    break;
                case 3:
                    this._damageMultiplier = 2;
                    break;
            }
            this._state = state;
        };
        SubBoss.prototype.CycleState = function () {
            if (this._isAlive) {
                var num = this._state + 1;
                if (this._state + 1 > 3) {
                    num = 1;
                }
                this.SetState(num);
            }
        };
        SubBoss.prototype.ChangeHP = function (delta) {
            this._hp += delta;
            if (this._hp <= 0) {
                this.image = new createjs.Bitmap("./Assets/images/enemy/subboss/subboss_dead.png").image;
                this._state = -1;
                this._isAlive = false;
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
            var _this = this;
            if (this._inactive) {
                return;
            }
            switch (this._state) {
                case 1:
                    this.Rotate(this._delta);
                    this.LateralMovement();
                    this.Shoot();
                    break;
                case 2:
                    this.FacePlayer();
                    this.Shoot();
                    break;
                case 3:
                    break;
            }
            this._bullets.forEach(function (bullet) {
                if (bullet.IsOffScreen()) {
                    _this.parent.removeChild(bullet);
                    _this._bullets.splice(_this._bullets.indexOf(bullet), 1);
                }
                bullet.Update();
            });
        };
        SubBoss.prototype.LateralMovement = function () {
            if (this.x < 64 || this.x > 576)
                this._delta *= -1;
            this.x += this._delta;
            this.position = new objects.Vector2(this.x, this.y);
        };
        SubBoss.prototype.Reset = function () {
        };
        SubBoss.prototype.Shoot = function () {
            if (this.parent != null) {
                if (--this._reloadCounter <= 0) {
                    var bullet = new objects.BulletSlime();
                    bullet.x = this.x;
                    bullet.y = this.y;
                    bullet.direction = this.Direction;
                    bullet.rotation = this.rotation;
                    this.parent.addChild(bullet);
                    this._bullets.push(bullet);
                    this._reloadCounter = this._reloadSpeed;
                }
            }
        };
        Object.defineProperty(SubBoss.prototype, "Direction", {
            get: function () {
                return this._direction;
            },
            set: function (newDirection) {
                this._direction = newDirection;
            },
            enumerable: true,
            configurable: true
        });
        return SubBoss;
    }(objects.GameObject));
    objects.SubBoss = SubBoss;
})(objects || (objects = {}));
//# sourceMappingURL=SubBoss.js.map