module objects
{
    export class Civilian extends objects.GameObject
    {
        // PRIVATE INSTANCE MEMBERS
        private _life:number = 100;
        private _saved:boolean = false;

        // PUBLIC PROPERTIES
        public get Life() {
            return this._life;
        }
        public set Life(newLife:number) {
            this._life = newLife;
        }

        public get Saved() {
            return this._saved;
        }
        public set Saved(newSaved:boolean) {
            this._saved = newSaved;
        }
        // CONSTRUCTOR
        constructor(x:number = 200, y:number = 200) {
            super("./Assets/images/environment/civilian.png", x, y, true);
            this.Start();
        }
        // PRIVATE METHODS
        protected _checkBounds(): void {
            
        }
        // PUBLIC METHODS
        public Start(): void {
            
        }
        public Update(): void {
            if(this._life == 0) {
                //civilian dies and is not saved
                config.Game.SCORE -= 10;
            }
            if(this._saved) {
                //civilian is saved
                config.Game.SCORE += 10;
            }
            
        }
        public Reset(): void {
            
        }
        
    }
}