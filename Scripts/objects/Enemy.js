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
        function Enemy(playerPosition, containerWidth, containerHeight) {
            if (playerPosition === void 0) { playerPosition = new objects.Vector2(10, 10); }
            if (containerWidth === void 0) { containerWidth = 640; }
            if (containerHeight === void 0) { containerHeight = 480; }
            var _this = _super.call(this, "./Assets/images/enemy.png", 200, 200, true) || this;
            // PRIVATE INSTANCE MEMBERS
            _this.isAlive = true;
            _this.step = 5;
            _this.movingSpeed = 200;
            _this.playerPosition = new objects.Vector2(10, 10);
            /**
             * This method will move the enemy towards to player
             *
             * @memberof Enemy
             */
            _this.Move = function (pX, pY) {
                var that = _this;
                if (pX > that.x) {
                    that.x += that.step;
                }
                else {
                    that.x -= that.step;
                }
                if (pY > that.y) {
                    that.y += that.step;
                }
                else {
                    that.y -= that.step;
                }
                that.isMoving = false;
            };
            // create enemy
            _this.position = _this.GetRandomPoints(playerPosition, containerWidth, containerHeight);
            _this.playerPosition = playerPosition;
            _this.isMoving = false;
            _this.Start();
            return _this;
        }
        Object.defineProperty(Enemy.prototype, "IsAlive", {
            // PUBLIC PROPERTIES
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
        // Public Methods
        Enemy.prototype._checkBounds = function () {
        };
        Enemy.prototype.Start = function () {
        };
        Enemy.prototype.Update = function (playerNewPositionX, playerNewPositionY) {
            if (playerNewPositionX === void 0) { playerNewPositionX = 10; }
            if (playerNewPositionY === void 0) { playerNewPositionY = 10; }
            this.playerPosition = new objects.Vector2(playerNewPositionX, playerNewPositionY);
            if (this.isColliding) {
                this.Die();
            }
            // Check if the Monster is still alive, catch the player, otherwise, die.
            if (this.isAlive) {
                this.ApproachPlayer(playerNewPositionX, playerNewPositionY);
            }
            else {
                this.Die();
            }
        };
        Enemy.prototype.Reset = function () {
        };
        Enemy.prototype.Die = function () {
            this.visible = false;
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
                console.log("in approach");
                that.isMoving = true;
                setTimeout(that.Move, that.movingSpeed, pX, pY);
            }
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
        Enemy.prototype.GetRandomPoints = function (playerPosition, width, height) {
            var px = playerPosition.x;
            var py = playerPosition.y;
            var rx = 0;
            var ry = 0;
            do {
                // generate random point within the range of stage
                rx = Math.floor(Math.random() * (width - 20)) + 1;
                ry = Math.floor(Math.random() * (height - 20)) + 1;
            } // check to make it far from player by 200 pixels radius
             while ((rx > px + 100 || rx < px - 100) && ry > py + 100 || ry < py - 100);
            return new objects.Vector2(rx, ry);
        };
        return Enemy;
    }(objects.GameObject));
    objects.Enemy = Enemy;
})(objects || (objects = {}));
//# sourceMappingURL=Enemy.js.map