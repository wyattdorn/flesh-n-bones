//Created by Wyatt Dorn

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//
//  THIS ENTIRE FILE IS TO HOLD FUNCTIONS THAT ARE BEING USED FOR TESTING PURPOSES ONLY
//
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////





///////////////////////////////////////////////////////////////////////////////
//   TEST CODE
///////////////////////////////////////////////////////////////////////////////
function generateDummyBodies(){
  var tempSoul = new Soul("Grenda", "crude");
  player.myBones.push(1);
  player.myBones.push(3);
  player.myBones.push(1);
  player.myBones.push(2);
  player.myBones.push(2);

  player.mySkins.push(1);
  player.mySkins.push(2);
  player.mySkins.push(1);
  player.mySkins.push(3);
  player.mySkins.push(1);

  player.myGuts.push(1);
  player.myGuts.push(2);
  player.myGuts.push(1);

}//end generateDummyBodies()


///////////////////////////////////////////////////////////////////////////////
//   Create list of player owned eqipable items
///////////////////////////////////////////////////////////////////////////////
function generateEquipableItems(){

  player.gainNewEquipableItem(2);
  player.gainNewEquipableItem(1);
  player.gainNewEquipableItem(3);
  player.gainNewEquipableItem(2);
  player.gainNewEquipableItem(1);
  player.gainNewEquipableItem(3);
  player.gainNewEquipableItem(2);

}//end generateEquipableItems()

///////////////////////////////////////////////////////////////////////////////
//   Create list of Creatures that Player will send into combat
///////////////////////////////////////////////////////////////////////////////
function generateCombatSquad(){

  player.myCombatCreatures[0] = 0;
  /*
  player.myCombatCreatures[1] = 3;
  player.myCombatCreatures[3] = 2;
  player.myCombatCreatures[0] = 1;
  player.myCombatCreatures[2] = 0;
  */

}//end generateCombatSquad()


///////////////////////////////////////////////////////////////////////////////
//   Populate the Player's list of souls
///////////////////////////////////////////////////////////////////////////////
function givePlayerSouls(){

  for(var x = 0; x < 6; x++){
    player.addSoul(x);
  }
  createDummyCreatures();

}//end givePlayerSouls()


///////////////////////////////////////////////////////////////////////////////\
// FOR TESTING PURPOSES ONLY!!! - Create dummy crreatures to be used in testing
///////////////////////////////////////////////////////////////////////////////\
function createMoreDummyCreatures(){

  //Create a bunch more dummy creatures for testing pusposes
  var soul = new Soul("stone");
  var s = new Skin('fire');
  var b = new Body(s, new Bones('ice'), new Guts('air'));
  player.myCreatures.push(new PlayerCharacter("Zappo", b, soul, imageLoader.goblinImg));
  player.myCreatures.push(new PlayerCharacter("Chip", b, soul, imageLoader.goblinImg));
  player.myCreatures.push(new PlayerCharacter("Flak", b, soul, imageLoader.goblinImg));
  player.myCreatures.push(new PlayerCharacter("Rhombuz", b, soul, imageLoader.goblinImg));
  player.myCreatures.push(new PlayerCharacter("Mallow", b, soul, imageLoader.goblinImg));
  player.myCreatures.push(new PlayerCharacter("Wumba", b, soul, imageLoader.goblinImg));
  player.myCreatures.push(new PlayerCharacter("Yach", b, soul, imageLoader.goblinImg));
  player.myCreatures.push(new PlayerCharacter("Fungus", b, soul, imageLoader.goblinImg));
  player.myCreatures.push(new PlayerCharacter("Lobe", b, soul, imageLoader.goblinImg));
  player.myCreatures.push(new PlayerCharacter("Grand Master", b, soul, imageLoader.goblinImg));

}//end createMoreDummyCreatures()


