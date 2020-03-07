module scenes
{
    export class Level3 extends Level1
    {
        constructor(){
            super(scenes.State.END);
            this.MaximumEnemies = 12;
        }

        ReachedLevelEnd(){
            super.ReachedLevelEnd();
            this.SubBoss.HP += 20
        }

    }
}