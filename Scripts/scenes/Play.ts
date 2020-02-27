module scenes
{
    export class Play extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        playLabel:objects.Label;
        nextButton:objects.Button;
        player:objects.Player;
        enemy:objects.Enemy;
        //bullet:objects.Bullet;

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
            //this.bullet = new objects.Bullet();

            this.Start();
        }

        // PUBLIC METHODS

        public Start(): void 
        {
            this.playLabel = new objects.Label("Play Game", "80px","Consolas", "#000000", 320, 200, true);
            this.nextButton = new objects.Button("./Assets/images/nextButton.png", 320, 400, true);
            this.player = new objects.Player();
            this.enemy = new objects.Enemy();
            //this.bullet = new objects.Bullet();
           
            this.Main();
        }        
        
        public Update(): void {
            this.player.Update();
            this.enemy.Update(this.player.x, this.player.y);
            //this.bullet.Update();
            //managers.Collision.squaredRadiusCheck(player, startButton);

            managers.Collision.AABBCheck(this.player, this.enemy);
            managers.Collision.squaredRadiusCheck(this.player, this.enemy);
            // managers.Collision.AABBCheck(this.bullet, this.enemy);
            // managers.Collision.squaredRadiusCheck(this.bullet, this.enemy);
            if(this.enemy.isColliding) {
                this.removeChild(this.enemy);
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
            // this.addChild(this.bullet);
            // window.addEventListener('keydown', (e) => { 
            //     if(e.code == "Space") {
            //         console.log("space pressed");
            //         this.bullet.x = this.player.x;
            //         this.bullet.y = this.player.y;
            //         this.bullet.direction = this.player.direction;
            //     }
            // });
    
        }

        
    }
}