module objects
{
    export class Enemy extends objects.GameObject
    {
        // PRIVATE INSTANCE MEMBERS
        isAlive = false;
        speed = 5;
        playerPosition = new Vector2(0, 0);


        // PUBLIC PROPERTIES
        get IsAlive(){
            return this.isAlive;
        }
        set IsAllive(newState:boolean){
            this.isAlive = newState;
        }
        get Speed(){
            return this.speed;
        }
        set Speed(newSpeed:number){
            this.speed = newSpeed;
        }
        get PlayerPosition(){
            return this.playerPosition;
        }
        set PlayerPosition(newPosition:Vector2){
            this.playerPosition = newPosition;
        }

        // CONSTRUCTOR
        constructor(playerPosition:Vector2 = new Vector2(0, 0), containerWidth:number = 640, containerHeight:number = 720)
        {
            super("./Assets/images/placeholder.png", 0, 0, true);

            // create enemy
            this.position = this.GetRandomPoints(playerPosition, containerWidth, containerHeight);
            this.playerPosition = playerPosition;

            this.Start();
        }

        // Public Methods
        protected _checkBounds(): void {
            
        }        
        
        public Start(): void {
            
        }

        public Update(playerNewPosition:Vector2 = new Vector2(0, 0)): void {

            this.playerPosition = playerNewPosition;

            // Check if the Monster is still alive, catch the player, otherwise, die.
            if(this.isAlive){
                this.ApproachPlayer(playerNewPosition);
            } else {
                this.Die();
            }
        }

        public Reset(): void {
            
        }

        public Die(): void{
            this.visible = false;
            
        }

        public ApproachPlayer(playerPosition:Vector2): void{

            let angle = playerPosition.y - this.y / playerPosition.x - this.x;

            this.x +=   this.speed * Math.cos(angle * Math.PI / 180);
            this.y -=   this.speed * Math.sin(angle * Math.PI / 180);

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
        protected GetRandomPoints(playerPosition:Vector2, width:number, height:number):Vector2{
        
            let px = playerPosition.x;
            let py = playerPosition.y;
            let rx;
            let ry;
             
            do{
                // generate random point within the range of stage
                rx = Math.floor(Math.random() * width) + 1;
                ry = Math.floor(Math.random() * height) + 1;
                
            }// check to make it far from player by 200 pixels radius
            while((rx > px + 100 || rx < px - 100) && ry > py + 100 || ry < py - 100 );
            
            return new Vector2(rx, ry);
        }

    }
}