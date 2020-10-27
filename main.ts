namespace SpriteKind {
    export const Pacman = SpriteKind.create()
}
tiles.setTilemap(tilemap`level`)
let pacmanSprite = sprites.create(img`
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
`, SpriteKind.Pacman)
tiles.placeOnTile(pacmanSprite, tiles.getTileLocation(10, 15))
scene.cameraFollowSprite(pacmanSprite)

const EPSILON = 4
const MISSED_EPSILON = 2
const PACMAN_SPEED = 50

function alignIfSuitable(sprite:Sprite, direction:CollisionDirection) {
    let currentLocation = tiles.locationOfSprite(sprite)
    let targetLocation = tiles.locationInDirection(currentLocation, direction)
    if (tiles.tileIsWall(targetLocation)) {
        return;
    }

    if (Math.abs(sprite.x - currentLocation.x) >= EPSILON) {
        return;
    }

    if (direction == CollisionDirection.Top || direction == CollisionDirection.Bottom) {
        // correct direction
        if (sprite.vx * (currentLocation.x - sprite.x) >= 0) {
            sprite.x = currentLocation.x
        } else if (Math.abs(sprite.x - currentLocation.x) <= MISSED_EPSILON){
            sprite.x = currentLocation.x
        }
     } else if (direction == CollisionDirection.Left || direction == CollisionDirection.Right) {
         if (sprite.vy * (currentLocation.y - sprite.y) >= 0) {
             sprite.y = currentLocation.y
         }  else if (Math.abs(sprite.y - currentLocation.y) <= MISSED_EPSILON){
            sprite.y = currentLocation.y
        }
     }
}

controller.up.onEvent(ControllerButtonEvent.Pressed, function() {
    alignIfSuitable(pacmanSprite, CollisionDirection.Top)
    turn(pacmanSprite, 0, PACMAN_SPEED)
})

controller.down.onEvent(ControllerButtonEvent.Pressed, function() {
    alignIfSuitable(pacmanSprite, CollisionDirection.Bottom)
        turn(pacmanSprite, 2, PACMAN_SPEED)

})

controller.left.onEvent(ControllerButtonEvent.Pressed, function() {
    alignIfSuitable(pacmanSprite, CollisionDirection.Left)
        turn(pacmanSprite, 3, PACMAN_SPEED)
    
})

controller.right.onEvent(ControllerButtonEvent.Pressed, function() {
    alignIfSuitable(pacmanSprite, CollisionDirection.Right) 
        turn(pacmanSprite, 1, PACMAN_SPEED)
    
})

function turn(sprite:Sprite, direction:number, speed:number) {
    if (direction == 0) {
        sprite.vx = 0
        sprite.vy = -speed
    } else if (direction == 1) {
        sprite.vx = speed
        sprite.vy = 0
    } else if (direction ==2) {
        sprite.vx = 0
        sprite.vy = speed 
    } else {
        sprite.vx = -speed
        sprite.vy = 0
    }
}