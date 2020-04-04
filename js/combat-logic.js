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
    //init
  }//end init()

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
