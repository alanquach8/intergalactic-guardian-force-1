module scenes
{
    export class Level1 extends LevelParent
    {
        private _subBoss: objects.SubBoss;
        private _spawnedBoss = false;

        constructor(scene=scenes.State.LEVEL2){
            
            super(scene);
            this._subBoss = new objects.SubBoss(new objects.Player(0), true)
            this.CanFinish = false;
        }

        SpawnBoss(){
            this._subBoss = new objects.SubBoss(this.Player);
            this.addChild(this._subBoss)
            this._subBoss.DeathEvent = () : void => {
                this.CanFinish = true;
            };
        }

        public get SubBoss(){
            return this._subBoss;
        }

        public EndGamePrep(){
            
        }

                
        public PlayerMovementUpdate(y_delta:number){
            this._subBoss.y -= y_delta;
            this._subBoss.position = new objects.Vector2(this._subBoss.x, this._subBoss.y);
        }


        Update(){
            super.Update();

            if (this.DistanceLeft <= this._subBoss.height && !this._spawnedBoss){
                this._spawnedBoss = true;
                this.SpawnBoss();
            }
            
            if (this._subBoss != undefined){
                this._subBoss.Update();
                this.Players.forEach(player => {
                    player.Bullets.forEach(bullet => {
                        managers.Collision.AABBCheck(this._subBoss, bullet);
                        if(bullet.isColliding && this._subBoss.HP > 0){
                            player.Bullets.splice(player.Bullets.indexOf(bullet), 1);
                            this.removeChild(bullet);
                            this._subBoss.ChangeHP(-1);
                        }
                    }); 



                    this._subBoss.Bullets.forEach(bullet => {
                        managers.Collision.AABBCheck(player, bullet);
                        if(bullet.isColliding  && !player.IsReviving){
                            this._subBoss.Bullets.splice(this._subBoss.Bullets.indexOf(bullet), 1);
                            this.removeChild(bullet);
                            this.PlayerLives --;
                            this.UpdatePlayerLivesIndicator();
                            if(this.PlayerLives == 0) {
                                config.Game.SCENE_STATE = scenes.State.LOOSE;
                            } else {
                                player.Reset();
                            }
                        }
        
                        this.Enemies.forEach(enemy => {
                            managers.Collision.AABBCheck(bullet, enemy);
                            if(enemy.isColliding) {
                                enemy.hitPoints--;
                                if(enemy.hitPoints == 0) {
                                    this.KillEnemy(enemy);
                                }
                                // remove the bullet
            
                                if (enemy.IsAlive){
                                    this._subBoss.Bullets.splice(this._subBoss.Bullets.indexOf(bullet), 1);
                                    this.removeChild(bullet);
                                }
                            }
                        });
                       
                       
                    });

                });
            }
        }
    }
}