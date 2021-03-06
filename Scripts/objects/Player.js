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
        function Player(playerId, imagePath, x, y, isCentered) {
            if (imagePath === void 0) { imagePath = "./Assets/images/player/top.png"; }
            if (x === void 0) { x = 320; }
            if (y === void 0) { y = 250; }
            if (isCentered === void 0) { isCentered = true; }
            var _this = _super.call(this, config.Game.PLAYER_IMAGES[playerId - 1], x, y, true) || this;
            // PRIVATE INSTANCE MEMBERS
            _this._boxCollision = "";
            _this._speed = 0.5;
            _this._stationarySpeed = 1;
            _this._rotate = 0.75; // degrees
            _this._stationaryRotate = 1.25;
            _this._life = 10;
            _this._reloadSpeed = 10;
            _this._reloadCounter = 0;
            _this._isReviving = false;
            _this._wallBuffer = 30;
            _this._score = 0;
            _this._forward = false;
            _this._backward = false;
            _this._left = false;
            _this._right = false;
            _this._shoot = false;
            _this._isRidingSegway = false;
            _this._pierceCount = 1;
            _this._superHero = false;
            _this._facing = 270; // initially looking up (-90degrees on canvas axis = 270degrees on normal axis)
            _this._direction = new objects.Vector2(0, -1);
            _this._bullets = [];
            _this._playerId = playerId;
            if (playerId == 1) {
                _this._controlArray = ["KeyW", "KeyS", "KeyD", "KeyA", "Space"];
                _this.x = 200;
            }
            else {
                _this._controlArray = ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft", "ShiftRight"];
                _this.x = 440;
            }
            window.addEventListener('keyup', function (e) {
                switch (e.code) {
                    case _this._controlArray[0]:
                        _this._forward = false;
                        break;
                    case _this._controlArray[1]:
                        _this._backward = false;
                        break;
                    case _this._controlArray[2]:
                        _this._right = false;
                        break;
                    case _this._controlArray[3]:
                        _this._left = false;
                        break;
                    case _this._controlArray[4]:
                        _this._shoot = false;
                        break;
                }
            });
            window.addEventListener('keydown', function (e) {
                switch (e.code) {
                    case _this._controlArray[0]:
                        _this._forward = true;
                        break;
                    case _this._controlArray[1]:
                        _this._backward = true;
                        break;
                    case _this._controlArray[2]:
                        _this._right = true;
                        break;
                    case _this._controlArray[3]:
                        _this._left = true;
                        break;
                    case _this._controlArray[4]:
                        _this._shoot = true;
                        break;
                }
            });
            _this.Start();
            return _this;
        }
        Object.defineProperty(Player.prototype, "PierceCount", {
            get: function () {
                return this._pierceCount;
            },
            set: function (value) {
                this._pierceCount = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "SuperHero", {
            get: function () {
                return this._superHero;
            },
            set: function (val) {
                this._superHero = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "Forward", {
            get: function () {
                return this._forward;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "Backward", {
            get: function () {
                return this._backward;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "IsRidingSegway", {
            get: function () {
                return this._isRidingSegway;
            },
            set: function (value) {
                this._isRidingSegway = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "BoxCollision", {
            get: function () {
                return this._boxCollision;
            },
            set: function (value) {
                this._boxCollision = value;
            },
            enumerable: true,
            configurable: true
        });
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
                var multiplier = 1;
                if (this.IsRidingSegway)
                    multiplier = 2;
                if (!this._shoot) {
                    return this._stationarySpeed * multiplier;
                }
                return this._speed * multiplier;
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
        Object.defineProperty(Player.prototype, "Score", {
            get: function () {
                return this._score;
            },
            set: function (newScore) {
                this._score = newScore;
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
                if (this.BoxCollision == "") {
                    this.y += this.Direction.y * this.Speed;
                    this.x += this.Direction.x * this.Speed;
                }
                else {
                    if (this.BoxCollision == "right") {
                        this.y += this.Direction.y * this.Speed;
                        if ((this.Direction.x * this.Speed) + this.x > this.x) {
                            this.x += this.Direction.x * this.Speed;
                        }
                    }
                    if (this.BoxCollision == "left") {
                        this.y += this.Direction.y * this.Speed;
                        if ((this.Direction.x * this.Speed) + this.x < this.x) {
                            this.x += this.Direction.x * this.Speed;
                        }
                    }
                    if (this.BoxCollision == "top") {
                        this.x += this.Direction.x * this.Speed;
                        if ((this.Direction.y * this.Speed) + this.y < this.y) {
                            this.y += this.Direction.y * this.Speed;
                        }
                    }
                    if (this.BoxCollision == "bottom") {
                        this.x += this.Direction.x * this.Speed;
                        if ((this.Direction.y * this.Speed) + this.y > this.y) {
                            this.y += this.Direction.y * this.Speed;
                        }
                    }
                }
                if (this.x <= this._wallBuffer)
                    this.x -= this.Direction.x * this.Speed;
                if (this.x >= 640 - this._wallBuffer)
                    this.x -= this.Direction.x * this.Speed;
                if (this.y >= 470)
                    this.y -= this.Direction.y * this.Speed;
            }
            if (this._backward) {
                if (this.BoxCollision == "") {
                    this.y -= this.Direction.y * this.Speed;
                    this.x -= this.Direction.x * this.Speed;
                }
                else {
                    if (this.BoxCollision == "right") {
                        this.y -= this.Direction.y * this.Speed;
                        if (this.x - (this.Direction.x * this.Speed) > this.x) {
                            this.x -= this.Direction.x * this.Speed;
                        }
                    }
                    if (this.BoxCollision == "left") {
                        this.y -= this.Direction.y * this.Speed;
                        if (this.x - (this.Direction.x * this.Speed) < this.x) {
                            this.x -= this.Direction.x * this.Speed;
                        }
                    }
                    if (this.BoxCollision == "top") {
                        this.x -= this.Direction.x * this.Speed;
                        if (this.y - (this.Direction.y * this.Speed) < this.y) {
                            this.y -= this.Direction.y * this.Speed;
                        }
                    }
                    if (this.BoxCollision == "bottom") {
                        this.x -= this.Direction.x * this.Speed;
                        if (this.y - (this.Direction.y * this.Speed) > this.y) {
                            this.y -= this.Direction.y * this.Speed;
                        }
                    }
                }
                if (this.x <= this._wallBuffer)
                    this.x += this.Direction.x * this.Speed;
                if (this.x >= 640 - this._wallBuffer)
                    this.x += this.Direction.x * this.Speed;
                if (this.y >= 470)
                    this.y += this.Direction.y * this.Speed;
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
                    bullet.PierceCount = this._pierceCount;
                    this._bullets.push(bullet);
                    this.parent.addChild(bullet);
                    var sound = void 0;
                    sound = createjs.Sound.play("shoot");
                    sound.volume = 0.5;
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