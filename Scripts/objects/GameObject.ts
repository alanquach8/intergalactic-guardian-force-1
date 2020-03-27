module objects
{
    export abstract class GameObject extends createjs.Bitmap
    {
        // MEMBER VARIABLES
        private _width:number = 0;
        private _height:number = 0;
        private _halfWidth:number = 0;
        private _halfHeight:number = 0;
        private _isColliding:boolean = false;
        private _isCentered:boolean = false;
        private _position:Vector2 = new Vector2(0, 0);
        private _imagePath: string;

        // PROPERTIES
        get width():number
        {
            return this._width;
        }

        set width(newWidth:number)
        {
            this._width = newWidth;
        }

        get height():number
        {
            return this._height;
        }

        set height(newHeight:number)
        {
            this._height = newHeight;
        }

        get halfWidth():number
        {
            return this._halfWidth;
        }

        set halfWidth(newHalfWidth:number)
        {
            this._halfWidth = newHalfWidth;
        }

        get halfHeight():number
        {
            return this._halfHeight;
        }

        set halfHeight(newHalfHeight:number)
        {
            this._halfHeight = newHalfHeight;
        }

        get isColliding():boolean
        {
            return this._isColliding;
        }

        set isColliding(newState:boolean)
        {
            this._isColliding = newState;
        }

        get position():Vector2
        {
            return this._position;
        }

        set position(newPosition:Vector2)
        {
            this._position = newPosition;
            this.x = newPosition.x;
            this.y = newPosition.y;
        }

        get isCentered():boolean
        {
            return this._isCentered;
        }

        set isCentered(newState:boolean)
        {
            this._isCentered = newState;

            if(newState)
            {
                // set the anchor point to the center
                this.regX  = this.halfWidth;
                this.regY = this.halfHeight;
            }
            else
            {
                this.regX = 0;
                this.regY = 0;
            }
            
        }

        // CONSTRUCTOR
        /**
         * Creates an instance of GameObject.
         * @param {string} [imagePath="./Assets/images/placeholder.png"]
         * @param {number} [x=0]
         * @param {number} [y=0]
         * @param {boolean} [centered=false]
         * @memberof GameObject
         */
        constructor(imagePath:string = "./Assets/images/placeholder.png",
                    x:number = 0, y:number = 0, centered:boolean = false)
        {
            super(imagePath);
            this._imagePath = imagePath;
            this.isColliding = false;

            // wait for the  image to load before calculating its width and height
            this.image.addEventListener('load', ()=>{
                this.width = this.getBounds().width;
                this.height = this.getBounds().height;
                this.halfWidth = this.width * 0.5;
                this.halfHeight = this.height * 0.5;

                this.isCentered = centered;
            });

            // set the GameObject's position
            this.position = new Vector2(x, y);
        }

        // PRIVATE METHODS
        protected abstract _checkBounds():void;

        // PUBLIC METHODS
        public abstract Start():void;

        public abstract Update():void;

        public abstract Reset():void;

        public get ImagePath(): string{
            return this._imagePath;
        }
    }
}