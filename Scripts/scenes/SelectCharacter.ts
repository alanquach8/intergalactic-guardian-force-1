module scenes
{
    export class SelectCharacter extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        title:objects.Label;
        mButton:objects.Button;
        aButton:objects.Button;
        cButton:objects.Button;
        kButton:objects.Button;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();

            // initialization
            this.title = new objects.Label();
            this.mButton = new objects.Button();
            this.aButton = new objects.Button();
            this.cButton = new objects.Button();
            this.kButton = new objects.Button();
            
            this.Start();
        }

        public RefreshTitle(): void{
            this.removeChild(this.title);
            this.title = new objects.Label("Player " + (config.Game.PLAYER_IMAGES.length + 1) + " Character Select", "30px","Consolas", "Green", 320, 20, true);
            this.addChild(this.title);
        }

        // PUBLIC METHODS

        public Start(): void 
        {
            this.RefreshTitle();
            this.mButton = new objects.Button("./Assets/images/player/m/front.png", 125,  300, false);
            this.aButton = new objects.Button("./Assets/images/player/a/front.png", 225, 300, false);
            this.cButton = new objects.Button("./Assets/images/player/c/front.png", 325, 300, false);
            this.kButton = new objects.Button("./Assets/images/player/k/front.png", 425, 300, false);
           
            this.mButton.ScaleImage(3);
            this.aButton.ScaleImage(3);
            this.cButton.ScaleImage(3);
            this.kButton.ScaleImage(3);

            this.Main();
        }        
        
        public Update(): void {
        
        }

        public SetSelection(letter:string){
            config.Game.PLAYER_IMAGES.push("./Assets/images/player/" + letter + "/top.png");
            if (config.Game.PLAYER_IMAGES.length == 1 && config.Game.NO_OF_PLAYERS == 2){
                this.RefreshTitle();
            }
            else{
                config.Game.SCENE_STATE = scenes.State.QUOTE;
            }


        }
        
        public Main(): void {
            // a hacky way to set the screen's background color
            this.addChild(new objects.Rectangle(0, 0, 640, 480, "#000"));
            
            this.addChild(this.title);
    
            this.addChild(this.mButton);
            this.addChild(this.aButton);
            this.addChild(this.cButton);
            this.addChild(this.kButton);

            let that = this;
    
            this.mButton.on("click", function() {
                that.SetSelection("m");
                that.removeChild(that.mButton);
            });
            this.aButton.on("click", function() {
                that.SetSelection("a");
                that.removeChild(that.aButton);
            });
            this.cButton.on("click", function() {
                that.SetSelection("c");
                that.removeChild(that.cButton);
            });
            this.kButton.on("click", function() {
                that.SetSelection("k");
                that.removeChild(that.kButton);
            });
        }

        
    }
}