module scenes
{
    export class Quote extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        startLabel:objects.Label[];

        quote_alpha = -0.251;
        quote_delta = 0.005;
        
        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();
            // initialization
            this.startLabel = [];

            
            window.addEventListener('keydown', (e: KeyboardEvent) => {
                if (config.Game.SCENE_STATE == scenes.State.QUOTE){
                    this.PauseSound("menu");
                    config.Game.SCENE_STATE = scenes.State.LEVEL1;
                }
            });


            this.Start();
        }

        // PUBLIC METHODS

        public Start(): void 
        {
            let fontSize:string = "25px";
            let font:string = "Consolas";
            let fontColor:string = "Green";
            let isCentered:boolean = false;
            let xPos:number = 50;
            
            this.startLabel = [
                new objects.Label("Two possibilities exist:",               fontSize, font, fontColor, xPos, 125, isCentered),
                new objects.Label("  Either we are alone in the Universe,", fontSize, font, fontColor, xPos, 165, isCentered),
                new objects.Label("  or we are not.",                       fontSize, font, fontColor, xPos, 190, isCentered),
                new objects.Label("Both are equally terrifying.",           fontSize, font, fontColor, xPos, 230, isCentered),
                new objects.Label("  ― Arthur C. Clarke ",                  fontSize, font, fontColor, xPos, 270, isCentered)
            ];      

            this.Main();
        }        
        
        public Update(): void {
            this.startLabel.forEach(label => {
                label.alpha = this.quote_alpha;
            });
            this.quote_alpha += this.quote_delta;

            if (this.quote_alpha >= 1){
                this.quote_delta *= -1
            }
            // -10 used to allow for some delay on animation completion
            if (this.quote_alpha <= -0.25){
                this.PauseSound("menu");
                this.RewindSound("levels");
                config.Game.SCENE_STATE = scenes.State.LEVEL1;
            } 
            
        }
        
        public Main(): void {
            
            // a hacky way to set the screen's background color
            this.addChild(new objects.Rectangle(0, 0, 640, 480, "#000"));

            this.startLabel.forEach(label => {
                this.addChild(label);          
            });
            
        }

        
    }
}