module objects{
    export class Vector2{
        // PRIVATE INSTANCE MEMBERS
        private _x:number = 0;
        private _y:number = 0;
        private _magnitude:number = 0;
        private _sqrMagnitude:number = 0;

        // PUBLIC PROPERTIES
        get x():number{
            return this._x;
        }

        set x(newX:number){
            this._x = newX;
        }

        get y():number{
            return this._y;
        }

        set y(newY:number){
            this._y = newY;
        }
        
        get magnitude():number{
            return this._magnitude;
        }

        set magnitude(newMagnitude:number){
            this._magnitude = newMagnitude;
        }

        get sqrMagnitude():number{
            return this._sqrMagnitude;
        }

        set sqrMagnitude(newSqrMagnitude:number){
            this._sqrMagnitude = newSqrMagnitude;
        }

        get normalized():Vector2{
            let vector2 = new Vector2(this.x, this.y);
            vector2.normalize();
            return vector2;
        }

        // CONSTRUCTOR
        constructor(x:number = 0, y:number = 0){
            this.x = x;
            this.y = y;

            this.sqrMagnitude = this.x * this.x + this.y * this.y;
            this.magnitude = Math.sqrt(this.sqrMagnitude);

        }

        //PRIVATE METHODS

        // PUBLIC METHODS
        public add(rhs:Vector2){
            this.x += rhs.x;
            this.y += rhs.y;
        }

        public subtract(rhs:Vector2){
            this.x -= rhs.x;
            this.y -= rhs.y;
        }

        public scale(scalar:number){
            this.x *= scalar;
            this.y *= scalar;
        }

        public normalize(){
            let magnitude = this.magnitude;
            if (magnitude > 9.99999974737875E-06){
                this.x = this.x / magnitude;
                this.y = this.y / magnitude;
            }
            else{
                this.x = 0;
                this.y = 0;
            }
        }


        // PUBLIC STATIC METHODS
        public static zero():Vector2{
            return new Vector2(0, 0);
        }

        public static one():Vector2{
            return new Vector2(1, 1);
        }

        public static up():Vector2{
            return new Vector2(0, -1);
        }
        
        public static down():Vector2{
            return new Vector2(0, 1);
        }

        public static left():Vector2{
            return new Vector2(-1, 0);
        }

        public static right():Vector2{
            return new Vector2(1, 0);
        }

        public static dot(lhs:Vector2, rhs:Vector2):number
        {
            return lhs.x * rhs.x + lhs.y * rhs.y;
        }

        /**
         * Returns the Pythogorean distance between P1 and P2
         *
         * @static
         * @param {Vector2} p1
         * @param {Vector2} p2
         * @returns {number}
         * @memberof Vector2
         */
        public static distance(p1:Vector2, p2:Vector2):number{

            let Xs = (p2.x - p1.x);
            let Ys = (p2.y - p1.y);
            return Math.sqrt(Xs * Xs + Ys * Ys);
        }

        /**
         * Returns the Squared distance between P1 and P2
         *
         * @static
         * @param {Vector2} p1
         * @param {Vector2} p2
         * @returns {number}
         * @memberof Vector2
         */
        public static sqrDistance(p1:Vector2, p2:Vector2):number{

            let Xs = (p2.x - p1.x);
            let Ys = (p2.y - p1.y);
            return Xs * Xs + Ys * Ys;
        }

        public static subtract(lhs:Vector2, rhs:Vector2):Vector2{

            let dx = lhs.x - rhs.x;
            let dy = lhs.y - rhs.y;
            return new Vector2(dx, dy);
        }
    }
}