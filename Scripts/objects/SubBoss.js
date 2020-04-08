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
        function SubBoss(player, inactive, image) {
            if (inactive === void 0) { inactive = false; }
            if (image === void 0) { image = "./Assets/images/enemy/subboss/subboss.png"; }
            var _this = _super.call(this, image, 64, -64, true) || this;
            _this._isAlive = true;
            _this._state = 1;
            _this._maHP = 100;
            _this._delta = 3;
            _this._deathEvent = function () { console.log("No action event specified"); };
            _this._bullets = [];
            _this._reloadSpeed = 10;
            _this._damageMultiplier = 1;
            _this._maxState = 3;
            _this._deathImage = "./Assets/images/enemy/subboss/subboss_dead.png";
            _this._direction = new objects.Vector2(0, 1);
            _this._facing = 90;
            _this._player = player;
            _this._inactive = inactive;
            _this._hp = _this._maHP;
            _this._reloadCounter = _this._reloadSpeed;
            setInterval(function () { _this.CycleState(); }, 5 * 1000);
            _this._healthBarBack = new objects.Rectangle(0, 0, _this.width, 10, "Gray");
            _this._healthBarValue = new objects.Rectangle(0, 0, 0, 10, "red");
            _this.UpdateHealthBar();
            return _this;
        }
        Object.defineProperty(SubBoss.prototype, "DeathImage", {
            set: function (path) {
                this._deathImage = path;
            },
            enumerable: true,
            configurable: true
        });
        SubBoss.prototype.UpdateHealthBar = function () {
            if (this.parent == null)
                return;
            this.parent.removeChild(this._healthBarBack);
            this.parent.removeChild(this._healthBarValue);
            if (!this.IsAlive)
                return;
            this._healthBarBack = new objects.Rectangle(this.x - this.halfWidth, this.y + this.halfHeight, this.width, 10, "Gray");
            this._healthBarValue = new objects.Rectangle(this.x - this.halfWidth, this.y + this.halfHeight, (this._hp / this._maHP) * this.width, 10, "red");
            this.parent.addChild(this._healthBarBack);
            this.parent.addChild(this._healthBarValue);
        };
        Object.defineProperty(SubBoss.prototype, "DamageMultiplier", {
            get: function () {
                return this._damageMultiplier;
            },
            set: function (val) {
                this._damageMultiplier = val;
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
            // tan was causing some weird errors because of the ambiguity
            var dy = (y - this.y);
            var dx = (x - this.x);
            var theta = Math.asin(dy / Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))) * (180 / Math.PI);
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
                this._maHP = hp;
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
        Object.defineProperty(SubBoss.prototype, "State", {
            set: function (val) {
                this._state = val;
            },
            enumerable: true,
            configurable: true
        });
        SubBoss.prototype.CycleState = function () {
            if (this._isAlive) {
                var num = this._state + 1;
                if (this._state + 1 > this._maxState) {
                    num = 1;
                }
                this.SetState(num);
            }
        };
        SubBoss.prototype.ChangeHP = function (delta) {
            this._hp += delta;
            if (this._hp <= 0) {
                this.image = new createjs.Bitmap(this._deathImage).image;
                this._state = -1;
                this._isAlive = false;
                var sound = void 0;
                sound = createjs.Sound.play("boss_dying");
                this.ExecuteDeathEvent();
                config.Game.SCORE += this._maHP;
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
                bullet.Update();
                if (bullet.IsOffScreen(-50)) {
                    _this.parent.removeChild(bullet);
                    _this._bullets.splice(_this._bullets.indexOf(bullet), 1);
                }
            });
            this.UpdateHealthBar();
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