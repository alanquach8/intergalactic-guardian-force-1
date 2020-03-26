module scenes
{
    export class Level3 extends Level1
    {
        constructor(){
            super(scenes.State.END);
            this.MaximumEnemies = 8;
            this.DistanceLeft = 50;
        }

        ReachedLevelEnd(){
            super.ReachedLevelEnd();
            this.SubBoss.HP = 300;
        }

    }
}