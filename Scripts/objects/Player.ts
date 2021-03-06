module objects {

    export class Player extends GameObject {
            
        
        // PRIVATE INSTANCE MEMBERS
        private _boxCollision:string = "";
        private _direction:Vector2;
        private _speed:number = 0.5;
        private _stationarySpeed:number = 1;
        private _facing:number; // used in calculating direction player is facing (degrees)
        private _rotate:number = 0.75; // degrees
        private _stationaryRotate:number = 1.25;
        private _life:number = 10;
        private _reloadSpeed:number = 10;
        private _reloadCounter:number = 0;
        private _isReviving:boolean = false;
        private _wallBuffer = 30;
        private _score:number = 0;

        private _forward:boolean = false;
        private _backward:boolean = false;
        private _left:boolean = false;
        private _right:boolean = false;
        private _shoot:boolean = false;

        private _playerId: number;
        private _controlArray:string[];
        private _isRidingSegway = false;

        private _pierceCount:number = 1;

        private _bullets:objects.Bullet[];

        private _superHero = false;
        
        get PierceCount():number{
            return this._pierceCount;
        }
        set PierceCount(value:number){
            this._pierceCount = value;
        }

        get SuperHero():boolean{
            return this._superHero;
        }
        set SuperHero(val:boolean){
            this._superHero = val;
        }

        get Forward():boolean{
            return this._forward;
        }
        get Backward():boolean{
            return this._backward;
        }


        get IsRidingSegway():boolean{
            return this._isRidingSegway;
        }
        set IsRidingSegway(value:boolean){
            this._isRidingSegway = value;
        }

        get BoxCollision():string{
            return this._boxCollision;
        }
        set BoxCollision(value:string){
            this._boxCollision = value;
        }
        
        // PUBLIC PROPERTIES
        get IsReviving():boolean{
            return this._isReviving;
        }

        set IsReviving(newState:boolean){
            this._isReviving = newState;
        }

        get Direction():Vector2 {
            return this._direction;
        }

        set Direction(newDirection:Vector2) {
            this._direction = newDirection;
        }

        get Speed():number {
            let multiplier = 1

            if (this.IsRidingSegway)
                multiplier = 2

            if (!this._shoot){
                return this._stationarySpeed * multiplier;
            }
            return this._speed * multiplier;
        }

        set Speed(newSpeed:number) {
            this._speed = newSpeed;
        }

        get Facing():number {
            return this._facing;
        }

        set Facing(newFacing:number) {
            this._facing = newFacing;
        }

        get Rotate():number {
            if (!this._shoot){
                return this._stationaryRotate;
            }
            return this._rotate;
        }

        set Rotate(newRotate:number) {
            this._rotate = newRotate;
        }

        get Bullets():objects.Bullet[] {
            return this._bullets;
        }

        set Life(newLife:number) {
            this._life = newLife;
        }

        get Life():number {
            return this._life;
        }

        set ReloadSpeed(newReloadSpeed:number) {
            this._reloadSpeed = newReloadSpeed;
        }

        get ReloadSpeed():number {
            return this._reloadSpeed;
        }

        get Score():number {
            return this._score;
        }

        set Score(newScore:number) {
            this._score = newScore;
        }

        // CONSTRUCTOR
        constructor(playerId:number, imagePath:string="./Assets/images/player/top.png", x:number = 320, y:number = 250, isCentered:boolean = true) //TODO x, y Variables
        {
            super(config.Game.PLAYER_IMAGES[playerId - 1], x, y, true);
            
            this._facing = 270; // initially looking up (-90degrees on canvas axis = 270degrees on normal axis)
            this._direction = new Vector2(0, -1);
            this._bullets = [];
            this._playerId = playerId;

            if(playerId == 1){
                this._controlArray = ["KeyW", "KeyS", "KeyD", "KeyA", "Space"];
                this.x = 200;
            } else {
                this._controlArray = ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft", "ShiftRight"];
                this.x = 440;
            }
            window.addEventListener('keyup', (e) => {
                switch(e.code) {
                    case this._controlArray[0]:
                        this._forward = false;
                        break;
                    case this._controlArray[1]:
                        this._backward = false;
                        break;
                    case this._controlArray[2]:
                        this._right = false;
                        break;
                    case this._controlArray[3]:
                        this._left = false;
                        break;
                    case this._controlArray[4]:
                        this._shoot = false;
                        break;
                }
            });

            window.addEventListener('keydown', (e) => {
                switch(e.code) {
                    case this._controlArray[0]:
                        this._forward = true;
                        break;
                    case this._controlArray[1]:
                        this._backward = true;
                        break;
                    case this._controlArray[2]:
                        this._right = true;
                        break;
                    case this._controlArray[3]:
                        this._left = true;
                        break;
                    case this._controlArray[4]:
                        this._shoot = true;
                        break;
                }
            });

            this.Start();
        }

        // PRIVATE METHODS
        protected _checkBounds(): void {
           
        }    

        public RecalculateDirection():void{
            this._direction = new Vector2(Math.cos(this.Facing*Math.PI/180),Math.sin(this.Facing*Math.PI/180));
        }

        // PUBLIC METHODS
        public Start(): void {
            
        }
        public Update(): void {
            if (this._forward){
                if(this.BoxCollision == "") {
                    this.y += this.Direction.y * this.Speed;
                    this.x += this.Direction.x * this.Speed;
                } else {
                    if(this.BoxCollision == "right") {
                        this.y += this.Direction.y * this.Speed;
                        if((this.Direction.x * this.Speed)+this.x > this.x){
                            this.x += this.Direction.x * this.Speed;
                        }
                    }
                    if(this.BoxCollision == "left") {
                        this.y += this.Direction.y * this.Speed;
                        if((this.Direction.x * this.Speed)+this.x < this.x){
                            this.x += this.Direction.x * this.Speed;
                        }
                    }
                    if(this.BoxCollision == "top") {
                        this.x += this.Direction.x * this.Speed;
                        if((this.Direction.y * this.Speed)+this.y < this.y) {
                            this.y += this.Direction.y * this.Speed;
                        }

                    }
                    if(this.BoxCollision == "bottom") {
                        this.x += this.Direction.x * this.Speed;
                        if((this.Direction.y * this.Speed)+this.y > this.y) {
                            this.y += this.Direction.y * this.Speed;
                        }
                    }
                }
                
                
                

                if (this.x <= this._wallBuffer)
                    this.x -= this.Direction.x * this.Speed;

                if (this.x >= 640 - this._wallBuffer)
                    this.x -= this.Direction.x * this.Speed;

                if (this.y >= 470) 
                    this.y -= this.Direction.y * this.Speed;
            }

            if (this._backward){
                if(this.BoxCollision == "") {
                    this.y -= this.Direction.y * this.Speed;
                    this.x -= this.Direction.x * this.Speed;
                } else {
                    if(this.BoxCollision == "right") {
                        this.y -= this.Direction.y * this.Speed;
                        if(this.x-(this.Direction.x * this.Speed) > this.x){
                            this.x -= this.Direction.x * this.Speed;
                        }
                    }
                    if(this.BoxCollision == "left") {
                        this.y -= this.Direction.y * this.Speed;
                        if(this.x-(this.Direction.x * this.Speed) < this.x){
                            this.x -= this.Direction.x * this.Speed;
                        }
                    }
                    if(this.BoxCollision == "top") {
                        this.x -= this.Direction.x * this.Speed;
                        if(this.y-(this.Direction.y * this.Speed) < this.y) {
                            this.y -= this.Direction.y * this.Speed;
                        }
                    }
                    if(this.BoxCollision == "bottom") {
                        this.x -= this.Direction.x * this.Speed;
                        if(this.y-(this.Direction.y * this.Speed) > this.y) {
                            this.y -= this.Direction.y * this.Speed;
                        }
                    }
                }

                if (this.x <= this._wallBuffer)
                    this.x += this.Direction.x * this.Speed;

                if (this.x >= 640 - this._wallBuffer)
                    this.x += this.Direction.x * this.Speed;

                if (this.y >= 470) 
                    this.y += this.Direction.y * this.Speed;
            }
            
            if (this._right){
                this.rotation += this.Rotate;
                this.Facing += this.Rotate;
                this.RecalculateDirection();
            }
            if (this._left){
                this.rotation -= this.Rotate;
                this.Facing -= this.Rotate;
                this.RecalculateDirection();
            }
            this.position = new Vector2(this.x, this.y);
            if (this._shoot){
                if(this._reloadCounter == 0) {
                    let bullet = new objects.Bullet();
                    bullet.x = this.x;
                    bullet.y = this.y;
                    bullet.direction = this.Direction;
                    bullet.rotation = this.rotation;
                    bullet.PierceCount = this._pierceCount;
                    this._bullets.push(bullet);
                    this.parent.addChild(bullet);
                    let sound:createjs.AbstractSoundInstance;
                    sound = createjs.Sound.play("shoot");
                    sound.volume = 0.5;
                    this._reloadCounter = this._reloadSpeed;
                } else {
                    this._reloadCounter--;
                }
            } else {
                this._reloadCounter = 0;
            }
            for(let i = 0; i<this._bullets.length; i++) {
                this._bullets[i].Update();
            }
        }
        public Reset(): void {

            let that = this;
            let revivalInterval = setInterval(()=>{
                that.alpha = 0;
                setTimeout(() => {
                    that.alpha = 1;
                }, 50);
            }, 100);
            // TODO here we can add an IF to check if player still has life to continue
            this.x = 320; // TODO values should come from a variable
            this.y = 250; // TODO values should come from a variable
            this.visible = true;
            this.isColliding = false;
            this._isReviving = true;
            setTimeout(() => {
                clearInterval(revivalInterval);
                that._isReviving = false;
            }, 3000);
        }

        public Die():void{
            this.visible = false;
        }
    }

}
