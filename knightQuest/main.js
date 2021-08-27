let keyCollected = play("collected");

scene("main", (levelInx) => {
  const SPEED = 80;
  const SCALE = 1;

  const npc = {
    "f": {
      sprite: "npc1",
      msg: "the king must be furious with me... I LOST HIS ANIMALS!!",
      name: "farmer",
      textsize: 10,
    },
    "k": {
      sprite: "npc2",
      msg: "i can not have anything! I always lose everything!",
      name: "king",
      textsize: 10,
    },
    "q": {
      sprite: "npc3",
      msg: "oh no! someone stole my diamond necklace, can you help me?",
      name: "queen",
      textsize: 10,
    },
    "e": {
      sprite: "npc4",
      msg: "so,you're the new guy,huh? This castle has a secret, it has a hidden room go to the armery, but be careful with traps and puzzles",
      name: "elite",
      textsize: 6,
    },
    "s": {
      sprite: "npc5",
      msg: "someone released the ghosts captured by the mage, they terrify me",
      name: "servant",
      textsize: 8,
    },
    "m": {
      sprite: "npc6",
      msg: "For the chains of Utama! Who's the bandido who released my ghosts??!! Please be careful, they're dangerous!",
      name: "mage",
      textsize: 6,
    },
    "a": {
      sprite: "npc7",
      msg: "Agh!These ghosts are so annoying, they interrupted me and I had to escape from the armory be careful boy i activated the traps",
      name: "armorer",
      textsize: 5,
    },
  };

  const levels = [[
    "==========",
    "=      f =",
    "= @      =",
    "=        =",
    "=        |",
    "=        =",
    "=        =",
    "==========",
  ], [
    "==========",
    "=        =",
    "=        =",
    "=        =",
    "= @     k=",
    "=        =",
    "=        =",
    "=====|====",
  ],[
    "==========",
    "=q    @  =",
    "=        =",
    "=        =",
    "=        |",
    "=        =",
    "=$       =",
    "==========",
  ],[
    "=================",
    "=e        ^     =",
    "=         ^   $ =",
    "=     ^   ^     =",
    "=@    ^   ^     =",
    "=     ^         =",
    "=     ^         =",
    "========|========",
  ], [
    "==========",
    "=   @    =",
    "=        =",
    "=  ^^^^^^=",
    "|        =",
    "=        =",
    "=^^^^^^ $=",
    "==========",
  ], [
    "==========",
    "=    *   =",
    "=  *     =",
    "=        =",
    "|    *  @=",
    "=        =",
    "= *     s=",
    "=    *   =",
    "==========",
  ], [
    "================",
    "=m            @=",
    "=              =",
    "=              =",
    "= *    *     * =",
    "=              =",
    "=    *    *    =",
    "=^^^^^^^^^^^   =",
    "= *   *    *   =",
    "=              =",
    "=              =",
    "=^  ^   ^   ^  =",
    "=              =",
    "=              =",
    "========|=======",    
  ],[
    "==============",
    "=a    @      =",
    "=            =",
    "=    *       =",
    "|            =",
    "=       *   *=",
    "=   *        =",
    "=       $    =",
    "= *          =",
    "==============",
  ], [
    "===================",
    "=      ^  *   *   =",
    "=                 =",
    "=@     ^  $   *   |",
    "=                 =",
    "=         *       =",
    "=      ^      *   =",
    "===================",
  ],
];

  const map = addLevel(levels[levelInx], {
    width: 20,
    height: 20,
    pos: vec2(20, 20),
    "=": [
      sprite("wall"),
      area(),
      solid(),
    ],
    "|": [
      sprite("door"),
      area(),
      solid(),
      "door",
    ],
    "@": [
      sprite("char"),
      area(),
      "player",
    ],
    "$": [
      sprite("key"),
      area(vec2(5), vec2(5)),
      "key",
    ],
    "^": [
      sprite("lavafloor"),
      area(),
      "hazard",
    ],
    "*": [
      sprite("ghost"),
      area(vec2(8), vec2(8)),
      "hazard",
    ],
    any(ch) {
      const char = npc[ch];
      if (char) {
        return [
          sprite(char.sprite),
          area(),
          solid(),
          "npc",
          {
            msg: char.msg,
            name: char.name,
            textsize: char.textsize,
          },
        ];
      }
    },
  });

  let talking = null;
  let hasKey = false;

  function talk(msg, char, size) {
    talking = add([
      text(char + ": " + msg, size),
      color(1, 1, 1),
    ])
  }

  const player = get("player")[0];

  player.overlaps("door", () => {
    // if(levelInx  2){
      if(levelInx == 2 || levelInx == 3 || levelInx == 4 || levelInx == 7 || levelInx == 8){
        if(hasKey == true){
          go("main", levelInx + 1);
        }else {
          talk("get the key first", "clue", 10)
        }
      }else {
        go("main", levelInx + 1);
      }
    // }
  });

  player.collides("hazard", () => {
    go("gameover", levelInx);
  })

  player.overlaps("npc", (ch) => {
    talk(ch.msg, ch.name, ch.textsize);
  });

  // if(levelInx == 2 || levelInx == 3){
    player.overlaps("key", (key) => {
      play("collected");
	  	destroy(key);
      // keyCollected.play();
	  	hasKey = true;
	  });
  // }

  const dirs = {
    "left": vec2(-1, 0),
    "right": vec2(1, 0),
    "up": vec2(0, -1),
    "down": vec2(0, 1),
  };

  for (const dir in dirs) {
    keyPress(dir, () => {
      if (talking) {
        destroy(talking);
        talking = null;
      }
      // if(doorText){
      //   destroy(doorText);
      // }
    });
    keyDown(dir, () => {
      player.move(dirs[dir].scale(SPEED));
    });
  }

  // keyPress("right", () => {
  //   player.scale.x = SCALE;
  // });

  // keyPress("left", () => {
  //   player.scale.x = -SCALE;
  // })

  player.action(() => {
    player.pushOutAll();
  });

});

scene("gameover", (lvlIndex) => {
  add([
    text("you died, level reached: " + (lvlIndex+1)),
    pos(width()/2, height()/2),
    origin("center"),
  ])
  keyPress("space", () => go("main", lvlIndex));
	mouseClick(() => go("main", lvlIndex));
});

go("main", 0);
focus();