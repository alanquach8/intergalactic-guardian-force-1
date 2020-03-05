module scenes
{
    export class Play extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private playLabel:objects.Label;
        private nextButton:objects.Button;
        private player:objects.Player;
        private enemies:objects.Enemy[];

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();

            // initialization
            this.playLabel = new objects.Label();
            this.nextButton = new objects.Button();
            this.player = new objects.Player();
            this.enemies = new Array();

            this.Start();
        }

        // PUBLIC METHODS

        public Start(): void 
        {
            this.playLabel = new objects.Label("Game Started", "10px","Consolas", "#000000", 320, 200, true);
            this.nextButton = new objects.Button("./Assets/images/nextButton.png", 320, 400, true);
            this.player = new objects.Player();
            // Add Enemies to the array
            for(let i = 0; i < 5; i++){ //TODO add a Variable for number of enemies currently hardcoded to 5
                this.enemies.push(new objects.Enemy());
            }
           
            this.Main();
        }        
        
        public Update(): void {
            // Reference to the Play Scene Object
            let that = this;

            this.player.Update();

            this.enemies.forEach((enemy)=>{
                enemy.Update(that.player.x, that.player.y);

                // Bullets and Enemy Collision Check
                that.player.bullets.forEach((bullet)=>{
                    managers.Collision.AABBCheck(bullet, enemy);
                    if(enemy.isColliding) {
                        if (enemy.isDead){
                            // remove the enemy
                            that.enemies.splice(that.enemies.indexOf(enemy), 1);
                            that.removeChild(enemy);
                        }
                        // remove the bullet
                        that.player.bullets.splice(that.player.bullets.indexOf(bullet), 1);
                        that.removeChild(bullet);
                    }
                });

                // Enemy and Player Collision Check
                managers.Collision.AABBCheck(enemy, that.player);
                if(that.player.isColliding){
                    that.player.Reset();
                }
            })

            

        }
        
        public Main(): void {
            let that = this;
            
            this.addChild(this.playLabel);
    
            this.addChild(this.nextButton);
    
            this.nextButton.on("click", function() {
               config.Game.SCENE_STATE = scenes.State.END;
            });

            this.addChild(this.player);

            this.enemies.forEach((enemy)=>{
                that.addChild(enemy);
            })
        }
    }
}