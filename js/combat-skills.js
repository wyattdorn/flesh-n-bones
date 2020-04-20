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

    //                      function()                Name        Target  Ability        Multiplier  Type       Description
    this.skillList[0] = [0, this.skillAttack,        "Attack",   4,      "might",      1.5,       "damage",   "Damage a single enemy."];
    this.skillList[1] = [1, this.skillDefend,        "Defend",   2,      "fortitude",  1.2,       "buff",     "Give yourself a buff to your defense for asingle turn."];
    this.skillList[2] = [2, this.skillHeal,          "Heal",     3,      "wits" ,      1.5,       "heal",     "Heal a single unit."];
    this.skillList[3] = [3, this.skillExplode,       "Explode",  7,      "level",      1.0,       "damage",   "Damage all creature on the field, includ- ing allies."];
    this.skillList[4] = [4, this.skillScythe,        "Scythe",   6,      "might",      1.0,       "damage",   "Damage all enemy heroes on the field."];
    this.skillList[5] = [5, this.skillOrcSmash,      "Orc Smash",4,      "might",      3.0,       "damage",   "Damage an enemy and yourself for the same amount (avaialble to orcs only)."];
    this.skillList[6] = [6, this.skillSpiritDagger,  "Spirit Dagger", 4, "wits",       2.0,       "damage",   "Expend spirit to damage a single enemy."];
  }//end init()


  //////////////////////////////////////////////////////////////////////////////
  //  Heal skill - Damages a single enemy unit based on attacker's wits.
  //////////////////////////////////////////////////////////////////////////////
  skillHeal(creature, target){
    console.log(creature.name + " heals " + Math.floor(creature.wits * 2.0) + " damage to " + target.name);
    skills.healUnit(Math.floor(creature.wits * 1.5), target);
  }//end skillHeal()


  //////////////////////////////////////////////////////////////////////////////
  //  Spirit Dagger skill - Damages a single enemy unit based on attacker's wits.
  //////////////////////////////////////////////////////////////////////////////
  skillSpiritDagger(creature, target){
    console.log(creature.name + " deals " + Math.floor(creature.wits * 2.0) + " damage to " + target.name);
    skills.damageUnit(Math.floor(creature.wits * 2.0), target);
  }//end skillSpiritDagger()

  //////////////////////////////////////////////////////////////////////////////
  //  Orc Smash skill - Damages a single enemy unit and attacker based on attacker's might.
  //////////////////////////////////////////////////////////////////////////////
  skillOrcSmash(creature, target){
    console.log(creature.name + " deals " + Math.floor(creature.might * 3) + " damage to " + target.name + " and themself!");
    skills.damageUnit(Math.floor(creature.might * 3), target);
    skills.damageUnit(Math.floor(creature.might * 3), creature);
  }//end skillOrcSmash()

  //////////////////////////////////////////////////////////////////////////////
  //  Attack skill - Damages a single enemy unit based on attacker's might.
  //////////////////////////////////////////////////////////////////////////////
  skillAttack(creature, target){
    console.log(creature.name + " deals " + Math.floor(creature.might * 1.5) + " damage to " + target.name);
    skills.damageUnit(Math.floor(creature.might * 1.5), target);
  }//end skillAttack()

  //////////////////////////////////////////////////////////////////////////////
  //  Explode skill - Damages all units on field an amount equal to the level of the unit that used the skill.
  //////////////////////////////////////////////////////////////////////////////
  skillExplode(creature){
    console.log(creature.name + " deals " + Math.floor(creature.level) + " damage to all creatures!");
    skills.damageAll(creature.level);
  }//end skillExplode()

  //////////////////////////////////////////////////////////////////////////////
  //  Scythe skill - Damages all enemy units an amount equal to 2x the unit's might.
  //////////////////////////////////////////////////////////////////////////////
  skillScythe(creature){
    console.log(creature.name + " deals " + Math.floor(creature.might) + " damage to all enemies");
    skills.damageAllEnemies(Math.floor(creature.might));
    myCombatScreen.updateScreen(true, false, true);
  }//end skillScythe()

  //////////////////////////////////////////////////////////////////////////////
  //  Function heals a given unit a given number of hit points
  //////////////////////////////////////////////////////////////////////////////
  healUnit(num, unit){

    unit.giveHealth(num);

  }//end healUnit()

  //////////////////////////////////////////////////////////////////////////////
  //  Function removes a given number of hit points from a creature's currentHP
  //////////////////////////////////////////////////////////////////////////////
  damageUnit(num, unit){
    //while loop until unit is selected?
    unit.removeHealth(num);
  }//end damageUnit()

  //////////////////////////////////////////////////////////////////////////////
  //  Function removes a given number of hit points from all creatures in combat
  //////////////////////////////////////////////////////////////////////////////
  damageAll(num){
    player.myCreatures.forEach(Creature => Creature.removeHealth(num));
    enemyCreatures.forEach(Creature => Creature.removeHealth(num));
    myCombatScreen.updateScreen(true, false, true);
  }//end damageAll()

  //////////////////////////////////////////////////////////////////////////////
  //  Function removes a given number of hit points from all enemy creatures in combat
  //////////////////////////////////////////////////////////////////////////////
  damageAllEnemies(num){
    enemyCreatures.forEach(Creature => Creature.removeHealth(num));
    myCombatScreen.updateScreen(true, false, true);
  }//end damageAll()




}
