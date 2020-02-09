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
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Enemy(playerPosition) {
            if (playerPosition === void 0) { playerPosition = new objects.Vector2(0, 0); }
            var _this = _super.call(this, "./Assets/images/placeholder.png", 0, 0, true) || this;
            // PRIVATE INSTANCE MEMBERS
            _this.isAlive = false;
            _this.speed = 5;
            _this.playerPosition = new objects.Vector2(0, 0);
            // create enemy
            _this.position = _this.GetRandomPoints(playerPosition, 640, 720);
            _this.playerPosition = playerPosition;
            _this.Start();
            return _this;
        }
        // Public Methods
        Enemy.prototype._checkBounds = function () {
        };
        Enemy.prototype.Start = function () {
        };
        Enemy.prototype.Update = function (newPlayerPosition) {
            if (newPlayerPosition === void 0) { newPlayerPosition = new objects.Vector2(0, 0); }
            this.playerPosition = newPlayerPosition;
            // Check if the Monster is still alive, catch the player, otherwise, die.
            if (this.isAlive) {
                this.ApproachPlayer(newPlayerPosition);
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
        Enemy.prototype.ApproachPlayer = function (playerPosition) {
            var angle = playerPosition.y - this.y / playerPosition.x - this.x;
            this.x += this.speed * Math.cos(angle * Math.PI / 180);
            this.y -= this.speed * Math.sin(angle * Math.PI / 180);
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
            var rx;
            var ry;
            do {
                // generate random point within the range of stage
                rx = Math.floor(Math.random() * width) + 1;
                ry = Math.floor(Math.random() * height) + 1;
            } // check to make it far from player by 200 pixels radius
             while ((rx > px + 100 || rx < px - 100) && ry > py + 100 || ry < py - 100);
            return new objects.Vector2(rx, ry);
        };
        return Enemy;
    }(objects.GameObject));
    objects.Enemy = Enemy;
})(objects || (objects = {}));
//# sourceMappingURL=Enemy.js.map