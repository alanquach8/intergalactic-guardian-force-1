module scenes
{
    export class Start extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        logoImage:createjs.Bitmap;
        startButton:objects.Button;
        companyLabel:objects.Label;



        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();

            // initialization
            this.logoImage = new createjs.Bitmap("Assets/images/ui/logo.png");
            this.logoImage.regX = this.logoImage.getBounds().width * 0.5;

            this.logoImage.scaleX = 0.6;
            this.logoImage.scaleY = 0.6;

            this.logoImage.x = 320;
            this.logoImage.y = 10;

            this.startButton = new objects.Button();
            this.companyLabel = new objects.Label();

            this.Start();
        }

        // PUBLIC METHODS

        public Start(): void 
        {
            this.startButton = new objects.Button("./Assets/images/ui/buttons/play.png", 320, 240, true);
            this.companyLabel = new objects.Label("MACK Address Games", "15px","Consolas", "Green", 320, 90, true);

           
            this.Main();
        }        
        
        public Update(): void {
            
        }
        
        public Main(): void {

            // a hacky way to set the screen's background color
            this.addChild(new objects.Rectangle(0, 0, 640, 480, "#000"));
            
            this.addChild(this.logoImage);
            this.addChild(this.companyLabel)
            this.addChild(this.startButton);
    
            this.startButton.on("click", function() {
               // config.Game.SCENE_STATE = scenes.State.QUOTE;
               config.Game.SCENE_STATE = scenes.State.QUOTE;
            });
    
            
            
        }

        
    }
}