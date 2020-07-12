//Written by Wyatt Dorn

class CombatLogic{


  constructor(){
    this.init();
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
    this.controlBarFunctions[11] = this.openMenu;
    this.controlBarFunctions[13] = this.useItem;
    this.controlBarFunctions[31] = this.skill1;
    this.controlBarFunctions[33] = this.skill3;
    this.controlBarFunctions[51] = this.skill2;
    this.controlBarFunctions[53] = this.skill4;
    this.controlBarFunctions[71] = this.endTurn;
    this.controlBarFunctions[73] = this.runAway;

    this.displayMessage = "COMBAT HAS BEGUN!";

    this.newAI = new enemyAI();

  }//end init()


  //////////////////////////////////////////////////////////////////////////////
  //  Set of functions to be run once combat has begun
  //////////////////////////////////////////////////////////////////////////////
  beginCombat(){
    myCombatScreen.printMessageBar(this.displayMessage);
  }//end beginCombat()

  //////////////////////////////////////////////////////////////////////////////
  //  Check if either team has been killed completely
  //////////////////////////////////////////////////////////////////////////////
  checkforCombatEnd(){
    if(this.areWeDeadYet()){
      this.displayMessage = "All allied units are dead, combat is ended. (Click anywhere to exit)";
      myCombatScreen.printMessageBar(this.displayMessage);
      console.log("ALL ALLIES DEAD");
      return true;
    }

    if(this.areTheyDeadYet()){
      this.displayMessage = "All enemies units are dead. You win! (Click anywhere to exit)";
      myCombatScreen.printMessageBar(this.displayMessage);
      console.log("ALL ENEMIES DEAD");
      return true;
    }

    return false;
  }//end checkforCombatEnd()

  //////////////////////////////////////////////////////////////////////////////
  //  Placeholder function to check if all allies are dead.
  //////////////////////////////////////////////////////////////////////////////
  areWeDeadYet(){
    console.log();
    var counter = 0;
    for(var x = 0; x < player.myCombatCreatures.length; x++){
      if(player.myCreatures[player.myCombatCreatures[x]].isDead()){
        player.myCreatures[player.myCombatCreatures[x]].die();
        counter++;
      }
    }
    //player.myCombatCreatures.forEach(element => {if(Creature.isDead()){ Creature.die(); counter++;}});
    //console.log(counter + " dead out of " + player.myCombatCreatures.length);
    if(counter == player.myCombatCreatures.length){
      return true;
    }
    else{
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
        myCombatScreen.drawWounds(unitBarWidth + 50 + (150*Math.floor(x/3)), 50+(150*(x%3)));
      }
    }

    //Check all enemies second
    for(var x = 0; x < enemyCreatures.length; x++){
      if(enemyCreatures[x].isBloodied()){
        needRedraw = true;
        myCombatScreen.drawWounds(unitBarWidth + 750 - (150*Math.floor(x/3)), 50+(150*(x%3)));
      }
    }

