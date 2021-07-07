//Written by Wyatt Dorn

class CombatLogic{


  constructor(){
    //this.init();
  }//end constructor()

  //////////////////////////
  //  Target Types:
  //  1: None
  //  2: Self
  //  3: Ally
  //  4: Enemy
  //  5. All Allies
  //  6. All Enemies
  //  7. All Units
  //
  /////////////////////////

  init(){

    this.increasedStats = [];

    //This value will be stored in order to update the Player's progress if combat is won
    this.combatLocation = 0;

    //boolean to state whether combat is currently active, or has ended.
    this.activeCombat = true;

    //When combat starts, by default, your first allied creature is selected
    this.selectedAlly = 0;
    this.selectedEnemy = 0;

    //A variable to determine if a function is waiting for an input
    //Stores the index of the unit using the skill and the index of the skill in the master skill list
    this.clearWaitingFunction();

    //When a click is made, the following variable stores the associated information
    //                   field    column  row
    this.clickedField = [0,       0,      0];

    this.controlBarFunctions = [];
    this.controlBarFunctions[11] = this.toggleCombatLog;
    this.controlBarFunctions[13] = this.useItem;
    this.controlBarFunctions[31] = this.skill1;
    this.controlBarFunctions[33] = this.skill3;
    this.controlBarFunctions[51] = this.skill2;
    this.controlBarFunctions[53] = this.skill4;
    this.controlBarFunctions[71] = this.endTurn;
    this.controlBarFunctions[73] = this.runAway;

    this.displayMessage = "COMBAT HAS BEGUN!";

    this.newAI = new enemyAI();

    //Ensure that each player-controlled creature starts combat with an action, and has full hp and spirit
    for(var x = 0; x < player.myCombatCreatures.length; x++){
      player.myCreatures[player.myCombatCreatures[x]].hasAction = true;
      player.myCreatures[player.myCombatCreatures[x]].applyAllBuffs();
      player.myCreatures[player.myCombatCreatures[x]].currentHP = player.myCreatures[player.myCombatCreatures[x]].maxHP;
      player.myCreatures[player.myCombatCreatures[x]].currentSpirit = player.myCreatures[player.myCombatCreatures[x]].maxSpirit;
    }

  }//end init()


  //////////////////////////////////////////////////////////////////////////////
  //  Give items dropped by slain foes to the player
  //////////////////////////////////////////////////////////////////////////////
  giveDroppedItems(){
    //Itterate through each entry, and grant the item(s) to the player
    for(var x = 0; x < mapLocations.lootList[this.combatLocation][player.locationProgress[this.combatLocation]].length; x++){
      //Check if it's malachite or an item
      if(mapLocations.lootList[this.combatLocation][player.locationProgress[this.combatLocation]][x][1] == 4){
        player.malachite += mapLocations.lootList[this.combatLocation][player.locationProgress[this.combatLocation]][x][0];
      }
      //If it's an item, give the Player the proper item
      else{
        player.giveItem(mapLocations.lootList[this.combatLocation][player.locationProgress[this.combatLocation]][x][0], mapLocations.lootList[this.combatLocation][player.locationProgress[this.combatLocation]][x][1]);
      }
    }

    //Update the player's progress for this location
    player.updateLocationProgress(this.combatLocation);
    player.updateCampaignProgress();

  }//end giveDroppedItems()

