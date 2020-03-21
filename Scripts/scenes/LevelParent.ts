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
        private _scrollBuffer=150;
        private _movingForward=false;
        private _movingBackward=false;
        private _distance_left = 1000;
        private _nextLevel: scenes.State;
        private _canFinish = true;
        private _endEventFired = false;
        private _scoreLabel: objects.Label;
        private _segways: objects.Segway[];
        private _isActive = false;

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
            this._scoreLabel = new objects.Label(config.Game.SCORE.toString(),
            "40px", "Consolas", "#000000", 0, 0);

            this._segways = [];

            (<HTMLInputElement>document.body.querySelector("#cheatCodeButton")).addEventListener("click", () => {
                if(this._isActive){

                    let code:string[] = (<HTMLInputElement>document.body.querySelector("#cheatCode")).value.split(" ");

                    if(code.length == 0){
                        return;
                    }

                    if (code[0] == "spawn"){
                        if(code.length <  2){
                            this.CheatCodeFeedback("Invalid Use Of Spawn Command. <br>Usage: spawn <object> [x] [y] [id]")
                            return;
                        }

                        let x = 100;
                        let y = 100;
                        let id = this.getRandomInt(3);

                        switch(code[1]){
                            case "segway":
                                if (code.length >= 4){
                                    x = Number(code[2]);
                                    y = Number(code[3]);
                                }
                                this.AddSegways(1, x, y);
                                this.CheatCodeFeedback("Spawned Segway At x=" + x + " y=" + y, "green");
                                break;
                            case "powerup":
                                if(code.length == 3){
                                    this.CheatCodeFeedback("Invalid Use Of Spawn Command. <br>Usage: spawn &lt;object&gt; [x] [y] [id]")
                                    return;
                                }
                                if (code.length == 4){
                                    x = Number(code[2]);
                                    y = Number(code[3]);
                                } else if (code.length >= 5){
                                    x = Number(code[2]);
                                    y = Number(code[3]);
                                    id = Number(code[4]);
                                }
                                this.CreatePowerup(x, y, id)
                                this.CheatCodeFeedback("Spawned Powerup At x=" + x + " y=" + y + " id=" + id, "green");
                                break;
                            case "enemy":
                                if (code.length >= 4){
                                    x = Number(code[2]);
                                    y = Number(code[3]);
                                }
                                this.SpawnEnemy(x, y)
                                this.CheatCodeFeedback("Spawned Enemy At x=" + x + " y=" + y, "green");
                                break;

                            default:
                                this.CheatCodeFeedback("Invalid Use Of Spawn Command. <br>Unknown Entity: " + code[1])

                        }
                    } else if (code[0] == "set"){
                        if(code.length < 3){
                            this.CheatCodeFeedback("Invalid Use Of Set Command. <br>Usage: Set &lt;what&gt; &lt;value&gt;")
                            return;
                        }
                        let what = code[1];
                        let value = Number(code[2]);
                        switch (what){
                            case "grenades":
                                this.SetGrenades(value);
                                this.CheatCodeFeedback("Set Number Of Grenades To " + value, "green");
                                break;
                            case "lives":
                                this._player.Life = value;
                                this.UpdatePlayerLivesIndicator();
                                this.CheatCodeFeedback("Set Number Of Lives To " + value, "green");
                                break;
                            case "score":
                                config.Game.SCORE = value;
                                this.CheatCodeFeedback("Set Score To " + value, "green");
                                break;
                            default:
                                this.CheatCodeFeedback("Invalid Use Of Set Command. <br>Unknown Value: " + what)
    
                        }
                    }

                    this.ProcessCommand(code);
                }
            });

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
            // every 20s
            setInterval(()=> { this.CreatePowerup() }, 20000);

            this.Start();
        }

        public CheatCodeFeedback(text:string, color:string="red"){
            let feedback = document.body.querySelector("#cheatCodeFeedback")
            if (feedback != null){
                feedback.innerHTML = text;
                feedback.setAttribute("style", "margin: 0px; color:" + color); 
            }
        }

        public ProcessCommand(command:string[]){

        }

        public AddSegways(amount:number, x:number=100, y:number=100){
            for (let i = 0; i < amount; i++) {
                let s = new objects.Segway(undefined, x, y);
                this._segways.push(s)
                this.addChild(s)
            }
        }

        public set MaximumEnemies(amount:number){
            this._noOfEnemies = amount;
        }

        public get DistanceLeft(){
            return this._distance_left;
        }
        public set DistanceLeft(amount:number){
            this._distance_left = amount;
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
                id = this.getRandomInt(3)
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

                case 2: 
                    p = new objects.Powerup("./Assets/images/bullet/piercing_powerup.png", x, y);
                    p.Scale = 0.5;
                    p.ActivationEvent = () => {
                        this._player.PierceCount += 1;
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

        public AddExplosion(x:number, y:number){
            let exp = new objects.Explosion(x, y);
            this._explosion.push(exp);
            this.addChild(exp);
        }
       
        public SendGrenade(x:number, y:number){
            if (this._gernadeManager.GrenadeCount <= 0)
                return

            this.ChangeGrenades(-1);

            this.AddExplosion(x, y);
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

        
        public PlayerMovementUpdate(y_delta:number){

        }

        public SpawnEnemy(x:number=-1, y:number=-1){
            this._enemies.push(new objects.Enemy(new objects.Vector2(x, y)));
            this.addChild(this._enemies[this._enemies.length-1]);
        }
        
        public Update(): void {
            this._isActive = true;

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
                this._isActive = false;
                config.Game.SCENE_STATE = scenes.State.END;
            }
            
            this._explosion.forEach(exp => {
                if (exp.Done){
                    this._explosion.splice(this._explosion.indexOf(exp), 1);
                    this.removeChild(exp);
                }
                exp.Update();
            });

            this._segways.forEach(seg => {
                seg.Update();
            });

            this._powerups.forEach((p) => {
                managers.Collision.AABBCheck(this._player, p);
                if(p.isColliding){
                    p.ActivationEvent();
                    this._powerups.splice(this._powerups.indexOf(p), 1);
                    this.removeChild(p);
                }

            })

            
            this._segways.forEach((seg) => {
                managers.Collision.AABBCheck(this._player, seg);
                if(seg.isColliding){
                    seg.SetRider(this._player);
                    this.Player.IsRidingSegway = true;
                }

            })

            this._enemies.forEach((enemy)=>{
                enemy.Update(that._player.x, that._player.y);

                // Bullets and Enemy Collision Check
                that._player.Bullets.forEach((bullet)=>{
                    managers.Collision.AABBCheck(bullet, enemy);
                    if(enemy.isColliding) {
                        if (!bullet.IsEnemyBlacklisted(enemy)){
                            bullet.BlacklistEnemyDamage(enemy);

                            enemy.hitPoints--;
                            if(enemy.hitPoints == 0) {
                                that.KillEnemy(enemy);
                                config.Game.SCORE++;
                            }

                            console.log(bullet.ShouldImpactDelete())
                            if (bullet.ShouldImpactDelete()){
                                that._player.Bullets.splice(that._player.Bullets.indexOf(bullet), 1);
                                that.removeChild(bullet);
                            }
                        }
                        
                        // remove the bullet
                        
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
                    if(that.Player.IsRidingSegway){
                        that._segways.forEach(s => {
                            that.AddExplosion(s.x, s.y);
                            that._segways.splice(that._segways.indexOf(s), 1);
                            that.removeChild(s)
                            that._player.IsRidingSegway = false;
                        });
                    }
                    this.UpdatePlayerLivesIndicator();
                    if(that._player.Life == 0) {
                        this._isActive = false;
                        config.Game.SCENE_STATE = scenes.State.LOOSE;
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

                if (this._movingForward && this._movingBackward)
                    y_delta = 0;
                
                this._distance_left += y_delta;
                if (this._distance_left <= 0){
                    if(!this._endEventFired){
                        this._endEventFired = true;
                        this.ReachedLevelEnd();
                    }

                    this._scrollBuffer = 0;
                    if (this._player.y <= 0){
                        if(this._canFinish){
                            this._isActive = false;
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

                    this._segways.forEach(seg => {
                        if(!seg.IsRiding){
                            seg.y -= y_delta;
                            seg.position = new objects.Vector2(seg.x, seg.y);
                        }
                    });

                    this._deadEnemies.forEach(enemy => {
                        enemy.y -= y_delta;
                        enemy.position = new objects.Vector2(enemy.x, enemy.y);
                    });
    
                    this._enemies.forEach(enemy => {
                        enemy.y -= y_delta;
                        enemy.position = new objects.Vector2(enemy.x, enemy.y);
                        if (enemy.y > 520){
                            this.removeChild(enemy);
                            this._enemies.splice(this._enemies.indexOf(enemy), 1);
                        }
                    });

                    this.PlayerMovementUpdate(y_delta);
                }
            }
            this.removeChild(this._scoreLabel);
            this._scoreLabel = new objects.Label(config.Game.SCORE.toString(),
            "40px", "Consolas", "#000000", 0, 0);
            this.addChild(this._scoreLabel);
            this.UpdateLevel();
        }

        public Main(): void {
            let that = this;

            
            this.addChild(new objects.Rectangle(0, 0, 15, 480, "DarkGrey"))
            this.addChild(new objects.Rectangle(625, 0, 15, 480, "DarkGrey"))
            this.addChild(new objects.Rectangle(15, 0, 610, 480, "GhostWhite"))
            
            this.AddSegways(1);
            
            this.addChild(this._player);

            this.SetGrenades(2);
            this.UpdatePlayerLivesIndicator();

            this._gernadeManager.GrenadeCount = 2;

            this._enemies.forEach((enemy)=>{
                that.addChild(enemy);
            })

            this.addChild(this._scoreLabel);
        }

        public get Enemies():objects.Enemy[]{
            return this._enemies;
        }
        
    }
}