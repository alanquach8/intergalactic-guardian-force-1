module objects
{
    type EventCallback = () => any;

    export class Powerup extends GameObject
    {
        _activation_event:EventCallback;

        constructor(image:string, x:number, y:number){
            super(image, x, y);
            this._activation_event = () : void => {console.log("No action event specified");};
        }

        protected _checkBounds(): void {
        }
        public Reset(): void {
        }
        public Start(): void {
        }        
        public Update(): void {
        }
        public Main(): void {
        }

        public ExecuteAction(): void{
            this._activation_event();
        }
        public set ActivationEvent(callback: EventCallback) {
            this._activation_event = callback;
        }
        public get ActivationEvent() {
            return this._activation_event;
        }

        public set Scale(factor:number){
            this.scaleX = factor;
            this.scaleY = factor;

            this.width *= factor;
            this.height *= factor;
        }
    }
}