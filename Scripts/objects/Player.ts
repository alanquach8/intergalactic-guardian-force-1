module objects {

    export class Player extends GameObject {
            
        // PRIVATE INSTANCE MEMBERS

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super("./Assets/images/placeholder.png", 0, 0, true);

            this.Start();
        }

        // PRIVATE METHODS
        protected _checkBounds(): void {
           
        }    

        // PUBLIC METHODS
        public Start(): void {
            
        }
        public Update(): void {
            this.position = new Vector2(this.stage.mouseX, this.stage.mouseY);
        }
        public Reset(): void {
            
        }
    }

}