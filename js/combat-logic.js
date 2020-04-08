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
  }//end init()

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
      pattern repeating until the final row. Actions are only taken if the click
      is in column with buttons.
      */
      if(clickPositionX < 25){
        this.clickedField[1] = 0;
      }
      else if(){
        //
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
      if(clickPositionX >= unitBarWidth + 50 && clickPositionX < unitBarWidth + 200){//Column 2
        //click is in column 2
        this.clickedField[1] = 2;
      }
      else if(clickPositionX >= unitBarWidth + 200 && clickPositionX < unitBarWidth + 350){//Column 3
        //click is in column 3
        this.clickedField[1] = 3;
      }
      else if(clickPositionX >= unitBarWidth + 600 && clickPositionX < unitBarWidth + 750){//Column 5
        //click is in column 5
        this.clickedField[1] = 5;
      }
      else if(clickPositionX >= unitBarWidth + 750 && clickPositionX < unitBarWidth + 900){//Column 6
        //click is in column 6
        this.clickedField[1] = 6;
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

    console.log("(" + clickPositionX + "," + clickPositionY + ")");

    this.checkWaitingFunctions();

  }// end combatClickHandler()

  checkWaitingFunctions(){
      console.log("Field: " + this.clickedField[0] + " - (" + this.clickedField[1] + ", " + this.clickedField[2] + ")");
  }

  healUnit(num, unit){
    do{//do-while loop until unit is selected?
      console.log("loop is good");
      break;
    }while(true);
    unit.giveHealth(num);

  }//end healUnit()

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