  //////////////////////////////////////////////////////////////////////////////
  //  Draw window letting player know what items were dropped
  //////////////////////////////////////////////////////////////////////////////
  drawDroppedItemWindow(){

    ctx.save();

    //If there are enough drops that we need two columns, this will hold that number
    this.xOffset = 0;
    this.yOffset = 0;

    this.startLocation = [(canvas.width)/4, canvas.height/4-150 ];

    //Draw window
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(this.startLocation[0], this.startLocation[1], canvas.width/2, canvas.height/2);
    ctx.fillStyle = "#000000";
    ctx.fillRect(this.startLocation[0]+2, this.startLocation[1]+2, canvas.width/2-4, canvas.height/2-4);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(this.startLocation[0]+4, this.startLocation[1]+4, canvas.width/2-8, canvas.height/2-8);
    ctx.fillStyle = "#000000";
    ctx.fillRect(this.startLocation[0]+6, this.startLocation[1]+6, canvas.width/2-12, canvas.height/2-12);

    //Draw text
    ctx.fillStyle = "#ffffff";
    ctx.font = "25px Courier";
    ctx.fillText("ITEMS DROPPED...", this.startLocation[0] + 10, this.startLocation[1] + 30);

    //If there are no items dropped, say so
    if(mapLocations.lootList[this.combatLocation][player.locationProgress[this.combatLocation]] == undefined ||
       mapLocations.lootList[this.combatLocation][player.locationProgress[this.combatLocation]].length == 0){
      ctx.fillText("None.", this.startLocation[0] + 10 + this.xOffset, this.startLocation[1] + 60);
      //Update the player's progress for this location
      player.updateLocationProgress(this.combatLocation);
      player.updateCampaignProgress();
      ctx.restore();
      return;
    }

    //Draw list of drops
    for(var x = 0; x < mapLocations.lootList[this.combatLocation][player.locationProgress[this.combatLocation]].length; x++){
      //Check the type of loot, and print the information accordingly
      this.output = "";
      this.dropType = mapLocations.lootList[this.combatLocation][player.locationProgress[this.combatLocation]][x][1];
      switch(this.dropType){
        case 0: case 1: case 2: case 3:
          this.output = "~ " + masterInventoryList[this.dropType][mapLocations.lootList[this.combatLocation][player.locationProgress[this.combatLocation]][x][0]].name;
        break;
        case 4:
          this.output = "~ " + mapLocations.lootList[this.combatLocation][player.locationProgress[this.combatLocation]][x][0] + " malachite";
      }
      ctx.fillText(this.output, this.startLocation[0] + 10 + this.xOffset, this.startLocation[1] + 60 + ( x * 30 ) + this.yOffset);
      //If there are more than 10 items dropped, print the rest in a second column
      if(x > 10){this.xOffset = 300; this.yOffset = -360;}
    }

    for(let x = 0; x < this.increasedStats.length; x++){
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(this.startLocation[0] + 620 , this.startLocation[1] + (50 * x), 252, 32);
      ctx.fillStyle = "#000000";
      ctx.fillRect(this.startLocation[0]+622, this.startLocation[1]+2 + (50 * x), 248, 28);
      ctx.fillStyle = "#ffffff";
      ctx.font = "13px Courier";
      ctx.fillText(this.increasedStats[x], this.startLocation[0] + 625, this.startLocation[1] + 16 + (50 * x));
    }

    //Add the loot to the player's inventory
    this.giveDroppedItems();

    ctx.restore();
  }//end drawDroppedItemWindow()


  //////////////////////////////////////////////////////////////////////////////
  //  Set of functions to be run once combat has begun
  //////////////////////////////////////////////////////////////////////////////
  beginCombat(location){
    //Store the location for use if the player wins this combat
    this.combatLocation = location;

    myCombatScreen.printMessageBar(this.displayMessage);
  }//end beginCombat()

  //////////////////////////////////////////////////////////////////////////////
  //  Check if either team has been killed completely, second returned value is whether the player won the combat
  //////////////////////////////////////////////////////////////////////////////
  checkforCombatEnd(){
    //First, check if all allies are dead, if so, the player loses
    if(this.areWeDeadYet()){
      this.displayMessage = "All allied units are dead, combat is ended. (Click anywhere to exit)";
      console.log("ALL ALLIES DEAD");
      return [true, false];
    }

    //Check if all the enemies are dead, if so, the player wins!
    if(this.areTheyDeadYet()){
      this.displayMessage = "All enemies units are dead. You win! (Click anywhere to exit)";
      console.log("ALL ENEMIES DEAD");
      return [true, true];
    }

    //If the win/lose solutions are not met, combat continues
    return [false, false];
  }//end checkforCombatEnd()

  //////////////////////////////////////////////////////////////////////////////
  //  Placeholder function to check if all allies are dead.
  //////////////////////////////////////////////////////////////////////////////
  areWeDeadYet(){

    console.log("Number of allies: " + player.myCombatCreatures.length);

    //Count how many creatures are dead, and compare that to the list of creatures in combat
    var counter = 0;
    for(var x = 0; x < player.myCombatCreatures.length; x++){
      if(player.myCreatures[player.myCombatCreatures[x]].isDead()){
        player.myCreatures[player.myCombatCreatures[x]].die();
        counter++;
      }
    }

    if(counter == player.myCombatCreatures.length){
      console.log("ALL ALLIES ARE DAED");
      return true;
    }
    else{
      console.log("Still going!");
      return false;
    }

  }//end areWeDeadYet()

