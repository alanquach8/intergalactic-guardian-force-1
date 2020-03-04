module scenes
{
    export class Play extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        playLabel:objects.Label;
        nextButton:objects.Button;
        player:objects.Player;
        enemy:objects.Enemy;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();

            // initialization
            this.playLabel = new objects.Label();
            this.nextButton = new objects.Button();
            this.player = new objects.Player();
            this.enemy = new objects.Enemy();

            this.Start();
        }

        // PUBLIC METHODS

        public Start(): void 
        {
            this.playLabel = new objects.Label("Game Started", "10px","Consolas", "#000000", 320, 200, true);
            this.nextButton = new objects.Button("./Assets/images/nextButton.png", 320, 400, true);
            this.player = new objects.Player();
            this.enemy = new objects.Enemy();
           
            this.Main();
        }        
        
        public Update(): void {
            this.player.Update();
            this.enemy.Update(this.player.x, this.player.y);

            // Bullets and Enemy Collision Check
            for(let i = 0; i<this.player.bullets.length; i++) {
                managers.Collision.AABBCheck(this.player.bullets[i], this.enemy);
            }
            if(this.enemy.isColliding) {
                this.removeChild(this.enemy);
                this.enemy.Die();
            }

            // Enemy and Player Collision Check
            managers.Collision.AABBCheck(this.enemy, this.player);
            if(this.player.isColliding){
                this.removeChild(this.player);
                this.player.Die();
            }

        }
        
        public Main(): void {
            
            this.addChild(this.playLabel);
    
            this.addChild(this.nextButton);
    
            this.nextButton.on("click", function() {
               config.Game.SCENE_STATE = scenes.State.END;
            });

            this.addChild(this.player);
            this.enemy.position = new objects.Vector2(300, 300);
            this.addChild(this.enemy);
    
        }

        
    }
}