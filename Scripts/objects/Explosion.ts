module objects {

    export class Explosion extends GameObject {       
        private _delta = 0.05;
        private _done = false;

        public get Done(){
            return this._done;
        }

        constructor(x:number = 320, y:number = 250) //TODO x, y Variables
        {
            super("Assets/images/environment/explosion.png", x, y, true);
            this.alpha = 0
        }


        protected _checkBounds(): void {
        }        
        public Start(): void {
        }
        public Update(): void {
            this.alpha += this._delta;
            if (this.alpha >= 1){
                this._delta *= -1
            }
            if (this.alpha <= 0){
                this._done = true;
            } 
        }
        public Reset(): void {
        }

    }
}
            