  //////////////////////////////////////////////////////////////////////////////
  //  Placeholder function to check if all enemies are dead.
  //////////////////////////////////////////////////////////////////////////////
  areTheyDeadYet(){
    console.log();
    var counter = 0;
    enemyCreatures.forEach((Creature) => {if(Creature.isDead()) counter++});
    //console.log(counter + " dead out of " + enemyCreatures.length);
    if(counter == enemyCreatures.length){
      return true;
    }
    else{
      return false;
    }

  }//end areTheyDeadYet()


  //////////////////////////////////////////////////////////////////////////////
  //  Sets the waitingFunction variable to [-1, -1] to indicate there is no waiting function
  //////////////////////////////////////////////////////////////////////////////
  clearWaitingFunction(){
    this.waitingFunction = [-1, -1];
  }//end clearWaitingFunction()

  //////////////////////////////////////////////////////////////////////////////
  //  Checks all creatures in combat for status conditions
  //////////////////////////////////////////////////////////////////////////////
  checkCreatureStatuses(){
    var needRedraw = false;

    for(var x = 0; x < player.myCombatCreatures.length; x++){
      if(player.myCreatures[player.myCombatCreatures[x]].isBloodied()){
        needRedraw = true;
        console.log("wounds");
        myCombatScreen.drawWounds(myCombatScreen.unitBarWidth + 50 + (150*Math.floor(x/3)), 50+(150*(x%3)));
      }
    }

    //Check all enemies second
    for(var x = 0; x < enemyCreatures.length; x++){
      if(enemyCreatures[x].isBloodied()){
        needRedraw = true;
        myCombatScreen.drawWounds(myCombatScreen.unitBarWidth + 750 - (150*Math.floor(x/3)), 50+(150*(x%3)));
      }
    }

    return needRedraw;
  }//end checkCreatureStatuses()

  //////////////////////////////////////////////////////////////////////////////
  // Pass in creature Object and execute the waiting skill upon the given target
  //////////////////////////////////////////////////////////////////////////////
  executeSkill(target){
    if(player.myCreatures[ player.myCombatCreatures[this.waitingFunction[0]] ].currentSpirit >= masterSkillList[this.waitingFunction[1]].cost){
      masterSkillList[this.waitingFunction[1]].function(player.myCreatures[player.myCombatCreatures[this.waitingFunction[0]]], target);
      player.myCreatures[player.myCombatCreatures[this.waitingFunction[0]]].learnSkill(this.waitingFunction[1]);
      player.myCreatures[player.myCombatCreatures[this.waitingFunction[0]]].hasAction = false;
      player.myCreatures[player.myCombatCreatures[this.waitingFunction[0]]].removeSpirit(masterSkillList[this.waitingFunction[1]].cost);

    }
    else{
      this.displayMessage = (player.myCreatures[player.myCombatCreatures[this.waitingFunction[0]]].name + " does not have enough Spirit for that skill!");
      myCombatScreen.printMessageBar(this.displayMessage);
    }
    this.clearWaitingFunction();
  }//end executeSkill()

  //////////////////////////////////////////////////////////////////////////////
  //  Called when a friendly unit is clicked to determine if they should be selected or have a skill acted upon them
  //////////////////////////////////////////////////////////////////////////////
  selectFriendlyUnit(unitNum){

    if(unitNum < player.myCombatCreatures.length){
      //If there is a waiting defensive skill, we act upon it
      if(this.waitingFunction[0] != -1 && masterSkillList[this.waitingFunction[1]].target == 3){
        //execute stored skill
        this.executeSkill(player.myCreatures[player.myCombatCreatures[unitNum]]);
        this.clearWaitingFunction();
      }
      //If there is no waiting defensive skill, we select the friendly unit
      else{
        this.clearWaitingFunction();
        this.selectedAlly = unitNum;
        console.log("Selected unit number: " + unitNum + ", Name: " + player.myCreatures[player.myCombatCreatures[unitNum]].name);
      }
    }
  }// end selectFriendlyUnit()

