//Written by Wyatt Dorn

class Body {
  constructor(element) {
    this.element = element;
    this.init();
  }//end constructor()

  init(){
    this.list = [];

    //                      function()               Name        Target  Ability       Multiplier Cost       Description
    this.list[0] = [0, "No Body", 0, "Creature has no body.", imageLoader.soulImg];
    this.list[1] = [1, "Old Body", 1, "Any old pile of bones can attack.", imageLoader.oldBodyImg];
    this.list[2] = [2, "Brittle Body", 3, "Brittle body grants the Heal skill.", imageLoader.brittleBodyImg];
    this.list[3] = [3, "Big Body", 2, "Big body grant the Defend skill.", imageLoader.bigBodyImg];
  }//end init()

}

class Guts {
  constructor(element) {
    this.element = element;
    this.init();
  }//end constructor()

  init(){
    this.list = [];

    //                      function()               Name        Target  Ability       Multiplier Cost       Description
    this.list[0] = [0, "No Guts", 0, "Creature has no guts.", null];
    this.list[1] = [1, "Explosive Guts", 4, "Explosive guts grants the Explode skill.", "red"];
    this.list[2] = [2, "Dubious Guts", 0, "No one knows what these guts do...", "green"];
    this.list[3] = [3, "Healthy Guts", 8, "Healthy guts allow the owner to heal themself.", "yellow"];
  }//end init()

}


class Head {
  constructor(element) {
    this.element = element;
    this.init();
  }//end constructor()

  init(){
    this.list = [];

    //                  index, name, skill num, info
    this.list[0] = [0, "No Head", 0, "Creature has no head.", imageLoader.noHeadImg];
    this.list[1] = [1, "Goblin Head", 5, "Goblin head grants the Scythe skill.", imageLoader.goblinHeadImg];
    this.list[2] = [2, "Orc Head", 6, "Orc head grants the Orc Smash skill.", imageLoader.orcHeadImg];
    this.list[3] = [3, "Mage Head", 7, "Mage head grants the Spirit Dagger skill.", imageLoader.mageHeadImg];
  }//end init()
}
