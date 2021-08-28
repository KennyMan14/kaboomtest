const keyCollected = play("collected");

scene("main", (levelInx) => {
  const SPEED = 80;
  const SCALE = 1;

  const npc = {
    "f": {
      sprite: "npc1",
      msg: "the king must be furious with me... I LOST HIS ANIMALS!!",
      name: "farmer",
      textsize: 8,
    },
    "k": {
      sprite: "npc2",
      msg: "i can not have anything! I always lose everything!",
      name: "king",
      textsize: 8,
    },
    "q": {
      sprite: "npc3",
      msg: "oh no! someone stole my diamond necklace, can you help me?",
      name: "queen",
      textsize: 8,
    },
    "e": {
      sprite: "npc4",
      msg: "so,you're the new guy,huh? This castle has a secret, it has a hidden room. \n go to the armery but be careful with traps and puzzles",
      name: "elite",
      textsize: 8,
    },
    "s": {
      sprite: "npc5",
      msg: "someone released the ghosts captured by the mage, they terrify me",
      name: "servant",
      textsize: 8,
    },
    "m": {
      sprite: "npc6",
      msg: "For the chains of Utama! Who's the bandido who released my ghosts??!! \n Please be careful, they're dangerous!",
      name: "mage",
      textsize: 8,
    },
    "a": {
      sprite: "npc7",
      msg: "Agh!These ghosts are so annoying i was working and they interrupted me \n I had to escape from the armory be careful boy i activated the traps",
      name: "armorer",
      textsize: 8,
    },
    "l": {
      sprite: "npc8",
      msg: "Thank God you are here, look... \n someone stole all my alchemist kit, please, bring it back, brave knight",
      name: "alchemeister",
      textsize: 8,
    },
    "d": {
      sprite: "npc9",
      msg: "And like a flash of light, my salvation comes. \n Oh brave knight, some robber stole my pen find it for me, please",
      name: "playwright",
      textsize: 8,
    },
    "p": {
      sprite: "npc10",
      msg: "Nice to see you again, knight. I was here because of a rumor, you know, the thief \n i wanted to find him, but he's fast. \n be careful with ghouls, they can kill you in an instant",
      name: "specter knight",
      textsize: 6,
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
  ], [
    "===================",
    "=l  ^       ^     |",
    "=   ^       ^ *   =",
    "=   ^   ^   ^    *=",
    "=@  ^   ^   ^ *   =",
    "=       ^        *=",
    "=       ^         =",
    "===================",    
  ], [
    "=====================",
    "=@   ^^^^^^^^^^^    =",
    "=              ^    =",
    "=    ^^^^^^^^^^^    =",
    "=              ^    =",
    "=    ^^^^^^^^^^^    =",
    "=         ^    ^    =",
    "=         ^    ^    =",
    "=    ^            $ =",
    "=    ^            d =",
    "===========|=========",
  ], [
    "-------------------",
    "-        @        -",
    "-                 -",
    "-     ~     ~     -",
    "-                 >",
    "-      ^ ! ^      -",
    "-     ^^^^^^^     -",
    "-------------------",
  ], [
    "-------------------------",
    "-p      #        #      >",
    "-           #           -",
    "-           #        ^^^-",
    "-@      #        #      -",
    "-           #           -",
    "-           #        ^^^-",
    "-       #        #      -",
    "-^^^^^^^^       ^^^^^^^^-",
    "-------------------------",
  ]
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
      scale(SCALE),
      origin("center"),
      area(vec2(2), vec2(2)),
      "player",
    ],
    "$": [
      sprite("key"),
      area(),
      "key",
    ],
    "^": [
      sprite("lavafloor"),
      area(),
      "hazard",
    ],
    "*": [
      sprite("ghost"),
      area(vec2(3), vec2(3)),
      "hazard",
    ],
    "-": [
      sprite("wall2"),
      solid(),
      area(),
    ],
    ">": [
      sprite("stairs"),
      solid(),
      area(),
      "door",
    ],
    "~": [
      sprite("anvil"),
      solid(),
      area(),
    ],
    "!": [
      sprite("furnace"),
      solid(),
      area(),
    ],
    "#": [
      sprite("ghoul"),
      area(vec2(3), vec2(3)),
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
      if(levelInx == 2 || levelInx == 3 || levelInx == 4 || levelInx == 7 || levelInx == 8 || levelInx == 10){
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
  };

  keyDown("left", () => {
    player.move(-SPEED, 0);
  })
  keyDown("right", () => {
    player.move(SPEED, 0);
  })
  keyDown("down", () => {
    player.move(0, SPEED);
  })
  keyDown("up", () => {
    player.move(0, -SPEED);
  })

  keyPress("left", () => {
    player.scale.x = -SCALE;
  })
  keyPress("right", () => {
    player.scale.x = SCALE;
  })

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
