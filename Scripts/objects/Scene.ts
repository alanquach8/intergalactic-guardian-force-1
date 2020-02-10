module objects
{
    export abstract class Scene extends createjs.Container
    {
        constructor()
        {
            super();

            //this.Start();
        }

        // Life Cycle Functions

        /**
         * Initialization Method
         *
         * @abstract
         * @memberof Scene
         */
        public abstract Start():void;

        /**
         * Updates all Game objects attached to the scene
         *
         * @abstract
         * @memberof Scene
         */
        public abstract Update():void;

        /**
         * Scene functionality happens in this method
         *
         * @abstract
         * @memberof Scene
         */
        public abstract Main():void;
    }
}