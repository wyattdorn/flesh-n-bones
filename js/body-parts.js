//Written by Wyatt Dorn

class Body {
  constructor(element) {
    this.element = element;
    this.init();
  }//end constructor()

  init(){
    this.list = [];

    //                      index, name, skill num, info, buffs, image
    this.list[0] = [0, "No Body", 0, "Creature has no body.", false, imageLoader.soulImg];
    this.list[1] = [1, "Old Body", 1, "Any old pile of bones can attack.",false, imageLoader.oldBodyImg];
    this.list[2] = [2, "Brittle Body", 3, "Brittle body grants the Heal skill.",false, imageLoader.brittleBodyImg];
    this.list[3] = [3, "Big Body", 2, "Big body grant the Defend skill.",false, imageLoader.bigBodyImg];
    this.list[4] = [4, "Wooly Body", 0, "Big body grants additional fortitude.",[2,3], imageLoader.woolyBodyImg]; // NEEDS TO BE IMPLEMENTED
  }//end init()

}

class Guts {
  constructor(element) {
    this.element = element;
    this.init();
  }//end constructor()

  init(){
    this.list = [];

    //                      index, name, skill num, info, buffs, color
    this.list[0] = [0, "No Guts", 0, "Creature has no guts.",false, null];
    this.list[1] = [1, "Explosive Guts", 4, "Explosive guts grants the Explode skill.",false, "red"];
    this.list[2] = [2, "Dubious Guts", 0, "No one knows what these guts do...",false, "green"];
    this.list[3] = [3, "Healthy Guts", 8, "Healthy guts allow the owner to heal themself.",false, "yellow"];
    this.list[4] = [4, "Blue Guts", 0, "Blue guts grant wisdom to a creature.",[1,1], "blue"];
  }//end init()

}


class Head {
  constructor(element) {
    this.element = element;
    this.init();
  }//end constructor()

  init(){
    this.list = [];

    //             index, name, skill num, info, buffs, image
    this.list[0] = [0, "No Head", 0, "Creature has no head.",false, imageLoader.noHeadImg];
    this.list[1] = [1, "Goblin Head", 5, "Goblin head grants the Scythe skill.",false, imageLoader.goblinHeadImg];
    this.list[2] = [2, "Orc Head", 6, "Orc head grants the Orc Smash skill.",false, imageLoader.orcHeadImg];
    this.list[3] = [3, "Mage Head", 7, "Mage head grants the Spirit Dagger skill.",false, imageLoader.mageHeadImg];
    this.list[4] = [4, "Anubis Head", 9, "Anubis head grants the Divine Aura skill.",false, imageLoader.anubisHeadImg];
  }//end init()
}
