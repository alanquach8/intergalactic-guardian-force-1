module objects
{
    export class Enemy extends objects.GameObject
    {
        // PRIVATE INSTANCE MEMBERS
        isAlive:boolean = true;
        step:number = 1;
        movingSpeed:number = 500;
        playerPosition:Vector2 = new Vector2(10, 10);
        isMoving:boolean;
        _hitPoints:number = 5;
        isDying:boolean = false;
        isDead:boolean = false;


        // PUBLIC PROPERTIES
        get IsAlive(){
            return this.isAlive;
        }
        set IsAllive(newState:boolean){
            this.isAlive = newState;
        }
        get Step(){
            return this.step;
        }
        set Step(newStep:number){
            this.step = newStep;
        }
        get PlayerPosition(){
            return this.playerPosition;
        }
        set PlayerPosition(newPosition:Vector2){
            this.playerPosition = newPosition;
        }
        get IsMoving(){
            return this.isMoving;
        }
        set IsMoving(newState:boolean){
            this.isMoving = newState;
        }
        get hitPoints():number{
            return this._hitPoints;
        }
        set hitPoints(newHitPoints) {
            this._hitPoints = newHitPoints;
        }

        // CONSTRUCTOR
        constructor(playerPosition:Vector2 = new Vector2(10, 10), containerWidth:number = 640, containerHeight:number = 480)
        {

            super("./Assets/images/enemy/minion/minion.png", 200, 200, true);

            // create enemy
            this.position = this._getRandomPoints(playerPosition, containerWidth, containerHeight);
            this.playerPosition = playerPosition;
            this.isMoving = false;
            // Set the random moving speed
            this.movingSpeed = this._getRandomSpeed();
            this.Start();
        }

        
        protected _checkBounds(): void {
            
        }        
        

        // Private Methods

        /**
         * Create random point far from player by at least 100 pixels
         *
         * @protected
         * @param {Vector2} playerPosition
         * @param {number} width
         * @param {number} height
         * @returns {Vector2}
         * @memberof Enemy
         */
        protected _getRandomPoints(playerPosition:Vector2, width:number, height:number):Vector2{
        
            let px = playerPosition.x;
            let py = playerPosition.y;
            let rx = 0;
            let ry = 0;
             
            do{
                // generate random point within the range of stage
                rx = Math.floor(Math.random() * (width - 20)) + 1;
                ry = Math.floor(Math.random() * (height - 20)) + 1;
                
            }// check to make it far from player by 200 pixels radius
            while((rx > px + 100 || rx < px - 100) && ry > py + 100 || ry < py - 100 );
            
            return new Vector2(rx, ry);
        }

        /**
         * Method to generate random number for the speed adjustments
         *
         * @protected
         * @returns {number}
         * @memberof Enemy
         */
        protected _getRandomSpeed():number{
        
            let rnd = 0;
            do{
                // generate random number up to 1000
                rnd = Math.floor(Math.random() * 1000);
                
            }// check to make sure it is more than 100 milisecond
            while(rnd < 100); 

            return rnd;
        }

        
        // Public Methods
        public Start(): void {
            
        }

        public Update(playerNewPositionX:number = 10, playerNewPositionY:number = 10): void {

            this.playerPosition = new Vector2(playerNewPositionX, playerNewPositionY);

            // if(this.isColliding){
            //     this.Die();
            // }

            // Check if the Monster is still alive, catch the player, otherwise, die.
            if(this.isAlive){
                this.ApproachPlayer(playerNewPositionX, playerNewPositionY);
            } else {
                this.Die();
                this.alpha -= 0.01;
                if (this.alpha <= 0){
                    this.isDead = true;
                }
            }
        }

        public Reset(): void {
            
        }

        public Die(): void{
            this.image = new createjs.Bitmap("./Assets/images/enemy/minion/minion_dead.png").image;
            this.isAlive = false;
        }

        /**
         * This method will approch the enemy to player by moving speed
         *
         * @param {number} pX player x
         * @param {number} pY player y
         * @memberof Enemy
         */
        public ApproachPlayer(pX:number, pY:number): void{

            let that = this;
            if(!that.isMoving){
                that.isMoving = true;
                // Moving by step number per random time
                setTimeout(that.Move, that.movingSpeed, pX, pY);
            }

        }

        /**
         * This method will move the enemy towards to player
         *
         * @memberof Enemy
         */
        public Move = (pX:number, pY:number) => {

            let that = this;

            if(pX > that.x){
                that.position.x += that.step;
                that.x += that.step;
            } else {
                that.position.x -= that.step;
                that.x -= that.step;
            }

            if(pY > that.y){
                that.position.y += that.step;
                that.y += that.step;
            } else {
                that.position.y -= that.step;
                that.y -= that.step;
            }

            that.isMoving = false;
        }

        

    }
}