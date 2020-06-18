//Written by Wyatt Dorn

class Skin {
  constructor(element) {
    this.element = element;
    this.init();
  }

  init(){
    this.list = new Array(1);
    this.list[0] = [];

    //                  index, name, skill num, info
    this.list[0] = [0, "No Skin", 0, "Creature has no skin."];
    this.list[1] = [1, "Goblin Skin", 5, "Goblin skin grants the Scythe skill."];
    this.list[2] = [2, "Orc Skin", 6, "Orc skin grants the Orc Smash skill."];
    this.list[3] = [3, "Mage Skin", 7, "Mage skin grants the Spirit Dagger skill."];
  }
}

class Bones {
  constructor(element) {
    this.element = element;
    this.init();
  }

  init(){
    this.list = new Array(1);
    this.list[0] = [];

    //                      function()               Name        Target  Ability       Multiplier Cost       Description
    this.list[0] = [0, "No Bones", 0, "Creature has no bones."];
    this.list[1] = [1, "Old Bones", 1, "Any old pile of bones can attack."];
    this.list[2] = [2, "Brittle Bones", 3, "Brittle bones grants the Heal skill."];
    this.list[3] = [3, "Big Bones", 2, "Big bones grant the Defend skill."];
  }

}

class Guts {
  constructor(element) {
    this.element = element;
    this.init();
  }

  init(){
    this.list = new Array(1);
    this.list[0] = [];

    //                      function()               Name        Target  Ability       Multiplier Cost       Description
    this.list[0] = [0, "No Guts", 0, "Creature has no guts."];
    this.list[1] = [1, "Explosive Guts", 4, "Explosive guts grants the Explode skill."];
    this.list[2] = [2, "Dubious Guts", 0, "No one knows what these guts do..."];
  }

}

class Soul{
  constructor(name, temperment){
    this.temperment = temperment;
    this.name = name;
  }
}

////////////////////////////////////////////////////////////////////////////////
// Body of a creature, consisting of Soul, Skin, Bones, and Guts
////////////////////////////////////////////////////////////////////////////////
class Body {
  constructor(skin, bones, guts) {
    this.Skin = skin;
    this.Bones = bones;
    this.Guts = guts;
  }

  removeSkin(){
    this.Skin = null;
  }

  addSkin(s){
    this.Skin = s;
  }

