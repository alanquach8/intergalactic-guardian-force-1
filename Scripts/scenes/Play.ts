module scenes
{
    export class Play extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _playLabel:objects.Label;
        private _nextButton:objects.Button;
        private _player:objects.Player;
        private _enemies:objects.Enemy[];
        private _noOfEnemies:number;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();

            // initialization
            this._playLabel = new objects.Label();
            this._nextButton = new objects.Button();
            this._player = new objects.Player();
            this._enemies = new Array();
            this._noOfEnemies = 5;

            this.Start();
        }

        // PUBLIC METHODS

        public Start(): void 
        {
            this._playLabel = new objects.Label("Game Started", "10px","Consolas", "#000000", 320, 200, true);
            this._nextButton = new objects.Button("./Assets/images/nextButton.png", 320, 400, true);
            this._player = new objects.Player();
            // Add Enemies to the array
            for(let i = 0; i < this._noOfEnemies; i++){ //TODO add a Variable for number of enemies currently hardcoded to 5
                this._enemies.push(new objects.Enemy());
            }
           
            this.Main();
        }        
        
        public Update(): void {
            // Reference to the Play Scene Object
            let that = this;

            // add more enemies if one dies
            if(this._enemies.length < this._noOfEnemies){
                this._enemies.push(new objects.Enemy());
                this.addChild(this._enemies[this._enemies.length-1]);
            }

            if(this._player.visible){
                this._player.Update();
            } else {
                // game over
                config.Game.SCENE_STATE = scenes.State.END;
            }
            
            this._enemies.forEach((enemy)=>{
                enemy.Update(that._player.x, that._player.y);

                // Bullets and Enemy Collision Check
                that._player.bullets.forEach((bullet)=>{
                    managers.Collision.AABBCheck(bullet, enemy);
                    if(enemy.isColliding) {
                        enemy.hitPoints--;
                        console.log(enemy.hitPoints);
                        if(enemy.hitPoints == 0) {
                            // remove the enemy
                            that._enemies.splice(that._enemies.indexOf(enemy), 1);
                            that.removeChild(enemy);
                            //that._enemies.push(new objects.Enemy());
                            //that.addChild(that._enemies[that._enemies.length-1]);

                        }
                        // remove the bullet
                        that._player.bullets.splice(that._player.bullets.indexOf(bullet), 1);
                        that.removeChild(bullet);
                    }
                });

                // Enemy and Player Collision Check
                managers.Collision.AABBCheck(enemy, that._player);
                if(that._player.isColliding){
                    that._player.life--;
                    console.log(that._player.life);
                    if(that._player.life == 0) {
                        that.removeChild(that._player);
                        that._player.Die();
                    }
                }
            })

            

        }
        
        public Main(): void {
            let that = this;
            
            this.addChild(this._playLabel);
    
            this.addChild(this._nextButton);
    
            this._nextButton.on("click", function() {
               config.Game.SCENE_STATE = scenes.State.END;
            });

            this.addChild(this._player);

            this._enemies.forEach((enemy)=>{
                that.addChild(enemy);
            })
        }
    }
}