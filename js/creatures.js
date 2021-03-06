//Written by Wyatt Dorn


////////////////////////////////////////////////////////////////////////////////
// Creature is a generic class for all units (enemy and ally) in game.
////////////////////////////////////////////////////////////////////////////////
class Creature {

  constructor(name, path) {
    this.name = name;
    this.imgSrc = path;
    this.age = 0;
    this.dexterity = 10;
    this.agility = 10;
    this.might = 10;
    this.fortitude = 10;
    this.intelligence = 10;
    this.wits = 10;
    this.speed = Math.floor((this.dexterity * this.agility)/2);
    this.strength = Math.floor((this.might * this.fortitude)/2);
    this.mind = Math.floor((this.intelligence * this.wits)/2);
    this.myBuffs = [];
    this.currentHP = 1;
    this.maxHP = 1;
    this.spirit = 1; //spirit is mana
    this.movesLeft = this.moveSpeed;
    this.skillList = [0,0,0,0];
    this.memorizedSkills = [];//This is a list of skills the Creature has used enough to memorize
    //   memorizedSkills[0] = skill index, [1] = times the skill has been used, [2] = if the skill has been memorized (bool)
    this.myItem = 0;//items.itemList[0];
    this.myHead = 0;// heads.list[0];
    this.myBody = 0;// body.list[0];
    this.myGuts = 0;// guts.list[0];
    this.myOrgans = [this.myBody, this.myGuts, this.myHead];
    this.myInventory = [this.myBody, this.myGuts, this.myHead, this.myItem];
    this.hasAction = true; //A boolean to store whether or not a unit has acted this round
  }//end constructor()


  ////////////////////////////////////////////////////////////////////////////////
  // Calculate all buffs granted by equippables
  ////////////////////////////////////////////////////////////////////////////////
  calculateBuffs(){
    //Clear any exisiting buffs
    for(let x = 0; x < 8; x++){
      this.myBuffs[x] = 0;
    }



    //Search through all equippeditems to see if a buff exists
    for(let x = 0; x < 3; x++){
      if(masterInventoryList[x][this.myInventory[x]].buff){
        this.myBuffs[masterInventoryList[x][this.myInventory[x]].buff[0]] += masterInventoryList[x][this.myInventory[x]].buff[1];
      }
    }

    //console.log(this.myBuffs);

  }//end calculateBuffs()


  ////////////////////////////////////////////////////////////////////////////////
  // When a Creature dies, it's hp and spirit are set to 0
  ////////////////////////////////////////////////////////////////////////////////
  die(){
    this.currentHP = 0;
    this.currentSpirit = 0;
  }//end die()

  ////////////////////////////////////////////////////////////////////////////////
  // Each time a Creature uses a skill, they make progress towards learning it,
  // this skill is then called to mark that progress
  ////////////////////////////////////////////////////////////////////////////////
  learnSkill(skillNum){
    //Check all the skills in this Creature's list of memorized skills
    for(var x = 0; x < this.memorizedSkills.length; x++){
      if(this.memorizedSkills[x][0] == skillNum){
        if(this.memorizedSkills[x][1] < masterSkillList[this.memorizedSkills[x][0]].usesUntilMastered){
          this.memorizedSkills[x][1]++;
          console.log("ALL FULL!");
        }
        return;
      }
    }
    this.memorizedSkills.push([skillNum, 1]);
  }//end learnSkill()

  ////////////////////////////////////////////////////////////////////////////////
  // Sets the Creature's fourth skill to a skill they've already learned
  ////////////////////////////////////////////////////////////////////////////////
  equipLearnedSkill(index){
    console.log("Equipping " + skills.skillList[index][2] + " to " + this.name);
    //Make sure the skill has been fully learned by the Creature before we equip it
    for(var x = 0; x < this.memorizedSkills.length; x++){
      if(this.memorizedSkills[x][0] == index){
        if(this.memorizedSkills[x][1] >= skills.skillList[this.memorizedSkills[x][0]][8]){
          this.skillList[3] = index;
        }
      }
    }
  }//end equipLearnedSkill


