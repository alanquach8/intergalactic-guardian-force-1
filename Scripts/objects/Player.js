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
            if (x === void 0) { x = 200; }
            if (y === void 0) { y = 200; }
            if (isCentered === void 0) { isCentered = true; }
            var _this = _super.call(this, imagePath, x, y, true) || this;
            _this._speed = 1;
            _this._rotate = 1; // degrees
            _this.forward = false;
            _this.backward = false;
            _this.left = false;
            _this.right = false;
            _this.shoot = false;
            _this._facing = 270; // initially looking up (-90degrees on canvas axis = 270degrees on normal axis)
            _this._direction = new objects.Vector2(0, -1);
            _this._bullets = [];
            window.addEventListener('keyup', function (e) {
                switch (e.code) {
                    case "ArrowUp":
                        _this.forward = false;
                        break;
                    case "ArrowDown":
                        _this.backward = false;
                        break;
                    case "ArrowRight":
                        _this.right = false;
                        break;
                    case "ArrowLeft":
                        _this.left = false;
                        break;
                    case "Space":
                        _this.shoot = false;
                        break;
                }
            });
            window.addEventListener('keydown', function (e) {
                switch (e.code) {
                    case "ArrowUp":
                        _this.forward = true;
                        break;
                    case "ArrowDown":
                        _this.backward = true;
                        break;
                    case "ArrowRight":
                        _this.right = true;
                        break;
                    case "ArrowLeft":
                        _this.left = true;
                        break;
                    case "Space":
                        _this.shoot = true;
                        break;
                }
            });
            _this.Start();
            return _this;
        }
        Object.defineProperty(Player.prototype, "direction", {
            // PUBLIC PROPERTIES
            get: function () {
                return this._direction;
            },
            set: function (newDirection) {
                this._direction = newDirection;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "speed", {
            get: function () {
                return this._speed;
            },
            set: function (newSpeed) {
                this._speed = newSpeed;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "facing", {
            get: function () {
                return this._facing;
            },
            set: function (newFacing) {
                this._facing = newFacing;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "rotate", {
            get: function () {
                return this._rotate;
            },
            set: function (newRotate) {
                this._rotate = newRotate;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "bullets", {
            get: function () {
                return this._bullets;
            },
            enumerable: true,
            configurable: true
        });
        // PRIVATE METHODS
        Player.prototype._checkBounds = function () {
        };
        Player.prototype.RecalculateDirection = function () {
            this._direction = new objects.Vector2(Math.cos(this.facing * Math.PI / 180), Math.sin(this.facing * Math.PI / 180));
        };
        // PUBLIC METHODS
        Player.prototype.Start = function () {
        };
        Player.prototype.Update = function () {
            if (this.forward) {
                this.y += this.direction.y * this.speed;
                this.x += this.direction.x * this.speed;
            }
            if (this.backward) {
                this.y -= this.direction.y * this.speed;
                this.x -= this.direction.x * this.speed;
            }
            if (this.right) {
                this.rotation += this.rotate;
                this.facing += this.rotate;
                this.RecalculateDirection();
            }
            if (this.left) {
                this.rotation -= this.rotate;
                this.facing -= this.rotate;
                this.RecalculateDirection();
            }
            this.position = new objects.Vector2(this.x, this.y);
            if (this.shoot) {
                var bullet = new objects.Bullet();
                bullet.x = this.x;
                bullet.y = this.y;
                bullet.direction = this.direction;
                this._bullets.push(bullet);
                this.parent.addChild(bullet);
            }
            for (var i = 0; i < this._bullets.length; i++) {
                this._bullets[i].Update();
            }
        };
        Player.prototype.Reset = function () {
        };
        Player.prototype.Die = function () {
            this.visible = false;
        };
        return Player;
    }(objects.GameObject));
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=Player.js.map