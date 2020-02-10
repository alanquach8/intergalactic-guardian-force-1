module objects {

    export class Player extends GameObject {
            
        // PRIVATE INSTANCE MEMBERS
        private _direction:Vector2;
        private _speed:number = 1;
        private _facing:number; // used in calculating direction player is facing (degrees)
        private _rotate:number = 1; // degrees

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

        // CONSTRUCTOR
        constructor(imagePath:string = "./Assets/images/placeholder.png", x:number = 0, y:number = 0, isCentered:boolean = true)
        {
            super("./Assets/images/placeholder.png", 1, 1, true);
            
            this._facing = 270; // initially looking up (-90degrees on canvas axis = 270degrees on normal axis)
            this._direction = new Vector2(0, -1);

            window.addEventListener('keydown', (e) => {
                switch(e.code) {
                    case "ArrowUp":
                        this.y += this.direction.y * this.speed;
                        this.x += this.direction.x * this.speed;
                        break;
                    case "ArrowDown":
                        this.y -= this.direction.y * this.speed;
                        this.x -= this.direction.x * this.speed;
                        break;
                    case "ArrowRight":
                        this.rotation += this.rotate;
                        this.facing += this.rotate;
                        this._direction = new Vector2(Math.cos(this.facing*Math.PI/180),Math.sin(this.facing*Math.PI/180));
                        break;
                    case "ArrowLeft":
                        this.rotation -= this.rotate;
                        this.facing -= this.rotate;
                        this._direction = new Vector2(Math.cos(this.facing*Math.PI/180),Math.sin(this.facing*Math.PI/180));
                        break;
                    default:
                        break;
                    //  case "Space":
                    //      console.log("space pressed");
                    //     let bullet:Bullet = new Bullet("./Assets/images/bulletPlaceHolder.png", this.x, this.y, true);
                    //     bullet.direction = this.direction;
                    //     createjs.Ticker.framerate = 60; // declare the framerate as 60FPS
                    //     createjs.Ticker.on('tick', bullet.Update);
                    //     this.parent.addChild(bullet);
                    //     break;
                }
                console.log("x:" + this.direction.x + ", y:" + this.direction.y);

                // window.addEventListener('keydown', (e) => {
                //     switch(e.keyCode) {
                //         case 38: //ArrowUp
                //             player.y -= 10;
                //             break;
                //         case 40: //ArrowDown
                //             player.y += 10;
                //             break;
                //         case 39: //ArrowRight
                //             player.rotation += 1;
                //             break;
                //         case 37: //ArrowLeft
                //             player.rotation -= 1;
                //             break;
                //         default:
                //             break;
                //     }
                // });
            });

            this.Start();
        }

        // PRIVATE METHODS
        protected _checkBounds(): void {
           
        }    

        // PUBLIC METHODS
        public Start(): void {
            
        }
        public Update(): void {
            //let mouseX = config.Game.STAGE.mouseX;
            //let mouseY = config.Game.STAGE.mouseY;

           //this.position = new Vector2(mouseX, mouseY);
        }
        public Reset(): void {
            
        }
    }

}