  //////////////////////////////////////////////////////////////////////////////
  //  Called when an enemy unit is clicked to determine if they should be acted upon
  //////////////////////////////////////////////////////////////////////////////
  selectEnemyUnit(unitNum){
    console.log("Clicked enemy: " + unitNum);
    //If there is a waiting offesnive skill, we act upon it
    if(this.waitingFunction[0] != -1 && masterSkillList[this.waitingFunction[1]].target == 4){
      this.executeSkill(enemyCreatures[unitNum]);
      this.clearWaitingFunction();
      //this.update();
      //myCombatScreen.updateScreen(1,1,0);
    }
    //If there is no waiting offesnive skill, we do nothing

  }// end selectEnemyUnit()

  //////////////////////////////////////////////////////////////////////////////
  //  Called when a click occurs in the combatField
  //////////////////////////////////////////////////////////////////////////////
  combatFieldClickHandler(){
    //First, check that the click was in the two that hold allied
    if(this.clickedField[1] == 1 || this.clickedField[1] == 2){
      //We check the clicked slot has a friendly unit in it
      if(player.myCombatCreatures.length >= this.clickedField[2] - 1 + (3 * (this.clickedField[1]-1))){
        //If the click is in a valid square containing an ally, we call selectFriendlyUnit() and pass the unit number to that function
        this.selectFriendlyUnit((this.clickedField[2] - 1 + (3 * (this.clickedField[1]-1) ) ) - 1);

      }
      //If the click is in a spot that COULD contain an ally, but doesn't
      else{
        console.log("Not enough allies.");
      }
    }
    else{//Through process of elimination, we know the only remaining columns are the enemy columns
      if(enemyCreatures.length >= this.clickedField[2] - 1 + (3 * (5-this.clickedField[1]))){
        //console.log("Enemyy unit: " + (this.clickedField[2] - 1 + (3 * (5-this.clickedField[1]))) );
        this.selectedEnemy = (this.clickedField[2] - 1 + (3 * (5-this.clickedField[1])) - 1);

        this.selectEnemyUnit(this.selectedEnemy);
        //this.checkWaitingFunction(this.selectEnemy);
      }
      else{//If the click is in a spot that COULD contain an enemy, but doesn't
        console.log("Not enough enemies.");
      }
    }
  }//end combatFieldClickHandler()



  //////////////////////////////////////////////////////////////////////////////
  //  Ends the player's turn
  //////////////////////////////////////////////////////////////////////////////
  endTurn(){

    //Disable button if expanded message bar is on screen
    if(myCombatScreen.drawExpandedMessageBar){
      return;
    }

    console.log("Turn ended!");
    player.isPlayerTurn = false;
    combatLogi.beginEnemyTurn();
    //myCombatScreen.updateScreen(1,1,1);
  }//end endTurn()

  //////////////////////////////////////////////////////////////////////////////
  //  Update function runs after every action is taken
  //////////////////////////////////////////////////////////////////////////////
  update(){

    //Checks flag for end of combat
    if(this.checkforCombatEnd()[0]){
      //If combat has ended, notify the Player and display the combat log
      myCombatScreen.printMessageBar(this.displayMessage);
      this.toggleCombatLog();

      myCombatScreen.updateScreen(1,1,1);

      //Check if the Player won
      if(this.checkforCombatEnd()[1]){
        setTimeout(function() {
          combatLogi.giveEquipmentBonuses();
          combatLogi.drawDroppedItemWindow();
        }, 100);

        //Each friendly unit has their age increased by 1 for each combat won
        for(let x = 0; x < player.myCombatCreatures.length; x++){
          player.myCreatures[player.myCombatCreatures[x]].ageUp();
        }
      }
      this.endCombat();
      return;
    }

    myCombatScreen.updateScreen(1,1,1);

  }//end update()

  //////////////////////////////////////////////////////////////////////////////
  // At the end of combat, give each friendly unit their deserved stat bonuses from their equipment
  //////////////////////////////////////////////////////////////////////////////
  giveEquipmentBonuses(){

    for(let x = 0; x < player.myCombatCreatures.length; x++){
        for(let y = 0; y < 4; y++){
          //check that the each organ provides stats
          //console.log(masterInventoryList[y][player.myCreatures[player.myCombatCreatures[x]].myInventory[y]]);
          if(masterInventoryList[y][player.myCreatures[player.myCombatCreatures[x]].myInventory[y]].buff){
            console.log(masterInventoryList[y][player.myCreatures[player.myCombatCreatures[x]].myInventory[y]].buff);
            if(player.myCreatures[player.myCombatCreatures[x]].progressStat(
              masterInventoryList[y][player.myCreatures[player.myCombatCreatures[x]].myInventory[y]].buff[0],
              masterInventoryList[y][player.myCreatures[player.myCombatCreatures[x]].myInventory[y]].buff[1] + 1)){
                  this.increasedStats.push(player.myCreatures[player.myCombatCreatures[x]].name + ": +1 " + statList[masterInventoryList[y][player.myCreatures[player.myCombatCreatures[x]].myInventory[y]].buff[0]]);
            }

          }
        }
    }

  }//end giveEquipmentBonuses()

