module scenes
{
    export class Play extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        playLabel:objects.Label;
        nextButton:objects.Button;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();

            // initialization
            this.playLabel = new objects.Label();
            this.nextButton = new objects.Button();

            this.Start();
        }

        // PUBLIC METHODS

        public Start(): void 
        {
            this.playLabel = new objects.Label("Play Game", "80px","Consolas", "#000000", 320, 200, true);
            this.nextButton = new objects.Button("./Assets/images/nextButton.png", 320, 400, true);
           
            this.Main();
        }        
        
        public Update(): void {

        }
        
        public Main(): void {
            
            this.addChild(this.playLabel);
    
            this.addChild(this.nextButton);
    
            this.nextButton.on("click", function() {
               config.Game.SCENE_STATE = scenes.State.END;
            });
    
        }

        
    }
}