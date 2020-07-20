//Written by Wyatt Dorn

class Deity{

  /////////////////////////////////////////////////////////////////////////////
  // Deity is the Player Character who oversees the army of undead
  // -
  /////////////////////////////////////////////////////////////////////////////

  constructor() {
    this.soulsOwned = 0;
    this.souls = [];
    this.maxPartySize = 5;
    this.malachite = 497; //The money used in this world
    this.impetus = 0; //Basically exp for the PC
    this.myCreatures = [];
    this.myConstructs = []; //constructs are souls placed in objects that perform non-cobat tasks
    this.myCombatCreatures = []; //List of Creatures that will enter combat
    this.isPlayerTurn = true;
    this.mySkins = [];
    this.myBones = [];
    this.myGuts = [];
    this.mySouls = [];
    this.myOrgans = [this.myBones, this.myGuts, this.mySkins];
    this.myEquipableItems = [];
    this.inventoryList = [this.myOrgans[0], this.myOrgans[1], this.myOrgans[2], this.myEquipableItems];
    //List of how many encounters have been cleared for each map location
    this.locationsCleared = [];
  }//end constructor

  /////////////////////////////////////////////////////////////////////////////
  // Adds a new equippable item to the inventory of the player
  /////////////////////////////////////////////////////////////////////////////
  gainNewEquipableItem(num){
    this.myEquipableItems.push(num);
    this.inventoryList[3] = this.myEquipableItems;
  }//end gainNewEquipableItem()

  /////////////////////////////////////////////////////////////////////////////
  // Adds a Soul to the player's total, also provides Impetus to the player
  /////////////////////////////////////////////////////////////////////////////
  addSoul(newSoul){
    this.soulsOwned++;
    this.souls.push(newSoul);
    this.myCreatures.push(new PlayerCharacter(souls.list[newSoul][1], souls.list[newSoul][2], imageLoader.soulImg));
    this.updateImpetus();
    //player.myCreatures.push(new PlayerCharacter("Gobbo", b, soul, imageLoader.goblinImg));
    //this.impetus += 2;
  }//end addSoul()

  /////////////////////////////////////////////////////////////////////////////
  // Adds a Soul to the player's total, also provides Impetus to the player
  /////////////////////////////////////////////////////////////////////////////
  removeLastSoul(){
    this.soulsOwned--;
    this.souls.pop();
    this.myCreatures.pop();
    this.updateImpetus();
    //player.myCreatures.push(new PlayerCharacter("Gobbo", b, soul, imageLoader.goblinImg));
    //this.impetus += 2;
  }//end addSoul()

  /////////////////////////////////////////////////////////////////////////////
  // Updates the player's Impretus based on how many souls they own
  /////////////////////////////////////////////////////////////////////////////
  updateImpetus(){
    this.impetus = 2 + (this.soulsOwned * 2);
  }//end updateImpetus()

  /////////////////////////////////////////////////////////////////////////////
  // Removes an Item from the player's inventory
  /////////////////////////////////////////////////////////////////////////////
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
  }//end removeInventoryItem()

}//end class Deity
