module scenes
{
    export class Level3 extends Level1
    {
        constructor(){
            super(scenes.State.END, "./Assets/images/environment/background3.png");
            this.MaximumEnemies = 8;
            this.DistanceLeft = 50;
        }

        ReachedLevelEnd(){
            super.ReachedLevelEnd();
            this.SubBoss.HP = 300;
        }

        public SpawnBoss(){
            this.Boss = new objects.Boss(this.Player);
            this.Boss.scaleX = 1.5;
            this.Boss.scaleY = 1.5;
            this.addChild(this.Boss)
            this.Boss.DeathEvent = () : void => {
                this.CanFinish = true;
                this.Boss.scaleX = 1.5;
                this.Boss.scaleY = 1.5;
            };
        }

    }
}