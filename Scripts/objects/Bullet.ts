module objects {

    export  abstract class Bullet extends GameObject {
             //private instance members
             private _direction:Vector2;
             private _speed:number = 20;
             private _facing:number;



             // public properties

             get direction():Vector2 {
                return this._direction;
            }
    
            set direction(newDirection:Vector2) {
                this._direction = newDirection;
            }

            get speed():number {
                return this._speed
            }
    
            set speed(newSpeed:number) {
                this._speed = newSpeed;
            }

            get facing():number {
                return this._facing;
            }
    
            set facing(newFacing:number) {
                this._facing = newFacing;
            }

             
             // constructors


             constructor()
             {
                 super("./Assets/images/placeholder.png", 0, 0, true);
                 
                 this._facing = 270;
                 this._direction = new Vector2(Math.cos(this.facing*Math.PI/180),Math.sin(this.facing*Math.PI/180));
             }
            
            
            
             //private methods

            public Start(): void {
            
            }
            public Update(): void {
                
            }
            public Reset(): void {
                
            }




    }