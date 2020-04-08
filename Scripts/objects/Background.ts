module objects
{
    export class Background extends GameObject
    {
        constructor(image:string, x:number, y:number, centered:boolean)
        {
            super(image, x, y, centered);
        }
        protected _checkBounds(): void {
        }
        public Start(): void {
        }
        public Update(): void {
        }
        public Reset(): void {
        }
        
    }
}