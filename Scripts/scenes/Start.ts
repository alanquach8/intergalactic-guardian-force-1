module scenes
{
    export class Start extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        startLabel:objects.Label;
        startButton:objects.Button;
        

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();

            // initialization
            this.startLabel = new objects.Label();
            this.startButton = new objects.Button();

            this.Start();
        }

        // PUBLIC METHODS

        public Start(): void 
        {
            this.startLabel = new objects.Label("The Game", "80px","Consolas", "#000000", 320, 200, true);
            this.startButton = new objects.Button("./Assets/images/startButton.png", 320, 400, true);
            
           
            this.Main();
        }        
        
        public Update(): void {
            
        }
        
        public Main(): void {

            // a hacky way to set the screen's background color
            this.addChild(new objects.Rectangle(0, 0, 640, 480, "#FFF"));
            
            this.addChild(this.startLabel);
    
            this.addChild(this.startButton);
    
            this.startButton.on("click", function() {
               // config.Game.SCENE_STATE = scenes.State.QUOTE;
               config.Game.SCENE_STATE = scenes.State.QUOTE;
            });
    
            
            
        }

        
    }
}