module scenes
{
    export class Play extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _player:objects.Player;
        private _enemies:objects.Enemy[];
        private _noOfEnemies:number;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();

            // initialization
            this._player = new objects.Player();
            this._enemies = new Array();
            this._noOfEnemies = 5;

            this.Start();
        }

        // PUBLIC METHODS

        public Start(): void 
        {
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
                that._player.Bullets.forEach((bullet)=>{
                    managers.Collision.AABBCheck(bullet, enemy);
                    if(enemy.isColliding) {
                        enemy.hitPoints--;
                        console.log(enemy.hitPoints);
                        if(enemy.hitPoints == 0) {
                            enemy.Die();
                        }
                        // remove the bullet

                        if (enemy.IsAlive){
                            that._player.Bullets.splice(that._player.Bullets.indexOf(bullet), 1);
                            that.removeChild(bullet);
                        }
                    }
                });

                if (enemy.isDead){
                    that._enemies.splice(that._enemies.indexOf(enemy), 1);
                    that.removeChild(enemy);
                }

                // Enemy and Player Collision Check
                managers.Collision.AABBCheck(enemy, that._player);
                if(that._player.isColliding && !that._player.IsReviving){
                    that._player.Life--;
                    console.log(that._player.Life);
                    if(that._player.Life == 0) {
                        that.removeChild(that._player);
                        that._player.Die();
                    } else {
                        that._player.Reset();
                    }
                }
            })

            

        }
        
        public Main(): void {
            let that = this;

            this.addChild(new objects.Rectangle(0, 0, 15, 480, "DarkGrey"))
            this.addChild(new objects.Rectangle(625, 0, 15, 480, "DarkGrey"))
            this.addChild(new objects.Rectangle(15, 0, 610, 480, "GhostWhite"))
            
            this.addChild(this._player);

            this._enemies.forEach((enemy)=>{
                that.addChild(enemy);
            })
        }
    }
}