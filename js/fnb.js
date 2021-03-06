//Written by Wyatt Dorn

//The width and height of the canvas used in the game
const canvasWidth = 1200;
const canvasHeight = 800;

//Variables for the canvas and canvas context used in game
let canvas, ctx;

let gameMode;

let myCombatScreen, creatureEditorScreen, menuSelectionScreen, playerScreen;
let worldMap, mapLocations;
let dialogueWindow;
let activeDialogue;
let previousGameMode;
let campaign;

var player;
var enemyCreatures; //arrays of enemy and allied creatures

let headList, bodyList, gutsList;
let masterSkillList;
let items;
let itemFunctions;

var skills;
var combatLogi;
var head, body, guts, souls;
var organs, masterInventoryList;
var masterInventoryListNames;

let gameVolume;

let campaignMode;

var testRoom;

var imageLoader, audioLoader;
let mediaLoader;

let rootCanvent;

let drawBuffer = [];
let priorityDrawBuffer = [];

function init(){

  diamondSquare();

  window.print = function(){};

  gameVolume = 0;

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

  mediaLoader = new PxLoader();

  shopInventory = new ShopInventory();
  combatLogi = new CombatLogic();
  myCombatScreen = new CombatScreen(ctx, canvas);
  myShopScreen = new ShopScreen(ctx, canvas);
  creatureEditorScreen = new CreatureEditorScreen(ctx, canvas);
  playerScreen = new PlayerScreen(ctx, canvas);
  imageLoader = new ImageLoader(ctx, canvas);
  audioLoader = new AudioLoader(ctx, canvas);
  worldMap = new WorldMap(ctx, canvas);
  crystalCavernsMap = new CrystalCavernsMap(ctx, canvas);
  mapLocations = new MapLocations();
  dialogueWindow = new DialogueWindow(ctx, canvas);

  //Create a root canvent that will be the parent of all other canvents
  rootCanvent = new Canvent([0,0], [canvas.width, canvas.height], "#000");


  //Boolean for tracking if there is an active dialogue box on screen
  activeDialogue = false;

  //An integer to represent the previous game state (for use with the "BACK" button)
  previousGameMode = 5;

  generateItems();
  generateHeads();
  generateGuts();
  generateBodies();
  generateCombatSkills();

  campaign = new Campaign();
  souls = new Souls();
  //head = new Head();
  //body = new Body();
  //guts = new Guts();
  player = new Deity();
  //skills = new Skill();
  organs = [body, guts, head];
  statList = ["HP", "Spirit", "Dexterity", "Agility", "Might", "Fortitude", "Intel", "Wisdom"];
  masterInventoryList = [bodyList, gutsList, headList, items];
  masterInventoryListNames = ["Body", "Guts", "Head", "Items"];

  //The campaign has not been started, yet
  player.campaignProgress = [0,0];

  ctx.font = "25px Arial";
  ctx.fillStyle = "#cccccc";
  ctx.fillText("LOADING...", 600, 300);

  //Define whether or not the game begins in the campaign
  campaignMode = false;

  //If we are in campaign mode, disable all console.log calls
  if(campaignMode){ console.log = function(){}};

  //for testing purposes, the game starts at the World Map Screen
  gameMode = 5;

  mediaLoader.start();

  mediaLoader.addCompletionListener(function(){
    //Load all images before launching the starting screen
    setGameMode(gameMode);


    givePlayerSouls();
    player.updateImpetus();
    generateCombatSquad();
    generateDummyBodies();

    //If the game is beginning in Campaign mode
    if(campaignMode){
      launchCampaign();
    }
    //If the game is not beginning in Campaign mode (test mode)
    else{
      testRoom = new TestRoom(ctx, canvas);
      dialogueWindow.init(    ["Flesh and Bones: RPG",
                              "You are currently in test-mode. Press the '1' key on the keyboard at any time to begin the campaign."],
                              [null,audioLoader.welcomeAud],
                              200, 100, 1250, 280, false);
    }

  });


  //////////////////////////////////////////////////////////////////////////////////////
  //    This block of code is for testing only and does not belong in the final game  //
  //////////////////////////////////////////////////////////////////////////////////////



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
  // 8=In the Crystal Caverns
  // 7=Shop Screen

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
    case 7: //Shop Screen
      myShopScreen.init();
      break;
    case 8: //Crystal Caverns Screen
      crystalCavernsMap.init();
      //worldMap.updateScreen();
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

  //Load in the information for the combat encounter based on the locataion and
  //the pplayer's progress thjus far
  mapLocations.generateEncounter(index, player.locationProgress[index]);

  combatLogi.init();
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

    switch (code) {
      case 40:
          worldMap.scrollMap('south');
          console.log('south~!');
        break;
      case 39:
          worldMap.scrollMap('west');
          console.log('west~!');
        break;
      case 38:
          worldMap.scrollMap('north');
          console.log('north~!');
        break;
      case 37:
          worldMap.scrollMap('east');
          console.log('east~!');
        break;
      default:

    }
    //Enter test room when the ` key is pressed
    if(code == 192){
      //Do not allow the Player to enter the test room in campaign mode
      if(campaignMode){return;}
      //If we are in the world map, stop the function that updates the screen every time the mouse is moved
      if(gameMode==5){
        canvas.onmousemove = null;
      }
      console.log("Entering test room.");
      setGameMode(-1);
    }
    //If the '1' key is pressed, laungh the campaign
    else if(code == 49){
      //Do not allow this option in campaign mode
      if(campaignMode){return;}
      launchCampaign();

    }
    //If the 2 key is pressed, nothing happens
    else if(code == 50){
      //removed for now
      setGameMode(8);
    }
    //If the 3 key is pressed, enter the shop screeen
    else if(code == 51){
      //Do not allow this option in campaign mode
      if(campaignMode){return;}
      setGameMode(7);
    }
}//end keyboardEvent()

///////////////////////////////////////////////////////////////////////////////\
//Collects data every time the mouse is clicked somewhere within the canvas
///////////////////////////////////////////////////////////////////////////////\
function logMouseClick(e){
  console.log("***Mouse clicked***");
  console.log(player.myCreatures[0].maxSpirit);
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
    rootCanvent.checkForClick([clickPosition.x,clickPosition.y]);
    //playerScreen.playerScreenClickHandler(clickPosition.x,clickPosition.y);
    break;
  case 5:
    worldMap.worldMapClickHandler(clickPosition.x,clickPosition.y);
    break;
  case 6:
    dialogueWindow.itterateDialogue();
    break;
  case 7:
    myShopScreen.shopScreenMapClickHandler(clickPosition.x,clickPosition.y);
    break;
  case 8:
    crystalCavernsMap.crystalCavernsClickHandler(clickPosition.x,clickPosition.y);
    break;
  case -1:
    testRoom.testRoomClickHandler(clickPosition.x,clickPosition.y);
    break;
  default:
  }

}//end logMouseClick()
