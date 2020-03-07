module objects {

    type EventCallback = () => any;

    export class SubBoss extends GameObject {
        private _isAlive = true;
        private _state = 1;
        private _hp = 10;
        private _delta = 3;
        private _deathEvent:EventCallback = () : void => {console.log("No action event specified");};
        

        constructor(){
            super("./Assets/images/enemy/subboss/subboss.png", 64, 64, true);
        }

        public get HP(){
            return this._hp
        }
        public set HP(hp:number){
            this._hp = hp;
        }

        public ExecuteDeathEvent(): void{
            this._deathEvent();
        }
        public set DeathEvent(callback: EventCallback) {
            this._deathEvent = callback;
        }
        public get DeathEvent() {
            return this._deathEvent;
        }

        public ChangeHP(delta:number){
            this._hp += delta;
            if(this._hp <= 0){
                this.image = new createjs.Bitmap("./Assets/images/enemy/subboss/subboss_dead.png").image;
                this._state = -1;
                this.ExecuteDeathEvent();
            }
        }

        public get IsAlive(){
            return this._isAlive;
        }

        protected _checkBounds(): void {
        }       
        public Start(): void {
        }
        public Update(): void {
            if (this._state == 1){
                this.rotation += this._delta;
                this.LateralMovement()
            }
        }
        public LateralMovement(): void{
            if (this.x < 64 || this.x > 576)
                this._delta *= -1;
            this.x += this._delta;
            this.position = new Vector2(this.x, this.y);
        }
        public Reset(): void {
        }


    }
}