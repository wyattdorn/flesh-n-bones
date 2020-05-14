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
    this.controlBarFunctions[13] = this.openItemSelection;
    this.controlBarFunctions[31] = this.skill1;
    this.controlBarFunctions[33] = this.skill3;
    this.controlBarFunctions[51] = this.skill2;
    this.controlBarFunctions[53] = this.skill4;
    this.controlBarFunctions[71] = this.endTurn;
    this.controlBarFunctions[73] = this.runAway;

    //console.log("Selected unit: " + this.selectedAlly);

  }//end init()

  //////////////////////////////////////////////////////////////////////////////
  //  Sets the waitingFunction variable to [-1, -1] to indicate there is no waiting function
  //////////////////////////////////////////////////////////////////////////////
  clearWaitingFunction(){
    this.waitingFunction = [-1, -1];
  }

  //////////////////////////////////////////////////////////////////////////////
  //  Checks all creatures in combat for status conditions
  //////////////////////////////////////////////////////////////////////////////
  checkCreatureStatuses(){
    for(var x = 0; x < player.myCreatures.length; x++){
      if(player.myCreatures[x].isBloodied()){
        console.log("wounds");
        myCombatScreen.drawWounds(unitBarWidth + 50 + (150*Math.floor(x/3)), 50+(150*(x%3)));
      }
    }

    //Check all enemies second
    for(var x = 0; x < enemyCreatures.length; x++){
      if(enemyCreatures[x].isBloodied()){
        myCombatScreen.drawWounds(unitBarWidth + 750 - (150*Math.floor(x/3)), 50+(150*(x%3)));
      }
    }

  }//end checkCreatureStatuses()

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

  //////////////////////////////////////////////////////////////////////////////
  // Pass in creature Object and execute the waiting skill upon the given target
  //////////////////////////////////////////////////////////////////////////////
  executeSkill(target){
    skills.skillList[this.waitingFunction[1]][1](player.myCreatures[this.waitingFunction[0]], target);
    this.clearWaitingFunction();
  }//end executeSkill()

  //////////////////////////////////////////////////////////////////////////////
  //  Called when a friendly unit is clicked to determine if they should be selected or have a skill acted upon them
  //////////////////////////////////////////////////////////////////////////////
  selectFriendlyUnit(unitNum){
    console.log("You selected friendly unit number: " + unitNum);
    //If there is a waiting defensive skill, we act upon it
    if(this.waitingFunction[0] != -1 && skills.skillList[this.waitingFunction[1]][3] == 3){
      //execute stored skill
      this.executeSkill(player.myCreatures[unitNum]);
      console.log("Healsss");
      this.clearWaitingFunction();
    }
    //If there is no waiting defensive skill, we select the friendly unit
    else{
      this.clearWaitingFunction();
      this.selectedAlly = unitNum;
      console.log("Selected: " + unitNum + " " + player.myCreatures[unitNum].name);
    }
    myCombatScreen.updateScreen(1,1,0);
  }// end selectFriendlyUnit()

  //////////////////////////////////////////////////////////////////////////////
  //  Called when an enemy unit is clicked to determine if they should be acted upon
  //////////////////////////////////////////////////////////////////////////////
  selectEnemyUnit(unitNum){
    console.log("Clicked enemy: " + unitNum);
    //If there is a waiting offesnive skill, we act upon it
    if(this.waitingFunction[0] != -1 && skills.skillList[this.waitingFunction[1]][3] == 4){
      //execute stored skill
      console.log("Damage bad guy.");
      this.executeSkill(enemyCreatures[unitNum]);
      this.clearWaitingFunction();
      myCombatScreen.updateScreen(1,1,0);
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
      if(player.myCreatures.length >= this.clickedField[2] - 1 + (3 * (this.clickedField[1]-1))){
        console.log("Friendly unit: " + (this.clickedField[2] - 1 + (3 * (this.clickedField[1]-1) ) ) );
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
    myCombatScreen.updateScreen(1,1,1);
  }//end endTurn()

  //////////////////////////////////////////////////////////////////////////////
  //  Player flees combat
  //////////////////////////////////////////////////////////////////////////////
  runAway(){
    console.log("Run away!");
  }//end runAway()

  //////////////////////////////////////////////////////////////////////////////
  //  Function is called when a skill button is pressed
  //////////////////////////////////////////////////////////////////////////////
  skillButtonPress(skillNum){
    console.log("skillButtonPressed()");
    this.clearWaitingFunction();

    switch(player.myCreatures[combatLogi.selectedAlly].skillList[skillNum][3]){

      //Skill requires a target and is then stored
      case 4: case 3:
      combatLogi.waitingFunction = [this.selectedAlly, player.myCreatures[combatLogi.selectedAlly].skillList[skillNum][0]];
      //console.log(player.myCreatures[combatLogi.selectedAlly].skillList[skillNum][0] + " top " + combatLogi.waitingFunction[1]);
      console.log(player.myCreatures[combatLogi.selectedAlly].skillList[skillNum][2] + " stored.");
      break;

      //Skill does not require a target and is executed immediately
      case 1: case 2: case 5: case 6: case 7:
      player.myCreatures[combatLogi.selectedAlly].skillList[skillNum][1](player.myCreatures[combatLogi.selectedAlly]);
      break;

    }

    console.log(this.waitingFunction[0]+ " --- " + this.waitingFunction[1]);

  }//end skillButtonPress()


  //////////////////////////////////////////////////////////////////////////////
  //  Creature skill in slot 1
  //////////////////////////////////////////////////////////////////////////////
  skill1(){
    console.log(player.myCreatures[combatLogi.selectedAlly].name + " used: " + player.myCreatures[combatLogi.selectedAlly].skillList[0][2] + "!");

    combatLogi.skillButtonPress(0);

  }//end skill1()

  //////////////////////////////////////////////////////////////////////////////
  //  Creature skill in slot 2
  //////////////////////////////////////////////////////////////////////////////
  skill2(){
    console.log(player.myCreatures[combatLogi.selectedAlly].name + " used: " + player.myCreatures[combatLogi.selectedAlly].skillList[1][2] + "!");

    combatLogi.skillButtonPress(1);

  }//end openMenu()

  //////////////////////////////////////////////////////////////////////////////
  //  Creature skill in slot 3
  //////////////////////////////////////////////////////////////////////////////
  skill3(){
    console.log(player.myCreatures[combatLogi.selectedAlly].name + " used: " + player.myCreatures[combatLogi.selectedAlly].skillList[2][2] + "!");


    combatLogi.skillButtonPress(2);

    //console.log("apple: "+ this.waitingFunction[1]);
  }//end skill2()

  //////////////////////////////////////////////////////////////////////////////
  //  Creature skill in slot 4
  //////////////////////////////////////////////////////////////////////////////
  skill4(){

    console.log(player.myCreatures[combatLogi.selectedAlly].name + " used: " + player.myCreatures[combatLogi.selectedAlly].skillList[3][2] + "!");
    //skills.skillScythe(player.myCreatures[combatLogi.selectedAlly]);

    combatLogi.skillButtonPress(3);

  }//end skill4()

  //////////////////////////////////////////////////////////////////////////////
  //  Function opens menu in combat
  //////////////////////////////////////////////////////////////////////////////
  openMenu(){
    console.log("Menu opened!");
  }//end openMenu()

  //////////////////////////////////////////////////////////////////////////////
  //  Function opens item selection screen in combat
  //////////////////////////////////////////////////////////////////////////////
  openItemSelection(){
    console.log("Item selection opened!");
    player.myCreatures.forEach(Creature => Creature.removeHealth(1));
    //myCombatScreen.drawUnitBar();
    myCombatScreen.drawSkulls();
  }//end openItemSelection()

  //////////////////////////////////////////////////////////////////////////////
  //  To be used to handle all click events when in the game's combat screen
  //////////////////////////////////////////////////////////////////////////////
  combatClickHandler(clickPositionX,clickPositionY){

    this.clickedcreatureType = null;

    //First, check if the click was in the Control Bar at the bottom of the screen
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
      this.clickedField = [2, 0, 0];
      console.log(clickPositionY + " " + Math.floor(clickPositionY/90));
      this.clickedField = [2, 0, Math.floor(clickPositionY/90)];

      //First we see if there is a defensive function waiting to be acted upon
      //console.log(this.waitingFunction[1][3]);
      //console.log("io" + combatLogi.waitingFunction[1]);
      /*
      if(combatLogi.waitingFunction != null){
        if(skills.skillList[combatLogi.waitingFunction[1]][3] == 3){
          console.log("this is good");
          this.checkWaitingFunction();
        }
        else{//if there is no waiting defensive function, we select the unit
          this.selectedAlly = Math.floor(clickPositionY/90);
        }
      }*/
      if(this.waitingFunction[0] != -1 && skills.skillList[this.waitingFunction[1]][3] == 3){
        //If we clicked on an ally, and the waiting function targets an ally
        console.log("Checking waiting function. " + Math.floor(clickPositionY/90));
        this.selectFriendlyUnit(Math.floor(clickPositionY/90));
      }
      else{
        console.log("Selecting friendly unit.");
        this.selectFriendlyUnit(Math.floor(clickPositionY/90));
      }

      console.log(combatLogi.waitingFunction[0] + "  " + combatLogi.waitingFunction[1]);

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



  }// end combatClickHandler()

  //////////////////////////////////////////////////////////////////////////////
  //  Checks waiting function and acts upon it
  //////////////////////////////////////////////////////////////////////////////
  checkWaitingFunction(){
    console.log("checkWaitingFunction() " + skills.skillList[combatLogi.waitingFunction[1]][3]);
    switch(skills.skillList[combatLogi.waitingFunction[1]][3]){
      case 4: //targets enemy
      combatLogi.waitingFunction = [player.myCreatures[combatLogi.selectedAlly], player.myCreatures[combatLogi.selectedAlly].skillList[2][0]];
      console.log(player.myCreatures[combatLogi.selectedAlly].skillList[2][0] + " to " + combatLogi.waitingFunction[1]);
      console.log(player.myCreatures[combatLogi.selectedAlly].skillList[2][2] + " stored.");
      break;

      case 3: //targets ally
        console.log(player.myCreatures[combatLogi.selectedAlly].skillList[2][0] + " t3o " + combatLogi.waitingFunction[1]);
        skills.skillList[combatLogi.waitingFunction[1]][1](player.myCreatures[combatLogi.waitingFunction[0]], player.myCreatures[target]);
      break;


      case 1: case 2: case 5: case 6: case 7: //happens automatically (no target needed)
      player.myCreatures[combatLogi.selectedAlly].skillList[2][1](player.myCreatures[combatLogi.selectedAlly]);
      break;

    }

    //console.log(skills.skillList[0][1](player.myCreatures[this.selectedAlly], enemyCreatures[this.selectedEnemy]));
    skills.skillList[this.waitingFunction[1]][1](player.myCreatures[this.selectedAlly], enemyCreatures[this.selectedEnemy]);
    //skills.skillAttack(player.myCreatures[this.selectedAlly], enemyCreatures[this.selectedEnemy]);
    this.clearWaitingFunction();
    myCombatScreen.updateScreen(1,0,1);
  }//end checkWaitingFunction()


}//end CombatLogic