  ////////////////////////////////////////////////////////////////////////////////
  // Function is called when an Item or Organ is equipped to a Creature
  ////////////////////////////////////////////////////////////////////////////////
  equip(index, type){

    //Equip an Item
    if(type == 3){
      this.giveItem(index);
    }
    //Equip an organ
    else if(type == 0 || type == 1 || type == 2){
      this.giveOrgan(index, type);
    }
    this.myInventory[type] = index;

    //this.calculateEquipmentBuffs();
    this.calculateBuffs();

  }//end equip()

  ////////////////////////////////////////////////////////////////////////////////
  // Equips a given Item to this Creature
  ////////////////////////////////////////////////////////////////////////////////
  giveItem(index){
    if(this.myItem == 0){
      this.myItem = index;
    }
    else{
      this.removeItem();
      this.myItem = index;
    }
  }//end giveItem()

  ////////////////////////////////////////////////////////////////////////////////
  // Equips a given Item to this Creature, "index" is the item's index in the Player's inventory
  ////////////////////////////////////////////////////////////////////////////////
  equipFromInventory(index, type){

    this.masterIndex = masterInventoryList[type][player.inventoryList[type][index]].idNum;

    this.equip(this.masterIndex, type);
    player.removeInventoryItem(index, type);
  }//end equipFromInventory()

  ////////////////////////////////////////////////////////////////////////////////
  // Unequips an Item or Organ from this Creature, and returns it to the Player's inventory
  ////////////////////////////////////////////////////////////////////////////////
  unequip(type){

    //First we must check to see if there is something to unequip
    if(this.myInventory[type] != 0){
      //Unequip an Item
      if(type == 3){
        this.removeItem();
      }
      //Unequip an organ
      else if(type == 1 || type == 2){
        this.removeOrgan(type);
      }
      else if(type == 0){
        this.removeOrgan(type);
        this.imgSrc = imageLoader.soulImg;
      }
      this.myInventory[type] = 0;
    }

    this.calculateBuffs();
  }//end unequip()

  ////////////////////////////////////////////////////////////////////////////////
  // Unequips the Item this Creature is holding, and returns it to the Player's inventory
  ////////////////////////////////////////////////////////////////////////////////
  removeItem(){
    //Place the Item back in the Player's inventory
    player.inventoryList[3].push(this.myItem);
    //Removes the item from the Creature's inventory
    this.myItem = 0;
  }//end removeItem()

  ////////////////////////////////////////////////////////////////////////////////
  // Unequips an organ from this Creature, and returns it to the Player's inventory
  ////////////////////////////////////////////////////////////////////////////////
  removeOrgan(organType){
    //console.log("GIVE ORGAN");
    player.inventoryList[organType].push(this.myOrgans[organType]);
    switch (organType) {
      case 0: //bone
          this.myBody = 0;
          this.skillList[0] =0;
        break;
      case 1: //guts
          this.myGuts = 0;
          this.skillList[1] = 0;
          //console.log(index + " ---guts--- " + organType);
        break;
      case 2: //head
          this.myHead = 0;
          this.skillList[2] = 0;
          //console.log(index + " ---head--- " + organType);
        break;
    }
    this.myOrgans[organType] = 0;// [this.myBody, this.myGuts, this.myHead];
  }//end removeOrgan()

  ////////////////////////////////////////////////////////////////////////////////
  // Equips a given Organ to this Creature
  ////////////////////////////////////////////////////////////////////////////////
  giveOrgan(index, organType){
    //console.log("GIVE ORGAN");
    if(this.myOrgans[organType] != 0){
      player.inventoryList[organType].push(this.myOrgans[organType]);
    }
    switch (organType) {
      case 0: //body
          this.myBody = index;
          this.skillList[0] = bodyList[this.myBody].function;
          this.imgSrc = bodyList[this.myBody].image;
        break;
      case 1: //guts
          this.myGuts = index;
          this.skillList[1] = gutsList[this.myGuts].function;
          //console.log(index + " ---guts--- " + organType);
        break;
      case 2: //head
          this.myHead = index;
          this.skillList[2] = headList[this.myHead].function;
          //console.log(index + " ---head--- " + organType);
        break;
    }
    this.myOrgans[organType] = index;// [this.myBody, this.myGuts, this.myHead];
  }//end giveOrgan()

  ////////////////////////////////////////////////////////////////////////////////
  // OLD FUNCTION, TO BE PHASED OUT AND DELETED IN DUE TIME
  ////////////////////////////////////////////////////////////////////////////////
  getOrgan(index){
    this.myOrgans = [this.myBody, this.myGuts, this.myHead];
    return this.myOrgans[index];
  }//end getOrgan()

