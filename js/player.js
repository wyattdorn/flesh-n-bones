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
  }//end constructor

  addSoul(newSoul){
    this.soulsOwned++;
    souls.push(newSoul);
  }//end addSoul

}//end class Deity
