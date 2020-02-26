//Written by Wyatt Dorn

class Meat {
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

//Body of a creature, consisting of Meat, Bones, and Guts
class Body {
  constructor(meat, bones, guts) {
    this.Meat = meat;
    this.Bones = bones;
    this.Guts = guts;
  }

  removeMeat(){
    this.Meat = null;
  }

  addFlesh(meat){
    this.Meat = flesh;
  }

  printElements(){
    console.log('Meat: ' + this.Meat.element);
  }
}

class Soul{
  constructor(temperment){
    this.temperment = temperment;
  }
}

class Creature {
  constructor(name, body) {
    this.name = name;
    this.Body = body;
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
    this.hp=1;
  }

  setLocation(x,y){
    this.location[0]=x;
    this.location[1]=y;
  }

  printLocation(){
    console.log('(' + this.location[0] + ', ' + this.location[1] + ')');
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
