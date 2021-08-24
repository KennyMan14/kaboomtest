scene("main", (levelInx) => {
  const SPEED = 80;

  const npc = {
    "f": {
      sprite: "npc1",
      msg: "the king must be furious with me... I LOST HIS ANIMALS!!",
      name: "farmer",
    },
    "k": {
      sprite: "npc2",
      msg: "i can not have anything! I always lose everything!",
      name: "king",
    },
    "q": {
      sprite: "npc3",
      msg: "oh no! someone stole my diamond necklace, can you help me?",
      name: "queen",
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
      area(),
      "player",
    ],
    "$": [
      sprite("key"),
      area(),
      "key",
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
          },
        ];
      }
    },
  });

  let talking = null;
  let hasKey = false;

  function talk(msg, char) {
    talking = add([
      text(char + ": " + msg, 10),
      color(0, 0, 0),
    ])
  }

  const player = get("player")[0];

  player.overlaps("door", () => {
    // if(levelInx  2){
      if(levelInx != 2){
        go("main", levelInx + 1);
      }else {
        if(hasKey == true){
          go("main", levelInx + 1);
        }else {
          talk("get the key first", "clue")
        }
      }
    // }
  });

  player.overlaps("npc", (ch) => {
    talk(ch.msg, ch.name);
  });

  if(levelInx == 2){
    player.overlaps("key", (key) => {
	  	destroy(key);
	  	hasKey = true;
	  });
  }

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

  player.action(() => {
    player.pushOutAll();
  });
});

go("main", 0);
