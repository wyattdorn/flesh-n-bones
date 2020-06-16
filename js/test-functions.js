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


}


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

  //console.log(player.myEquipableItems[0]);
}

///////////////////////////////////////////////////////////////////////////////
//   Create list of Creatures that Player will send into combat
///////////////////////////////////////////////////////////////////////////////
function generateCombatSquad(){
  for(var x = 4; x >= 0; x--){
    //player.myCombatCreatures[x] = x;
    //console.log(player.myCreatures[player.myCombatCreatures[x]].name);

    player.myCombatCreatures[1] = 3;
    player.myCombatCreatures[3] = 2;
    player.myCombatCreatures[0] = 1;
    player.myCombatCreatures[2] = 0;

  }

  for(var x = 0; x < 6; x++){
    //player.myCombatCreatures[x] = x;
    //console.log(player.myCreatures[player.myCombatCreatures[x]].name);
  }

}


///////////////////////////////////////////////////////////////////////////////\
// FOR TESTING PURPOSES ONLY!!! - Create dummy crreatures to be used in testing
///////////////////////////////////////////////////////////////////////////////\
function createMoreDummyCreatures(){

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

}//end createMoreDummyCreatures()


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

  player.myCreatures[0].equip(1, 0); //old bones
  player.myCreatures[0].equip(1, 1); //explosive guts
  player.myCreatures[0].equip(0, 2); //no skin

  //player.myCreatures[0].skillList[0] = player.myCreatures[0].equip(player.myCreatures[0].myBones, 0);
  //player.myCreatures[0].skillList[1] = player.myCreatures[0].equip(player.myCreatures[0].myGuts, 1);
  //player.myCreatures[0].skillList[2] = player.myCreatures[0].equip(player.myCreatures[0].mySkin, 2);


  //console.log(organs[0].list[player.myCreatures[0].getOrgan(0)][1]);// myOrgans[0]][1]);
  //console.log(organs[1].list[player.myCreatures[0].getOrgan(1)][1]);
  //console.log(organs[2].list[player.myCreatures[0].getOrgan(2)][1]);

  console.log(skills.skillList[player.myCreatures[0].skillList[0]][2]);
  console.log(skills.skillList[player.myCreatures[0].skillList[1]][2]);
  console.log(skills.skillList[player.myCreatures[0].skillList[2]][2]);
  //console.log(player.myCreatures[0].myOrgans[1]);
  //console.log(player.myCreatures[0].myOrgans[2]);

  //player.myCreatures[0].mySkin = 1;//skins.list[1]; //goblin
  //player.myCreatures[0].myBones = 3;//bones.list[3]; //big
  //player.myCreatures[0].myGuts = 0;//guts.list[0]; //none

  player.myCreatures.push(new PlayerCharacter("Goblina", b, soul, 'media/images/character-sprites/goblin-1.png'));
  player.myCreatures[1].generateDummyStats(2, 13, 3);
  player.myCreatures[1].currentSpirit = 10;

  player.myCreatures[1].equip(1, 0);
  player.myCreatures[1].equip(2, 1);
  player.myCreatures[1].equip(1, 2);
  //player.myCreatures[1].mySkin = 1;//skins.list[1];
  //player.myCreatures[1].myBones =2;// bones.list[2]; //brittle
  //player.myCreatures[1].myGuts = 1;//guts.list[1];

  player.myCreatures.push(new PlayerCharacter("Flambo", b, soul, 'media/images/character-sprites/fireelemental-1.png'));
  player.myCreatures[2].generateDummyStats(5, 10, 4);
  player.myCreatures[2].currentHP = 1;
  player.myCreatures[2].currentSpirit = 1;
  player.myCreatures[2].levelUp();
  player.myCreatures[2].equip(3, 0);
  player.myCreatures[2].equip(2, 1);
  player.myCreatures[2].equip(1, 2);
  //player.myCreatures[2].mySkin = 3;//skins.list[3];
  //player.myCreatures[2].myBones =2;// bones.list[2];
  //player.myCreatures[2].myGuts = 1;//guts.list[1];

  player.myCreatures.push(new PlayerCharacter("Chonk", b, soul, 'media/images/character-sprites/fireelemental-1.png'));
  player.myCreatures[3].generateDummyStats(7, 8, 6);
  player.myCreatures[3].currentHP = 6;
  player.myCreatures[3].currentSpirit = 5;
  player.myCreatures[3].levelUp();
  player.myCreatures[3].equip(3, 0);
  player.myCreatures[3].equip(1, 1);
  player.myCreatures[3].equip(1, 2);
  //player.myCreatures[3].mySkin = 3;//skins.list[3];
  //player.myCreatures[3].myBones =1;//bones.list[1];
  //player.myCreatures[3].myGuts = 1;//guts.list[1];

  player.myCreatures.push(new PlayerCharacter("Orky", b, soul, 'media/images/character-sprites/orc-1.png'));
  player.myCreatures[4].generateDummyStats(7, 8, 6);
  player.myCreatures[4].currentHP = 1;
  player.myCreatures[4].currentSpirit = 5;
  player.myCreatures[4].equip(2, 0);
  player.myCreatures[4].equip(1, 1);
  player.myCreatures[4].equip(1, 2);
//  player.myCreatures[4].mySkin = 2;//skins.list[2];
  //player.myCreatures[4].myBones = 1;//bones.list[1];
  //player.myCreatures[4].myGuts = 1;//guts.list[1];

  player.myCreatures.push(new PlayerCharacter("Orkoooo", b, soul, 'media/images/character-sprites/orc-1.png'));
  player.myCreatures[5].generateDummyStats(7, 8, 6);
  player.myCreatures[5].currentHP = 6;
  player.myCreatures[5].currentSpirit = 5;
  player.myCreatures[5].equip(2, 0);
  player.myCreatures[5].equip(1, 1);
  player.myCreatures[5].equip(1, 2);
  //player.myCreatures[5].mySkin = skins.list[2];
  //player.myCreatures[5].myBones = 1;// bones.list[1];
  //player.myCreatures[5].myGuts = 1;// guts.list[1];



  for(var x = 0; x < 4; x++){
  //  player.myCreatures.forEach(PlayerCharacter => PlayerCharacter.skillList[x] = skills.skillList[7]);//creatureSkills[0] = skills.skillList[3]);
  }



  /*
  player.myCreatures.forEach(PlayerCharacter => {
    //console.log("skill: " + PlayerCharacter.myBones);
    PlayerCharacter.skillList[0] = PlayerCharacter.equip(PlayerCharacter.myBones, 0);// skills.skillList[PlayerCharacter.myBones[2]];
    //console.log("skill: " + PlayerCharacter.myBones);
    PlayerCharacter.skillList[1] = PlayerCharacter.equip(PlayerCharacter.mySkin, 0);// skills.skillList[PlayerCharacter.mySkin[2]];
    PlayerCharacter.skillList[2] = PlayerCharacter.equip(PlayerCharacter.myGuts, 0);// skills.skillList[PlayerCharacter.myGuts[2]];
  });
  */


  player.myCreatures[0].myItem = 1;// items.itemList[1];
  player.myCreatures[1].myItem = 2;// items.itemList[2];
  player.myCreatures[2].myItem = 3;// items.itemList[3];
  player.myCreatures[3].myItem = 1;// items.itemList[1];

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
