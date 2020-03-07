module scenes
{
    export class Level2 extends Level1
    {
        constructor(scene=scenes.State.LEVEL3){
            super(scene);
            this.MaximumEnemies = 8;
        }

        ReachedLevelEnd(){
            super.ReachedLevelEnd();
            this.SubBoss.HP += 10
        }

    }
}