///////////////////////////////////////////////////////////////////////////////\
// FOR TESTING PURPOSES ONLY!!! - Create dummy crreatures to be used in testing
///////////////////////////////////////////////////////////////////////////////\
function createDummyCreatures(){

  /*
  //Friendly Creatures
  player.myCreatures.push(new PlayerCharacter("Gobbo", b, soul, imageLoader.goblinImg));
  player.myCreatures[0].generateDummyStats(10, 5, 3);
  */
  //player.myCreatures[0].currentHP = 3;
  player.myCreatures[0].levelUp();
  player.myCreatures[0].levelUp();
  player.myCreatures[0].equip(1, 0); //old bones
  player.myCreatures[0].equip(1, 1); //explosive guts
  player.myCreatures[0].equip(0, 2); //no skin
  player.myCreatures[0].equip(1, 3);// items.itemList[1];


  player.myCreatures[0].memorizedSkills[0] = [1,1];
  player.myCreatures[0].memorizedSkills[1] = [4,2];
  player.myCreatures[0].memorizedSkills[2] = [3,8];
  player.myCreatures[0].memorizedSkills[3] = [2,2];
  player.myCreatures[0].memorizedSkills[4] = [5,8];
  player.myCreatures[0].memorizedSkills[5] = [7,10];
  //player.myCreatures[0].memorizedSkills[6] = [6,8];

  /*
  player.myCreatures.push(new PlayerCharacter("Goblina", b, soul, imageLoader.goblinImg));
  player.myCreatures[1].generateDummyStats(2, 13, 3);
  */
  //player.myCreatures[1].currentSpirit = 10;
  player.myCreatures[1].equip(1, 0);
  player.myCreatures[1].equip(2, 1);
  player.myCreatures[1].equip(1, 2);
  player.myCreatures[1].equip(2, 3);// items.itemList[1];
/*
  player.myCreatures.push(new PlayerCharacter("Flambo", b, soul, imageLoader.fireElementalImg));
  player.myCreatures[2].generateDummyStats(5, 10, 4);
  */
  //player.myCreatures[2].currentHP = 1;
  //player.myCreatures[2].currentSpirit = 1;
  player.myCreatures[2].levelUp();
  player.myCreatures[2].equip(3, 0);
  player.myCreatures[2].equip(2, 1);
  player.myCreatures[2].equip(1, 2);
  player.myCreatures[2].equip(3, 3);// items.itemList[1];
/*
  player.myCreatures.push(new PlayerCharacter("Chonk", b, soul, imageLoader.fireElementalImg));
  player.myCreatures[3].generateDummyStats(7, 8, 6);
  */
  //player.myCreatures[3].currentHP = 6;
  //player.myCreatures[3].currentSpirit = 5;
  player.myCreatures[3].levelUp();
  player.myCreatures[3].equip(3, 0);
  player.myCreatures[3].equip(1, 1);
  player.myCreatures[3].equip(1, 2);
  player.myCreatures[3].equip(1, 3);// items.itemList[1];
/*
  player.myCreatures.push(new PlayerCharacter("Orky", b, soul, imageLoader.fireElementalImg));
  player.myCreatures[4].generateDummyStats(7, 8, 6);
  */
  //player.myCreatures[4].currentHP = 1;
  //player.myCreatures[4].currentSpirit = 5;
  player.myCreatures[4].equip(2, 0);
  player.myCreatures[4].equip(1, 1);
  player.myCreatures[4].equip(1, 2);
/*
  player.myCreatures.push(new PlayerCharacter("Orkoooo", b, soul, imageLoader.orcImg));
  player.myCreatures[5].generateDummyStats(7, 8, 6);
  */
  //player.myCreatures[5].currentHP = 6;
  //player.myCreatures[5].currentSpirit = 5;
  player.myCreatures[5].equip(2, 0);
  player.myCreatures[5].equip(1, 1);
  player.myCreatures[5].equip(1, 2);


}//end createDummyCreatures()


function generateDummyEnemies(index){

  enemyCreatures = [];

  if(index == 1){
    enemyCreatures.push(new EnemyCreature("Goblin 1", [0,1,1,1,1,1], imageLoader.goblinImg));
    enemyCreatures[0].maxHP=100;
    enemyCreatures[0].currentHP = 94;
    enemyCreatures.push(new EnemyCreature("Goblin 2", [0,1,1,1,1,1], imageLoader.goblinImg));
    enemyCreatures[0].skillList[0] = skills.skillList[0];
    enemyCreatures[1].skillList[0] = skills.skillList[0];
  }
  else if(index == 2){
    enemyCreatures.push(new EnemyCreature("Skel 1", [1,1,1,1,1,1], imageLoader.skeletonImg));
    enemyCreatures[0].maxHP=100;
    enemyCreatures[0].currentHP = 94;
    enemyCreatures.push(new EnemyCreature("Skel 2", [1,1,1,1,1,1], imageLoader.skeletonImg));
    enemyCreatures[0].skillList[0] = skills.skillList[0];
    enemyCreatures[1].skillList[0] = skills.skillList[0];
  }
  else if(index == 3){
    enemyCreatures.push(new EnemyCreature("Orc 1", [2,1,1,1,1,1], imageLoader.orcImg));
    enemyCreatures[0].maxHP=100;
    enemyCreatures[0].currentHP = 94;
    enemyCreatures.push(new EnemyCreature("Orc 2", [2,1,1,1,1,1], imageLoader.orcImg));
    enemyCreatures[0].skillList[0] = skills.skillList[0];
    enemyCreatures[1].skillList[0] = skills.skillList[0];
  }
  else if(index == 4){
    enemyCreatures.push(new EnemyCreature("Elemental 1", [1,1,1,1,1,1], imageLoader.fireElementalImg));
    enemyCreatures[0].maxHP=100;
    enemyCreatures[0].currentHP = 94;
    enemyCreatures.push(new EnemyCreature("Elemental 2", [1,1,1,1,1,1], imageLoader.fireElementalImg));
    enemyCreatures[0].skillList[0] = skills.skillList[0];
    enemyCreatures[1].skillList[0] = skills.skillList[0];
  }

}//this generateDummyEnemies()
