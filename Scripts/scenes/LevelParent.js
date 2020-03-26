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
        // CONSTRUCTOR
        function LevelParent(next) {
            var _this = _super.call(this) || this;
            // PRIVATE INSTANCE MEMBERS
            // private _player:objects.Player;
            // private _player2: objects.Player;
            _this.noOfPlayers = config.Game.NO_OF_PLAYERS;
            _this._scrollBuffer = 150;
            _this._distance_left = 1000;
            _this._canFinish = true;
            _this._endEventFired = false;
            _this._isActive = false;
            // initialization
            // this._player = new objects.Player(1);
            // this._player2 = new objects.Player(2);
            _this._players = new Array();
            _this._enemies = new Array();
            _this._deadEnemies = new Array();
            _this._powerups = new Array();
            _this._explosion = [];
            _this._playerLivesThumbs = [];
            _this._noOfEnemies = 5;
            _this._gernadeManager = new objects.GrenadeManager();
            _this._nextLevel = next;
            _this._scoreLabel = new objects.Label(config.Game.SCORE.toString(), "40px", "Consolas", "#000000", 0, 0);
            _this._segways = [];
            _this._civilians = new Array();
            _this._noOfCivilians = 3;
            _this._boxes = new Array();
            _this._noOfBoxes = 3;
            document.body.querySelector("#cheatCodeButton").addEventListener("click", function () {
                if (_this._isActive) {
                    var code = document.body.querySelector("#cheatCode").value.split(" ");
                    if (code.length == 0) {
                        return;
                    }
                    if (code[0] == "spawn") {
                        if (code.length < 2) {
                            _this.CheatCodeFeedback("Invalid Use Of Spawn Command. <br>Usage: spawn <object> [x] [y] [id]");
                            return;
                        }
                        var x = 100;
                        var y = 100;
                        var id = _this.getRandomInt(3);
                        switch (code[1]) {
                            case "segway":
                                if (code.length >= 4) {
                                    x = Number(code[2]);
                                    y = Number(code[3]);
                                }
                                _this.AddSegways(1, x, y);
                                _this.CheatCodeFeedback("Spawned Segway At x=" + x + " y=" + y, "green");
                                break;
                            case "powerup":
                                if (code.length == 3) {
                                    _this.CheatCodeFeedback("Invalid Use Of Spawn Command. <br>Usage: spawn &lt;object&gt; [x] [y] [id]");
                                    return;
                                }
                                if (code.length == 4) {
                                    x = Number(code[2]);
                                    y = Number(code[3]);
                                }
                                else if (code.length >= 5) {
                                    x = Number(code[2]);
                                    y = Number(code[3]);
                                    id = Number(code[4]);
                                }
                                _this.CreatePowerup(x, y, id);
                                _this.CheatCodeFeedback("Spawned Powerup At x=" + x + " y=" + y + " id=" + id, "green");
                                break;
                            case "enemy":
                                if (code.length >= 4) {
                                    x = Number(code[2]);
                                    y = Number(code[3]);
                                }
                                _this.SpawnEnemy(x, y);
                                _this.CheatCodeFeedback("Spawned Enemy At x=" + x + " y=" + y, "green");
                                break;
                            default:
                                _this.CheatCodeFeedback("Invalid Use Of Spawn Command. <br>Unknown Entity: " + code[1]);
                        }
                    }
                    else if (code[0] == "set") {
                        if (code.length < 3) {
                            _this.CheatCodeFeedback("Invalid Use Of Set Command. <br>Usage: Set &lt;what&gt; &lt;value&gt;");
                            return;
                        }
                        var what = code[1];
                        var value = Number(code[2]);
                        switch (what) {
                            case "grenades":
                                _this.SetGrenades(value);
                                _this.CheatCodeFeedback("Set Number Of Grenades To " + value, "green");
                                break;
                            case "lives":
                                _this._players[0].Life = value;
                                _this.UpdatePlayerLivesIndicator();
                                _this.CheatCodeFeedback("Set Number Of Lives To " + value, "green");
                                break;
                            case "score":
                                config.Game.SCORE = value;
                                _this.CheatCodeFeedback("Set Score To " + value, "green");
                                break;
                            default:
                                _this.CheatCodeFeedback("Invalid Use Of Set Command. <br>Unknown Value: " + what);
                        }
                    }
                    else if (code[0] == "level") {
                        if (code.length < 2) {
                            _this.CheatCodeFeedback("Invalid Use Of Set Command. <br>Usage: level &lt;number&gt;");
                            return;
                        }
                        var level = Number(code[1]);
                        switch (level) {
                            case 1:
                                config.Game.SCENE_STATE = scenes.State.LEVEL1;
                                break;
                            case 2:
                                config.Game.SCENE_STATE = scenes.State.LEVEL2;
                                break;
                            case 3:
                                config.Game.SCENE_STATE = scenes.State.LEVEL3;
                                break;
                            default:
                                _this.CheatCodeFeedback("Invalid Use Of Level Command. <br>Unknown Level ID: " + level);
                        }
                    }
                    else if (code[0] == "help") {
                        _this.CheatCodeFeedback("Cheat Codes Command Reference:<br>spawn &lt;segway|powerup|enemy&gt; [x] [y] [id]<br>Set &lt;grenades|lives|score&gt; &lt;value&gt;<br>Usage: level &lt;1|2|3&gt;<br>help", "green");
                    }
                    else if (code[0] == "clear") {
                        _this.CheatCodeFeedback("");
                    }
                    else {
                        _this.CheatCodeFeedback("Unknown Command. Use 'help' For A List Of Commands!");
                    }
                    _this.ProcessCommand(code);
                }
            });
            _this.addEventListener("click", function (evt) {
                _this.SendGrenade(evt.stageX, evt.stageY);
            });
            // every 20s
            // setInterval(()=> { this.CreatePowerup() }, 20000);
            _this.Start();
            return _this;
        }
        Object.defineProperty(LevelParent.prototype, "PlayerLives", {
            get: function () {
                return this._players[0].Life;
            },
            // PUBLIC PROPERTIES
            set: function (val) {
                this._players[0].Life = val;
                this.UpdatePlayerLivesIndicator();
            },
            enumerable: true,
            configurable: true
        });
        LevelParent.prototype.CheatCodeFeedback = function (text, color) {
            if (color === void 0) { color = "red"; }
            var feedback = document.body.querySelector("#cheatCodeFeedback");
            if (feedback != null) {
                feedback.innerHTML = text;
                feedback.setAttribute("style", "margin: 0px; color:" + color);
            }
        };
        LevelParent.prototype.ProcessCommand = function (command) {
        };
        LevelParent.prototype.AddSegways = function (amount, x, y) {
            if (x === void 0) { x = 100; }
            if (y === void 0) { y = 100; }
            for (var i = 0; i < amount; i++) {
                var s = new objects.Segway(undefined, x, y);
                this._segways.push(s);
                this.addChild(s);
            }
        };
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
        Object.defineProperty(LevelParent.prototype, "Players", {
            get: function () {
                return this._players;
            },
            enumerable: true,
            configurable: true
        });
        // PUBLIC METHODS
        LevelParent.prototype.Start = function () {
            // this._player = new objects.Player(1);
            // this._player2 = new objects.Player(2);
            for (var i = 1; i < this.noOfPlayers + 1; i++) { // CHANGE 'players' variable to an option... config?
                this._players.push(new objects.Player(i));
            }
            // Add Enemies to the array
            for (var i = 0; i < this._noOfEnemies; i++) { //TODO add a Variable for number of enemies currently hardcoded to 5
                var enemy = new objects.Enemy();
                enemy.LockTo = Math.floor(Math.random() * this.noOfPlayers);
                this._enemies.push(enemy);
            }
            for (var i = 0; i < this._noOfCivilians; i++) {
                this._civilians.push(new objects.Civilian(this.getRandomInt(610) + 15, 200 + this.getRandomInt(200)));
            }
            for (var i = 0; i < this._noOfBoxes; i++) {
                this._boxes.push(new objects.Box(this.getRandomInt(610) + 15, 200 + this.getRandomInt(200)));
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
                id = this.getRandomInt(3);
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
                        for (var i = 0; i < _this.noOfPlayers; i++) {
                            _this._players[i].Life += 1;
                        }
                        // this._player.Life += 1;
                        // this._player2.Life += 1;
                        _this.UpdatePlayerLivesIndicator();
                    };
                    break;
                case 2:
                    p = new objects.Powerup("./Assets/images/bullet/piercing_powerup.png", x, y);
                    p.Scale = 0.5;
                    p.ActivationEvent = function () {
                        for (var i = 0; i < _this.noOfPlayers; i++) {
                            _this._players[i].PierceCount += 1;
                        }
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
                return this._players[0];
            },
            enumerable: true,
            configurable: true
        });
        LevelParent.prototype.AddExplosion = function (x, y) {
            var exp = new objects.Explosion(x, y);
            this._explosion.push(exp);
            this.addChild(exp);
        };
        LevelParent.prototype.SendGrenade = function (x, y) {
            if (this._gernadeManager.GrenadeCount <= 0)
                return;
            this.ChangeGrenades(-1);
            this.AddExplosion(x, y);
        };
        LevelParent.prototype.UpdatePlayerLivesIndicator = function () {
            var _this = this;
            this._playerLivesThumbs.forEach(function (p) {
                _this.removeChild(p);
            });
            var x = 640;
            for (var i = 0; i < this._players[0].Life; i++) {
                var img = new createjs.Bitmap("./Assets/images/ui/front.png");
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
        LevelParent.prototype.PlayerMovementUpdate = function (y_delta) {
        };
        LevelParent.prototype.SpawnEnemy = function (x, y) {
            if (x === void 0) { x = -1; }
            if (y === void 0) { y = -1; }
            this._enemies.push(new objects.Enemy(new objects.Vector2(x, y)));
            this.addChild(this._enemies[this._enemies.length - 1]);
        };
        LevelParent.prototype.Update = function () {
            var _this = this;
            this._isActive = true;
            // Reference to the Play Scene Object
            var that = this;
            // add more enemies if one dies
            if (this._enemies.length < this._noOfEnemies) {
                var enemy = new objects.Enemy();
                enemy.LockTo = Math.floor(Math.random() * this.noOfPlayers);
                this._enemies.push(enemy);
                this.addChild(this._enemies[this._enemies.length - 1]);
            }
            for (var i = 0; i < this.noOfPlayers; i++) {
                if (this._players[i].visible) {
                    this._players[i].Update();
                }
                else {
                    // game over
                    this._isActive = false;
                    config.Game.SCENE_STATE = scenes.State.END;
                }
            }
            this._explosion.forEach(function (exp) {
                if (exp.Done) {
                    _this._explosion.splice(_this._explosion.indexOf(exp), 1);
                    _this.removeChild(exp);
                }
                exp.Update();
            });
            this._segways.forEach(function (seg) {
                seg.Update();
            });
            this._powerups.forEach(function (p) {
                for (var i = 0; i < _this.noOfPlayers; i++) {
                    managers.Collision.AABBCheck(_this._players[i], p);
                    if (p.isColliding) {
                        p.ActivationEvent();
                        _this._powerups.splice(_this._powerups.indexOf(p), 1);
                        _this.removeChild(p);
                    }
                }
            });
            this._segways.forEach(function (seg) {
                for (var i = 0; i < _this.noOfPlayers; i++) {
                    managers.Collision.AABBCheck(_this._players[i], seg);
                    if (seg.isColliding) {
                        seg.SetRider(_this._players[i]);
                        _this._players[i].IsRidingSegway = true;
                    }
                }
            });
            this._boxes.forEach(function (box) {
                _this._players.forEach(function (player) {
                    player.Bullets.forEach(function (bullet) {
                        managers.Collision.AABBCheck(bullet, box);
                        if (box.isColliding) {
                            box.Life--;
                            if (box.Life == 0) {
                                that._boxes.splice(that._boxes.indexOf(box));
                                // SPAWN POWER UP
                                var pu = _this.getRandomInt(5); // 0-4
                                console.log('PU' + pu);
                                console.log(box.x + ' ' + box.y);
                                if (pu < 3) { // 40% change box contains nothing
                                    _this.CreatePowerup(box.x, box.y, pu);
                                }
                                // SPAWN POWER UP
                                that.removeChild(box);
                            }
                        }
                    });
                });
                box.Update();
            });
            this._civilians.forEach(function (civilian) {
                _this._players.forEach(function (player) {
                    managers.Collision.AABBCheck(player, civilian);
                    if (civilian.Life == 200) {
                        civilian.Saved = true;
                        that._civilians.splice(that._civilians.indexOf(civilian));
                        that.removeChild(civilian);
                    }
                });
                _this._enemies.forEach(function (enemy) {
                    managers.Collision.AABBCheck(enemy, civilian);
                    if (civilian.Life == 0) {
                        that._civilians.splice(that._civilians.indexOf(civilian));
                        that.removeChild(civilian);
                    }
                });
                civilian.Update();
            });
            this._enemies.forEach(function (enemy) {
                enemy.Update(that._players[enemy.LockTo].x, that._players[enemy.LockTo].y);
                var _loop_2 = function (i) {
                    that._players[i].Bullets.forEach(function (bullet) {
                        managers.Collision.AABBCheck(bullet, enemy);
                        if (enemy.isColliding) {
                            if (!bullet.IsEnemyBlacklisted(enemy)) {
                                bullet.BlacklistEnemyDamage(enemy);
                                enemy.hitPoints--;
                                if (enemy.hitPoints == 0) {
                                    that.KillEnemy(enemy);
                                    config.Game.SCORE++;
                                }
                                if (bullet.ShouldImpactDelete()) {
                                    that._players[i].Bullets.splice(that._players[i].Bullets.indexOf(bullet), 1);
                                    that.removeChild(bullet);
                                }
                            }
                        }
                    });
                };
                // Bullets and Enemy Collision Check
                for (var i = 0; i < _this.noOfPlayers; i++) {
                    _loop_2(i);
                }
                that._explosion.forEach(function (exp) {
                    managers.Collision.AABBCheck(exp, enemy);
                    if (enemy.isColliding)
                        that.KillEnemy(enemy);
                });
                var _loop_3 = function (i) {
                    managers.Collision.AABBCheck(enemy, that._players[i]);
                    if (that._players[i].isColliding && !that._players[i].IsReviving) {
                        if (that._players[i].IsRidingSegway) {
                            _this.AddExplosion(that._players[i].x, that._players[i].y);
                            _this._segways.forEach(function (seg) {
                                if (seg.GetRider() == that._players[i]) {
                                    _this.removeChild(seg);
                                    that._segways.splice(that._segways.indexOf(seg), 1);
                                    that._players[i].IsRidingSegway = false;
                                }
                            });
                        }
                        that._players[i].Life--;
                        _this.UpdatePlayerLivesIndicator();
                        if (that._players[i].Life == 0) {
                            config.Game.SCENE_STATE = scenes.State.LOOSE;
                        }
                        else {
                            that._players[i].Reset();
                        }
                    }
                };
                // Enemy and Player Collision Check
                for (var i = 0; i < _this.noOfPlayers; i++) {
                    _loop_3(i);
                }
                _this._deadEnemies.forEach(function (enemy) {
                    enemy.Update();
                    if (enemy.isDead) {
                        that._deadEnemies.splice(that._deadEnemies.indexOf(enemy), 1);
                        that.removeChild(enemy);
                    }
                });
            });
            var moved = false;
            var _loop_1 = function (i) {
                if (moved) {
                    if (this_1._distance_left > 0 && this_1._players[i].y < this_1._scrollBuffer) {
                        this_1._players[i].y = this_1._scrollBuffer;
                    }
                }
                else {
                    if ((this_1._players[i].Forward || this_1._players[i].Backward) && this_1._players[i].y < this_1._scrollBuffer) {
                        var y_delta_1 = this_1._players[i].Direction.y * this_1._players[i].Speed;
                        if (this_1._players[i].Backward)
                            y_delta_1 *= -1;
                        if (this_1._players[i].Forward && this_1._players[i].Backward)
                            y_delta_1 = 0;
                        if (y_delta_1 != 0)
                            moved = true;
                        this_1._distance_left += y_delta_1;
                        if (this_1._distance_left <= 0) {
                            if (!this_1._endEventFired) {
                                this_1._endEventFired = true;
                                this_1.ReachedLevelEnd();
                            }
                            this_1._scrollBuffer = 0;
                            if (this_1._players[i].y <= 0) {
                                if (this_1._canFinish) {
                                    this_1._isActive = false;
                                    config.Game.SCENE_STATE = this_1._nextLevel;
                                }
                                else {
                                    this_1._players[i].y = 1;
                                }
                            }
                        }
                        else {
                            if (this_1._distance_left % 200 < 1) {
                                this_1.CreatePowerup();
                            }
                            this_1._players[i].y = this_1._scrollBuffer;
                        }
                        this_1._powerups.forEach(function (power) {
                            power.y -= y_delta_1;
                            power.position = new objects.Vector2(power.x, power.y);
                        });
                        this_1._explosion.forEach(function (exp) {
                            exp.y -= y_delta_1;
                            exp.position = new objects.Vector2(exp.x, exp.y);
                        });
                        this_1._segways.forEach(function (seg) {
                            if (!seg.IsRiding) {
                                seg.y -= y_delta_1;
                                seg.position = new objects.Vector2(seg.x, seg.y);
                            }
                        });
                        this_1._deadEnemies.forEach(function (enemy) {
                            enemy.y -= y_delta_1;
                            enemy.position = new objects.Vector2(enemy.x, enemy.y);
                        });
                        this_1._enemies.forEach(function (enemy) {
                            enemy.y -= y_delta_1;
                            enemy.position = new objects.Vector2(enemy.x, enemy.y);
                            if (enemy.y > 520) {
                                _this.removeChild(enemy);
                                _this._enemies.splice(_this._enemies.indexOf(enemy), 1);
                            }
                        });
                        this_1.PlayerMovementUpdate(y_delta_1);
                    }
                }
            };
            var this_1 = this;
            for (var i = 0; i < this.noOfPlayers; i++) {
                _loop_1(i);
            }
            this.removeChild(this._scoreLabel);
            this._scoreLabel = new objects.Label(config.Game.SCORE.toString(), "40px", "Consolas", "#000000", 0, 0);
            this.addChild(this._scoreLabel);
            this.UpdateLevel();
        };
        LevelParent.prototype.Main = function () {
            var that = this;
            this.addChild(new objects.Rectangle(0, 0, 15, 480, "DarkGrey"));
            this.addChild(new objects.Rectangle(625, 0, 15, 480, "DarkGrey"));
            this.addChild(new objects.Rectangle(15, 0, 610, 480, "GhostWhite"));
            for (var i = 0; i < this.noOfPlayers; i++) {
                this.addChild(this._players[i]);
            }
            this.AddSegways(1);
            this.SetGrenades(2);
            this.UpdatePlayerLivesIndicator();
            this._gernadeManager.GrenadeCount = 2;
            console.log("CIVILIANS:");
            this._civilians.forEach(function (civilian) {
                that.addChild(civilian);
                console.log('position: x:' + civilian.position.x + ', y:' + civilian.position.y);
                console.log('x:' + civilian.x + ', y:' + civilian.y);
            });
            console.log("BOXES");
            this._boxes.forEach(function (box) {
                that.addChild(box);
                console.log('position: x:' + box.position.x + ', y:' + box.position.y);
                console.log('x:' + box.x + ', y:' + box.y);
            });
            console.log("ENEMIES");
            this._enemies.forEach(function (enemy) {
                that.addChild(enemy);
                console.log('position: x:' + enemy.position.x + ', y:' + enemy.position.y);
                console.log('x:' + enemy.x + ', y:' + enemy.y);
            });
            this.addChild(this._scoreLabel);
        };
        Object.defineProperty(LevelParent.prototype, "Enemies", {
            get: function () {
                return this._enemies;
            },
            enumerable: true,
            configurable: true
        });
        LevelParent.prototype.PlaySound = function (name) {
            var player = document.body.querySelector("#" + name + "Sound");
            player.play();
        };
        LevelParent.prototype.PauseSound = function (name) {
            var player = document.body.querySelector("#" + name + "Sound");
            player.pause();
        };
        return LevelParent;
    }(objects.Scene));
    scenes.LevelParent = LevelParent;
})(scenes || (scenes = {}));
//# sourceMappingURL=LevelParent.js.map