  //////////////////////////////////////////////////////////////////////////////
  //  Function is called when combat has ended for any reason
  //////////////////////////////////////////////////////////////////////////////
  endCombat(){



    this.activeCombat = false;

    myCombatScreen.updateScreen(1,1,1);

    for(var x = 0; x < player.myCombatCreatures.length; x++){
      player.myCreatures[player.myCombatCreatures[x]].removeAllBuffs();
    }

  }//end endCombat()

  //////////////////////////////////////////////////////////////////////////////
  //  Base function that handles all events taking place during the enemy's turn
  //////////////////////////////////////////////////////////////////////////////
  beginEnemyTurn(){

    //Itterate through each enemy Creature
    for(var x = 0; x < enemyCreatures.length; x++){
      if(this.activeCombat){
        if(this.areWeDeadYet()){
          return;
        }
        //Create array of valid player-controlled targets
        this.validTargets = [];
        //Ensure the current enemy isn't dead
        if(enemyCreatures[x].isDead() == false){
          //Itterate through all player-controlled units to see which are alive
          for(var y = 0; y < player.myCombatCreatures.length; y++){
            if(player.myCreatures[player.myCombatCreatures[y]].isDead() == false){
              console.log(player.myCreatures[player.myCombatCreatures[y]].name + " is alive!");
              //Add all living player-controlled units to a list of valid targets
              this.validTargets.push(player.myCombatCreatures[y]);
            }
            else{
              console.log(player.myCreatures[player.myCombatCreatures[y]].name + " is dead!");
            }
          }
          //Have AI pick a target from the list of valid targets
          this.target = combatLogi.newAI.list[enemyCreatures[x].temperment][1](this.validTargets);
          masterSkillList[1].function(enemyCreatures[x], player.myCreatures[this.validTargets[this.target]]);
        }
      }
    }
    this.endEnemyTurn();

  }//end beginEnemyTurn()

  //////////////////////////////////////////////////////////////////////////////
  //  Ends the enemy turn
  //////////////////////////////////////////////////////////////////////////////
  endEnemyTurn(){
    player.myCreatures.forEach(Creature => Creature.hasAction = true);
    //this.update();
    //myCombatScreen.updateScreen(1,1,1);
    this.checkforCombatEnd()[0];
  }//end beginEnemyTurn()

  //////////////////////////////////////////////////////////////////////////////
  //  Player flees combat
  //////////////////////////////////////////////////////////////////////////////
  runAway(){

    for(var x = 0; x < player.myCombatCreatures.length; x++){
      player.myCreatures[player.myCombatCreatures[x]].removeAllBuffs ();
    }
    //Disable button if expanded message bar is on screen
    if(myCombatScreen.drawExpandedMessageBar){
      return;
    }

    this.malachiteLost = Math.ceil(player.malachite/10);

    console.log("Run away!");

    player.malachite -= this.malachiteLost;

    setGameMode(5);

    dialogueWindow.init(  ["You escaped that encounter, but lost " + this.malachiteLost + " malachite in the process."
                          ],
                          [],
                          200, 100, 1250, 280, false);

  }//end runAway()

