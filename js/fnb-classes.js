//Written by Wyatt Dorn

class Skin {
  constructor(element) {
    this.element = element;
  }
}

class Bones {
  constructor(element) {
    this.element = element;
  }
}

class Guts {
  constructor(element) {
    this.element = element;
  }
}

class Soul{
  constructor(temperment){
    this.temperment = temperment;
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
    this.spirit = 1; //spirit is mana
    this.moveSpeed = 4;
    this.movesLeft = this.moveSpeed;
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
    if(this.currentHP/this.maxHP>=0.5){return false;}
    else{return true;}
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


////////////////////////////////////////////////////////////////////////////////
// Skills are abilities that can be learned by creatures for use in combat.
////////////////////////////////////////////////////////////////////////////////
class Skill{
  constructor(name, idNum){
    this.name = name;
    this.ID = idNum;
  }
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
