module scenes
{
    export class LevelParent extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _player:objects.Player;
        private _enemies:objects.Enemy[];
        private _deadEnemies:objects.Enemy[];
        private _explosion:objects.Explosion[];
        private _noOfEnemies:number;
        private _gernadeManager:objects.GrenadeManager;
        private _playerLivesThumbs: createjs.Bitmap[];
        private _powerups:objects.Powerup[];
        private _scrollBuffer=100;
        private _movingForward=false;
        private _movingBackward=false;
        private _distance_left = 10;
        private _nextLevel: scenes.State;
        private _canFinish = true;
        private _endEventFired = false;


        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor(next:scenes.State)
        {
            super();

            // initialization
            this._player = new objects.Player();
            this._enemies = new Array();
            this._deadEnemies = new Array();
            this._powerups = new Array();
            this._explosion = [];
            this._playerLivesThumbs = [];
            this._noOfEnemies = 5;
            this._gernadeManager = new objects.GrenadeManager();
            this._nextLevel = next;


            this.addEventListener("click", (evt: createjs.MouseEvent) => {
                this.SendGrenade(evt.stageX, evt.stageY);
            });
            window.addEventListener('keyup', (e: KeyboardEvent) => {
                switch(e.code) {
                    case "ArrowUp":
                        this._movingForward = false;
                        break;
                    case "ArrowDown":
                        this._movingBackward = false;
                        break;
                }
            });

            window.addEventListener('keydown', (e: KeyboardEvent) => {
                switch(e.code) {
                    case "ArrowUp":
                        this._movingForward = true;
                        break;
                    case "ArrowDown":
                        this._movingBackward = true;
                        break;
                }
            });

            this.Start();
        }

        public set MaximumEnemies(amount:number){
            this._noOfEnemies = amount;
        }

        // PUBLIC METHODS

        public Start(): void 
        {
            this._player = new objects.Player();
            // Add Enemies to the array
            for(let i = 0; i < this._noOfEnemies; i++){ //TODO add a Variable for number of enemies currently hardcoded to 5
                this._enemies.push(new objects.Enemy());
            }
           
            this.Main();
        }  

        private getRandomInt(max:number) {
            return Math.floor(Math.random() * Math.floor(max));
        }

        public CreatePowerup(x:number=-1, y:number=0, id:number=-1){

            if(id == -1){
                // n cases (in the switch statement below) + 1
                id = this.getRandomInt(2)
            }

            if(x == -1){
                x = this.getRandomInt(480)
            }

            // default is a grenade (ID: 0)
            let p = new objects.Powerup("./Assets/images/ui/grenade.png", x, y);
            p.ActivationEvent = () => {
                this.ChangeGrenades(1);
            };;

            switch (id){
                case 1: 
                    p = new objects.Powerup("./Assets/images/player/front.png", x, y);
                    p.Scale = 0.5;
                    p.ActivationEvent = () => {
                        this._player.Life += 1;
                        this.UpdatePlayerLivesIndicator();
                    };
                    break;    
            }
            if(p != undefined){
                this._powerups.push(p);
                this.addChild(p);
            }
        }

        public get Player(){
            return this._player;
        }
       
        public SendGrenade(x:number, y:number){
            if (this._gernadeManager.GrenadeCount <= 0)
                return

            this.ChangeGrenades(-1);

            let exp = new objects.Explosion(x, y);
            this._explosion.push(exp);
            this.addChild(exp);
        }

        public UpdatePlayerLivesIndicator():void{
            this._playerLivesThumbs.forEach(p => {
                this.removeChild(p);
            });

            let x = 640;

            for (let i = 0; i < this._player.Life; i++) {
                let img = new createjs.Bitmap("./Assets/images/player/front.png")
                img.scaleX = 0.5;
                img.scaleY = 0.5;
                x -= (img.getBounds().width * 0.5) + 5
                img.x = x;
                img.y = 460;
                this._playerLivesThumbs.push(img)
                this.addChild(img)
            }
        }
        
        public SetGrenades(count:number){
            this._gernadeManager.GrenadeCount = count;
            let grenadeThumbs = this._gernadeManager.GrenadeThumbs;            

            grenadeThumbs.forEach(grenade => {
                this.removeChild(grenade);
            });

            for (let i = 0; i < count; i++) {
                let img = new createjs.Bitmap("./Assets/images/ui/grenade.png")
                img.x += i * img.getBounds().width + 10;
                img.y = 460;
                grenadeThumbs.push(img)
                this.addChild(img)
            }
        }

        public ChangeGrenades(delta:number){
            this.SetGrenades(this._gernadeManager.GrenadeCount + delta);
        }

        public KillEnemy(enemy:objects.Enemy): void{
            enemy.Die();
            this._deadEnemies.push(enemy);
            this._enemies.splice(this._enemies.indexOf(enemy), 1);
        }

