module scenes
{
    export class Start extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        startLabel:objects.Label;
        startButton:objects.Button;
        player:objects.Player;
        enemy:objects.Enemy;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();

            // initialization
            this.startLabel = new objects.Label();
            this.startButton = new objects.Button();
            this.player = new objects.Player();
            this.enemy = new objects.Enemy();

            this.Start();
        }

        // PUBLIC METHODS

        public Start(): void 
        {
            this.startLabel = new objects.Label("The Game", "80px","Consolas", "#000000", 320, 200, true);
            this.startButton = new objects.Button("./Assets/images/startButton.png", 320, 400, true);
            this.player = new objects.Player();
            this.enemy = new objects.Enemy();
           
            this.Main();
        }        
        
        public Update(): void {
            this.player.Update();
            
            this.enemy.Update(this.player.x, this.player.y);
            //managers.Collision.squaredRadiusCheck(player, startButton);

            managers.Collision.AABBCheck(this.player, this.startButton);
        }
        
        public Main(): void {
            
            this.addChild(this.startLabel);
    
            this.addChild(this.startButton);
    
            this.startButton.on("click", function() {
               config.Game.SCENE_STATE = scenes.State.PLAY;
            });
    
            
            this.addChild(this.player);
            this.addChild(this.enemy);
        }

        
    }
}