  //////////////////////////////////////////////////////////////////////////////////////
  //    Returns a boolean, if the Creature is capable of acting at this time
  //////////////////////////////////////////////////////////////////////////////////////
  canAct(){
    if(this.hasAction == true && this.isDead() == false){
      return true;
    }
    console.log("Unit cannot act.");
    return false;
  }//end canAct()

  ////////////////////////////////////////////////////////////////////////////////
  // Increases this Creature's age by 1
  ////////////////////////////////////////////////////////////////////////////////
  ageUp(){
    this.age++;
  }//end ageUp()

  ////////////////////////////////////////////////////////////////////////////////
  // Returns a boolean, if the given creature's HP is less than half
  ////////////////////////////////////////////////////////////////////////////////
  isBloodied(){
    if(this.currentHP/this.maxHP <= 0.5 && !this.isDead()){return true;}
    else{return false;}
  }//end isBloodied()

  ////////////////////////////////////////////////////////////////////////////////
  // Returns a boolean, if the given creature's HP is 0
  ////////////////////////////////////////////////////////////////////////////////
  isDead(){
    if(this.currentHP<=0){return true;}
    else{return false;}
  }//end isDead()

  ////////////////////////////////////////////////////////////////////////////////
  // Removes a given number of HP from this Creature
  ////////////////////////////////////////////////////////////////////////////////
  removeHealth(num){
    this.currentHP = this.currentHP - num;
    if(this.currentHP < 0){this.currentHP = 0;}
  }//end removeHealth()

  ////////////////////////////////////////////////////////////////////////////////
  // Adds a given number of HP from this Creature
  ////////////////////////////////////////////////////////////////////////////////
  giveHealth(num){
    console.log("Healing for: " + num);
    this.currentHP = this.currentHP + num;
    if(this.currentHP > this.maxHP){this.currentHP = this.maxHP;}
  }//end giveHealth()

  ////////////////////////////////////////////////////////////////////////////////
  // Removes a given number of Spirit from this Creature
  ////////////////////////////////////////////////////////////////////////////////
  removeSpirit(num){
    console.log("Spending " + num + " spirit!");
    this.currentSpirit = this.currentSpirit - num;
  }//end removeSpirit()

  ////////////////////////////////////////////////////////////////////////////////
  // Adds a given number of Spirit from this Creature
  ////////////////////////////////////////////////////////////////////////////////
  giveSpirit(num){
    console.log("Spending " + num + " spirit!");
    this.currentSpirit = this.currentSpirit + num;
    if(this.currentSpirit > this.maxSpirit){this.currentSpirit = this.maxSpirit;}
  }//end giveSpirit()

}

////////////////////////////////////////////////////////////////////////////////
// PlayerCharacter class is a Creature type that describes all units controlled
// by the player.
////////////////////////////////////////////////////////////////////////////////
class PlayerCharacter extends Creature{

  constructor(myname, stats, path) {
    super();
    this.name = myname;
    this.imgSrc = path;
    this.exp = 0;         //Starting experience for all PlayerCharacters is 0
    this.age = stats[0];       //Starting age for all PlayerCharacters is 1
    this.maxHP = stats[1];
    this.maxSpirit = stats[2];
    this.dexterity = stats[3];
    this.agility = stats[4];
    this.might = stats[5];
    this.fortitude = stats[6];
    this.intelligence = stats[7];
    this.wits = stats[8];

    this.myStats = [this.maxHP, this.maxSpirit, this.dexterity, this.agility, this.might, this.fortitude, this.intelligence, this.wits];

    this.updateStats();

    this.speed = Math.floor((this.dexterity * this.agility)/2);
    this.strength = Math.floor((this.might * this.fortitude)/2);
    this.mind = Math.floor((this.intelligence * this.wits)/2);

    this.hpProgress = 0;
    this.spiritProgress = 0;
    this.dexterityProgress = 0;
    this.agilityProgress = 0;
    this.mightProgress = 0;
    this.fortitudeProgress = 0;
    this.intelligenceProgress = 0;
    this.witsProgress = 0;

    this.statProgress = [this.hpProgress, this.spiritProgress, this.dexterityProgress, this.agilityProgress, this.mightProgress, this.fortitudeProgress, this.intelligenceProgress, this.witsProgress];


    //Calculate the (nonexistant) buffs to avoid stats appearing as NaN in the Creature Editor
    this.calculateBuffs();

    this.currentHP = this.maxHP;

    this.currentSpirit = this.maxSpirit; //spirit is mana
  }

