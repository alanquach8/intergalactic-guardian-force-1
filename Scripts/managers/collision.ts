module managers
{
    export class Collision
    {
        public static squaredRadiusCheck(object1:objects.GameObject, object2:objects.GameObject)
        {
            let sqrDistance = objects.Vector2.sqrDistance(object1.position, object2.position);
            let radii = object1.halfWidth + object2.halfWidth;

            if(sqrDistance < (radii * radii))
            {
                if(!object2.isColliding)
                {
                    object2.isColliding = true;
                }
            }
            else
            {
                object2.isColliding = false;
            }
        }

        public static AABBCheck(object1:objects.GameObject, object2:objects.GameObject)
        {
            let object1Offset = new objects.Vector2(0, 0);
            let object2Offset = new objects.Vector2(0, 0);

            if(object1.isCentered)
            {
                object1Offset.x = object1.halfWidth;
                object1Offset.y = object1.halfHeight;
            }
            if(object2.isCentered)
            {
                object2Offset.x = object2.halfWidth;
                object2Offset.y = object2.halfHeight;
            }

            let object1TopLeft = objects.Vector2.subtract(object1.position, object1Offset);
            let object2TopLeft = objects.Vector2.subtract(object2.position, object2Offset);

            if(object1TopLeft.x < object2TopLeft.x + object2.width &&
                object1TopLeft.x + object1.width > object2TopLeft.x &&
                object1TopLeft.y < object2TopLeft.y + object2.height &&
                object1TopLeft.y + object1.height > object2TopLeft.y)
            {
                if(!object2.isColliding)
                {
                    object2.isColliding = true;
                    if(object1 instanceof objects.Enemy && object2 instanceof objects.Civilian) {
                        object2.Life--;
                    }
                    if(object1 instanceof objects.Player && object2 instanceof objects.Civilian) {
                        object2.Life++;
                    }

                    if(object1 instanceof objects.Player && object2 instanceof objects.Box) {
                        
                        if(object1TopLeft.x+object1.width < object2TopLeft.x+1 && object1TopLeft.x+object1.width > object2TopLeft.x-1) {
                            // colliding at left
                            object1.BoxCollision = "left";
                        }
                        if(object1TopLeft.x > object2TopLeft.x+object2.width-1 && object1TopLeft.x < object2TopLeft.x+object2.width+1) {
                            // colliding at right
                            object1.BoxCollision = "right";
                        }
                        if(object1TopLeft.y+object1.height > object2TopLeft.y-1 && object1TopLeft.y+object1.height < object2TopLeft.y+1) {
                            // colliding at top
                            object1.BoxCollision = "top";
                        }
                        if(object1TopLeft.y > object2TopLeft.y+object2.height-1 && object1TopLeft.y < object2TopLeft.y+object2.height+1) {
                            // colliding at bottom
                            object1.BoxCollision = "bottom";
                        }
                    }
                }
            }
            else
            {
                object2.isColliding = false;
            }
        }
    }
}