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
            this.playLabel = new objects.Label("Play Game", "80px","Consolas", "#000000", 320, 200, true);
            this.nextButton = new objects.Button("./Assets/images/nextButton.png", 320, 400, true);
            this.player = new objects.Player();
            this.enemy = new objects.Enemy();
           
            this.Main();
        }        
        
        public Update(): void {
            this.player.Update();
            this.enemy.Update(this.player.x, this.player.y);
            //this.bullet.Update();
            //managers.Collision.squaredRadiusCheck(player, startButton);

            // managers.Collision.AABBCheck(this.player, this.enemy);
            // managers.Collision.squaredRadiusCheck(this.player, this.enemy);
            // managers.Collision.AABBCheck(this.bullet, this.enemy);
            // managers.Collision.squaredRadiusCheck(this.bullet, this.enemy);
            for(let i = 0; i<this.player.bullets.length; i++) {
                managers.Collision.AABBCheck(this.player.bullets[i], this.enemy);
            }
            if(this.enemy.isColliding) {
                this.removeChild(this.enemy);
                // console.log(this.player.bullets[0].position);
                // console.log("BULLET (x,y): (" + this.player.bullets[0].x + ", " + this.player.bullets[0].y + ")");
                // console.log("BULLET (regX,regY): (" + this.player.bullets[0].regX + ", " + this.player.bullets[0].regY + ")");
                // console.log(this.enemy.position);
                // console.log("ENEMY (x,y): (" + this.enemy.x + ", " + this.enemy.y + ")");
                // console.log("ENEMY (regX,regY): (" + this.enemy.regX + ", " + this.enemy.regY + ")");
                // console.log(this.player.position);
                // console.log("PLAYER (x,y): (" + this.player.x + ", " + this.player.y + ")");
                // console.log("PLAYER (regX,regY): (" + this.player.regX + ", " + this.player.regY + ")");
                //this.enemy.isColliding = false;
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