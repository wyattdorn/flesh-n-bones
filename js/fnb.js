//Written by Wyatt Dorn
//Goblin sprite found at: https://gameartpartners.com/downloads/goblin-medieval-character-art/
//Orc sprite found at: http://www.gamebuildingtools.com/product/lumbering-orc-club/
//Fire Elementaql sprite found at: http://wiki.rivalkingdomsgame.com/summons:greater-fire-elemental

//const numOfAssets = 3; //Number of assets that must be loaded in before a given scene can be rendered
const guiBarHeight = 300;

var combatTimer; //Integer tracker for combat rounds
//var myMap;
var canvas, canvasWidth, canvasHeight;
var myBattleMap;

// 1=combat
// 2=menus
// 3=overworld
var gameMode;

var myCombatScreen;

var unitBarWidth;

var player;
var creature, enemyCreatures; //arrays of enemy and allied creatures

var ctx;  //canvas context
var myGUI;  //GUI class instance

function init(){

  player = new Deity();

  myCreatures = [];
  enemyCreatures = [];
  creatureImages = [];

  unitBarWidth = 250;



  //for testing purposes, the game starts in combat mode
  gameMode = 1;

  canvasWidth = 1200;//window.outerWidth * window.devicePixelRatio;
  canvasHeight = 800;//window.innerHeight * window.devicePixelRatio;
  canvas = document.getElementById('canvas');
  myGUI = new GUI(ctx, canvas, guiBarHeight);
  canvas.style.left = "0px";
  canvas.style.top = "0px";
  canvas.style.position = "absolute";
  canvas.height = canvasHeight;
  canvas.width = canvasWidth;
  canvas.onclick = logMouseClick;

  if (canvas.getContext) {
    ctx = canvas.getContext('2d');
  }
  else{
    return false;
  }


  //////////////////////////////////////////////////////////////////////////////////////
  //    This block of code is for testing only and does not belong in the final game  //
  //////////////////////////////////////////////////////////////////////////////////////
  //myMap = new Map(10,10);

  player.soulsOwned = 6;

  createDummyCreatures();

  //combatScreen = new CombatScreen();

  myCombatScreen = new CombatScreen(ctx, canvas);
  //myCombatScreen.init(myCreatures, enemyCreatures, true, ctx, canvas);

  //////////////////////////////////////////////////////////////////////////////////////
  //    END TEST CODE                                                                 //
  //////////////////////////////////////////////////////////////////////////////////////

  //draw();

  myCombatScreen.init(player.myCreatures, enemyCreatures, true);


  //ctx.save();
  //ctx.translate(0, 0);
  var tempo = new Image();

  tempo.onload = function(){
    console.log("loaded");
    //console.log("Goblin loaded");
  }

  //tempo.src = 'https://www.tutorialspoint.com/images/seaborn-4.jpg?v=2';// '' + myCreatures[0].imgSrc;
  ctx.drawImage(tempo, 0, 0);
  //ctx.restore;

} //end init()


function createDummyCreatures(){

  var soul = new Soul("fiery");
  var s = new Skin('fire');
  var b = new Body(s, new Bones('ice'), new Guts('air'));

  //Friendly Creatures
  player.myCreatures.push(new PlayerCharacter("Gobbo", b, soul, 'media/images/character-sprites/goblin-1.png'));
  player.myCreatures.push(new PlayerCharacter("Goblina", b, soul, 'media/images/character-sprites/goblin-1.png'));
  player.myCreatures.push(new PlayerCharacter("Flambo", b, soul, 'media/images/character-sprites/fireelemental-1.png'));
  player.myCreatures.push(new PlayerCharacter("Orky", b, soul, 'media/images/character-sprites/orc-1.png'));


  player.myCreatures[0].generateDummyStats(10, 5, 3);
  player.myCreatures[0].currentHP = 3;

  player.myCreatures[1].generateDummyStats(2, 13, 3);
  player.myCreatures[1].currentSpirit = 10;

  player.myCreatures[2].generateDummyStats(5, 10, 4);
  player.myCreatures[2].currentHP = 1;
  player.myCreatures[2].currentSpirit = 1;

  player.myCreatures[3].generateDummyStats(7, 8, 6);
  player.myCreatures[3].currentHP = 6;
  player.myCreatures[3].currentSpirit = 5;



  player.myCreatures[0].levelUp();
  player.myCreatures[0].levelUp();
  player.myCreatures[2].levelUp();
  player.myCreatures[3].levelUp();

  enemyCreatures.push(new EnemyCreature("chonk", 'media/images/character-sprites/skeleman-1.png'));


}

function logMouseClick(e){
  console.log("Mouse clicked");
  var clickPosition = [];

  //get mouse location at time of click
  e = event || window.event;
  mouseXPos = e.mouseXPos;
  mouseYPos = e.mouseYPos;

  if (mouseXPos === undefined) {
          clickPosition.x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    }
  if (mouseYPos === undefined) {
        clickPosition.y = e.clientY;// + document.body.scrollLeft + document.documentElement.scrollLeft;
    }

  if(clickPosition.y> canvas.height - guiBarHeight ){
    guiEventHandler(clickPosition.x, clickPosition.y);
  }

  console.log(clickPosition.y);

  //The following switch statements passes the coodinates of the mouse click to
  // the appropriate handler function based on the current game mode.
  switch(gameMode) {
  case 1:
    myCombatScreen.combatClickHandler(clickPosition.x,clickPosition.y);
    break;
  case 2:
    // menu click handler
    break;
  case 2:
    // overworld click handler
    break;
  default:
    // code block
  }

  //draw();
}//end logMouseClick()

function guiEventHandler(x,y){
  console.log('Clicked in gui');
  myGUI.clickEvent(x,y);
}//end guiEventHandler()

function draw() {
  console.log('draw');

  ctx.font = "30px Arial";
  ctx.canvas.height = canvasHeight;
  ctx.canvas.width = canvasWidth;
  ctx.fillStyle = "000000";//"#051005";//"#303030";
  ctx.fillRect(0, 0, canvas.width, canvas.height);



  //myGUI.draw();
}
