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
    var TrailManager = /** @class */ (function (_super) {
        __extends(TrailManager, _super);
        function TrailManager(parent, imagePath, trailDelay) {
            if (imagePath === void 0) { imagePath = "./Assets/images/particles/super_hero.png"; }
            if (trailDelay === void 0) { trailDelay = 0.25; }
            var _this = _super.call(this, imagePath) || this;
            _this._trailing = [];
            _this._trailParticles = [];
            _this._lastUpdate = 0;
            _this._trailDelay = trailDelay;
            _this._parent = parent;
            return _this;
        }
        TrailManager.prototype._checkBounds = function () {
        };
        TrailManager.prototype.Start = function () {
        };
        TrailManager.prototype.Update = function () {
            var _this = this;
            var currentUpdate = (new Date()).getTime() / 1000;
            if (currentUpdate - this._lastUpdate > this._trailDelay) {
                this._trailing.forEach(function (obj) {
                    var p = new objects.Trail(_this.ImagePath, obj.x, obj.y, true);
                    _this._parent.addChild(p);
                    _this._trailParticles.push(p);
                });
                this._lastUpdate = currentUpdate;
            }
            this._trailParticles.forEach(function (particle) {
                particle.Update();
                if (particle.CanDelete())
                    _this.DeleteParticle(particle);
            });
        };
        TrailManager.prototype.DeleteParticle = function (p) {
            this._parent.removeChild(p);
            this._trailParticles.splice(this._trailParticles.indexOf(p), 1);
        };
        TrailManager.prototype.Reset = function () {
        };
        TrailManager.prototype.TrackObject = function (object) {
            this._trailing.push(object);
        };
        TrailManager.prototype.UntrackObject = function (object) {
            this._trailing.splice(this._trailing.indexOf(object), 1);
        };
        TrailManager.prototype.TrackForTime = function (object, duration) {
            var _this = this;
            this.TrackObject(object);
            setTimeout(function () {
                _this.UntrackObject(object);
            }, duration * 1000);
        };
        TrailManager.prototype.ShiftParticles = function (y_delta) {
            this._trailParticles.forEach(function (p) {
                p.y -= y_delta;
                p.position = new objects.Vector2(p.x, p.y);
            });
        };
        return TrailManager;
    }(objects.GameObject));
    objects.TrailManager = TrailManager;
})(objects || (objects = {}));
//# sourceMappingURL=TrailManager.js.map