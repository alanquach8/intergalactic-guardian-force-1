module objects {

    export class Player extends GameObject {
            
        // PRIVATE INSTANCE MEMBERS
        private _direction:Vector2;
        private _speed:number = 1;
        private _facing:number; // used in calculating direction player is facing (degrees)
        private _rotate:number = 1; // degrees

        private forward:boolean = false;
        private backward:boolean = false;
        private left:boolean = false;
        private right:boolean = false;
        private shoot:boolean = false;

        private _bullets:objects.Bullet[];
        
        // PUBLIC PROPERTIES
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

        get rotate():number {
            return this._rotate;
        }

        set rotate(newRotate:number) {
            this._rotate = newRotate;
        }

        get bullets():objects.Bullet[] {
            return this._bullets;
        }

        // CONSTRUCTOR
        constructor(imagePath:string="/Assets/images/player/top.png", x:number = 320, y:number = 250, isCentered:boolean = true) //TODO x, y Variables
        {
            super(imagePath, x, y, true);
            
            this._facing = 270; // initially looking up (-90degrees on canvas axis = 270degrees on normal axis)
            this._direction = new Vector2(0, -1);
            this._bullets = [];

            window.addEventListener('keyup', (e) => {
                switch(e.code) {
                    case "ArrowUp":
                        this.forward = false;
                        break;
                    case "ArrowDown":
                        this.backward = false;
                        break;
                    case "ArrowRight":
                        this.right = false;
                        break;
                    case "ArrowLeft":
                        this.left = false;
                        break;
                    case "Space":
                        this.shoot = false;
                        break;
                }
            });

            window.addEventListener('keydown', (e) => {
                switch(e.code) {
                    case "ArrowUp":
                        this.forward = true;
                        break;
                    case "ArrowDown":
                        this.backward = true;
                        break;
                    case "ArrowRight":
                        this.right = true;
                        break;
                    case "ArrowLeft":
                        this.left = true;
                        break;
                    case "Space":
                        this.shoot = true;
                        break;
                }
            });

            this.Start();
        }

        // PRIVATE METHODS
        protected _checkBounds(): void {
           
        }    

        public RecalculateDirection():void{
            this._direction = new Vector2(Math.cos(this.facing*Math.PI/180),Math.sin(this.facing*Math.PI/180));
        }

        // PUBLIC METHODS
        public Start(): void {
            
        }
        public Update(): void {
            if (this.forward){
                this.y += this.direction.y * this.speed;
                this.x += this.direction.x * this.speed;
            }
            if (this.backward){
                this.y -= this.direction.y * this.speed;
                this.x -= this.direction.x * this.speed;
            }
            if (this.right){
                this.rotation += this.rotate;
                this.facing += this.rotate;
                this.RecalculateDirection();
            }
            if (this.left){
                this.rotation -= this.rotate;
                this.facing -= this.rotate;
                this.RecalculateDirection();
            }
            this.position = new Vector2(this.x, this.y);
            if (this.shoot){
                let bullet = new objects.Bullet();
                bullet.x = this.x;
                bullet.y = this.y;
                bullet.direction = this.direction;
                this._bullets.push(bullet);
                this.parent.addChild(bullet);
            }
            for(let i = 0; i<this._bullets.length; i++) {
                this._bullets[i].Update();
            }
        }
        public Reset(): void {

            // TODO here we can add an IF to check if player still has life to continue
            this.x = 320; // TODO values should come from a variable
            this.y = 250; // TODO values should come from a variable
            this.visible = true;
            this.isColliding = false;
        }

        public Die():void{
            this.visible = false;
        }
    }

}
