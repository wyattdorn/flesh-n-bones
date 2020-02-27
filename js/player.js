class Deity{

  /////////////////////////////////////////////////////////////////////////////
  // Deity is the Player Character who oversees the army of undead
  // -
  /////////////////////////////////////////////////////////////////////////////

  constructor() {
    this.soulsOwned = 0;
    this.souls = [];
    this.obsidian = 0; //The money used in this world
    this.impetus = 0; //Basically exp for the PC
  }//end constructor

  addSoul(newSoul){
    this.soulsOwned++;
    souls.push(newSoul);
  }//end addSoul

}//end class Deity
