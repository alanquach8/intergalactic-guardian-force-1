module objects {

    type EventCallback = () => any;

    export class SubBoss extends GameObject {
        private _isAlive = true;
        private _state = 1;
        private _hp:number;
        private _maHP = 100;
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
        private _healthBarBack:objects.Rectangle;
        private _healthBarValue:objects.Rectangle;
        private _maxState = 3;
        private _deathImage = "./Assets/images/enemy/subboss/subboss_dead.png";
        

        constructor(player:objects.Player, inactive:boolean=false, image:string="./Assets/images/enemy/subboss/subboss.png"){
            super(image, 64, -64, true);
            this._direction = new Vector2(0, 1);
            this._facing = 90;
            this._player = player;
            this._inactive = inactive;

            this._hp = this._maHP;

            this._reloadCounter = this._reloadSpeed;

            setInterval(()=> { this.CycleState() }, 5 * 1000);

            this._healthBarBack = new Rectangle(0, 0, this.width, 10, "Gray");
            this._healthBarValue = new Rectangle(0, 0, 0, 10, "red");
            this.UpdateHealthBar();
        }

        public set DeathImage(path:string){
            this._deathImage = path
        }

        public UpdateHealthBar(){
            if (this.parent == null)
                return;
            this.parent.removeChild(this._healthBarBack);
            this.parent.removeChild(this._healthBarValue);

            if(!this.IsAlive)
                return;
            this._healthBarBack  = new Rectangle(this.x - this.halfWidth, this.y + this.halfHeight, this.width, 10, "Gray")
            this._healthBarValue = new Rectangle(this.x - this.halfWidth, this.y + this.halfHeight, (this._hp / this._maHP) * this.width, 10, "red")
            this.parent.addChild(this._healthBarBack);
            this.parent.addChild(this._healthBarValue);
        }

        public get DamageMultiplier(): number{
            return this._damageMultiplier
        }
        public set DamageMultiplier(val:number){
            this._damageMultiplier = val;
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
            // tan was causing some weird errors because of the ambiguity
            let dy = (y - this.y);
            let dx = (x - this.x);
            let theta = Math.asin(dy / Math.sqrt(dx ** 2 + dy ** 2)) * (180 / Math.PI)
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
            this._maHP = hp;
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

        public set State(val:number){
            this._state = val;
        }

        public CycleState(){
            if (this._isAlive){
                let num = this._state + 1
                if (this._state + 1 > this._maxState){
                    num = 1
                }
                this.SetState(num);
            }
        }

        public ChangeHP(delta:number){
            this._hp += delta;
            if(this._hp <= 0){
                this.image = new createjs.Bitmap(this._deathImage).image;
                this._state = -1;
                this._isAlive = false
                let sound:createjs.AbstractSoundInstance;
                sound = createjs.Sound.play("boss_dying");
                this.ExecuteDeathEvent();
                config.Game.SCORE += this._maHP;
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
                bullet.Update();
                if (bullet.IsOffScreen(-50)){
                    this.parent.removeChild(bullet);
                    this._bullets.splice(this._bullets.indexOf(bullet), 1);
                }
            });
            this.UpdateHealthBar();
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