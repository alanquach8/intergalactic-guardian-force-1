module scenes
{
    export class Start extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        startLabel:objects.Label;
        startButton:objects.Button;
        player:objects.Player;
        enemy:objects.Enemy;
        bullet:objects.Bullet;

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
            this.bullet = new objects.Bullet();

            this.Start();
        }

        // PUBLIC METHODS

        public Start(): void 
        {
            this.startLabel = new objects.Label("The Game", "80px","Consolas", "#000000", 320, 200, true);
            this.startButton = new objects.Button("./Assets/images/startButton.png", 320, 400, true);
            this.player = new objects.Player();
            this.enemy = new objects.Enemy();
            this.bullet = new objects.Bullet();
           
            this.Main();
        }        
        
        public Update(): void {
            console.log("PLAYER X:" + this.player.x + " " + this.player.position.x); //position is never updated...
            console.log("ENEMY X:" + this.enemy.x + " " + this.enemy.position.x); 
            this.player.Update();
            this.enemy.Update(this.player.x, this.player.y);
            this.bullet.Update();
            //managers.Collision.squaredRadiusCheck(player, startButton);

            managers.Collision.AABBCheck(this.player, this.enemy);
            if(this.enemy.isColliding) {
                this.enemy.position = new objects.Vector2(400, 400);
                this.enemy.isColliding = false;
            }
        }
        
        public Main(): void {
            
            this.addChild(this.startLabel);
    
            this.addChild(this.startButton);
    
            this.startButton.on("click", function() {
               config.Game.SCENE_STATE = scenes.State.PLAY;
            });
    
            
            this.addChild(this.player);
            this.enemy.position = new objects.Vector2(300, 300);
            this.addChild(this.enemy);
            this.addChild(this.bullet);
            window.addEventListener('keydown', (e) => { 
                if(e.code == "Space") {
                    console.log("space pressed");
                    this.bullet.x = this.player.x;
                    this.bullet.y = this.player.y;
                    this.bullet.direction = this.player.direction;
                }
            });
        }

        
    }
}