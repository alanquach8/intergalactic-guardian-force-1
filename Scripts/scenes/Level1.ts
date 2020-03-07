module scenes
{
    export class Level1 extends LevelParent
    {
        private _subBoss: objects.SubBoss = new objects.SubBoss(new objects.Player, true);
        private _spawnedBoss = false;

        constructor(scene=scenes.State.LEVEL2){
            
            super(scene);
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
                this.Player.Bullets.forEach(bullet => {
                    managers.Collision.AABBCheck(this._subBoss, bullet);
                    if(bullet.isColliding){
                        this.Player.Bullets.splice(this.Player.Bullets.indexOf(bullet), 1);
                        this.removeChild(bullet);
                        this._subBoss.ChangeHP(-1);
                    }
                });
            }


        }

    }
}