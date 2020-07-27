//Written by Wyatt Dorn

//The width and height of the canvas used in the game
const canvasWidth = 1200;
const canvasHeight = 800;

//Variables for the canvas and canvas context used in game
var canvas, ctx;

var gameMode;

var myCombatScreen, creatureEditorScreen, menuSelectionScreen, playerScreen;
var worldMap, mapLocations;
var dialogueWindow;
var activeDialogue;
var previousGameMode;

var player;
var enemyCreatures; //arrays of enemy and allied creatures

var skills;
var combatLogi;
var items;
var skins, bones, guts, souls;
var organs, masterInventoryList;

var testRoom;

var imageLoader;

function init(){

  //Add event listener for key presses
  window.addEventListener('keydown',this.keyboardEvent,false);

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
  playerScreen = new PlayerScreen(ctx, canvas);
  imageLoader = new ImageLoader(ctx, canvas);
  worldMap = new WorldMap(ctx, canvas);
  mapLocations = new MapLocations();
  dialogueWindow = new DialogueWindow(ctx, canvas);

  //Boolean for tracking if there is an active dialogue box on screen
  activeDialogue = false;

  //An integer to represent the previous game state (for use with the "BACK" button)
  previousGameMode = 5;

  souls = new Souls();
  skins = new Skin();
  bones = new Bones();
  guts = new Guts();
  items = new Item();
  player = new Deity();
  skills = new Skill();
  organs = [bones, guts, skins];
  //masterInventoryList = [organs[0], organs[1], organs[2], items];

  //The campaign has not been started, yet
  player.campaignProgress = [0,0];

  ctx.font = "25px Arial";
  ctx.fillStyle = "#cccccc";
  ctx.fillText("LOADING...", 600, 300);

  //for testing purposes, the game starts at the World Map Screen
  gameMode = 5;

  //Load all images before launching the starting screen
  imageLoader.loader.addCompletionListener(function() {setGameMode(gameMode)});


  //////////////////////////////////////////////////////////////////////////////////////
  //    This block of code is for testing only and does not belong in the final game  //
  //////////////////////////////////////////////////////////////////////////////////////

  testRoom = new TestRoom(ctx, canvas);

  givePlayerSouls();
  player.updateImpetus();
  generateCombatSquad();
  generateDummyBodies();
  masterInventoryList = [organs[0], organs[1], organs[2], items];

  //////////////////////////////////////////////////////////////////////////////////////
  //    END TEST CODE                                                                 //
  //////////////////////////////////////////////////////////////////////////////////////

} //end init()

///////////////////////////////////////////////////////////////////////////////
//   Sets game mode
///////////////////////////////////////////////////////////////////////////////
function setGameMode(mode, index){

  // 1=combat
  // 2=menus
  // 3=Creature Editor
  // 4=Player screen
  // 5=World Map

  gameMode = mode;

  switch (gameMode) {
    case 1: //Combat Screen
      initiateCombat(index);
      break;
    case 2: //Menu Selection Screen
      menuSelectionScreen = new MenuSelectionScreen(ctx, canvas);
      break;
    case 3: //Creature Editor Screen
      launchCreatureEditor();
      break;
    case 4: //Player Screen
      playerScreen.init();
      break;
    case 5: //World Map Screen
      worldMap.init();
      worldMap.updateScreen();
      break;
    case -1:
      testRoom.init();
    break;
    default:

  }
}

///////////////////////////////////////////////////////////////////////////////
//   Begin combat and Launch the Combat Screen
///////////////////////////////////////////////////////////////////////////////
function initiateCombat(index){

  //generateDummyEnemies(index);

  mapLocations.generateEncounter(index, player.locationProgress[index]);

  combatLogi = new CombatLogic();
  myCombatScreen.init(true, ctx, canvas, index);
  combatLogi.beginCombat(index);

}//end initiateCombat()

///////////////////////////////////////////////////////////////////////////////
//   Launches the Creature Editor menu
///////////////////////////////////////////////////////////////////////////////
function launchCreatureEditor(){

  creatureEditorScreen.init();

}//end launchCreatureEditor()

///////////////////////////////////////////////////////////////////////////////\
//  Collects data every time a key is pressed
///////////////////////////////////////////////////////////////////////////////\
function keyboardEvent(e) {
    code = e.keyCode;
    //If the '~' key is pressed, we enter the test room
    if(code == 192){
      //If we are in the world map, stop the function that updates the screen every time the mouse is moved
      if(gameMode==5){
        canvas.onmousemove = null;
      }
      console.log("Entering test room.");
      setGameMode(-1);
    }
    //If the '1' key is pressed, laungh the campaign
    else if(code == 49){
      launchCampaign();
    }
    else if(code == 50){
      setGameMode(6,0);
    }
}//end keyboardEvent()

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
  case 4:
    playerScreen.playerScreenClickHandler(clickPosition.x,clickPosition.y);
    break;
  case 5:
    worldMap.worldMapClickHandler(clickPosition.x,clickPosition.y);
    break;
  case 6:
    dialogueWindow.itterateDialogue();
    break;
  case -1:
    testRoom.testRoomClickHandler(clickPosition.x,clickPosition.y);
    break;
  default:
  }

}//end logMouseClick()
