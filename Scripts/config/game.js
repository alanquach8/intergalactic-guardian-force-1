"use strict";
var config;
(function (config) {
    var Game = /** @class */ (function () {
        function Game() {
        }
        Game.SCORE = 0;
        Game.LIVES = -1;
        Game.GRENADES = -1;
        Game.NO_OF_PLAYERS = 2;
        Game.PLAYER_IMAGES = [];
        return Game;
    }());
    config.Game = Game;
})(config || (config = {}));
//# sourceMappingURL=game.js.map