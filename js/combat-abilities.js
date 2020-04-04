////////////////////////////////////////////////////////////////////////////////
// Skills are abilities that can be learned by creatures for use in combat.
////////////////////////////////////////////////////////////////////////////////
class Skill{
  constructor(){
    this.init();
  }

  //////////////////////////
  //  Target Types:
  //  1: None
  //  2: Self
  //  3: Ally
  //  4: Enemy
  //  5. All Allies
  //  6. All Enemies
  //  7. All Units
  //  8. Other
  //
  /////////////////////////

  init(){
    this.skillList = new Array(4);
    for(var x = 0; x < 4; x++){
      this.skillList[x] = [];
      this.skillList[x][0] = x;
    }

    //                  Number  Name        Target  Ability        Multiplier  Type
    this.skillList[0] = [0,      "Attack",   4,      "might",      1.5,       "damage"];
    this.skillList[1] = [1,      "Defend",   2,      "fortitude",  1.2,       "buff"];
    this.skillList[2] = [2,      "Heal",     3,      "wits" ,      1.5,       "heal"];
    this.skillList[3] = [3,      "Explode",  7,      "level",      1.0,       "damage"];
  }//end init()

  
}
