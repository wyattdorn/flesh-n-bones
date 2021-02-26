//Written by Wyatt Dorn

class Item{

  constructor(){
    this.init();
  }//end constructor()

  init(){
    this.list = new Array(1);
    this.list[0] = [];

    //             index name function() description buff image
    this.list[0] = [0, "No Item", this.noItem, "Creature has no item equipped.", false, imageLoader.noItemImg];
    this.list[1] = [1, "Red Sludge", this.redSludge, "Restore 8 HP to this Creature.", false, imageLoader.redSludgeImg];
    this.list[2] = [2, "Blue Sludge", this.blueSludge, "Restore 5 Spirit to this Creature.", false, imageLoader.blueSludgeImg];
    this.list[3] = [3, "Purp. Sludge", this.purpleSludge, "Restore 5 HP and 3 Spirit to this Creature.", false, imageLoader.purpleSludgeImg];
  }//end init()

  //////////////////////////////////////////////////////////////////////////////
  //  Red Sludge function - Grants 8 HP
  //////////////////////////////////////////////////////////////////////////////
  redSludge(target){
    target.giveHealth(8);
  }//end redSludge()

  //////////////////////////////////////////////////////////////////////////////
  //  Blue Sludge function - Grants 5 Spirit
  //////////////////////////////////////////////////////////////////////////////
  blueSludge(target){
    target.giveSpirit(5);
  }//end blueSLudge()

  //////////////////////////////////////////////////////////////////////////////
  //  Purple Sludge function - Grants 5 HP and 3 Spirit
  //////////////////////////////////////////////////////////////////////////////
  purpleSludge(target){
    target.giveHealth(5);
    target.giveSpirit(3);
  }//end purpleSludge()

}
