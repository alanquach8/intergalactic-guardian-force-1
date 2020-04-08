module config
{
    export class Game
    {
        public static STAGE: createjs.Stage;
        public static SCENE_STATE: scenes.State;
        public static ASSETS: createjs.LoadQueue;

        public static SCORE: number = 0;

        public static NO_OF_PLAYERS: number = 2;
        public static PLAYER_IMAGES:string[] = [];
    }
}