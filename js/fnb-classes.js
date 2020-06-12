//Written by Wyatt Dorn

class Skin {
  constructor(element) {
    this.element = element;
    this.init();
  }

  init(){
    this.skinList = new Array(1);
    this.skinList[0] = [];

    //                  index, name, skill num, info
    this.skinList[0] = [0, "No Skin", 7, "Creature has no skin."];
    this.skinList[1] = [1, "Goblin Skin", 4, "Goblin skin grants the Scythe skill."];
    this.skinList[2] = [2, "Orc Skin", 5, "Orc skin grants the Orc Smash skill."];
    this.skinList[3] = [3, "Mage Skin", 6, "Mage skin grants the Spirit Dagger skill."];
  }
}

class Bones {
  constructor(element) {
    this.element = element;
    this.init();
  }

  init(){
    this.boneList = new Array(1);
    this.boneList[0] = [];

    //                      function()               Name        Target  Ability       Multiplier Cost       Description
    this.boneList[0] = [0, "No Bones", 7, "Creature has no bones."];
    this.boneList[1] = [1, "Old Bones", 0, "Any old pile of bones can attack."];
    this.boneList[2] = [2, "Brittle Bones", 2, "Brittle bones grants the Heal skill."];
    this.boneList[3] = [3, "Big Bones", 1, "Big bones grant the Defend skill."];
  }

}

class Guts {
  constructor(element) {
    this.element = element;
    this.init();
  }

  init(){
    this.gutsList = new Array(1);
    this.gutsList[0] = [];

    //                      function()               Name        Target  Ability       Multiplier Cost       Description
    this.gutsList[0] = [0, "No Guts", 7, "Creature has no guts."];
    this.gutsList[1] = [1, "Explosive Guts", 3, "Explosive guts grants the Explode skill."];
    this.gutsList[2] = [2, "Dubious Guts", 7, "No one knows what these guts do..."];
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
    this.skillList = [];
    this.memorizedSkills = [];//This is a list of skills the Creature has used enough to memorize
    //   memorizedSkills[0] = skill index, [1] = times the skill has been used, [2] = if the skill has been memorized (bool)
    this.myItem = items.itemList[0];
    this.mySkin = skins.skinList[0];
    this.myBones = bones.boneList[0];
    this.myGuts = guts.gutsList[0];
    this.myOrgans = [this.myBones, this.myGuts, this.mySkin];
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

  giveOrgan(organ, organType){
    console.log(organ[1]);
    switch (organType) {
      case 0: //bone
          this.myBones = organ;
          console.log(this.myBones[1]);
        break;
      case 1: //guts
          this.myGuts = organ;
        break;
      case 2: //skin
          this.mySkin = organ;
        break;
    }
    this.myOrgans = [this.myBones, this.myGuts, this.mySkin];
    //Update this creature's skill list based on their new organ(s)
    for(var x = 0; x < 3; x++){
      this.skillList[x] = skills.skillList[this.myOrgans[x][2]];
    }
  }

  getOrgan(index){
    this.myOrgans = [this.myBones, this.myGuts, this.mySkin];
    return this.myOrgans[index];
  }

  //////////////////////////////////////////////////////////////////////////////////////
  //    Returns a boolean, if the Creature is capable of acting at this time
  //////////////////////////////////////////////////////////////////////////////////////
  canAct(){
    if(this.hasAction == true && this.isDead() == false){
      return true;
    }
    console.log("Unit cannot act.");
    return false;
  }

  levelUp(){
    this.level++;
  }

  setLocation(x,y){
    this.location[0]=x;
    this.location[1]=y;
  }

  printLocation(){
    console.log('(' + this.location[0] + ', ' + this.location[1] + ')');
  }

  //Returns a boolean, if the given creature's HP is less than half
  isBloodied(){
    if(this.currentHP/this.maxHP <= 0.5 && !this.isDead()){return true;}
    else{return false;}
  }//end isBloodied()

  //Returns a boolean, if the given creature's HP is 0
  isDead(){
    if(this.currentHP<=0){return true;}
    else{return false;}
  }//end isDead()

  removeHealth(num){
    this.currentHP = this.currentHP - num;
    if(this.currentHP < 0){this.currentHP = 0;}
  }

  giveHealth(num){
    console.log("Healing for: " + num);
    this.currentHP = this.currentHP + num;
    if(this.currentHP > this.maxHP){this.currentHP = this.maxHP;}
  }

  removeSpirit(num){
    console.log("Spending " + num + " spirit!");
    this.currentSpirit = this.currentSpirit - num;
  }

  giveSpirit(num){
    console.log("Spending " + num + " spirit!");
    this.currentSpirit = this.currentSpirit + num;
    if(this.currentSpirit > this.maxSpirit){this.currentSpirit = this.maxSpirit;}
  }

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
