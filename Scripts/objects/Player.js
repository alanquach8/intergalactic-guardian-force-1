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
        function Player() {
            var _this = _super.call(this, "./Assets/images/placeholder.png", 0, 0, true) || this;
            _this._speed = 1;
            _this._rotate = 1; // degrees
            _this._facing = 270; // initially looking up (-90degrees on canvas axis = 270degrees on normal axis)
            _this._direction = new objects.Vector2(Math.cos(_this.facing * Math.PI / 180), Math.sin(_this.facing * Math.PI / 180));
            window.addEventListener('keydown', function (e) {
                switch (e.code) {
                    case "ArrowUp":
                        _this.y += _this.direction.y * _this.speed;
                        _this.x += _this.direction.x * _this.speed;
                        break;
                    case "ArrowDown":
                        _this.y -= _this.direction.y * _this.speed;
                        _this.x -= _this.direction.x * _this.speed;
                        break;
                    case "ArrowRight":
                        _this.rotation += _this.rotate;
                        _this.facing += _this.rotate;
                        _this._direction = new objects.Vector2(Math.cos(_this.facing * Math.PI / 180), Math.sin(_this.facing * Math.PI / 180));
                        break;
                    case "ArrowLeft":
                        _this.rotation -= _this.rotate;
                        _this.facing -= _this.rotate;
                        _this._direction = new objects.Vector2(Math.cos(_this.facing * Math.PI / 180), Math.sin(_this.facing * Math.PI / 180));
                        break;
                    default:
                        break;
                }
                console.log("x:" + _this.direction.x + ", y:" + _this.direction.y);
                // window.addEventListener('keydown', (e) => {
                //     switch(e.keyCode) {
                //         case 38: //ArrowUp
                //             player.y -= 10;
                //             break;
                //         case 40: //ArrowDown
                //             player.y += 10;
                //             break;
                //         case 39: //ArrowRight
                //             player.rotation += 1;
                //             break;
                //         case 37: //ArrowLeft
                //             player.rotation -= 1;
                //             break;
                //         default:
                //             break;
                //     }
                // });
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
        // PRIVATE METHODS
        Player.prototype._checkBounds = function () {
        };
        // PUBLIC METHODS
        Player.prototype.Start = function () {
        };
        Player.prototype.Update = function () {
        };
        Player.prototype.Reset = function () {
        };
        return Player;
    }(objects.GameObject));
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=Player.js.map