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
    //A variable to determine if a function is waiting for an input
    this.waitingFunction = 0;
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
      }
      else{
        console.log("Not enough allies.");
      }
    }
    else{//Through process of elimination, we know the only remaining columns are the enemy columns
      console.log(enemyCreatures.length);

      if(enemyCreatures.length >= this.clickedField[2] - 1 + (3 * (5-this.clickedField[1]))){
        console.log("Friendly unit: " + (this.clickedField[2] - 1 + (3 * (5-this.clickedField[1]))) );
      }
      else{
        console.log("Not enough enemies.");
      }
    }
  }//end selectUnit()

  //////////////////////////////////////////////////////////////////////////////
  //  Called by combatClickHandler() after click location is determined
  //////////////////////////////////////////////////////////////////////////////
  combatClickResolution(){

    /*
    var temp = this.clickedField[1]+","+this.clickedField[2];

    console.log(this.clickedField[1]+","+this.clickedField[2]);
    this.openMenu[temp]();
    */

    var contr = [this.openMenu, this.openItemSelection];
    contr[11]=this.openMenu;
    //contr[this.clickedField[1]]();

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
    this.checkWaitingFunctions();
  }//end combatClickResolution()

  //////////////////////////////////////////////////////////////////////////////
  //  Ends the player's turn
  //////////////////////////////////////////////////////////////////////////////
  endTurn(){
    console.log("Turn ended!");
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
    console.log("Skill 1 used!");
  }//end skill1()

  //////////////////////////////////////////////////////////////////////////////
  //  Creature skill in slot 2
  //////////////////////////////////////////////////////////////////////////////
  skill2(){
    console.log("Skill 2 used!");
  }//end openMenu()

  //////////////////////////////////////////////////////////////////////////////
  //  Creature skill in slot 3
  //////////////////////////////////////////////////////////////////////////////
  skill3(){
    console.log("Skill 3 used!");
  }//end skill2()

  //////////////////////////////////////////////////////////////////////////////
  //  Creature skill in slot 4
  //////////////////////////////////////////////////////////////////////////////
  skill4(){
    console.log("Skill 4 used!");
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
  }//end openItemSelection()

  //////////////////////////////////////////////////////////////////////////////
  //  To be used to handle all click events wneh in the game's combat screen
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
  }//end checkWaitingFunctions()

  //////////////////////////////////////////////////////////////////////////////
  //  Function heals a given unit a given number of hit points
  //////////////////////////////////////////////////////////////////////////////
  healUnit(num, unit){
    do{//do-while loop until unit is selected?
      console.log("loop is good");
      break;
    }while(true);
    unit.giveHealth(num);

  }//end healUnit()

  //////////////////////////////////////////////////////////////////////////////
  //  Function removes a given number of hit points from a creature's currentHP
  //////////////////////////////////////////////////////////////////////////////
  damageUnit(num, unit){
    //while loop until unit is selected?
    unit.removeHealth(num);
  }//end damageUnit()

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