    return needRedraw;
  }//end checkCreatureStatuses()

  /*
  //////////////////////////////////////////////////////////////////////////////
  //  To be called when combat begins to draw "wounds" on all units starting combat wounded.
  //////////////////////////////////////////////////////////////////////////////
  checkForWounds(){
    //Check all allies first
    for(var x = 0; x < player.myCreatures.length; x++){
      if(player.myCreatures[x].currentHP <= (player.myCreatures[x].maxHP/2)){
        console.log("wounds");
        myCombatScreen.drawWounds(unitBarWidth + 50 + (150*Math.floor(x/3)), 50+(150*(x%3)));
      }
    }

    //Check all enemies second
    for(var x = 0; x < enemyCreatures.length; x++){
      if(enemyCreatures[x].currentHP <= (enemyCreatures[x].maxHP/2)){
        myCombatScreen.drawWounds(unitBarWidth + 750 - (150*Math.floor(x/3)), 50+(150*(x%3)));
      }
    }
  }//end checkForWounds()
  */

  //////////////////////////////////////////////////////////////////////////////
  // Pass in creature Object and execute the waiting skill upon the given target
  //////////////////////////////////////////////////////////////////////////////
  executeSkill(target){
    if(player.myCreatures[ player.myCombatCreatures[this.waitingFunction[0]] ].currentSpirit >= skills.skillList[this.waitingFunction[1]][6]){
      skills.skillList[this.waitingFunction[1]][1](player.myCreatures[player.myCombatCreatures[this.waitingFunction[0]]], target);
      player.myCreatures[player.myCombatCreatures[this.waitingFunction[0]]].learnSkill(this.waitingFunction[1]);
      player.myCreatures[player.myCombatCreatures[this.waitingFunction[0]]].hasAction = false;
      //this.update();
      /*
      if(this.checkCreatureStatuses()){
        myCombatScreen.updateScreen(1,0,1);
      }*/
      player.myCreatures[player.myCombatCreatures[this.waitingFunction[0]]].removeSpirit(skills.skillList[this.waitingFunction[1]][6]);

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
      if(this.waitingFunction[0] != -1 && skills.skillList[this.waitingFunction[1]][3] == 3){
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
      //this.update();
      //myCombatScreen.updateScreen(1,1,0);
    }
  }// end selectFriendlyUnit()

  //////////////////////////////////////////////////////////////////////////////
  //  Called when an enemy unit is clicked to determine if they should be acted upon
  //////////////////////////////////////////////////////////////////////////////
  selectEnemyUnit(unitNum){
    console.log("Clicked enemy: " + unitNum);
    //If there is a waiting offesnive skill, we act upon it
    if(this.waitingFunction[0] != -1 && skills.skillList[this.waitingFunction[1]][3] == 4){
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
    console.log("Turn ended!");
    player.isPlayerTurn = false;
    combatLogi.beginEnemyTurn();
    //myCombatScreen.updateScreen(1,1,1);
  }//end endTurn()

  //////////////////////////////////////////////////////////////////////////////
  //  Update function runs after every action is taken
  //////////////////////////////////////////////////////////////////////////////
  update(){

    if(this.checkforCombatEnd()){
      this.endCombat();
    }

    myCombatScreen.updateScreen(1,1,1);

  }//end update()

  //////////////////////////////////////////////////////////////////////////////
  //  Function is called when combat has ended for any reason
  //////////////////////////////////////////////////////////////////////////////
  endCombat(){

    this.activeCombat = false;

    myCombatScreen.updateScreen(1,1,1);

  }//end endCombat()

  //////////////////////////////////////////////////////////////////////////////
  //  Base function that handles all events taking place during the enemy's turn
  //////////////////////////////////////////////////////////////////////////////
  beginEnemyTurn(){

    //Itterate through each enemy Creature
    for(var x = 0; x < enemyCreatures.length; x++){
      if(this.activeCombat){
        //Create array of valid player-controlled targets
        this.validTargets = [];
        console.log(this.validTargets.length);
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
          console.log(this.validTargets);
          console.log(this.target);
          skills.skillList[1][1](enemyCreatures[x], player.myCreatures[player.myCombatCreatures[this.target]]);
        }
        //this.update();
        console.log(this.validTargets.length);
      }
    }
    this.endEnemyTurn();


/*



    this.displayMessage = "The enemy moves in to position.";
    myCombatScreen.printMessageBar(this.displayMessage);

    for(var x = 0; x < enemyCreatures.length; x++){

      //Ensure there are living allies to hit
      if(this.checkforCombatEnd()){
        //this.endEnemyTurn();
        return;
      }

      //Only allow enemy unit to attack it it is not dead
      if(enemyCreatures[x].isDead()==false){
        //temporary variable to store random value
        var temp;
        //target random allied creature, if that creature is already dead, pick a new one
        do{
          temp = combatLogi.newAI.antimage();
          console.log("temp: " + temp);
        }while(player.myCreatures[player.myCombatCreatures[temp]].isDead()==true);

        console.log("AN ATTACK HAS BEEN MADE!");
        skills.skillList[1][1](enemyCreatures[x], player.myCreatures[player.myCombatCreatures[temp]]);
      }
    }
    */

  }//end beginEnemyTurn()

  //////////////////////////////////////////////////////////////////////////////
  //  Ends the enemy turn
  //////////////////////////////////////////////////////////////////////////////
  endEnemyTurn(){
    player.myCreatures.forEach(Creature => Creature.hasAction = true);
    //this.update();
    //myCombatScreen.updateScreen(1,1,1);
    this.checkforCombatEnd();
  }//end beginEnemyTurn()

  //////////////////////////////////////////////////////////////////////////////
  //  Player flees combat
  //////////////////////////////////////////////////////////////////////////////
  runAway(){
    console.log("Run away!");
    setGameMode(5);
  }//end runAway()

  //////////////////////////////////////////////////////////////////////////////
  //  Function is called when a skill button is pressed
  //////////////////////////////////////////////////////////////////////////////
  skillButtonPress(skillNum){
    console.log("skillButtonPressed()");
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
    if(player.myCreatures[player.myCombatCreatures[this.selectedAlly]].currentSpirit >= skills.skillList[player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].skillList[skillNum]][6]){
      switch(skills.skillList[player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].skillList[skillNum]][3]){
        //Skill requires a target and is then stored
        case 4: case 3:
        //We store the unit number and skill number for the skill waiting for a target to be selected
        combatLogi.waitingFunction = [this.selectedAlly, player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].skillList[skillNum]];
        console.log(skills.skillList[player.myCreatures[player.myCombatCreatures[this.selectedAlly]].skillList[skillNum]][2] + " stored for " + player.myCreatures[player.myCombatCreatures[this.selectedAlly]].name);
        //Spirit is not spent until the skill is actually used.
        break;

        case 0:
          //This is reserved for clicking a button with no skill attached to it
        break;

        //Skill does not require a target and is executed immediately
        case 1: case 2: case 5: case 6: case 7:
          //Now we execute the skill, and decrement the unit's Spirit accordingly
          skills.skillList[player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].skillList[skillNum]][1](player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]]);
          player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].learnSkill(player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].skillList[skillNum]);
          player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].removeSpirit(skills.skillList[player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].skillList[skillNum]][6]);
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
  }//end openMenu()

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
  //  Function opens menu in combat -TO BE COMPLETED-
  //////////////////////////////////////////////////////////////////////////////
  openMenu(){
    this.displayMessage = "Opening options menu.";
    myCombatScreen.printMessageBar(this.displayMessage);
    console.log("Menu opened!");
  }//end openMenu()

  //////////////////////////////////////////////////////////////////////////////
  //  Function opens item selection screen in combat
  //////////////////////////////////////////////////////////////////////////////
  useItem(){
    //First, we check to see if the unit has an Item equipped
    if(player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].myItem!=0){
      //Display message announcing that the unit has used their item
      this.displayMessage = player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].name + " uses " + items.list[player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].myItem][1] + "!";
      myCombatScreen.printMessageBar(this.displayMessage);
      //Execute the items associated function
      items.list[player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].myItem][2](player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]]);
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
      if(clickPositionY >= (canvas.height - controlBarHeight)){
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
        else if(clickPositionX < 220){//Menu/item buttons
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
        if(clickPositionY < canvas.height - controlBarHeight + 20){//First blank row
          this.clickedField[2] = 0;
        }
        else if(clickPositionY < canvas.height - controlBarHeight + 120){//First button row
          this.clickedField[2] = 1;
        }
        else if(clickPositionY < canvas.height - controlBarHeight + 130){//Second blank row
          this.clickedField[2] = 0;
        }
        else if(clickPositionY < canvas.height - controlBarHeight + 230){//Second button row
          this.clickedField[2] = 3;
        }
        else{//The last blank row, on the bottom
          this.clickedField[2] = 0;
        }

        //if the click corresponds to a valid button location, call upon the corresponding function
        if(this.clickedField[1] != 0 && this.clickedField[2] != 0){
          this.controlBarFunctions[10 * this.clickedField[1] + this.clickedField[2]]();
        }

      }
      //Next check if the click was in the Unit bar on the left of the screen
      else if(clickPositionX < unitBarWidth){
        this.clickedField = [2, 0, Math.floor(clickPositionY/90)];

        if(this.waitingFunction[0] != -1 && skills.skillList[this.waitingFunction[1]][3] == 3){
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
        if(clickPositionX >= unitBarWidth + 50 && clickPositionX < unitBarWidth + 200){//Column 1
          this.clickedField[1] = 1;
        }
        else if(clickPositionX >= unitBarWidth + 200 && clickPositionX < unitBarWidth + 350){//Column 2
          this.clickedField[1] = 2;
        }
        else if(clickPositionX >= unitBarWidth + 600 && clickPositionX < unitBarWidth + 750){//Column 4
          this.clickedField[1] = 4;
        }
        else if(clickPositionX >= unitBarWidth + 750 && clickPositionX < unitBarWidth + 900){//Column 5
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
    console.log("checkWaitingFunction() " + skills.skillList[combatLogi.waitingFunction[1]][3]);
    switch(skills.skillList[combatLogi.waitingFunction[1]][3]){
      case 4: //targets enemy
      combatLogi.waitingFunction = [player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]], player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].skillList[2][0]];
      console.log(player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].skillList[2][0] + " to " + combatLogi.waitingFunction[1]);
      console.log(player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].skillList[2][2] + " stored.");
      break;

      case 3: //targets ally
        console.log(player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].skillList[2][0] + " t3o " + combatLogi.waitingFunction[1]);
        skills.skillList[combatLogi.waitingFunction[1]][1](player.myCreatures[player.myCombatCreatures[combatLogi.waitingFunction[0]]], player.myCreatures[player.myCombatCreatures[target]]);
      break;


      case 1: case 2: case 5: case 6: case 7: //happens automatically (no target needed)
      player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].skillList[2][1](player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]]);
      break;

    }

    //console.log(skills.skillList[0][1](player.myCreatures[this.selectedAlly], enemyCreatures[this.selectedEnemy]));
    skills.skillList[this.waitingFunction[1]][1](player.myCreatures[player.myCombatCreatures[this.selectedAlly]], enemyCreatures[this.selectedEnemy]);
    //skills.skillAttack(player.myCreatures[this.selectedAlly], enemyCreatures[this.selectedEnemy]);
    this.clearWaitingFunction();
    //this.update();
    //myCombatScreen.updateScreen(1,0,1);
  }//end checkWaitingFunction()


}//end CombatLogic
