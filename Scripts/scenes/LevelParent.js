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
var scenes;
(function (scenes) {
    var LevelParent = /** @class */ (function (_super) {
        __extends(LevelParent, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function LevelParent(next) {
            var _this = _super.call(this) || this;
            _this._scrollBuffer = 100;
            _this._movingForward = false;
            _this._movingBackward = false;
            _this._distance_left = 1000;
            _this._canFinish = true;
            _this._endEventFired = false;
            // initialization
            _this._player = new objects.Player();
            _this._enemies = new Array();
            _this._deadEnemies = new Array();
            _this._powerups = new Array();
            _this._explosion = [];
            _this._playerLivesThumbs = [];
            _this._noOfEnemies = 5;
            _this._gernadeManager = new objects.GrenadeManager();
            _this._nextLevel = next;
            _this.addEventListener("click", function (evt) {
                _this.SendGrenade(evt.stageX, evt.stageY);
            });
            window.addEventListener('keyup', function (e) {
                switch (e.code) {
                    case "ArrowUp":
                        _this._movingForward = false;
                        break;
                    case "ArrowDown":
                        _this._movingBackward = false;
                        break;
                }
            });
            window.addEventListener('keydown', function (e) {
                switch (e.code) {
                    case "ArrowUp":
                        _this._movingForward = true;
                        break;
                    case "ArrowDown":
                        _this._movingBackward = true;
                        break;
                }
            });
            // every 20s
            setInterval(function () { _this.CreatePowerup(); }, 20000);
            _this.Start();
            return _this;
        }
        Object.defineProperty(LevelParent.prototype, "MaximumEnemies", {
            set: function (amount) {
                this._noOfEnemies = amount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LevelParent.prototype, "DistanceLeft", {
            get: function () {
                return this._distance_left;
            },
            set: function (amount) {
                this._distance_left = amount;
            },
            enumerable: true,
            configurable: true
        });
        // PUBLIC METHODS
        LevelParent.prototype.Start = function () {
            this._player = new objects.Player();
            // Add Enemies to the array
            for (var i = 0; i < this._noOfEnemies; i++) { //TODO add a Variable for number of enemies currently hardcoded to 5
                this._enemies.push(new objects.Enemy());
            }
            this.Main();
        };
        LevelParent.prototype.getRandomInt = function (max) {
            return Math.floor(Math.random() * Math.floor(max));
        };
        LevelParent.prototype.CreatePowerup = function (x, y, id) {
            var _this = this;
            if (x === void 0) { x = -1; }
            if (y === void 0) { y = 0; }
            if (id === void 0) { id = -1; }
            if (id == -1) {
                // n cases (in the switch statement below) + 1
                id = this.getRandomInt(2);
            }
            if (x == -1) {
                x = this.getRandomInt(480);
            }
            // default is a grenade (ID: 0)
            var p = new objects.Powerup("./Assets/images/ui/grenade.png", x, y);
            p.ActivationEvent = function () {
                _this.ChangeGrenades(1);
            };
            ;
            switch (id) {
                case 1:
                    p = new objects.Powerup("./Assets/images/player/front.png", x, y);
                    p.Scale = 0.5;
                    p.ActivationEvent = function () {
                        _this._player.Life += 1;
                        _this.UpdatePlayerLivesIndicator();
                    };
                    break;
            }
            if (p != undefined) {
                this._powerups.push(p);
                this.addChild(p);
            }
        };
        Object.defineProperty(LevelParent.prototype, "Player", {
            get: function () {
                return this._player;
            },
            enumerable: true,
            configurable: true
        });
        LevelParent.prototype.SendGrenade = function (x, y) {
            if (this._gernadeManager.GrenadeCount <= 0)
                return;
            this.ChangeGrenades(-1);
            var exp = new objects.Explosion(x, y);
            this._explosion.push(exp);
            this.addChild(exp);
        };
        LevelParent.prototype.UpdatePlayerLivesIndicator = function () {
            var _this = this;
            this._playerLivesThumbs.forEach(function (p) {
                _this.removeChild(p);
            });
            var x = 640;
            for (var i = 0; i < this._player.Life; i++) {
                var img = new createjs.Bitmap("./Assets/images/player/front.png");
                img.scaleX = 0.5;
                img.scaleY = 0.5;
                x -= (img.getBounds().width * 0.5) + 5;
                img.x = x;
                img.y = 460;
                this._playerLivesThumbs.push(img);
                this.addChild(img);
            }
        };
        LevelParent.prototype.SetGrenades = function (count) {
            var _this = this;
            this._gernadeManager.GrenadeCount = count;
            var grenadeThumbs = this._gernadeManager.GrenadeThumbs;
            grenadeThumbs.forEach(function (grenade) {
                _this.removeChild(grenade);
            });
            for (var i = 0; i < count; i++) {
                var img = new createjs.Bitmap("./Assets/images/ui/grenade.png");
                img.x += i * img.getBounds().width + 10;
                img.y = 460;
                grenadeThumbs.push(img);
                this.addChild(img);
            }
        };
        LevelParent.prototype.ChangeGrenades = function (delta) {
            this.SetGrenades(this._gernadeManager.GrenadeCount + delta);
        };
        LevelParent.prototype.KillEnemy = function (enemy) {
            enemy.Die();
            this._deadEnemies.push(enemy);
            this._enemies.splice(this._enemies.indexOf(enemy), 1);
        };
        Object.defineProperty(LevelParent.prototype, "CanFinish", {
            get: function () {
                return this._canFinish;
            },
            set: function (state) {
                this._canFinish = state;
            },
            enumerable: true,
            configurable: true
        });
        LevelParent.prototype.ReachedLevelEnd = function () {
        };
        LevelParent.prototype.UpdateLevel = function () {
        };
        LevelParent.prototype.Update = function () {
            var _this = this;
            // Reference to the Play Scene Object
            var that = this;
            // add more enemies if one dies
            if (this._enemies.length < this._noOfEnemies) {
                this._enemies.push(new objects.Enemy());
                this.addChild(this._enemies[this._enemies.length - 1]);
            }
            if (this._player.visible) {
                this._player.Update();
            }
            else {
                // game over
                config.Game.SCENE_STATE = scenes.State.END;
            }
            this._explosion.forEach(function (exp) {
                if (exp.Done) {
                    _this._explosion.splice(_this._explosion.indexOf(exp), 1);
                    _this.removeChild(exp);
                }
                exp.Update();
            });
            this._powerups.forEach(function (p) {
                managers.Collision.AABBCheck(_this._player, p);
                if (p.isColliding) {
                    p.ActivationEvent();
                    _this._powerups.splice(_this._powerups.indexOf(p), 1);
                    _this.removeChild(p);
                }
            });
            this._enemies.forEach(function (enemy) {
                enemy.Update(that._player.x, that._player.y);
                // Bullets and Enemy Collision Check
                that._player.Bullets.forEach(function (bullet) {
                    managers.Collision.AABBCheck(bullet, enemy);
                    if (enemy.isColliding) {
                        enemy.hitPoints--;
                        if (enemy.hitPoints == 0) {
                            that.KillEnemy(enemy);
                        }
                        // remove the bullet
                        if (enemy.IsAlive) {
                            that._player.Bullets.splice(that._player.Bullets.indexOf(bullet), 1);
                            that.removeChild(bullet);
                        }
                    }
                });
                that._explosion.forEach(function (exp) {
                    managers.Collision.AABBCheck(exp, enemy);
                    if (enemy.isColliding)
                        that.KillEnemy(enemy);
                });
                // Enemy and Player Collision Check
                managers.Collision.AABBCheck(enemy, that._player);
                if (that._player.isColliding && !that._player.IsReviving) {
                    that._player.Life--;
                    _this.UpdatePlayerLivesIndicator();
                    if (that._player.Life == 0) {
                        that.removeChild(that._player);
                        that._player.Die();
                        config.Game.SCENE_STATE = scenes.State.LOOSE;
                    }
                    else {
                        that._player.Reset();
                    }
                }
            });
            this._deadEnemies.forEach(function (enemy) {
                enemy.Update();
                if (enemy.isDead) {
                    that._deadEnemies.splice(that._deadEnemies.indexOf(enemy), 1);
                    that.removeChild(enemy);
                }
            });
            if ((this._movingForward || this._movingBackward) && this._player.y < this._scrollBuffer) {
                var y_delta_1 = this._player.Direction.y * this._player.Speed;
                if (this._movingBackward)
                    y_delta_1 *= -1;
                this._distance_left += y_delta_1;
                if (this._distance_left <= 0) {
                    if (!this._endEventFired) {
                        this._endEventFired = true;
                        this.ReachedLevelEnd();
                    }
                    this._scrollBuffer = 0;
                    if (this._player.y <= 0) {
                        console.log(this._canFinish);
                        if (this._canFinish) {
                            config.Game.SCENE_STATE = this._nextLevel;
                        }
                        else {
                            this._player.y = 1;
                        }
                    }
                }
                else {
                    if (this._distance_left % 200 < 1) {
                        this.CreatePowerup();
                    }
                    this._player.y = this._scrollBuffer;
                    this._powerups.forEach(function (power) {
                        power.y -= y_delta_1;
                        power.position = new objects.Vector2(power.x, power.y);
                    });
                    this._explosion.forEach(function (exp) {
                        exp.y -= y_delta_1;
                        exp.position = new objects.Vector2(exp.x, exp.y);
                    });
                    this._enemies.forEach(function (enemy) {
                        enemy.y -= y_delta_1;
                        enemy.position = new objects.Vector2(enemy.x, enemy.y);
                        if (enemy.y > 520) {
                            _this.removeChild(enemy);
                            _this._enemies.splice(_this._enemies.indexOf(enemy), 1);
                        }
                    });
                }
            }
            this.UpdateLevel();
        };
        LevelParent.prototype.Main = function () {
            var that = this;
            this.addChild(new objects.Rectangle(0, 0, 15, 480, "DarkGrey"));
            this.addChild(new objects.Rectangle(625, 0, 15, 480, "DarkGrey"));
            this.addChild(new objects.Rectangle(15, 0, 610, 480, "GhostWhite"));
            this.addChild(this._player);
            this.SetGrenades(2);
            this.UpdatePlayerLivesIndicator();
            this._gernadeManager.GrenadeCount = 2;
            this._enemies.forEach(function (enemy) {
                that.addChild(enemy);
            });
        };
        return LevelParent;
    }(objects.Scene));
    scenes.LevelParent = LevelParent;
})(scenes || (scenes = {}));
//# sourceMappingURL=LevelParent.js.map