  ////////////////////////////////////////////////////////////////////////////////
  // At the start of combat, apply all equipment buffs to the creature
  ////////////////////////////////////////////////////////////////////////////////
  applyAllBuffs(){

    this.calculateBuffs();

    for(let x = 0; x < this.statProgress.length; x++){
      this.myStats[x] += this.myBuffs[x];
    }

    this.updateStats();

    this.speed = Math.floor((this.dexterity * this.agility)/2);
    this.strength = Math.floor((this.might * this.fortitude)/2);
    this.mind = Math.floor((this.intelligence * this.wits)/2);

  }//end applyAllBuffs()

  ////////////////////////////////////////////////////////////////////////////////
  // At the end of combat, remove all equipment buffs to the creature
  ////////////////////////////////////////////////////////////////////////////////
  removeAllBuffs(){

    console.log("Removing all buffs from: " + this.name);

    this.calculateBuffs();

    for(let x = 0; x < this.statProgress.length; x++){
      this.myStats[x] -= this.myBuffs[x];
    }

    this.updateStats();

    this.speed = Math.floor((this.dexterity * this.agility)/2);
    this.strength = Math.floor((this.might * this.fortitude)/2);
    this.mind = Math.floor((this.intelligence * this.wits)/2);

  }//end removeAllBuffs()

  ////////////////////////////////////////////////////////////////////////////////
  // Add to the stat's progress and check if it eligigble for an increase
  ////////////////////////////////////////////////////////////////////////////////
  progressStat(stat, amount){

    for(let x = 0; x < this.statProgress.length; x++){
      if(x == stat){
        this.statProgress[x] += amount;
        console.log("yap");
      }
      if(this.statProgress[x] >= 10){
        this.statProgress[x] -= 10;
        console.log(this.myStats[x]);
        this.myStats[x]++;
        this.updateStats();
        return true;
        console.log("Progressed stat #" + x);
      }
    }

    return false;

  }//end progressStat()

  ////////////////////////////////////////////////////////////////////////////////
  // Ensure that the myStats aray and the individuals stats retain the same values
  ////////////////////////////////////////////////////////////////////////////////
  updateStats(){

    this.maxHP = this.myStats[0];
    this.maxSpirit = this.myStats[1];
    this.dexterity = this.myStats[2];
    this.agility = this.myStats[3];
    this.might = this.myStats[4];
    this.fortitude = this.myStats[5];
    this.intelligence = this.myStats[6];
    this.wits = this.myStats[7];

    this.myStats = [this.maxHP, this.maxSpirit, this.dexterity, this.agility, this.might, this.fortitude, this.intelligence, this.wits];

  }//end updateStats()

  //For use in testing only.
  generateDummyStats(hp, mana, attackPower){
      this.maxHP = hp;
      this.currentHP = hp;
      this.maxSpirit = mana;
      this.currentSpirit = mana;
      this.attackPower = attackPower;
  }//end generateDummyStats()

}//end class PlayerCharacter

////////////////////////////////////////////////////////////////////////////////
// EnemyCreature class is a Creature type that describes all units controlled
// by the player.
////////////////////////////////////////////////////////////////////////////////
class EnemyCreature extends Creature{
  constructor(stats) {
    super();
    this.name = stats[0];
    this.temperment = stats[1];
    this.maxSpirit = stats[2];
    this.maxHP = stats[3];
    this.imgSrc = stats[11];
    this.exp = 0;
    this.age = 1;
    this.dexterity = stats[5];
    this.agility = stats[6];
    this.might = stats[7];
    this.fortitude = stats[8];
    this.intelligence = stats[9];
    this.wits = stats[10];
    this.speed = Math.floor((this.dexterity + this.agility)/2);
    this.strength = Math.floor((this.might + this.fortitude)/2);
    this.mind = Math.floor((this.intelligence + this.wits)/2);

    this.currentHP = this.maxHP;

    this.currentSpirit = this.maxSpirit; //spirit is mana
  }//end constructor()
}//end class EnemyCreature
