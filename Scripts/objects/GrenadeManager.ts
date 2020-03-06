module objects {

    export class GrenadeManager extends GameObject {

        private _grenadeCount:number = 0;
        private _grenadeThumbs: createjs.Bitmap[];
            
        constructor()
        {
            super("", 0, 0, true);
            this._grenadeThumbs = [];
            this.Start();
        }

        // PRIVATE METHODS
        protected _checkBounds(): void {
           
        }    

        public get GrenadeThumbs(){
            return this._grenadeThumbs;
        }
        public set GrenadeThumbs(thumbs:createjs.Bitmap[]){
            this._grenadeThumbs = thumbs;
        }

        public set GrenadeCount(count:number){
            this._grenadeCount = count;
        }
        public get GrenadeCount(){
            return this._grenadeCount;
        }
        
        // PUBLIC METHODS
        public Start(): void {
        }
        public Update(): void {
           
        }
        public Reset(): void {

        }
    }
}
