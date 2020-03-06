module objects {

    export class Bullet extends GameObject {
            
             //private instance members
             private _direction:Vector2;
             private _speed:number = 20;

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

             
             // constructors


             constructor(imagePath:string = "./Assets/images/bullet/bullet_small.png", x:number = 0, y:number = 0, isCentered:boolean = true)
             {
                 super(imagePath, x, y, isCentered);
                this.position = new Vector2(-1,-1);
                 this._direction = new Vector2(0,-1);
             }
            
            
            
            //private methods
            protected _checkBounds(): void {
                
            }

            public Start(): void {
            
            }
            public Update(): void {
                this.x += this.direction.x * this.speed;
                //this.position.x += this.direction.x * this.speed;
                this.y += this.direction.y * this.speed;
                //this.position.y += this.direction.x * this.speed;
                this.position = new Vector2(this.x, this.y);
            }
            public Reset(): void {
                
            }
        }
}