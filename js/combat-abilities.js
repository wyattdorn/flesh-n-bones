//Written by Wyatt Dorn
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

    //                  Number  Name        Target  Ability        Multiplier  Type       Description
    this.skillList[0] = [0,      "Attack",   4,      "might",      1.5,       "damage",   "Damage a single enemy."];
    this.skillList[1] = [1,      "Defend",   2,      "fortitude",  1.2,       "buff",     "Give yourself a buff to your defense for a single turn."];
    this.skillList[2] = [2,      "Heal",     3,      "wits" ,      1.5,       "heal",     "Heal a single unit."];
    this.skillList[3] = [3,      "Explode",  7,      "level",      1.0,       "damage",   "Damage all creature on the field, including allies."];
    this.skillList[4] = [4,      "Scythe",   6,      "might",      2.0,       "damage",   "Damage all enemy heroes on the field."]
    this.skillList[5] = [5,      "Orc Smash",8,      "might",      3.0,       "damage",   "Damage an enemy and yourself for the same amount (avaialble to orcs only)."]
  }//end init()




}
