//Written by Wyatt Dorn

class Item{

  constructor(){
    this.init();
  }

  init(){
    this.itemList = new Array(1);
    this.itemList[0] = [];

    //                      function()               Name        Target  Ability       Multiplier Cost       Description
    this.itemList[0] = [0, "No Item", this.noItem, "Creature has no item equipped.", 'media/images/cube.png'];
    this.itemList[1] = [1, "Red Sludge", this.redSludge, "Restore 8 HP to this Creature.", 'media/images/items/red-sludge.png'];
    this.itemList[2] = [2, "Blue Sludge", this.blueSludge, "Restore 5 Spirit to this Creature.", 'media/images/items/blue-sludge.png'];
    this.itemList[3] = [3, "Purp. Sludge", this.purpleSludge, "Restore 5 HP and 3 Spirit to this Creature.", 'media/images/items/purple-sludge.png'];

  }

  //////////////////////////////////////////////////////////////////////////////
  //  Red Sludge function - Grants 8 HP
  //////////////////////////////////////////////////////////////////////////////
  redSludge(target){
    target.giveHealth(8);
  }

  //////////////////////////////////////////////////////////////////////////////
  //  Blue Sludge function - Grants 5 Spirit
  //////////////////////////////////////////////////////////////////////////////
  blueSludge(target){
    target.giveSpirit(5);
  }

  //////////////////////////////////////////////////////////////////////////////
  //  Purple Sludge function - Grants 5 HP and 3 Spirit
  //////////////////////////////////////////////////////////////////////////////
  purpleSludge(target){
    target.giveHealth(5);
    target.giveSpirit(3);
  }

}
