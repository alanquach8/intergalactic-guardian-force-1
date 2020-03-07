module scenes
{
    export class Loose extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        endLabel:objects.Label;
        endButton:objects.Button;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();

            // initialization
            this.endLabel = new objects.Label();
            this.endButton = new objects.Button();

            this.Start();
        }

        // PUBLIC METHODS

        public Start(): void 
        {
            this.endLabel = new objects.Label("You Loose!", "80px","Consolas", "Green", 320, 200, true);
            this.endButton = new objects.Button("./Assets/images/ui/buttons/menu.png", 320, 400, true);
           
            this.Main();
        }        
        
        public Update(): void {
        
        }
        
        public Main(): void {
            // a hacky way to set the screen's background color
            this.addChild(new objects.Rectangle(0, 0, 640, 480, "#000"));
            
            this.addChild(this.endLabel);
    
            this.addChild(this.endButton);
    
            this.endButton.on("click", function() {
               config.Game.SCENE_STATE = scenes.State.START;
            });
        }

        
    }
}