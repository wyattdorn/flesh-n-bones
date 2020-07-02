//Created by Waytt Dorn

class Souls{

  constructor(){

    this.init();

  }//end constructor()

  init(){

    //this.list = new Array(1);
    this.list= [];

    /*
    level
    hp
    spirit
    dexterity
    agility
    might
    fortitude
    Intelligence
    Wisdom
    */

    //                  Name     Ability Scores                 Description
    this.list[0] = [0, "Gobbo",   [1, 10, 10, 5, 5, 5, 5, 5, 5], "Gobbo sought you out, and through devotion brought you back."];
    this.list[1] = [1, "Chonk",   [1, 12, 7, 4, 3, 6, 7, 2, 5], "Chonk was lost, but through devotion has found peace of mind."];
    this.list[2] = [2, "Mallow",  [2, 11, 15, 6, 6, 5, 7, 8, 5], "Mallow loves books, and in life may have been a mage."];
    this.list[3] = [3, "Chip",    [2, 7, 7, 9, 9, 9, 9, 9, 9], "Chip is always cheerful, when others are around."];
    this.list[4] = [4, "M",       [2, 12, 11, 10, 11, 7, 6, 5, 4], "K doesn't speak much, but is quick to action when necessary."];
    this.list[5] = [5, "Al",      [3, 9, 16, 7, 7, 9, 9, 8, 13], "Al calims to have once slain a dragon, many believe the story."];



  }//end init()


}