        public get CanFinish(){
            return this._canFinish;
        }
        public set CanFinish(state:boolean){
            this._canFinish = state;
        }

        public ReachedLevelEnd():void{
            
        }
        public UpdateLevel():void{

        }

        public Update(): void {
            // Reference to the Play Scene Object
            let that = this;

            // add more enemies if one dies
            if(this._enemies.length < this._noOfEnemies){
                this._enemies.push(new objects.Enemy());
                this.addChild(this._enemies[this._enemies.length-1]);
            }

            if(this._player.visible){
                this._player.Update();
            } else {
                // game over
                config.Game.SCENE_STATE = scenes.State.END;
            }
            
            this._explosion.forEach(exp => {
                if (exp.Done){
                    this._explosion.splice(this._explosion.indexOf(exp), 1);
                    this.removeChild(exp);
                }
                exp.Update();
            });

            this._powerups.forEach((p) => {
                managers.Collision.AABBCheck(this._player, p);
                if(p.isColliding){
                    p.ActivationEvent();
                    this._powerups.splice(this._powerups.indexOf(p), 1);
                    this.removeChild(p);
                }

            })

            this._enemies.forEach((enemy)=>{
                enemy.Update(that._player.x, that._player.y);

                // Bullets and Enemy Collision Check
                that._player.Bullets.forEach((bullet)=>{
                    managers.Collision.AABBCheck(bullet, enemy);
                    if(enemy.isColliding) {
                        enemy.hitPoints--;
                        if(enemy.hitPoints == 0) {
                            that.KillEnemy(enemy);
                        }
                        // remove the bullet

                        if (enemy.IsAlive){
                            that._player.Bullets.splice(that._player.Bullets.indexOf(bullet), 1);
                            that.removeChild(bullet);
                        }
                    }
                });

                that._explosion.forEach((exp) => {
                    managers.Collision.AABBCheck(exp, enemy);
                    if(enemy.isColliding) 
                    that.KillEnemy(enemy);
                })



                // Enemy and Player Collision Check
                managers.Collision.AABBCheck(enemy, that._player);
                if(that._player.isColliding && !that._player.IsReviving){
                    that._player.Life--;
                    this.UpdatePlayerLivesIndicator();
                    if(that._player.Life == 0) {
                        that.removeChild(that._player);
                        that._player.Die();
                    } else {
                        that._player.Reset();
                    }
                }
            })

            this._deadEnemies.forEach(enemy => {
                enemy.Update();
                if (enemy.isDead){
                    that._deadEnemies.splice(that._deadEnemies.indexOf(enemy), 1);
                    that.removeChild(enemy);
                }
            });

            if ((this._movingForward || this._movingBackward) && this._player.y < this._scrollBuffer){
                let y_delta = this._player.Direction.y * this._player.Speed;

                if (this._movingBackward)
                    y_delta *= -1;

                
                this._distance_left += y_delta;
                if (this._distance_left <= 0){
                    if(!this._endEventFired){
                        this._endEventFired = true;
                        this.ReachedLevelEnd();
                    }

                    this._scrollBuffer = 0;
                    if (this._player.y <= 0){
                        console.log(this._canFinish)
                        if(this._canFinish){
                            config.Game.SCENE_STATE = this._nextLevel;
                        } else {
                            this._player.y = 1
                        }
                    }
                } else {
                    if(this._distance_left % 200 < 1){
                        this.CreatePowerup();
                    }
                    this._player.y = this._scrollBuffer;
                
                    this._powerups.forEach(power => {
                        power.y -= y_delta;
                        power.position = new objects.Vector2(power.x, power.y);
                    });
    
                    this._explosion.forEach(exp => {
                        exp.y -= y_delta;
                        exp.position = new objects.Vector2(exp.x, exp.y);
                    });
    
                    this._enemies.forEach(enemy => {
                        enemy.y -= y_delta;
                        enemy.position = new objects.Vector2(enemy.x, enemy.y);
                        if (enemy.y > 520){
                            this.removeChild(enemy);
                            this._enemies.splice(this._enemies.indexOf(enemy), 1);
                        }
                    });
                }
            }
            this.UpdateLevel();
        }
        
        public Main(): void {
            let that = this;

            this.addChild(new objects.Rectangle(0, 0, 15, 480, "DarkGrey"))
            this.addChild(new objects.Rectangle(625, 0, 15, 480, "DarkGrey"))
            this.addChild(new objects.Rectangle(15, 0, 610, 480, "GhostWhite"))
            
            this.addChild(this._player);

            this.SetGrenades(2);
            this.UpdatePlayerLivesIndicator();

            this._gernadeManager.GrenadeCount = 2;

            this._enemies.forEach((enemy)=>{
                that.addChild(enemy);
            })
        }
    }
}