  printElements(){
    console.log('Skin: ' + this.Skin.element);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Creature is a generic class for all units (enemy and ally) in game.
////////////////////////////////////////////////////////////////////////////////
class Creature {

  constructor(name, path) {
    this.name = name;
    this.imgSrc = path;
    this.level = 0;
    this.dexterity = 10;
    this.agility = 10;
    this.might = 10;
    this.fortitude = 10;
    this.intelligence = 10;
    this.wits = 10;
    this.speed = Math.floor((this.dexterity + this.agility)/2);
    this.strength = Math.floor((this.might + this.fortitude)/2);
    this.mind = Math.floor((this.intelligence + this.wits)/2);
    this.currentHP = 1;
    this.maxHP = 1;
    this.spirit = 1; //spirit is mana
    this.movesLeft = this.moveSpeed;
    this.skillList = [0,0,0,0];
    this.memorizedSkills = [];//This is a list of skills the Creature has used enough to memorize
    //   memorizedSkills[0] = skill index, [1] = times the skill has been used, [2] = if the skill has been memorized (bool)
    this.myItem = 0;//items.itemList[0];
    this.mySkin = 0;// skins.list[0];
    this.myBones = 0;// bones.list[0];
    this.myGuts = 0;// guts.list[0];
    this.myOrgans = [this.myBones, this.myGuts, this.mySkin];
    this.myInventory = [this.myBones, this.myGuts, this.mySkin, this.myItem];
    this.hasAction = true; //A boolean to store whether or not a unit has acted this round
  }

  ////////////////////////////////////////////////////////////////////////////////
  // Each time a Creature uses a skill, they make progress towards learning it,
  // this skill is then called to mark that progress
  ////////////////////////////////////////////////////////////////////////////////
  learnSkill(skillNum){
    //Check all the skills in this Creature's list of memorized skills
    for(var x = 0; x < this.memorizedSkills.length; x++){
      if(this.memorizedSkills[x][0] == skillNum){
        if(this.memorizedSkills[x][1] < skills.skillList[this.memorizedSkills[x][0]][8]){
          this.memorizedSkills[x][1]++;
          console.log("ALL FULL!");
        }
        return;
      }
    }
    this.memorizedSkills.push([skillNum, 1]);
  }


  ////////////////////////////////////////////////////////////////////////////////
  // Function is called when an Item or Organ is equipped to a Creature
  ////////////////////////////////////////////////////////////////////////////////
  equip(index, type){

    //Equip an Item
    if(type == 3){
      this.giveItem(index);
    }
    //Equip an organ
    else if(type == 0 || type == 1 || type == 2){
      this.giveOrgan(index, type);
    }
    this.myInventory[type] = index;
  }//end equip()

  ////////////////////////////////////////////////////////////////////////////////
  // Equips a given Item to this Creature
  ////////////////////////////////////////////////////////////////////////////////
  giveItem(index){
    this.myItem = index;
  }//end giveItem()

  ////////////////////////////////////////////////////////////////////////////////
  // Unequips an Item or Organ from this Creature, and returns it to the Player's inventory
  ////////////////////////////////////////////////////////////////////////////////
  unequip(type){

    //First we must check to see if there is something to unequip
    if(this.myInventory[type] != 0){
      //Unequip an Item
      if(type == 3){
        this.removeItem();
      }
      //Unequip an organ
      else if(type == 0 || type == 1 || type == 2){
        this.removeOrgan(type);
      }
      this.myInventory[type] = 0;
    }
  }//end unequip()

  ////////////////////////////////////////////////////////////////////////////////
  // Unequips the Item this Creature is holding, and returns it to the Player's inventory
  ////////////////////////////////////////////////////////////////////////////////
  removeItem(){
    //Place the Item back in the Player's inventory
    player.inventoryList[3].push(this.myItem);
    //Removes the item from the Creature's inventory
    this.myItem = 0;
  }

  ////////////////////////////////////////////////////////////////////////////////
  // Unequips an organ from this Creature, and returns it to the Player's inventory
  ////////////////////////////////////////////////////////////////////////////////
  removeOrgan(organType){
    //console.log("GIVE ORGAN");
    player.inventoryList[organType].push(this.myOrgans[organType]);
    switch (organType) {
      case 0: //bone
          this.myBones = 0;
          this.skillList[0] =0;
        break;
      case 1: //guts
          this.myGuts = 0;
          this.skillList[1] = 0;
          //console.log(index + " ---guts--- " + organType);
        break;
      case 2: //skin
          this.mySkin = 0;
          this.skillList[2] = 0;
          //console.log(index + " ---skin--- " + organType);
        break;
    }
    this.myOrgans[organType] = 0;// [this.myBones, this.myGuts, this.mySkin];
  }//end removeOrgan()

  ////////////////////////////////////////////////////////////////////////////////
  // Equips a given Organ to this Creature
  ////////////////////////////////////////////////////////////////////////////////
  giveOrgan(index, organType){
    //console.log("GIVE ORGAN");
    switch (organType) {
      case 0: //bone
          this.myBones = index;
          this.skillList[0] = bones.list[this.myBones][2];
        break;
      case 1: //guts
          this.myGuts = index;
          this.skillList[1] = guts.list[this.myGuts][2];
          //console.log(index + " ---guts--- " + organType);
        break;
      case 2: //skin
          this.mySkin = index;
          this.skillList[2] = skins.list[this.mySkin][2];
          //console.log(index + " ---skin--- " + organType);
        break;
    }
    this.myOrgans[organType] = index;// [this.myBones, this.myGuts, this.mySkin];
  }//end giveOrgan()

  ////////////////////////////////////////////////////////////////////////////////
  // OLD FUNCTION, TO BE PHASED OUT AND DELETED IN DUE TIME
  ////////////////////////////////////////////////////////////////////////////////
  getOrgan(index){
    this.myOrgans = [this.myBones, this.myGuts, this.mySkin];
    return this.myOrgans[index];
  }//end getOrgan()

  //////////////////////////////////////////////////////////////////////////////////////
  //    Returns a boolean, if the Creature is capable of acting at this time
  //////////////////////////////////////////////////////////////////////////////////////
  canAct(){
    if(this.hasAction == true && this.isDead() == false){
      return true;
    }
    console.log("Unit cannot act.");
    return false;
  }//end canAct()

  ////////////////////////////////////////////////////////////////////////////////
  // Increases this Creature's level by 1
  ////////////////////////////////////////////////////////////////////////////////
  levelUp(){
    this.level++;
  }//end levelUp()

  ////////////////////////////////////////////////////////////////////////////////
  // Returns a boolean, if the given creature's HP is less than half
  ////////////////////////////////////////////////////////////////////////////////
  isBloodied(){
    if(this.currentHP/this.maxHP <= 0.5 && !this.isDead()){return true;}
    else{return false;}
  }//end isBloodied()

  ////////////////////////////////////////////////////////////////////////////////
  // Returns a boolean, if the given creature's HP is 0
  ////////////////////////////////////////////////////////////////////////////////
  isDead(){
    if(this.currentHP<=0){return true;}
    else{return false;}
  }//end isDead()

  ////////////////////////////////////////////////////////////////////////////////
  // Removes a given number of HP from this Creature
  ////////////////////////////////////////////////////////////////////////////////
  removeHealth(num){
    this.currentHP = this.currentHP - num;
    if(this.currentHP < 0){this.currentHP = 0;}
  }//end removeHealth()

  ////////////////////////////////////////////////////////////////////////////////
  // Adds a given number of HP from this Creature
  ////////////////////////////////////////////////////////////////////////////////
  giveHealth(num){
    console.log("Healing for: " + num);
    this.currentHP = this.currentHP + num;
    if(this.currentHP > this.maxHP){this.currentHP = this.maxHP;}
  }//end giveHealth()

  ////////////////////////////////////////////////////////////////////////////////
  // Removes a given number of Spirit from this Creature
  ////////////////////////////////////////////////////////////////////////////////
  removeSpirit(num){
    console.log("Spending " + num + " spirit!");
    this.currentSpirit = this.currentSpirit - num;
  }//end removeSpirit()

  ////////////////////////////////////////////////////////////////////////////////
  // Adds a given number of Spirit from this Creature
  ////////////////////////////////////////////////////////////////////////////////
  giveSpirit(num){
    console.log("Spending " + num + " spirit!");
    this.currentSpirit = this.currentSpirit + num;
    if(this.currentSpirit > this.maxSpirit){this.currentSpirit = this.maxSpirit;}
  }//end giveSpirit()

}

////////////////////////////////////////////////////////////////////////////////
// PlayerCharacter class is a Creature type that describes all units controlled
// by the player.
////////////////////////////////////////////////////////////////////////////////
class PlayerCharacter extends Creature{

  constructor(myname, body, soul, path) {
    super();
    this.name = myname;
    this.body = body;
    this.soul = soul;
    this.imgSrc = path;
    this.exp = 0;         //Starting experience for all PlayerCharacters is 0
    this.level = 1;       //Starting level for all PlayerCharacters is 1
    this.location = [0,0];
    this.dexterity = 10;
    this.agility = 10;
    this.might = 10;
    this.fortitude = 10;
    this.intelegence = 10;
    this.wits = 10;
    this.speed = Math.floor((this.dexterity + this.agility)/2);
    this.strength = Math.floor((this.might + this.fortitude)/2);
    this.mind = Math.floor((this.intelegence + this.wits)/2);
    this.currentHP = 1;
    this.maxHP = 1;
    this.currentSpirit = 1; //spirit is mana
    this.maxSpirit = 1;
    this.attackPower = 1;
  }

  //For use in testing only.
  generateDummyStats(hp, mana, attackPower){
      this.maxHP = hp;
      this.currentHP = hp;
      this.maxSpirit = mana;
      this.currentSpirit = mana;
      this.attackPower = attackPower;
  }

}

////////////////////////////////////////////////////////////////////////////////
// EnemyCreature class is a Creature type that describes all units controlled
// by the player.
////////////////////////////////////////////////////////////////////////////////
class EnemyCreature extends Creature{
  expGranted = 0;         //The amount of experience given for killing this creature
  malachiteGranted = 0;   //The amount of money given for killing this creature
}



function Node(value) {

    this.value = value;
    this.children = [];
    this.parent = null;

    this.setParentNode = function(node) {
        this.parent = node;
    }

    this.getParentNode = function() {
        return this.parent;
    }

    this.addChild = function(node) {
        node.setParentNode(this);
        this.children[this.children.length] = node;
    }

    this.getChildren = function() {
        return this.children;
    }

    this.removeChildren = function() {
        this.children = [];
    }

    this.getValue = function(){
      return this.value;
    }
}
