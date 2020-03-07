module objects {

    type EventCallback = () => any;

    export class SubBoss extends GameObject {
        private _isAlive = true;
        private _state = 1;
        private _hp = 100;
        private _delta = 3;
        private _deathEvent:EventCallback = () : void => {console.log("No action event specified");};
        private _bullets:objects.BulletSlime[] = [];
        private _direction:Vector2;
        private _facing:number; // used in calculating direction player is facing (degrees)
        private _player:objects.Player;
        private _inactive:boolean;
        private _reloadSpeed = 10;
        private _reloadCounter:number;
        private _damageMultiplier = 1;
        

        constructor(player:objects.Player, inactive:boolean=false){
            super("./Assets/images/enemy/subboss/subboss.png", 64, -64, true);
            this._direction = new Vector2(0, 1);
            this._facing = 90;
            this._player = player;
            this._inactive = inactive;

            this._reloadCounter = this._reloadSpeed;

            setInterval(()=> { this.CycleState() }, 5 * 1000);
        }

        get DamageMultiplier():number {
            return this._damageMultiplier
        }

        get Bullets():BulletSlime[]{
            return this._bullets
        }

        get Facing():number {
            return this._facing;
        }

        set Facing(newFacing:number) {
            this._facing = newFacing;
        }

        public Rotate(degrees:number){
            this.rotation += degrees;
            this.Facing += degrees;
            this.RecalculateDirection();
        }

        public SetRotation(degrees:number){
            this.rotation = degrees;
            this.Facing = degrees;
            this.RecalculateDirection();
        }

        public FacePoint(x:number, y:number){
            let theta = Math.atan((y - this.y) / (x - this.x)) * (180 / Math.PI)
            this.SetRotation(theta);
        }

        public FacePlayer(){
            this.FacePoint(this._player.x, this._player.y)
        }
        
        public RecalculateDirection():void{
            this._direction = new Vector2(Math.cos(this.Facing*Math.PI/180),Math.sin(this.Facing*Math.PI/180));
        }

        public get HP(){
            return this._hp
        }
        public set HP(hp:number){
            this._hp = hp;
        }

        public ExecuteDeathEvent(): void{
            this._deathEvent();
        }
        public set DeathEvent(callback: EventCallback) {
            this._deathEvent = callback;
        }
        public get DeathEvent() {
            return this._deathEvent;
        }

        public SetState(state:number){
            switch(state){
                case 1:
                case 2:
                    this._damageMultiplier = 1;
                    break;
                case 3:
                    this._damageMultiplier = 2;
                    break;
            }
            this._state = state;
        }

        public CycleState(){
            if (this._isAlive){
                let num = this._state + 1
                if (this._state + 1 > 3){
                    num = 1
                }
                this.SetState(num);
            }
        }

        public ChangeHP(delta:number){
            this._hp += delta;
            if(this._hp <= 0){
                this.image = new createjs.Bitmap("./Assets/images/enemy/subboss/subboss_dead.png").image;
                this._state = -1;
                this._isAlive = false
                this.ExecuteDeathEvent();
            }
        }

        public get IsAlive(){
            return this._isAlive;
        }

        protected _checkBounds(): void {
        }       
        public Start(): void {
        }
        public Update(): void {
            if(this._inactive){
                return;
            }

            switch(this._state){
                case 1:
                    this.Rotate(this._delta);
                    this.LateralMovement();
                    this.Shoot();
                    break;
                case 2:
                    this.FacePlayer();
                    this.Shoot();
                    break;
                case 3:
                    break;
            }

            this._bullets.forEach(bullet => {
                if (bullet.IsOffScreen()){
                    this.parent.removeChild(bullet);
                    this._bullets.splice(this._bullets.indexOf(bullet), 1);
                }
                bullet.Update();
            });
        }
        public LateralMovement(): void{
            if (this.x < 64 || this.x > 576)
                this._delta *= -1;
            this.x += this._delta;
            this.position = new Vector2(this.x, this.y);
        }
        public Reset(): void {
        }
        public Shoot(): void{
            if(this.parent != null){
                if(--this._reloadCounter <= 0){
                    let bullet = new objects.BulletSlime();
                    bullet.x = this.x;
                    bullet.y = this.y;
                    bullet.direction = this.Direction;
                    bullet.rotation = this.rotation;
                    this.parent.addChild(bullet);
                    this._bullets.push(bullet);
                    this._reloadCounter = this._reloadSpeed;
                }
            }
        }

        get Direction():Vector2 {
            return this._direction;
        }

        set Direction(newDirection:Vector2) {
            this._direction = newDirection;
        }


    }
}