module objects {

    export class TrailManager extends GameObject {
        private _trailing: GameObject[] = [];
        private _trailParticles: objects.Trail[] = [];
        private _lastUpdate: number = 0;
        private _trailDelay:number;
        private _parent: scenes.LevelParent;

        constructor(parent: scenes.LevelParent, imagePath:string = "./Assets/images/particles/super_hero.png", trailDelay:number=0.25){
            super(imagePath);
            this._trailDelay = trailDelay;
            this._parent = parent;
        } 
        protected _checkBounds(): void {
        }
        public Start(): void {
        }
        public Update(): void {
            let currentUpdate = (new Date()).getTime() / 1000;
            if(currentUpdate - this._lastUpdate > this._trailDelay){
                this._trailing.forEach(obj => {
                    let p = new objects.Trail(this.ImagePath, obj.x, obj.y, true);
                    this._parent.addChild(p);
                    this._trailParticles.push(p)
                });
                this._lastUpdate = currentUpdate
            }
            this._trailParticles.forEach(particle => {
                particle.Update();
                if (particle.CanDelete())
                    this.DeleteParticle(particle);
            });
        }
        public DeleteParticle(p:objects.Trail){
            this._parent.removeChild(p);
            this._trailParticles.splice(this._trailParticles.indexOf(p), 1);
        }
        public Reset(): void {
        }  

        public TrackObject(object:GameObject){
            this._trailing.push(object);
        }
        public UntrackObject(object:GameObject){
            this._trailing.splice(this._trailing.indexOf(object), 1)
        }
        public TrackForTime(object:GameObject, duration:number){
            this.TrackObject(object)
            setTimeout(() => {
                this.UntrackObject(object)
            }, duration * 1000);
        }
        public ShiftParticles(y_delta:number){
            this._trailParticles.forEach(p => {
                p.y -= y_delta;
                p.position = new objects.Vector2(p.x, p.y);
            });
        }
    }
}