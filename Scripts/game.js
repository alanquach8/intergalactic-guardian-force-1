"use strict";
//IIFE - Imediately Invoked Function Expression
//Means: is an anonymous self-executing function
var game = (function () {
    var canvas = document.getElementsByTagName('canvas')[0];
    var stage;
    var currentSceneState;
    var currentScene;
    var assets;
    var assetManifest = [
        { id: "menu_theme", src: "./Assets/sound/background/menu.mp3" },
        { id: "background_theme", src: "./Assets/sound/background/levels.mp3" },
        { id: "shoot", src: "./Assets/sound/effect/shoot.wav" },
        { id: "enemy_dying", src: "./Assets/sound/effect/enemy_dying.wav" },
        { id: "boss_dying", src: "./Assets/sound/effect/boss_dying.wav" },
        { id: "box_break", src: "./Assets/sound/effect/box_break.wav" }
    ];
    function Preload() {
        assets = new createjs.LoadQueue(); // asset container
        config.Game.ASSETS = assets; // make a reference to the assets in the global config
        assets.installPlugin(createjs.Sound); // supports sound preloading
        assets.loadManifest(assetManifest);
        assets.on("complete", Start);
    }
    /**
     * Perform Initialization in the Start function
     *
     */
    function Start() {
        stage = new createjs.Stage(canvas);
        stage.name = "Main Stage";
        config.Game.STAGE = stage; // create a reference to the Global Stage
        createjs.Ticker.framerate = 60; // declare the framerate as 60FPS
        createjs.Ticker.on('tick', Update);
        stage.enableMouseOver(20);
        currentSceneState = scenes.State.NO_SCENE;
        config.Game.SCENE_STATE = scenes.State.START;
    }
    /**
     * This is the main Game Loop
     * This function 'triggers' every frame
     */
    function Update() {
        if (currentSceneState != config.Game.SCENE_STATE) {
            Main();
        }
        currentScene.Update();
        stage.update();
    }
    /**
     * This function is the main function of the game
     *
     */
    function Main() {
        // Clean Up
        if (currentSceneState != scenes.State.NO_SCENE) {
            currentScene.removeAllChildren();
            stage.removeAllChildren();
        }
        console.log("Switched to level: " + scenes.State[config.Game.SCENE_STATE]);
        // State Machine
        switch (config.Game.SCENE_STATE) {
            case scenes.State.START:
                currentScene = new scenes.Start();
                break;
            case scenes.State.LEVEL1:
                currentScene = new scenes.Level1();
                break;
            case scenes.State.LEVEL2:
                currentScene = new scenes.Level2();
                break;
            case scenes.State.LEVEL3:
                currentScene = new scenes.Level3();
                break;
            case scenes.State.END:
                currentScene = new scenes.End();
                break;
            case scenes.State.QUOTE:
                currentScene = new scenes.Quote();
                break;
            case scenes.State.LOOSE:
                currentScene = new scenes.Loose();
                break;
            case scenes.State.CHARACTER_SELECTION:
                currentScene = new scenes.SelectCharacter();
                break;
        }
        // add the scene to the stage and setup the current scene
        stage.addChild(currentScene);
        currentSceneState = config.Game.SCENE_STATE;
    }
    window.addEventListener("load", Preload);
})();
//# sourceMappingURL=game.js.map