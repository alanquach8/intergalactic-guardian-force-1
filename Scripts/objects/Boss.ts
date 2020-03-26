module objects {

    export class Boss extends objects.SubBoss {  
        constructor(player:objects.Player, inactive:boolean=false){
            super(player, inactive, "./Assets/images/enemy/boss/boss.png");
        }

        public SetState(state:number){
            switch(state){
                case 1:
                case 2:
                    this.DamageMultiplier = 0;
                    break;
                case 3:
                    this.DamageMultiplier = 1;
                    break;
            }
            this.State = state;
        }
    }
}