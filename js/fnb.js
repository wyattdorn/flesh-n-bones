//Written by Wyatt Dorn
//Goblin sprite found at: https://gameartpartners.com/downloads/goblin-medieval-character-art/
//Orc sprite found at: http://www.gamebuildingtools.com/product/lumbering-orc-club/
//Fire Elementaql sprite found at: http://wiki.rivalkingdomsgame.com/summons:greater-fire-elemental
//Skull sprite found at: https://www.pixilart.com/art/skull-pixelart-fecd760036053e9

//Setting the dimentions of te gui assets in the Combat Screen
const guiBarHeight = 300;
const unitBarWidth = 250;
const controlBarHeight = 250;

//The width and height of the canvas used in the game
const canvasWidth = 1200;
const canvasHeight = 800;

var combatTimer; //Integer tracker for combat rounds

//Variables for the canvas and canvas context used in game
var canvas, ctx;

// 1=combat
// 2=menus
// 3=Creature Editor
var gameMode;

var myCombatScreen, creatureEditorScreen, menuSelectionScreen;

var player;
var creature, enemyCreatures; //arrays of enemy and allied creatures

var skills;
var combatLogi;
var items;
var skins, bones, guts;
var organs, masterInventoryList;

function init(){

  myCreatures = [];
  enemyCreatures = [];
  creatureImages = [];



  canvas = document.getElementById('canvas');
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
  myCombatScreen = new CombatScreen(ctx, canvas);
  creatureEditorScreen = new CreatureEditorScreen(ctx, canvas);
  skins = new Skin();
  bones = new Bones();
  guts = new Guts();
  items = new Item();
  player = new Deity();
  skills = new Skill();
  organs = [bones, guts, skins];
  //masterInventoryList = [organs[0], organs[1], organs[2], items];

  //for testing purposes, the game starts at the Menu Selection Screen
  gameMode = 2;
  setGameMode(gameMode);


  //////////////////////////////////////////////////////////////////////////////////////
  //    This block of code is for testing only and does not belong in the final game  //
  //////////////////////////////////////////////////////////////////////////////////////

  player.soulsOwned = 6;
  createDummyCreatures();
  generateEquipableItems();
  generateCombatSquad();
  masterInventoryList = [organs[0], organs[1], organs[2], items];

  //////////////////////////////////////////////////////////////////////////////////////
  //    END TEST CODE                                                                 //
  //////////////////////////////////////////////////////////////////////////////////////

} //end init()

///////////////////////////////////////////////////////////////////////////////
//   Sets game mode
///////////////////////////////////////////////////////////////////////////////
function setGameMode(mode){

  // 1=combat
  // 2=menus
  // 3=Creature Editor

  gameMode = mode;
  switch (gameMode) {
    case 1:
      initiateCombat();
      break;
    case 2:
      menuSelectionScreen = new MenuSelectionScreen(ctx, canvas);
      break;
    case 3:
      launchCreatureEditor();
      break;
    default:

  }
}

///////////////////////////////////////////////////////////////////////////////
//   Begin combat and Launch the Combat Screen
///////////////////////////////////////////////////////////////////////////////
function initiateCombat(){



  combatLogi = new CombatLogic();
  myCombatScreen.init(true);
  combatLogi.beginCombat();

}//end initiateCombat()

///////////////////////////////////////////////////////////////////////////////
//   Launches the Creature Editor menu
///////////////////////////////////////////////////////////////////////////////
function launchCreatureEditor(){

  //test code
  generateDummyBodies();
  createMoreDummyCreatures();
  //end test code

  creatureEditorScreen.init();

}//end launchCreatureEditor()

///////////////////////////////////////////////////////////////////////////////\
//Collects data every time the mouse is clicked somewhere within the canvas
///////////////////////////////////////////////////////////////////////////////\
function logMouseClick(e){
  console.log("***Mouse clicked***");
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

  //The following switch statements passes the coodinates of the mouse click to
  // the appropriate handler function based on the current game mode.
  switch(gameMode) {
  case 1:
    combatLogi.combatClickHandler(clickPosition.x,clickPosition.y);
    break;
  case 2:
    menuSelectionScreen.menuSelectionClickHandler(clickPosition.x,clickPosition.y);
    break;
  case 3:
    creatureEditorScreen.creatuerEditorClickHandler(clickPosition.x,clickPosition.y);
    break;
  default:
  }

}//end logMouseClick()
