//Written by Wyatt Dorn
//Goblin sprite found at: https://gameartpartners.com/downloads/goblin-medieval-character-art/
//Orc sprite found at: http://www.gamebuildingtools.com/product/lumbering-orc-club/
//Fire Elementaql sprite found at: http://wiki.rivalkingdomsgame.com/summons:greater-fire-elemental

const numOfAssets = 3; //Number of assets that must be loaded in before a given scene can be rendered
const guiBarHeight = 300;

var combatTimer; //Integer tracker for combat rounds
//var myMap;
var canvas, canvasWidth, canvasHeight;
var myBattleMap;

var creature, myCreatures, enemyCreatures, selectedCreature; //arrays of enemy and allied creatures

var combatScreen;

var ctx;  //canvas context
var myGUI;  //GUI class instance

function init(){

  myCreatures = [];
  enemyCreatures = [];
  creatureImages = [];
  mapSize = 5;

  canvasWidth = 1500;//window.outerWidth * window.devicePixelRatio;
  canvasHeight = 800;//window.innerHeight * window.devicePixelRatio;
  canvas = document.getElementById('canvas');
  myGUI = new GUI(ctx, canvas, guiBarHeight);
  canvas.style.left = "0px";
  canvas.style.top = "0px";
  canvas.style.position = "absolute";
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

  createDummyCreatures();

  combatScreen = new CombatScreen(myCreatures, enemyCreatures);

  //////////////////////////////////////////////////////////////////////////////////////
  //    END TEST CODE                                                                 //
  //////////////////////////////////////////////////////////////////////////////////////

  draw();


} //end init()


function createDummyCreatures(){

  var s = new Skin('fire');
  var b = new Body(s, new Bones('ice'), new Guts('air'));

  selectedCreature = 0;

  //Friendly Creatures
  myCreatures.push(new Creature("Gobbo", b, 'media/images/character-sprites/goblin-1.png'));
  myCreatures.push(new Creature("Goblina", b, 'media/images/character-sprites/goblin-1.png'));
  myCreatures.push(new Creature("Flambo", b, 'media/images/character-sprites/fireelemental-1.png'));
  myCreatures.push(new PlayerCharacter("Orky", b, 'media/images/character-sprites/orc-1.png'));
  myCreatures[0].setLocation(2,2);
  myCreatures[1].setLocation(0,4);
  myCreatures[2].setLocation(0,3);
  myCreatures[3].setLocation(1,4);

  myCreatures[0].maxHP = 10;
  myCreatures[1].maxHP = 1;
  myCreatures[2].maxHP = 2;
  myCreatures[3].maxHP = 5;

  myCreatures[0].levelUp();
  myCreatures[0].levelUp();
  myCreatures[1].levelUp();
  myCreatures[2].levelUp();
  myCreatures[3].levelUp();


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

  draw();
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
  ctx.fillStyle = "#051005";//"#303030";
  ctx.fillRect(0, 0, canvas.width, canvas.height);



  myGUI.draw();
}
