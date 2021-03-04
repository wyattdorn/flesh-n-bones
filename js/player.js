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
    this.locationProgress = [];
    //Campaign progress is stored as [chapter, section]
    this.campaignProgress = [];

    this.init();
  }//end constructor

  init(){
    for(var x = 0; x < mapLocations.list.length; x++){
      this.locationProgress[x] = 1;
    }
  }//end init()

  /////////////////////////////////////////////////////////////////////////////
  // Updates the player's progress for a given location ofter a combat encounter has been cleared
  /////////////////////////////////////////////////////////////////////////////
  updateCampaignProgress(){
    console.log("UPDATING CAMPAIGN PROGRESS!");
    this.campaignProgress[1]++;

  }//end updateCampaignProgress()

  /////////////////////////////////////////////////////////////////////////////
  // Updates the player's progress for a given location ofter a combat encounter has been cleared
  /////////////////////////////////////////////////////////////////////////////
  nextChapter(){
    console.log("NEXT CAMPAIGN CHAPTER!");
    this.campaignProgress[0]++;
    this.campaignProgress[1] = 1;

  }//end nextChapter()

  /////////////////////////////////////////////////////////////////////////////
  // Updates the player's progress for a given location ofter a combat encounter has been cleared
  /////////////////////////////////////////////////////////////////////////////
  updateLocationProgress(location){
    this.locationProgress[location]++;

    //If this location has had all combat encounters cleared, it becomes friendly
    if(this.locationProgress[location] >= mapLocations.encounterList[location].length){
      mapLocations.list[location][4] = true;
      console.log(mapLocations.list[location][1] + " is now friendly!");
    }

  }//end updateLocationProgress()

  /////////////////////////////////////////////////////////////////////////////
  // Adds a new equippable item to the inventory of the player
  /////////////////////////////////////////////////////////////////////////////
  giveItem(index, type){

    //Check the item type, then add that item to the inventory
    switch (type) {
      case 0:
        this.myBones.push(index);
        this.myOrgans[0] = this.myBones;
        break;
      case 1:
      this.myGuts.push(index);
      this.myOrgans[1] = this.myGuts;
        break;
      case 2:
      this.mySkins.push(index);
      this.myOrgans[2] = this.mySkins;
        break;
      case 3:
      this.myEquipableItems.push(index);
        break;
    }
    //Update the master inventory list
    this.inventoryList = [this.myOrgans[0], this.myOrgans[1], this.myOrgans[2], this.myEquipableItems];
  }//end giveItem()

  /////////////////////////////////////////////////////////////////////////////
  // Adds a Soul to the player's total, also provides Impetus to the player
  /////////////////////////////////////////////////////////////////////////////
  addSoul(){
    //Define index as the current number of souls owned
    this.index = player.souls.length;
    //Increment the number of souls owned
    this.soulsOwned++;
    //Push next soul from the souls list onto the stack of souls owned by player
    this.souls.push(souls.list[this.index]);
    this.myCreatures.push(new PlayerCharacter(souls.list[this.index][1], souls.list[this.index][2], imageLoader.soulImg));
    //Update impetus
    this.updateImpetus();
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
