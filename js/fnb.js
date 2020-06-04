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

  //for testing purposes, the game starts at the Menu Selection Screen
  gameMode = 2;
  setGameMode(gameMode);


  //////////////////////////////////////////////////////////////////////////////////////
  //    This block of code is for testing only and does not belong in the final game  //
  //////////////////////////////////////////////////////////////////////////////////////

  player.soulsOwned = 6;
  this.createDummyCreatures();

  //////////////////////////////////////////////////////////////////////////////////////
  //    END TEST CODE                                                                 //
  //////////////////////////////////////////////////////////////////////////////////////


  //initiateCombat();


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
//   TEST CODE
///////////////////////////////////////////////////////////////////////////////
function generateDummyBodies(){
  var tempSoul = new Soul("Grenda", "crude");
  player.myBones.push(bones.boneList[1]);
  player.myBones.push(bones.boneList[3]);
  player.myBones.push(bones.boneList[1]);
  player.myBones.push(bones.boneList[2]);
  player.myBones.push(bones.boneList[2]);

  player.mySkins.push(skins.skinList[1]);
  player.mySkins.push(skins.skinList[2]);
  player.mySkins.push(skins.skinList[1]);
  player.mySkins.push(skins.skinList[3]);
  player.mySkins.push(skins.skinList[1]);

  player.myGuts.push(guts.gutsList[1]);
  player.myGuts.push(guts.gutsList[2]);
  player.myGuts.push(guts.gutsList[1]);


}

function initiateCombat(){

  combatLogi = new CombatLogic();
  myCombatScreen.init(true);
  combatLogi.beginCombat();
}//end initiateCombat()

function launchCreatureEditor(){

  //building dummy inventory of body parts
  this.generateDummyBodies();

  //Create a bunch more dummy creatures for testing pusposes
  var soul = new Soul("stone");
  var s = new Skin('fire');
  var b = new Body(s, new Bones('ice'), new Guts('air'));
  player.myCreatures.push(new PlayerCharacter("Zappo", b, soul, 'media/images/character-sprites/goblin-1.png'));
  player.myCreatures.push(new PlayerCharacter("Chip", b, soul, 'media/images/character-sprites/goblin-1.png'));
  player.myCreatures.push(new PlayerCharacter("Flak", b, soul, 'media/images/character-sprites/goblin-1.png'));
  player.myCreatures.push(new PlayerCharacter("Rhombuz", b, soul, 'media/images/character-sprites/goblin-1.png'));
  player.myCreatures.push(new PlayerCharacter("Mallow", b, soul, 'media/images/character-sprites/goblin-1.png'));
  player.myCreatures.push(new PlayerCharacter("Wumba", b, soul, 'media/images/character-sprites/goblin-1.png'));
  player.myCreatures.push(new PlayerCharacter("Yach", b, soul, 'media/images/character-sprites/goblin-1.png'));
  player.myCreatures.push(new PlayerCharacter("Fungus", b, soul, 'media/images/character-sprites/goblin-1.png'));
  player.myCreatures.push(new PlayerCharacter("Lobe", b, soul, 'media/images/character-sprites/goblin-1.png'));
  player.myCreatures.push(new PlayerCharacter("Grand Master", b, soul, 'media/images/character-sprites/goblin-1.png'));

  creatureEditorScreen.init();


}//end launchCreatureEditor()

