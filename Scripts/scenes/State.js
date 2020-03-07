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
        State[State["NUM_OF_SCENES"] = 5] = "NUM_OF_SCENES";
        State[State["QUOTE"] = 6] = "QUOTE";
    })(State = scenes.State || (scenes.State = {}));
})(scenes || (scenes = {}));
//# sourceMappingURL=State.js.map