module objects
{
    export abstract class Scene extends createjs.Container
    {
        // private _backgroundTheme?: createjs.AbstractSoundInstance;
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

        // public PlaySound(name:string){
        //     // let player = <HTMLAudioElement> document.body.querySelector("#" + name + "Sound");
        //     console.log(name+"_theme");
        //     this._backgroundTheme = createjs.Sound.play("menu_theme");
        //     this._backgroundTheme.volume=1;
        //     // player.play();
        // }
        // public PauseSound(name:string){
        //     // let player = <HTMLAudioElement> document.body.querySelector("#" + name + "Sound");
        //     this._backgroundTheme?.stop();
        //     // player.pause();
        // }
        // public RewindSound(name:string){
        //     // let player = <HTMLAudioElement> document.body.querySelector("#" + name + "Sound");
        //     // player.currentTime = 0
        // }
    }
}