///////////////////////////////////////////////////////////////////////////////\
// FOR TESTING PURPOSES ONLY!!! - Create dummy crreatures to be used in testing
///////////////////////////////////////////////////////////////////////////////\
function createDummyCreatures(){

  var soul = new Soul("stone");
  var s = new Skin('fire');
  var b = new Body(s, new Bones('ice'), new Guts('air'));

  //Friendly Creatures
  player.myCreatures.push(new PlayerCharacter("Gobbo", b, soul, 'media/images/character-sprites/goblin-1.png'));
  player.myCreatures[0].generateDummyStats(10, 5, 3);
  player.myCreatures[0].currentHP = 3;
  player.myCreatures[0].levelUp();
  player.myCreatures[0].levelUp();
  player.myCreatures[0].mySkin = skins.skinList[1]; //goblin
  player.myCreatures[0].myBones = bones.boneList[3]; //big
  player.myCreatures[0].myGuts = guts.gutsList[0]; //none

  player.myCreatures.push(new PlayerCharacter("Goblina", b, soul, 'media/images/character-sprites/goblin-1.png'));
  player.myCreatures[1].generateDummyStats(2, 13, 3);
  player.myCreatures[1].currentSpirit = 10;
  player.myCreatures[1].mySkin = skins.skinList[1];
  player.myCreatures[1].myBones = bones.boneList[2]; //brittle
  player.myCreatures[1].myGuts = guts.gutsList[1];

  player.myCreatures.push(new PlayerCharacter("Flambo", b, soul, 'media/images/character-sprites/fireelemental-1.png'));
  player.myCreatures[2].generateDummyStats(5, 10, 4);
  player.myCreatures[2].currentHP = 1;
  player.myCreatures[2].currentSpirit = 1;
  player.myCreatures[2].levelUp();
  player.myCreatures[2].mySkin = skins.skinList[3];
  player.myCreatures[2].myBones = bones.boneList[2];
  player.myCreatures[2].myGuts = guts.gutsList[1];

  player.myCreatures.push(new PlayerCharacter("Chonk", b, soul, 'media/images/character-sprites/fireelemental-1.png'));
  player.myCreatures[3].generateDummyStats(7, 8, 6);
  player.myCreatures[3].currentHP = 6;
  player.myCreatures[3].currentSpirit = 5;
  player.myCreatures[3].levelUp();
  player.myCreatures[3].mySkin = skins.skinList[3];
  player.myCreatures[3].myBones = bones.boneList[1];
  player.myCreatures[3].myGuts = guts.gutsList[1];

  player.myCreatures.push(new PlayerCharacter("Orky", b, soul, 'media/images/character-sprites/orc-1.png'));
  player.myCreatures[4].generateDummyStats(7, 8, 6);
  player.myCreatures[4].currentHP = 1;
  player.myCreatures[4].currentSpirit = 5;
  player.myCreatures[4].mySkin = skins.skinList[2];
  player.myCreatures[4].myBones = bones.boneList[1];
  player.myCreatures[4].myGuts = guts.gutsList[1];

  player.myCreatures.push(new PlayerCharacter("Orkoooo", b, soul, 'media/images/character-sprites/orc-1.png'));
  player.myCreatures[5].generateDummyStats(7, 8, 6);
  player.myCreatures[5].currentHP = 6;
  player.myCreatures[5].currentSpirit = 5;
  //player.myCreatures[5].mySkin = skins.skinList[2];
  player.myCreatures[5].myBones = bones.boneList[1];
  player.myCreatures[5].myGuts = guts.gutsList[1];



  for(var x = 0; x < 4; x++){
    player.myCreatures.forEach(PlayerCharacter => PlayerCharacter.skillList[x] = skills.skillList[7]);//creatureSkills[0] = skills.skillList[3]);
  }

  player.myCreatures.forEach(PlayerCharacter => {
    PlayerCharacter.skillList[0] = skills.skillList[PlayerCharacter.myBones[2]];
    PlayerCharacter.skillList[1] = skills.skillList[PlayerCharacter.mySkin[2]];
    PlayerCharacter.skillList[2] = skills.skillList[PlayerCharacter.myGuts[2]];
  });

  player.myCreatures[0].myItem = items.itemList[1];
  player.myCreatures[1].myItem = items.itemList[2];
  player.myCreatures[2].myItem = items.itemList[3];
  player.myCreatures[3].myItem = items.itemList[1];

  enemyCreatures.push(new EnemyCreature("Skel 1", 'media/images/character-sprites/skeleman-1.png'));
  enemyCreatures[0].maxHP=100;
  enemyCreatures[0].currentHP = 94;
  enemyCreatures.push(new EnemyCreature("Skel 2", 'media/images/character-sprites/skeleman-1.png'));
  enemyCreatures[0].skillList[0] = skills.skillList[0];
  enemyCreatures[1].skillList[0] = skills.skillList[0];
  //enemyCreatures.push(new EnemyCreature("chonk 3", 'media/images/character-sprites/skeleman-1.png'));
  //enemyCreatures.push(new EnemyCreature("chonk 4", 'media/images/character-sprites/skeleman-1.png'));
  //enemyCreatures.push(new EnemyCreature("chonk 5", 'media/images/character-sprites/skeleman-1.png'));
  //enemyCreatures[4].maxHP=10;
  //enemyCreatures[4].currentHP = 4;

}//end createDummyCreatures()

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
