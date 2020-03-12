module objects {

    export class Bullet extends GameObject {
            
             //private instance members
             private _direction:Vector2;
             private _speed:number = 20;
             private _pierceCount = 1;
             private _collidedWith: Enemy[] = [];

             // public properties

             get direction():Vector2 {
                return this._direction;
            }

            get PierceCount():number{
                return this._pierceCount;
            }
            set PierceCount(value:number){
                this._pierceCount = value;
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

            public IsOffScreen():boolean {
                return this.x < 0 || this.x > 640 || this.y < 0 || this.y > 480;
            }

            public IsEnemyBlacklisted(e:Enemy):boolean{
                return this._collidedWith.indexOf(e) > -1
            }

            public BlacklistEnemyDamage(e:Enemy){
                this._collidedWith.push(e)
            }

            public ShouldImpactDelete():boolean{
                console.log(this._collidedWith.length)
                return this._collidedWith.length >= this._pierceCount
            }


        }
}