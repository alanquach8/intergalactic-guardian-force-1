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
    var GameObject = /** @class */ (function (_super) {
        __extends(GameObject, _super);
        // CONSTRUCTOR
        /**
         * Creates an instance of GameObject.
         * @param {string} [imagePath="./Assets/images/placeholder.png"]
         * @param {number} [x=0]
         * @param {number} [y=0]
         * @param {boolean} [centered=false]
         * @memberof GameObject
         */
        function GameObject(imagePath, x, y, centered) {
            if (imagePath === void 0) { imagePath = "./Assets/images/placeholder.png"; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (centered === void 0) { centered = false; }
            var _this = _super.call(this, imagePath) || this;
            // MEMBER VARIABLES
            _this._width = 0;
            _this._height = 0;
            _this._halfWidth = 0;
            _this._halfHeight = 0;
            _this._isColliding = false;
            _this._isCentered = false;
            _this._position = new objects.Vector2(0, 0);
            _this._imagePath = imagePath;
            _this.isColliding = false;
            // wait for the  image to load before calculating its width and height
            _this.image.addEventListener('load', function () {
                _this.width = _this.getBounds().width;
                _this.height = _this.getBounds().height;
                _this.halfWidth = _this.width * 0.5;
                _this.halfHeight = _this.height * 0.5;
                _this.isCentered = centered;
            });
            // set the GameObject's position
            _this.position = new objects.Vector2(x, y);
            return _this;
        }
        Object.defineProperty(GameObject.prototype, "width", {
            // PROPERTIES
            get: function () {
                return this._width;
            },
            set: function (newWidth) {
                this._width = newWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "height", {
            get: function () {
                return this._height;
            },
            set: function (newHeight) {
                this._height = newHeight;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "halfWidth", {
            get: function () {
                return this._halfWidth;
            },
            set: function (newHalfWidth) {
                this._halfWidth = newHalfWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "halfHeight", {
            get: function () {
                return this._halfHeight;
            },
            set: function (newHalfHeight) {
                this._halfHeight = newHalfHeight;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "isColliding", {
            get: function () {
                return this._isColliding;
            },
            set: function (newState) {
                this._isColliding = newState;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "position", {
            get: function () {
                return this._position;
            },
            set: function (newPosition) {
                this._position = newPosition;
                this.x = newPosition.x;
                this.y = newPosition.y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "isCentered", {
            get: function () {
                return this._isCentered;
            },
            set: function (newState) {
                this._isCentered = newState;
                if (newState) {
                    // set the anchor point to the center
                    this.regX = this.halfWidth;
                    this.regY = this.halfHeight;
                }
                else {
                    this.regX = 0;
                    this.regY = 0;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "ImagePath", {
            get: function () {
                return this._imagePath;
            },
            enumerable: true,
            configurable: true
        });
        return GameObject;
    }(createjs.Bitmap));
    objects.GameObject = GameObject;
})(objects || (objects = {}));
//# sourceMappingURL=GameObject.js.map