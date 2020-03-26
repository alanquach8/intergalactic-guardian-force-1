"use strict";
var scenes;
(function (scenes) {
    var State;
    (function (State) {
        State[State["NO_SCENE"] = -1] = "NO_SCENE";
        State[State["START"] = 0] = "START";
        State[State["LEVEL1"] = 1] = "LEVEL1";
        State[State["LEVEL2"] = 2] = "LEVEL2";
        State[State["LEVEL3"] = 3] = "LEVEL3";
        State[State["END"] = 4] = "END";
        State[State["QUOTE"] = 5] = "QUOTE";
        State[State["LOOSE"] = 6] = "LOOSE";
        State[State["CHARACTER_SELECTION"] = 7] = "CHARACTER_SELECTION";
        State[State["NUM_OF_SCENES"] = 8] = "NUM_OF_SCENES";
    })(State = scenes.State || (scenes.State = {}));
})(scenes || (scenes = {}));
//# sourceMappingURL=State.js.map