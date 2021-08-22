loadSprite("tile", "/sprites/tile.png");
loadSprite("knight", "/sprites/knight.png");
loadSprite("coin", "/sprites/coin.png");

const TILE_W = 16;
const TILE_H = 16;

const MOVE_SPEED = 120;
const SCALE = 0.5;
const JUMP_FORCE = 500;

const FLOOR = 65;
const PRIZE = 25;

const player = add([
  sprite("knight"),
  pos(80, 80),
  scale(SCALE),
  body(),
]);

addLevel([
  "                                     ",
	"                                     ",
	"                                     ",
	"                        %            ",
	"                    ======           ",
	"                                     ",
	"         ===                         ",
	"                                     ",
	"                                     ",
	"                                     ",
	"                                     ",
	"====================================="
], {
	width: TILE_W,
	height: TILE_H,
	"=": [
		sprite("tile", {
			frame: FLOOR,
		}),
		area(vec2(0, 0), vec2(TILE_W, 8)),
		solid(),
	],
  "%": [
    sprite("coin"),
		area(),
		origin("center"),
  ]
});

player.collides("coin", coin => {
	destroy(coin);
  console.log('hello');
});

// move left
keyDown("left", () => {
	player.move(-MOVE_SPEED, 0);
});

// move right
keyDown("right", () => {
	player.move(MOVE_SPEED, 0);
});

keyPress("space", () => {
	// these 2 functions are provided by body() component
	if (player.grounded()) {
		player.jump(JUMP_FORCE); 
	}
});

keyPress("left", () => {
	player.scale.x = -SCALE;
	// player.play("run");
});

keyPress("right", () => {
	player.scale.x = SCALE;
	// player.play("run");
	player.move(MOVE_SPEED, 0);
});

player.action(() => {
	camPos(player.pos);
});
