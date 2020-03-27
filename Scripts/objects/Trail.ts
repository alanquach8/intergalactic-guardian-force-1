module objects {

    export class Trail extends GameObject {
        private _state = 0;
        private _startTime:number;
        private _ttl:number;
        
        constructor(imagePath:string = "./Assets/images/vehicle/segway.png", x:number = 100, y:number = 100, isCentered:boolean = true, ttl:number=2){
            super(imagePath, x, y, isCentered);
            this._startTime = (new Date()).getTime() / 1000;
            this._ttl = ttl;
        } 

        public GetTimeAlive():number{
            return ((new Date()).getTime() / 1000) - this._startTime;
        }
        protected _checkBounds(): void {
        }
        public Start(): void {
        }
        public Update(): void {
            switch(this._state){
                case 0:
                    if(this.GetTimeAlive() >= this._ttl)
                        this._state = 1;
                    break;
                case 1:
                    this.alpha -= 0.05;
                    if (this.alpha <= 0)
                        this._state = 2;
                    break;                    
            }
        }
        public Reset(): void {
        }
        
        public CanDelete():boolean{
            return this._state == 2
        }
    }
}