  //////////////////////////////////////////////////////////////////////////////
  //  Function is called when a skill button is pressed
  //////////////////////////////////////////////////////////////////////////////
  skillButtonPress(skillNum){

    //If the expanded combat dialogue is visible, the skill buttons are disabled
    if(myCombatScreen.drawExpandedMessageBar){
      return;
    }

    //If another skill is clicked, we clear whatever other skill is waiting
    this.clearWaitingFunction();

    //If the unit does not have any actions left this round, then we do not allow them to act
    if(player.myCreatures[player.myCombatCreatures[this.selectedAlly]].canAct() == false){
      if(player.myCreatures[player.myCombatCreatures[this.selectedAlly]].isDead()){
        this.displayMessage = (player.myCreatures[player.myCombatCreatures[this.selectedAlly]].name + " is dead, and cannot act :'(");
        myCombatScreen.printMessageBar(this.displayMessage);
      }
      else if (player.myCreatures[player.myCombatCreatures[this.selectedAlly]].hasAction == false) {
        this.displayMessage = (player.myCreatures[player.myCombatCreatures[this.selectedAlly]].name + " has already acted this round, and cannot act again");
        myCombatScreen.printMessageBar(this.displayMessage);
      }
      return;
    }

    //First, we check that the unit has enough Spirit to use the selected ability
    if(player.myCreatures[player.myCombatCreatures[this.selectedAlly]].currentSpirit >= masterSkillList[player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].skillList[skillNum]].cost){
      switch(masterSkillList[player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].skillList[skillNum]].target){
        //Skill requires a target and is then stored
        case 4: case 3:
        //We store the unit number and skill number for the skill waiting for a target to be selected
        combatLogi.waitingFunction = [this.selectedAlly, player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].skillList[skillNum]];
        console.log(masterSkillList[player.myCreatures[player.myCombatCreatures[this.selectedAlly]].skillList[skillNum]].name + " stored for " + player.myCreatures[player.myCombatCreatures[this.selectedAlly]].name);
        //Spirit is not spent until the skill is actually used.
        break;

        case 0:
          //This is reserved for clicking a button with no skill attached to it
        break;

