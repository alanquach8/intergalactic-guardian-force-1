module objects
{
    export class Box extends objects.GameObject
    {
        // PRIVATE INSTANCE MEMBERS
        private _life:number = 5;
        private _broken:boolean = false;

        // PUBLIC PROPERTIES
        public get Life() {
            return this._life;
        }
        public set Life(newLife:number) {
            this._life = newLife;
        }

        public get Broken() {
            return this._broken;
        }
        public set Broken(newBroken:boolean) {
            this._broken = newBroken;
        }

        // CONSTRUCTOR
        constructor(x:number = 200, y:number = 200) {
            super("./Assets/images/box.png", x, y, true);
        }

        // PRIVATE METHODS
        protected _checkBounds(): void {
            
        }

        // PUBLIC METHODS
        
        public Start(): void {
            
        }
        public Update(): void {
            if(this._life == 0) {
                this._broken = true;
            }
            
        }
        public Reset(): void {
            
        }
        
    }
}