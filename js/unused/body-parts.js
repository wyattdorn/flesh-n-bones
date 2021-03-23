//Written by Wyatt Dorn


  // 0 - HP
  // 1 - Spirit
  // 2 - Dexterity
  // 3 - Agility
  // 4 - Might
  // 5 - Fortitude
  // 6 - Intel
  // 7 - Wisdom


class Body {
  constructor(element) {
    this.element = element;
    this.init();
  }//end constructor()

  init(){
    this.list = [];

    //                      index, name, skill num, info, buffs, image, value
    this.list[0] = [0, "No Body", 0, "Creature has no body.", false, imageLoader.soulImg, 0];
    this.list[1] = [1, "Old Body", 1, "Any old pile of bones can attack.",false, imageLoader.oldBodyImg, 16];
    this.list[2] = [2, "Brittle Body", 3, "Brittle body grants the Heal skill.",false, imageLoader.brittleBodyImg, 16];
    this.list[3] = [3, "Big Body", 2, "Big body grant the Defend skill.",false, imageLoader.bigBodyImg, 16];
    this.list[4] = [4, "Wooly Body", 0, "Big body grants additional fortitude.",[5,3], imageLoader.woolyBodyImg, 16];
    this.list[5] = [5, "Mysterious Body", 0, "This body is mysterious.",[1,7], imageLoader.mysteriousBodyImg, 16];
    this.list[6] = [6, "Wrapped Body", 0, "This body is wrapped in linen.",[6,2], imageLoader.wrappedBodyImg, 16];
  }//end init()

}

class Guts {
  constructor(element) {
    this.element = element;
    this.init();
  }//end constructor()

  init(){
    this.list = [];

    //                      index, name, skill num, info, buffs, color, value
    this.list[0] = [0, "No Guts", 0, "Creature has no guts.",false, null, 0];
    this.list[1] = [1, "Explosive Guts", 4, "Explosive guts grants the Explode skill.", [0,1], "red", 16];
    this.list[2] = [2, "Dubious Guts", 0, "No one knows what these guts do...", [3,2], "green", 16];
    this.list[3] = [3, "Healthy Guts", 8, "Healthy guts allow the owner to heal themself.",false, "yellow", 16];
    this.list[4] = [4, "Bizarre Guts", 0, "Bizarre guts grant wisdom to a creature.",[1,1], "blue", 16];
    this.list[5] = [5, "Luminous Guts", 0, "Luminous guts glow with their own light.",[6,5], "white", 16];
    this.list[6] = [6, "Stinking Guts", 0, "There is no denying the odor of these guts.",[7,5], "orange", 16];
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
    this.list[0] = [0, "No Head", 0, "Creature has no head.",false, imageLoader.noHeadImg, 0];
    this.list[1] = [1, "Goblin Head", 5, "Goblin head grants the Scythe skill.",false, imageLoader.goblinHeadImg, 16];
    this.list[2] = [2, "Orc Head", 6, "Orc head grants the Orc Smash skill.",false, imageLoader.orcHeadImg, 16];
    this.list[3] = [3, "Mage Head", 7, "Mage head grants the Spirit Dagger skill.",false, imageLoader.mageHeadImg, 16];
    this.list[4] = [4, "Anubis Head", 9, "Anubis head grants the Divine Aura skill.",false, imageLoader.anubisHeadImg, 16];
    this.list[5] = [5, "Gruff Head", 0, "Gruff head is gruff.",[4, 5], imageLoader.gruffHeadImg, 16];
    this.list[6] = [6, "Armored Head", 0, "A head, a helmet, or both?",[2,3], imageLoader.armoredHeadImg, 16];
    this.list[7] = [7, "Cyclops Head", 0, "Only one eye...",[0,10], imageLoader.cyclopsHeadImg, 16];
    this.list[8] = [8, "Skeletal Pirate Head", 0, "The severed head of a long dead pirate.", [6,4], imageLoader.skeletonPirateHeadImg, 16];
  }//end init()
}
