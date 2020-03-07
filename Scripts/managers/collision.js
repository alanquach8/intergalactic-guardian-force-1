"use strict";
var managers;
(function (managers) {
    var Collision = /** @class */ (function () {
        function Collision() {
        }
        Collision.squaredRadiusCheck = function (object1, object2) {
            var sqrDistance = objects.Vector2.sqrDistance(object1.position, object2.position);
            var radii = object1.halfWidth + object2.halfWidth;
            if (sqrDistance < (radii * radii)) {
                if (!object2.isColliding) {
                    object2.isColliding = true;
                }
            }
            else {
                object2.isColliding = false;
            }
        };
        Collision.AABBCheck = function (object1, object2) {
            var object1Offset = new objects.Vector2(0, 0);
            var object2Offset = new objects.Vector2(0, 0);
            if (object1.isCentered) {
                object1Offset.x = object1.halfWidth;
                object1Offset.y = object1.halfHeight;
            }
            if (object2.isCentered) {
                object2Offset.x = object2.halfWidth;
                object2Offset.y = object2.halfHeight;
            }
            var object1TopLeft = objects.Vector2.subtract(object1.position, object1Offset);
            var object2TopLeft = objects.Vector2.subtract(object2.position, object2Offset);
            if (object1TopLeft.x < object2TopLeft.x + object2.width &&
                object1TopLeft.x + object1.width > object2TopLeft.x &&
                object1TopLeft.y < object2TopLeft.y + object2.height &&
                object1TopLeft.y + object1.height > object2TopLeft.y) {
                if (!object2.isColliding) {
                    object2.isColliding = true;
                }
            }
            else {
                object2.isColliding = false;
            }
        };
        return Collision;
    }());
    managers.Collision = Collision;
})(managers || (managers = {}));
//# sourceMappingURL=collision.js.map