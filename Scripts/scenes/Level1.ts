module scenes
{
    export class Level1 extends LevelParent
    {
        private _subBoss: objects.SubBoss = new objects.SubBoss;

        constructor(scene=scenes.State.LEVEL2){
            
            super(scene);
            this.CanFinish = false;
        }

        ReachedLevelEnd(){
            this._subBoss = new objects.SubBoss();
            this.addChild(this._subBoss)
            this._subBoss.DeathEvent = () : void => {
                this.CanFinish = true;
            };
        }

        public get SubBoss(){
            return this._subBoss;
        }

        Update(){
            super.Update();
            
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