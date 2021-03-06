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
    var Enemy = /** @class */ (function (_super) {
        __extends(Enemy, _super);
        // CONSTRUCTOR
        function Enemy(playerPosition, containerWidth, containerHeight, startx, starty) {
            if (playerPosition === void 0) { playerPosition = new objects.Vector2(320, 240); }
            if (containerWidth === void 0) { containerWidth = 640; }
            if (containerHeight === void 0) { containerHeight = 480; }
            if (startx === void 0) { startx = -1; }
            if (starty === void 0) { starty = -1; }
            var _this = _super.call(this, "./Assets/images/enemy/minion/minion.png", 200, 200, true) || this;
            // PRIVATE INSTANCE MEMBERS
            _this.isAlive = true;
            _this.step = 1;
            _this.movingSpeed = 500;
            _this.playerPosition = new objects.Vector2(10, 10);
            _this._hitPoints = 5;
            _this.isDying = false;
            _this.isDead = false;
            _this._lockTo = 0;
            /**
             * This method will move the enemy towards to player
             *
             * @memberof Enemy
             */
            _this.Move = function (pX, pY) {
                if (!_this.IsAlive) {
                    return;
                }
                var that = _this;
                if (pX > that.x) {
                    that.position.x += that.step;
                    that.x += that.step;
                }
                else {
                    that.position.x -= that.step;
                    that.x -= that.step;
                }
                if (pY > that.y) {
                    that.position.y += that.step;
                    that.y += that.step;
                }
                else {
                    that.position.y -= that.step;
                    that.y -= that.step;
                }
                that.isMoving = false;
            };
            // create enemy
            if (startx == -1 && starty == -1)
                _this.position = _this._getRandomPoints(playerPosition, containerWidth, containerHeight);
            else
                _this.position = new objects.Vector2(startx, starty);
            _this.playerPosition = playerPosition;
            _this.isMoving = false;
            // Set the random moving speed
            _this.movingSpeed = _this._getRandomSpeed();
            _this.Start();
            return _this;
        }
        Object.defineProperty(Enemy.prototype, "LockTo", {
            // PUBLIC PROPERTIES
            get: function () {
                return this._lockTo;
            },
            set: function (newState) {
                this._lockTo = newState;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Enemy.prototype, "IsAlive", {
            get: function () {
                return this.isAlive;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Enemy.prototype, "IsAllive", {
            set: function (newState) {
                this.isAlive = newState;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Enemy.prototype, "Step", {
            get: function () {
                return this.step;
            },
            set: function (newStep) {
                this.step = newStep;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Enemy.prototype, "PlayerPosition", {
            get: function () {
                return this.playerPosition;
            },
            set: function (newPosition) {
                this.playerPosition = newPosition;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Enemy.prototype, "IsMoving", {
            get: function () {
                return this.isMoving;
            },
            set: function (newState) {
                this.isMoving = newState;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Enemy.prototype, "hitPoints", {
            get: function () {
                return this._hitPoints;
            },
            set: function (newHitPoints) {
                this._hitPoints = newHitPoints;
            },
            enumerable: true,
            configurable: true
        });
        Enemy.prototype._checkBounds = function () {
        };
        // Private Methods
        /**
         * Create random point far from player by at least 100 pixels
         *
         * @protected
         * @param {Vector2} playerPosition
         * @param {number} width
         * @param {number} height
         * @returns {Vector2}
         * @memberof Enemy
         */
        Enemy.prototype._getRandomPoints = function (playerPosition, width, height) {
            var px = playerPosition.x;
            var py = playerPosition.y;
            var rx = 0;
            var ry = 0;
            do {
                // generate random point within the range of stage
                rx = Math.floor(Math.random() * (width - 20)) + 1;
                ry = Math.floor(Math.random() * (height - 380)) + 1;
            } // check to make it far from player by 200 pixels radius
             while ((rx > px + 100 || rx < px - 100) && ry > py - 100);
            return new objects.Vector2(rx, ry);
        };
        /**
         * Method to generate random number for the speed adjustments
         *
         * @protected
         * @returns {number}
         * @memberof Enemy
         */
        Enemy.prototype._getRandomSpeed = function () {
            var rnd = 0;
            do {
                // generate random number up to 1000
                rnd = Math.floor(Math.random() * 1000);
            } // check to make sure it is more than 100 milisecond
             while (rnd < 100);
            return rnd;
        };
        // Public Methods
        Enemy.prototype.Start = function () {
        };
        Enemy.prototype.Update = function (playerNewPositionX, playerNewPositionY) {
            if (playerNewPositionX === void 0) { playerNewPositionX = 10; }
            if (playerNewPositionY === void 0) { playerNewPositionY = 10; }
            this.playerPosition = new objects.Vector2(playerNewPositionX, playerNewPositionY);
            // if(this.isColliding){
            //     this.Die();
            // }
            // Check if the Monster is still alive, catch the player, otherwise, die.
            if (this.isAlive) {
                this.ApproachPlayer(playerNewPositionX, playerNewPositionY);
            }
            else {
                this.Die();
                this.alpha -= 0.01;
                if (this.alpha <= 0) {
                    this.isDead = true;
                }
            }
        };
        Enemy.prototype.Reset = function () {
        };
        Enemy.prototype.Die = function () {
            this.image = new createjs.Bitmap("./Assets/images/enemy/minion/minion_dead.png").image;
            this.isAlive = false;
        };
        /**
         * This method will approch the enemy to player by moving speed
         *
         * @param {number} pX player x
         * @param {number} pY player y
         * @memberof Enemy
         */
        Enemy.prototype.ApproachPlayer = function (pX, pY) {
            var that = this;
            if (!that.isMoving) {
                that.isMoving = true;
                // Moving by step number per random time
                setTimeout(that.Move, that.movingSpeed, pX, pY);
            }
        };
        return Enemy;
    }(objects.GameObject));
    objects.Enemy = Enemy;
})(objects || (objects = {}));
//# sourceMappingURL=Enemy.js.map