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
    var Player = /** @class */ (function (_super) {
        __extends(Player, _super);
        // CONSTRUCTOR
        function Player(imagePath, x, y, isCentered) {
            if (imagePath === void 0) { imagePath = "/Assets/images/player/top.png"; }
            if (x === void 0) { x = 320; }
            if (y === void 0) { y = 250; }
            if (isCentered === void 0) { isCentered = true; }
            var _this = _super.call(this, imagePath, x, y, true) || this;
            _this._speed = 0.5;
            _this._stationarySpeed = 1;
            _this._rotate = 0.5; // degrees
            _this._stationaryRotate = 1;
            _this._life = 10;
            _this._reloadSpeed = 10;
            _this._reloadCounter = 0;
            _this._isReviving = false;
            _this._wallBuffer = 30;
            _this._forward = false;
            _this._backward = false;
            _this._left = false;
            _this._right = false;
            _this._shoot = false;
            _this._facing = 270; // initially looking up (-90degrees on canvas axis = 270degrees on normal axis)
            _this._direction = new objects.Vector2(0, -1);
            _this._bullets = [];
            window.addEventListener('keyup', function (e) {
                switch (e.code) {
                    case "ArrowUp":
                        _this._forward = false;
                        break;
                    case "ArrowDown":
                        _this._backward = false;
                        break;
                    case "ArrowRight":
                        _this._right = false;
                        break;
                    case "ArrowLeft":
                        _this._left = false;
                        break;
                    case "Space":
                        _this._shoot = false;
                        break;
                }
            });
            window.addEventListener('keydown', function (e) {
                switch (e.code) {
                    case "ArrowUp":
                        _this._forward = true;
                        break;
                    case "ArrowDown":
                        _this._backward = true;
                        break;
                    case "ArrowRight":
                        _this._right = true;
                        break;
                    case "ArrowLeft":
                        _this._left = true;
                        break;
                    case "Space":
                        _this._shoot = true;
                        break;
                }
            });
            _this.Start();
            return _this;
        }
        Object.defineProperty(Player.prototype, "IsReviving", {
            // PUBLIC PROPERTIES
            get: function () {
                return this._isReviving;
            },
            set: function (newState) {
                this._isReviving = newState;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "Direction", {
            get: function () {
                return this._direction;
            },
            set: function (newDirection) {
                this._direction = newDirection;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "Speed", {
            get: function () {
                if (!this._shoot) {
                    return this._stationarySpeed;
                }
                return this._speed;
            },
            set: function (newSpeed) {
                this._speed = newSpeed;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "Facing", {
            get: function () {
                return this._facing;
            },
            set: function (newFacing) {
                this._facing = newFacing;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "Rotate", {
            get: function () {
                if (!this._shoot) {
                    return this._stationaryRotate;
                }
                return this._rotate;
            },
            set: function (newRotate) {
                this._rotate = newRotate;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "Bullets", {
            get: function () {
                return this._bullets;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "Life", {
            get: function () {
                return this._life;
            },
            set: function (newLife) {
                this._life = newLife;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "ReloadSpeed", {
            get: function () {
                return this._reloadSpeed;
            },
            set: function (newReloadSpeed) {
                this._reloadSpeed = newReloadSpeed;
            },
            enumerable: true,
            configurable: true
        });
        // PRIVATE METHODS
        Player.prototype._checkBounds = function () {
        };
        Player.prototype.RecalculateDirection = function () {
            this._direction = new objects.Vector2(Math.cos(this.Facing * Math.PI / 180), Math.sin(this.Facing * Math.PI / 180));
        };
        // PUBLIC METHODS
        Player.prototype.Start = function () {
        };
        Player.prototype.Update = function () {
            if (this._forward) {
                this.y += this.Direction.y * this.Speed;
                this.x += this.Direction.x * this.Speed;
                if (this.x <= this._wallBuffer)
                    this.x -= this.Direction.x * this.Speed;
                if (this.x >= 640 - this._wallBuffer)
                    this.x -= this.Direction.x * this.Speed;
                if (this.y >= 470)
                    this.y -= this.Direction.y * this.Speed;
            }
            if (this._backward) {
                this.y -= this.Direction.y * this.Speed;
                this.x -= this.Direction.x * this.Speed;
                if (this.x <= this._wallBuffer)
                    this.x += this.Direction.x * this.Speed;
                if (this.x >= 640 - this._wallBuffer)
                    this.x += this.Direction.x * this.Speed;
            }
            if (this._right) {
                this.rotation += this.Rotate;
                this.Facing += this.Rotate;
                this.RecalculateDirection();
            }
            if (this._left) {
                this.rotation -= this.Rotate;
                this.Facing -= this.Rotate;
                this.RecalculateDirection();
            }
            this.position = new objects.Vector2(this.x, this.y);
            if (this._shoot) {
                if (this._reloadCounter == 0) {
                    var bullet = new objects.Bullet();
                    bullet.x = this.x;
                    bullet.y = this.y;
                    bullet.direction = this.Direction;
                    bullet.rotation = this.rotation;
                    this._bullets.push(bullet);
                    this.parent.addChild(bullet);
                    this._reloadCounter = this._reloadSpeed;
                }
                else {
                    this._reloadCounter--;
                }
            }
            else {
                this._reloadCounter = 0;
            }
            for (var i = 0; i < this._bullets.length; i++) {
                this._bullets[i].Update();
            }
        };
        Player.prototype.Reset = function () {
            var that = this;
            var revivalInterval = setInterval(function () {
                that.alpha = 0;
                setTimeout(function () {
                    that.alpha = 1;
                }, 50);
            }, 100);
            // TODO here we can add an IF to check if player still has life to continue
            this.x = 320; // TODO values should come from a variable
            this.y = 250; // TODO values should come from a variable
            this.visible = true;
            this.isColliding = false;
            this._isReviving = true;
            setTimeout(function () {
                clearInterval(revivalInterval);
                that._isReviving = false;
            }, 3000);
        };
        Player.prototype.Die = function () {
            this.visible = false;
        };
        return Player;
    }(objects.GameObject));
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=Player.js.map