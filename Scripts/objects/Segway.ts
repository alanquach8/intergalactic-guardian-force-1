module objects {
    export class Segway extends GameObject {
        private riding:objects.Player;
        private isRiding = false;

        constructor(imagePath:string = "./Assets/images/vehicle/segway.png", x:number = 100, y:number = 100, isCentered:boolean = true){
            super(imagePath, x, y, isCentered);
            this.riding = new objects.Player(0);
        } 
            
        //private methods
        protected _checkBounds(): void {
            
        }

        public Start(): void {
        
        }
        public Update(): void {
            if(this.isRiding){
                this.position = new objects.Vector2(this.riding.x, this.riding.y);
                this.rotation = this.riding.rotation;
            }
        }
        
        public Reset(): void {
            
        }

        public get IsRiding(){
            return this.isRiding;
        }

        public SetRider(player:objects.Player){
            this.riding = player;
            this.isRiding = true;
        }

        public GetRider(): objects.Player{
            return this.riding;
        }
    }
}