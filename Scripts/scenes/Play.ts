module scenes
{
    export class Play extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _player:objects.Player;
        private _enemies:objects.Enemy[];
        private _explosion:objects.Explosion[];
        private _noOfEnemies:number;
        private _gernadeManager:objects.GrenadeManager;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();

            // initialization
            this._player = new objects.Player();
            this._enemies = new Array();
            this._explosion = [];
            this._noOfEnemies = 5;
            this._gernadeManager = new objects.GrenadeManager();

            this.addEventListener("click", (evt: createjs.MouseEvent) => {
                this.SendGrenade(evt.stageX, evt.stageY);
            });
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
        
        public SendGrenade(x:number, y:number){
            if (this._gernadeManager.GrenadeCount <= 0)
                return

            this.ChangeGrenades(-1);

            let exp = new objects.Explosion(x, y);
            this._explosion.push(exp);
            this.addChild(exp);
        }
        
        public SetGrenades(count:number){
            this._gernadeManager.GrenadeCount = count;
            let grenadeThumbs = this._gernadeManager.GrenadeThumbs;            

            grenadeThumbs.forEach(grenade => {
                this.removeChild(grenade);
            });

            for (let i = 0; i < count; i++) {
                let img = new createjs.Bitmap("./Assets/images/ui/grenade.png")
                img.x += i * img.getBounds().width + 10;
                img.y = 460;
                grenadeThumbs.push(img)
                this.addChild(img)
            }
        }

        public ChangeGrenades(delta:number){
            console.log(delta, this._gernadeManager.GrenadeCount)
            this.SetGrenades(this._gernadeManager.GrenadeCount + delta);
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
            
            this._explosion.forEach(exp => {
                if (exp.Done)
                    this.removeChild(exp);
                exp.Update();
            });

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

                that._explosion.forEach((exp) => {
                    managers.Collision.AABBCheck(exp, enemy);
                    if(enemy.isColliding) 
                        enemy.Die();
                })

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

            this.SetGrenades(2);

            this._gernadeManager.GrenadeCount = 2;

            this._enemies.forEach((enemy)=>{
                that.addChild(enemy);
            })
        }
    }
}