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
    this.selectedEnemy

    //A variable to determine if a function is waiting for an input
    this.waitingDefensiveFunction = [];
    this.waitingOffensiveFunction = [];
    //When a click is made, the following variable stores the associated information
    //                   field    column  row
    this.clickedField = [0,       0,      0];

    /*
    var controlBarFunctions = [];
    controlBarFunctions[1,1] = this.openMenu;
    controlBarFunctions[1,3] = this.openItemSelection;
    controlBarFunctions[3,1] = this.skill1;
    controlBarFunctions[3,3] = this.skill3;
    controlBarFunctions[5,1] = this.skill2;
    controlBarFunctions[5,3] = this.skill4;
    controlBarFunctions[7,1] = this.endTurn;
    controlBarFunctions[7,3] = this.runAway;
    */

    this.controlBarFunctions = [];
    this.controlBarFunctions[11] = this.openMenu;
    this.controlBarFunctions[13] = this.openItemSelection;
    this.controlBarFunctions[31] = this.skill1;
    this.controlBarFunctions[33] = this.skill3;
    this.controlBarFunctions[51] = this.skill2;
    this.controlBarFunctions[53] = this.skill4;
    this.controlBarFunctions[71] = this.endTurn;
    this.controlBarFunctions[73] = this.runAway;

    console.log("Selected unit: " + this.selectedAlly);



  }//end init()

  //////////////////////////////////////////////////////////////////////////////
  //  Called by combatClickResolution() when a creature in the combat field is clicked on
  //////////////////////////////////////////////////////////////////////////////
  selectUnit(){
    //First, check that the click was in the twwo that hold allied
    if(this.clickedField[1] == 1 || this.clickedField[1] == 2){
      //We check the clicked slot has a friendly unit in it
      if(player.myCreatures.length >= this.clickedField[2] - 1 + (3 * (this.clickedField[1]-1))){
        console.log("Friendly unit: " + (this.clickedField[2] - 1 + (3 * (this.clickedField[1]-1) ) ) );
        this.selectedAlly = (this.clickedField[2] - 1 + (3 * (this.clickedField[1]-1) ) ) - 1;
        this.checkDefensiveFuntions(this.selectedAlly);
        myCombatScreen.updateScreen(1,1,0);
      }
      else{//If the click is in a spot that COULD contain an ally, but doesn't
        console.log("Not enough allies.");
      }
    }
    else{//Through process of elimination, we know the only remaining columns are the enemy columns
      if(enemyCreatures.length >= this.clickedField[2] - 1 + (3 * (5-this.clickedField[1]))){
        console.log("Enemyy unit: " + (this.clickedField[2] - 1 + (3 * (5-this.clickedField[1]))) );
        this.selectedEnemy = (this.clickedField[2] - 1 + (3 * (5-this.clickedField[1])) - 1);

        this.checkOffensiveFuntions();
      }
      else{//If the click is in a spot that COULD contain an enemy, but doesn't
        console.log("Not enough enemies.");
      }
    }
  }//end selectUnit()

  //////////////////////////////////////////////////////////////////////////////
  //  Called by combatClickHandler() after click location is determined
  //////////////////////////////////////////////////////////////////////////////
  combatClickResolution(){

    if(!(this.clickedField[1] == 0 || this.clickedField[2] == 0)){
      switch (this.clickedField[0]){
        case 1:
          this.controlBarFunctions[10 * this.clickedField[1] + this.clickedField[2]]();
        break;
        case 3:
          this.selectUnit();
        break;
      }
    }
    else{
      console.log("Invalid selection.");
    }
    /*
    switch (this.clickedField[0]){
      case 1:
        //controlBarFunctions[this.clickedField[1], this.clickedField[2]]();
        contr[this.clickedField[1]+ 10* this.clickedField[2]]();
      break;
    }
    */

  }//end combatClickResolution()

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
  //  Creature skill in slot 1
  //////////////////////////////////////////////////////////////////////////////
  skill1(){
    console.log(player.myCreatures[combatLogi.selectedAlly].name + " used: " + player.myCreatures[combatLogi.selectedAlly].skillList[0][2] + "!");


    switch(player.myCreatures[combatLogi.selectedAlly].skillList[0][3]){
      case 4:
      combatLogi.waitingOffensiveFunction = [player.myCreatures[combatLogi.selectedAlly], player.myCreatures[combatLogi.selectedAlly].skillList[0][0]];
      console.log(player.myCreatures[combatLogi.selectedAlly].skillList[0][0] + " to " + combatLogi.waitingOffensiveFunction[1]);
      console.log(player.myCreatures[combatLogi.selectedAlly].skillList[0][2] + " stored.");
      break;

      case 1: case 2: case 5: case 6: case 7:
      player.myCreatures[combatLogi.selectedAlly].skillList[0][1](player.myCreatures[combatLogi.selectedAlly]);
      break;

    }
    /*
    //skills.skillScythe(player.myCreatures[combatLogi.selectedAlly]);
    if(player.myCreatures[combatLogi.selectedAlly].skillList[0][3]==4){
      combatLogi.waitingOffensiveFunction = [player.myCreatures[combatLogi.selectedAlly], player.myCreatures[combatLogi.selectedAlly].skillList[0][0]];
      console.log(player.myCreatures[combatLogi.selectedAlly].skillList[0][0] + " to " + combatLogi.waitingOffensiveFunction[1]);
      console.log(player.myCreatures[combatLogi.selectedAlly].skillList[0][2] + " stored.");
    }
    else{
      player.myCreatures[combatLogi.selectedAlly].skillList[0][1](player.myCreatures[combatLogi.selectedAlly]);
    }*/
  }//end skill1()

  //////////////////////////////////////////////////////////////////////////////
  //  Creature skill in slot 2
  //////////////////////////////////////////////////////////////////////////////
  skill2(){
    console.log(player.myCreatures[combatLogi.selectedAlly].name + " used: " + player.myCreatures[combatLogi.selectedAlly].skillList[1][2] + "!");


    switch(player.myCreatures[combatLogi.selectedAlly].skillList[1][3]){
      case 4:
      combatLogi.waitingOffensiveFunction = [player.myCreatures[combatLogi.selectedAlly], player.myCreatures[combatLogi.selectedAlly].skillList[1][0]];
      console.log(player.myCreatures[combatLogi.selectedAlly].skillList[1][0] + " to " + combatLogi.waitingOffensiveFunction[1]);
      console.log(player.myCreatures[combatLogi.selectedAlly].skillList[1][2] + " stored.");
      break;

      case 1: case 2: case 5: case 6: case 7:
      player.myCreatures[combatLogi.selectedAlly].skillList[1][1](player.myCreatures[combatLogi.selectedAlly]);
      break;

    }
  }//end openMenu()

  //////////////////////////////////////////////////////////////////////////////
  //  Creature skill in slot 3
  //////////////////////////////////////////////////////////////////////////////
  skill3(){
    console.log(player.myCreatures[combatLogi.selectedAlly].name + " used: " + player.myCreatures[combatLogi.selectedAlly].skillList[2][2] + "!");


    switch(player.myCreatures[combatLogi.selectedAlly].skillList[2][3]){
      case 4:
      combatLogi.waitingOffensiveFunction = [player.myCreatures[combatLogi.selectedAlly], player.myCreatures[combatLogi.selectedAlly].skillList[2][0]];
      console.log(player.myCreatures[combatLogi.selectedAlly].skillList[2][0] + " to " + combatLogi.waitingOffensiveFunction[1]);
      console.log(player.myCreatures[combatLogi.selectedAlly].skillList[2][2] + " stored.");
      break;

      case 1: case 2: case 5: case 6: case 7:
      player.myCreatures[combatLogi.selectedAlly].skillList[2][1](player.myCreatures[combatLogi.selectedAlly]);
      break;

    }
  }//end skill2()

  //////////////////////////////////////////////////////////////////////////////
  //  Creature skill in slot 4
  //////////////////////////////////////////////////////////////////////////////
  skill4(){

    console.log(player.myCreatures[combatLogi.selectedAlly].name + " used: " + player.myCreatures[combatLogi.selectedAlly].skillList[3][2] + "!");
    //skills.skillScythe(player.myCreatures[combatLogi.selectedAlly]);

    switch(player.myCreatures[combatLogi.selectedAlly].skillList[3][3]){
      case 4:
      combatLogi.waitingOffensiveFunction = [player.myCreatures[combatLogi.selectedAlly], player.myCreatures[combatLogi.selectedAlly].skillList[3][0]];
      console.log(player.myCreatures[combatLogi.selectedAlly].skillList[3][0] + " to " + combatLogi.waitingOffensiveFunction[1]);
      console.log(player.myCreatures[combatLogi.selectedAlly].skillList[3][2] + " stored.");
      break;

      case 1: case 2: case 5: case 6: case 7:
      player.myCreatures[combatLogi.selectedAlly].skillList[3][1](player.myCreatures[combatLogi.selectedAlly]);
      break;

    }

    /*
    console.log(player.myCreatures[combatLogi.selectedAlly].name + " used: " + player.myCreatures[combatLogi.selectedAlly].skillList[3][2] + "!");
    player.myCreatures[combatLogi.selectedAlly].skillList[3][1](player.myCreatures[combatLogi.selectedAlly]);
    */
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
    myCombatScreen.drawUnitBar();
    myCombatScreen.drawSkulls();
  }//end openItemSelection()

  //////////////////////////////////////////////////////////////////////////////
  //  To be used to handle all click events when in the game's combat screen
  //////////////////////////////////////////////////////////////////////////////
  combatClickHandler(clickPositionX,clickPositionY){

    //First, check if the click was inb the Control Bar at the bottom of the screen
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

    }
    //Next check if the click was in thje Unit bar on the left of the screen
    else if(clickPositionX < unitBarWidth){
      this.clickedField = [2, 0, 0];
      console.log(clickPositionY + " " + Math.floor(clickPositionY/90));
      this.clickedField = [2, 0, Math.floor(clickPositionY/90)];
      this.selectedAlly = Math.floor(clickPositionY/90);
      myCombatScreen.updateScreen(1,1,0);
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
    }

    this.combatClickResolution();

  }// end combatClickHandler()

  //////////////////////////////////////////////////////////////////////////////
  //  Called by combatClickResolution() once a valid input is determined
  //////////////////////////////////////////////////////////////////////////////
  checkWaitingFunctions(){
      console.log("Field: " + this.clickedField[0] + " - (" + this.clickedField[1] + ", " + this.clickedField[2] + ")");
      console.log("You have selected ally: " + this.selectedAlly);
  }//end checkWaitingFunctions()


  //////////////////////////////////////////////////////////////////////////////
  //  Called by combatClickResolution() once a valid input is determined
  //////////////////////////////////////////////////////////////////////////////
  checkOffensiveFuntions(){
    //console.log(skills.skillList[0][1](player.myCreatures[this.selectedAlly], enemyCreatures[this.selectedEnemy]));
    skills.skillList[this.waitingOffensiveFunction[1]][1](player.myCreatures[this.selectedAlly], enemyCreatures[this.selectedEnemy]);
    //skills.skillAttack(player.myCreatures[this.selectedAlly], enemyCreatures[this.selectedEnemy]);
    this.waitingOffensiveFunction = [null, null];
    myCombatScreen.updateScreen(1,0,1);
  }//end checkOffensiveFuntions()

  //////////////////////////////////////////////////////////////////////////////
  //  Called by combatClickResolution() once a valid input is determined
  //////////////////////////////////////////////////////////////////////////////
  checkDefensiveFuntions(){
      console.log("Field: " + this.clickedField[0] + " - (" + this.clickedField[1] + ", " + this.clickedField[2] + ")");
      console.log("You have selected ally: " + this.selectedAlly);
  }//end checkDefensiveFuntions()

  useSkill(num, unit){
    switch (num) {
      case 1:

        break;
      case 2:

        break;
      case 3:

        break;
      case 4:

        break;
      case 5:

        break;
      case 6:

        break;
      case 7:

        break;
      case 8:

        break;
    }//end switch
  }//end useSkill()

}//end CombatLogic
