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
    this.list[4] = [4, "Wooly Body", 0, "Big body grants additional fortitude.",[5,3], imageLoader.woolyBodyImg];
    this.list[5] = [5, "Mysterious Body", 0, "This body is mysterious.",[1,7], imageLoader.mysteriousBodyImg];
    this.list[6] = [6, "Wrapped Body", 0, "This body is wrapped in linen.",[6,2], imageLoader.wrappedBodyImg];
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
    this.list[1] = [1, "Explosive Guts", 4, "Explosive guts grants the Explode skill.", [0,1], "red"];
    this.list[2] = [2, "Dubious Guts", 0, "No one knows what these guts do...", [3,2], "green"];
    this.list[3] = [3, "Healthy Guts", 8, "Healthy guts allow the owner to heal themself.",false, "yellow"];
    this.list[4] = [4, "Bizarre Guts", 0, "Bizarre guts grant wisdom to a creature.",[1,1], "blue"];
    this.list[5] = [5, "Luminous Guts", 0, "Luminous guts glow with their own light.",[6,5], "white"];
    this.list[6] = [6, "Stinking Guts", 0, "There is no denying the odor of these guts.",[7,5], "orange"];
  }//end init()

}


  // 0 - HP
  // 1 - Spirit
  // 2 - Dexterity
  // 3 - Agility
  // 4 - Might
  // 5 - Fortitude
  // 6 - Intel
  // 7 - Wisdom

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
    this.list[5] = [5, "Gruff Head", 0, "Gruff head is gruff.",[4, 5], imageLoader.gruffHeadImg];
    this.list[6] = [6, "Goblin Head", 0, "A lil goblin head.",[2,3], imageLoader.goblinHeadImg];
    this.list[7] = [7, "Cyclops Head", 0, "Only one eye...",[0,10], imageLoader.cyclopsHeadImg];
    this.list[8] = [8, "Skeletal Pirate Head", 0, "The severed head of a long dead pirate.", [6,4], imageLoader.skeletonPirateHeadImg];
  }//end init()
}
