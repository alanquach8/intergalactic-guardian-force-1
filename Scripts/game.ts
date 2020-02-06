// IIFE - Immediately Invoked Function Expression
// means? is an anonymous self-executing function

let game = (function(){

    let canvas:HTMLCanvasElement = document.getElementsByTagName('canvas')[0];
    let stage:createjs.Stage;
    let startLabel:objects.Label; // let helloLabel:createjs.Text;
    let startButton:objects.Button; // let clickMeButton:createjs.Bitmap;
    let player:objects.Player;

    /**
     * Perform Initialization in the Start function
     *
     */
    function Start():void {
        console.log(`%c Game Started`, "color: blue; font-size:20px;");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60; // declare the framerate as 60FPS
        createjs.Ticker.on('tick', Update);

        stage.enableMouseOver(20); // setting up collision detection between mouse and objects at 20 FPS

        Main();
    }

    /**
     * This is the main Game Loop
     * This function 'triggers' every frame
     */
    function Update():void {
        player.Update();

        let sqrDistance = objects.Vector2.sqrDistance(player.position, startButton.position);
        let radii = player.halfWidth + startButton.halfWidth;
        // radii for halfHeights
        // AABB collision detection

        if(sqrDistance < (radii * radii) )
        {
            console.log("COLLISION");
        }

        stage.update();
    }

    /**
     * This function is the main function of the game
     * 
     */
    function Main():void {
        console.log('%c Main Started', "color: green; font-size:16px;");
        startLabel = new objects.Label("The Game", "80px", "Consolas", "#000000", 320, 200, true); //helloLabel = new createjs.Text("Hello World", "40px Consolas", "#000000");
        // // sets the pivot point to the center
        // helloLabel.regX = helloLabel.getBounds().width * 0.5;
        // helloLabel.regY = helloLabel.getMeasuredLineHeight() * 0.5;
        // helloLabel.x = 320;
        // helloLabel.y = 240;
        stage.addChild(startLabel);

    
        startButton = new objects.Button("./Assets/images/startButton.png", 320, 400, true);
        stage.addChild(startButton);

        startButton.on("click", function() { // .on is like .addEventListener
            console.log("Start Clicked");
        });

        player = new objects.Player();
        //player.regX = 0;//player.getBounds().width * 0.5; // DOES NOT WORK
        //player.regY = 0;//player.getBounds().height * 0.5; // DOES NOT WORK
        stage.addChild(player);

        console.log(startButton.position);
    }

    window.addEventListener("load", Start);

})();