module scenes
{
    export class Level3 extends Level1
    {
        constructor(){
            super(scenes.State.END);
            this.MaximumEnemies = 10;
            this.DistanceLeft = 30;
        }

        ReachedLevelEnd(){
            super.ReachedLevelEnd();
            this.SubBoss.HP = 40;
        }

    }
}