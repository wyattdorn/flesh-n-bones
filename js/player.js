//Written by Wyatt Dorn

class Deity{

  /////////////////////////////////////////////////////////////////////////////
  // Deity is the Player Character who oversees the army of undead
  // -
  /////////////////////////////////////////////////////////////////////////////

  constructor() {
    this.soulsOwned = 0;
    this.souls = [];
    this.malachite = 0; //The money used in this world
    this.impetus = 0; //Basically exp for the PC
    this.myCreatures = [];
    this.myCombatCreatures = []; //List of Creatures that will enter combat
    this.isPlayerTurn = true;
    this.mySkins = [];
    this.myBones = [];
    this.myGuts = [];
    this.mySouls = [];
    this.myOrgans = [this.myBones, this.myGuts, this.mySkins];
    this.myEquipableItems = [];
    this.inventoryList = [this.myOrgans[0], this.myOrgans[1], this.myOrgans[2], this.myEquipableItems];
  }//end constructor

  gainNewEquipableItem(num){
    this.myEquipableItems.push(num);
    this.inventoryList[3] = this.myEquipableItems;
  }

  addSoul(newSoul){
    this.soulsOwned++;
    souls.push(newSoul);
  }//end addSoul

  removeInventoryItem(index, type){
    switch (type) {
      case 0:
        this.myBones.splice(index, 1);
        this.myOrgans[0] = this.myBones;
        break;
      case 1:
      this.myGuts.splice(index, 1);
      this.myOrgans[1] = this.myGuts;
        break;
      case 2:
      this.mySkins.splice(index, 1);
      this.myOrgans[2] = this.mySkins;
        break;
      case 3:
      this.myEquipableItems.splice(index, 1);
      //this.myOrgans[2] = this.mySkins;
        break;
    }
    //this.myOrgans = [this.myBones, this.myGuts, this.mySkins];
    this.inventoryList = [this.myOrgans[0], this.myOrgans[1], this.myOrgans[2], this.myEquipableItems];
  }

}//end class Deity