        //Skill does not require a target and is executed immediately
        case 1: case 2: case 5: case 6: case 7:
          //Now we execute the skill, and decrement the unit's Spirit accordingly
          masterSkillList[player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].skillList[skillNum]].function(player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]]);
          player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].learnSkill(player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].skillList[skillNum]);
          player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].removeSpirit(masterSkillList[player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].skillList[skillNum]].cost);
          //We note that the unit has acted this round
          player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].hasAction = false;
          //Update the Unit Bar to reflect the Spirit spent
          //this.update();
          //myCombatScreen.updateScreen(1,0,0);
          //If any unit died or is now bloodied, we redraw the Combat Field too
          /*
          if(this.checkCreatureStatuses()){
            myCombatScreen.updateScreen(0,0,1);
          }*/
        //Clear the waiting function
        this.clearWaitingFunction();
        break;
      }
    }
    //If the unit does not have enough Spirit, we do nothing.
    else{
      this.displayMessage = (player.myCreatures[player.myCombatCreatures[this.selectedAlly]].name + " does not have enough Spirit for that skill!");
      myCombatScreen.printMessageBar(this.displayMessage);
      console.log("Not enough spirit!")
    }

  }//end skillButtonPress()


  //////////////////////////////////////////////////////////////////////////////
  //  Creature skill in slot 1
  //////////////////////////////////////////////////////////////////////////////
  skill1(){
    combatLogi.skillButtonPress(0);
  }//end skill1()

  //////////////////////////////////////////////////////////////////////////////
  //  Creature skill in slot 2
  //////////////////////////////////////////////////////////////////////////////
  skill2(){
    combatLogi.skillButtonPress(1);
  }//end skill2()

  //////////////////////////////////////////////////////////////////////////////
  //  Creature skill in slot 3
  //////////////////////////////////////////////////////////////////////////////
  skill3(){
    combatLogi.skillButtonPress(2);
  }//end skill2()

  //////////////////////////////////////////////////////////////////////////////
  //  Creature skill in slot 4
  //////////////////////////////////////////////////////////////////////////////
  skill4(){
    combatLogi.skillButtonPress(3);
  }//end skill4()

  //////////////////////////////////////////////////////////////////////////////
  //  Function opens combat log
  //////////////////////////////////////////////////////////////////////////////
  toggleCombatLog(){
    console.log("Combat log opened!");
    //Toggle whether the expanded message bar is visible
    myCombatScreen.drawExpandedMessageBar = !myCombatScreen.drawExpandedMessageBar;
    //Prompt the message bar to be drawn or drawn over
    myCombatScreen.printMessageBar(false);
  }//end toggleCombatLog()

  //////////////////////////////////////////////////////////////////////////////
  //  Function opens item selection screen in combat
  //////////////////////////////////////////////////////////////////////////////
  useItem(){
    //First, we check to see if the unit has an Item equipped
    if(player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].myItem!=0){
      //Display message announcing that the unit has used their item
      this.displayMessage = player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].name +
                            " uses " +
                            items[player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].myItem].name +
                            "!";
      //this.displayMessage = player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].name + " uses " + items.list[player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].myItem][1] + "!";
      myCombatScreen.printMessageBar(this.displayMessage);
      //Execute the items associated function
      items[player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].myItem].function(player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]]);
      //items.list[player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].myItem][2](player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]]);
      console.log("Using equipped item!");
      //Remove the item from the unit, and update the screen
      player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].myItem = 0;
      //myCombatScreen.updateScreen(1,1,1);
    }
    else{
      //If the unit does not have an equipped item, we display a message, and nothing else
      this.displayMessage = player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].name + " does not have an item equipped!";
      myCombatScreen.printMessageBar(this.displayMessage);
    }
    combatLogi.update();
  }//end useItem()

  //////////////////////////////////////////////////////////////////////////////
  //  To be used to handle all click events when in the game's combat screen
  //////////////////////////////////////////////////////////////////////////////
  combatClickHandler(clickPositionX,clickPositionY){

    this.clickedcreatureType = null;

    //First, check if combat is still active, if not the click will return to world map
    if(this.activeCombat == false){
      console.log("COMBAT HAS COME TO AN END!!!!!!!!!!!!!!!");
      setGameMode(5);

    }
    //First, check if the click was in the Control Bar at the bottom of the screen
    else{
      if(clickPositionY >= (canvas.height - myCombatScreen.controlBarHeight)){
        this.clickedField = [1, 0, 0];
        /*      Control Bar Column Description
        The Control Bar is broken into 9 columns, the first being the blank space
        before the first buttons, the next column has a pair of buttons, with that
        pattern repeating until the final column. Actions are only taken if the
        click is in column with buttons.
        */
        if(clickPositionX < 20){//First blank column
          this.clickedField[1] = 0;
        }
        else if(clickPositionX < 220){//Combat log/item buttons
          this.clickedField[1] = 1;
        }
        else if(clickPositionX < 245){//Second blank column
          this.clickedField[1] = 0;
        }
        else if(clickPositionX < 645){//First column of skill buttons
          this.clickedField[1] = 3;
        }
        else if(clickPositionX < 655){//Middle blank column
          this.clickedField[1] = 0;
        }
        else if(clickPositionX < 1055){//Second column of skill buttons
          this.clickedField[1] = 5;
        }
        else if(clickPositionX < 1080){//Fourth blank colmun
          this.clickedField[1] = 0;
        }
        else if(clickPositionX < 1180){//End/run buttons
          this.clickedField[1] = 7;
        }
        else{//The last blank column on the right
          this.clickedField[1] = 0;
        }

        /*      Control Bar Row Description
        The Control Bar is broken into 5 rows, the first being the blank space
        before the first buttons, the next row has buttons, with that pattern
        repeating until the final row. Actions are only taken if the click is in
        row with buttons.
        */
        if(clickPositionY < canvas.height - myCombatScreen.controlBarHeight + 20){//First blank row
          this.clickedField[2] = 0;
        }
        else if(clickPositionY < canvas.height - myCombatScreen.controlBarHeight + 120){//First button row
          this.clickedField[2] = 1;
        }
        else if(clickPositionY < canvas.height - myCombatScreen.controlBarHeight + 130){//Second blank row
          this.clickedField[2] = 0;
        }
        else if(clickPositionY < canvas.height - myCombatScreen.controlBarHeight + 230){//Second button row
          this.clickedField[2] = 3;
        }
        else{//The last blank row, on the bottom
          this.clickedField[2] = 0;
        }

        //If the click location is the "RUN AWAY" button, we return in order to
        //avoid the combat screen being written over the world map
        if(this.clickedField[1] == 7 && this.clickedField[2] == 3){
          this.controlBarFunctions[10 * this.clickedField[1] + this.clickedField[2]]();
          return;
        }
        //if the click corresponds to a valid button location, call upon the corresponding function
        else if(this.clickedField[1] != 0 && this.clickedField[2] != 0){
          console.log()
          this.controlBarFunctions[10 * this.clickedField[1] + this.clickedField[2]]();
        }

      }
      //Next check if the click was in the Unit bar on the left of the screen
      else if(clickPositionX < myCombatScreen.unitBarWidth){
        this.clickedField = [2, 0, Math.floor(clickPositionY/90)];

        if(this.waitingFunction[0] != -1 && masterSkillList[this.waitingFunction[1]].target == 3){
          //If we clicked on an ally, and the waiting function targets an ally
          console.log("Checking waiting function. " + Math.floor(clickPositionY/90));
          this.selectFriendlyUnit(Math.floor(clickPositionY/90));
        }
        else{
          this.selectFriendlyUnit(Math.floor(clickPositionY/90));
        }

      }
      //If the click was not in either of the bars, it must be in the Combat Field
      else{
        /*      Combat Screen Column Description
        The Combat Field is broken into 7 columns, the first being the blank space
        before the friendly units arrive, the next two columns are where the
        friendly units sit, the fourth is the DMZ between friendlies and enemies,
        the fifth and sixth are where enemy units sit, and the last in the blank
        spaced on the right of the screen. We only act if the click in in the 2nd,
        3rd, 5th, or 6th columns, all other inputs are useless.
        */
        this.clickedField = [3, 0, 0];
        if(clickPositionX >= myCombatScreen.unitBarWidth + 50 && clickPositionX < myCombatScreen.unitBarWidth + 200){//Column 1
          this.clickedField[1] = 1;
        }
        else if(clickPositionX >= myCombatScreen.unitBarWidth + 200 && clickPositionX < myCombatScreen.unitBarWidth + 350){//Column 2
          this.clickedField[1] = 2;
        }
        else if(clickPositionX >= myCombatScreen.unitBarWidth + 600 && clickPositionX < myCombatScreen.unitBarWidth + 750){//Column 4
          this.clickedField[1] = 4;
        }
        else if(clickPositionX >= myCombatScreen.unitBarWidth + 750 && clickPositionX < myCombatScreen.unitBarWidth + 900){//Column 5
          this.clickedField[1] = 5;
        }
        else{
          //click is in a blank column
          this.clickedField[1] = 0;
        }

        /*      Combat Screen Row Description
        The Combat Field is broken into 5 rows, the first being the blank space at
        the top of the screen, the next three rows are where the friendly and
        enemy units sit, the fifth row is the blank space at the bottom of the
        screen. We only act if the click in in the 3rd, 4th, or 5th rows, all
        other inputs are useless.
        */
        if(clickPositionY  >= 50 && clickPositionY < 200){//row 2
          //click is in row 2
          this.clickedField[2] = 2;
        }
        else if(clickPositionY >= 200 && clickPositionY < 350){//row 3
          //click is in row 3
          this.clickedField[2] = 3;
        }
        else if(clickPositionY >= 350 && clickPositionY < 500){//row 4
          //click is in row 4
          this.clickedField[2] = 4;
        }
        else{
          //click is in a blank row
          this.clickedField[2] = 0;
        }
        this.combatFieldClickHandler();
      }

      this.update();
    }

  }// end combatClickHandler()

  //////////////////////////////////////////////////////////////////////////////
  //  Checks waiting function and acts upon it
  //////////////////////////////////////////////////////////////////////////////
  checkWaitingFunction(){
    console.log("checkWaitingFunction() " + masterSkillList[combatLogi.waitingFunction[1]].target);
    switch(masterSkillList[combatLogi.waitingFunction[1]].target){
      case 4: //targets enemy
      combatLogi.waitingFunction = [player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]], player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].skillList[2][0]];
      console.log(player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].skillList[2][0] + " to " + combatLogi.waitingFunction[1]);
      console.log(player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].skillList[2][2] + " stored.");
      break;

      case 3: //targets ally
        console.log(player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].skillList[2][0] + " t3o " + combatLogi.waitingFunction[1]);
        masterSkillList[combatLogi.waitingFunction[1]].function(player.myCreatures[player.myCombatCreatures[combatLogi.waitingFunction[0]]], player.myCreatures[player.myCombatCreatures[target]]);
      break;


      case 1: case 2: case 5: case 6: case 7: //happens automatically (no target needed)
      player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].skillList[2][1](player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]]);
      break;

    }

    //console.log(skills.skillList[0][1](player.myCreatures[this.selectedAlly], enemyCreatures[this.selectedEnemy]));
    masterSkillList[this.waitingFunction[1]].function(player.myCreatures[player.myCombatCreatures[this.selectedAlly]], enemyCreatures[this.selectedEnemy]);
    //skills.skillAttack(player.myCreatures[this.selectedAlly], enemyCreatures[this.selectedEnemy]);
    this.clearWaitingFunction();
    //this.update();
    //myCombatScreen.updateScreen(1,0,1);
  }//end checkWaitingFunction()


}//end CombatLogic
