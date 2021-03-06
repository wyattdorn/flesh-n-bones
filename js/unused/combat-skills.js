//Written by Wyatt Dorn


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// THIS FILE IS NOW REDUNDANT AND SERVES NO PURPOSE BUT AS A PEROSNAL REFERENCE
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////
// Skills are abilities that can be learned by creatures for use in combat.
////////////////////////////////////////////////////////////////////////////////
class Skill{
  constructor(){
    this.init();
  }//end constructor()

  //////////////////////////
  //  Target Types:
  //  0: NO SKILL
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


    this.skillList = [];

    //                   0  1                         2               3       4             5          6           7                           8
    //                      function()               Name             Target  Ability       Multiplier Cost       Description                 Uses until mastered
    this.skillList[0] = [0, this.noSkill,            "No Skill",      0,      "",             0,         0,      "- - - - - - - -"];
    this.skillList[1] = [1, this.skillAttack,        "Attack",        4,      "strength",     1.5,       0,      "Damage a single enemy.", 1];
    this.skillList[2] = [2, this.skillDefend,        "Defend",        3,      "strength",     1.2,       0,     "Give an ally a buff to their defense for asingle turn.", 10];
    this.skillList[3] = [3, this.skillHeal,          "Heal",          3,      "mind" ,        1.5,       3,     "Heal a single unit.", 10];
    this.skillList[4] = [4, this.skillExplode,       "Explode",       7,      "level",        1.0,       1,    "Damage all creature on the field, including allies.", 10];
    this.skillList[5] = [5, this.skillScythe,        "Scythe",        6,      "speed",        1.0,       2,    "Damage all enemy creatures on the field.", 10];
    this.skillList[6] = [6, this.skillOrcSmash,      "Orc Smash",     4,      "strength",     3.0,       1,     "Damage an enemy and yourself for the same amount (avaialble to orcs only).", 10];
    this.skillList[7] = [7, this.skillSpiritDagger,  "Spirit Dagger", 4,      "mind",         2.0,       1,     "Expend spirit to damage a single enemy.", 10];
    this.skillList[8] = [8, this.skillRegenerate,    "Regenerate",    2,      "strength",     2.0,       1,     "Heal yourself based on your strength.", 10];
    this.skillList[9] = [9, this.skillDivineAura,    "Divine Aura",   5,      "mind",         1.0,       3,     "Heal all allies.", 10];

  }//end init()

  //////////////////////////////////////////////////////////////////////////////
  //  This skill does nothing, and exists to represent a lack of a skill
  //////////////////////////////////////////////////////////////////////////////
  noSkill(){
    console.log("No skill.");
  }//end noSkill()

  skillDivineAura(creature){
    combatLogi.displayMessage = (creature.name + " heals all allies for " + Math.floor(creature.mind * 1.0) + "!");
    myCombatScreen.printMessageBar(combatLogi.displayMessage);
    console.log(creature.name + " heals all allies for " + Math.floor(creature.mind * 1.0) + "!");
    for(let x = 0; x < player.myCombatCreatures.length; x++){
      skills.healUnit(Math.floor(creature.mind * 1.0), player.myCreatures[player.myCombatCreatures[x]]);
    }
  }

  skillRegenerate(creature){
    combatLogi.displayMessage = (creature.name + " heals " + Math.floor(creature.strength * 2.0) + " to itself!");
    myCombatScreen.printMessageBar(combatLogi.displayMessage);
    console.log(creature.name + " heals " + Math.floor(creature.strength * 2.0) + " to itself!");
    skills.healUnit(Math.floor(creature.strength * 2.0), creature);
  }//end skillRegenerate()


  //////////////////////////////////////////////////////////////////////////////
  //  Defend skill - Damages a single enemy unit based on attacker's mind.
  //  NEED TO BE IMPLEMENTED
  //////////////////////////////////////////////////////////////////////////////
  skillDefend(creature, target){
    combatLogi.displayMessage = (creature.name + " moves to defend " + target.name + ".");
    myCombatScreen.printMessageBar(combatLogi.displayMessage);
    console.log(creature.name + " moves to defend " + target.name + ".");
    //skills.healUnit(Math.floor(creature.mind * 1.5), target);
  }//end skillDefend()


  //////////////////////////////////////////////////////////////////////////////
  //  Heal skill - Heals a single ally based on caster's mind
  //////////////////////////////////////////////////////////////////////////////
  skillHeal(creature, target){
    combatLogi.displayMessage = (creature.name + " heals " + Math.floor(creature.mind * 1.5) + " health to " + target.name + "!");
    myCombatScreen.printMessageBar(combatLogi.displayMessage);
    console.log(creature.name + " heals " + Math.floor(creature.mind * 1.5) + " health to " + target.name);
    skills.healUnit(Math.floor(creature.mind * 1.5), target);
  }//end skillHeal()


  //////////////////////////////////////////////////////////////////////////////
  //  Spirit Dagger skill - Damages a single enemy unit based on attacker's mind.
  //////////////////////////////////////////////////////////////////////////////
  skillSpiritDagger(creature, target){
    combatLogi.displayMessage = (creature.name + " deals " + Math.floor(creature.mind * 2.0) + " damage to " + target.name + " with " + skills.skillList[7][2] + ".");
    myCombatScreen.printMessageBar(combatLogi.displayMessage);
    console.log(creature.name + " deals " + Math.floor(creature.mind * 2.0) + " damage to " + target.name + " with Spirit Dagger.");
    skills.damageUnit(Math.floor(creature.mind * 2.0), target);
  }//end skillSpiritDagger()

  //////////////////////////////////////////////////////////////////////////////
  //  Orc Smash skill - Damages a single enemy unit and attacker based on attacker's strength.
  //////////////////////////////////////////////////////////////////////////////
  skillOrcSmash(creature, target){
    combatLogi.displayMessage = (creature.name + " deals " + Math.floor(creature.strength * 3) + " damage to " + target.name + " and themself!");
    myCombatScreen.printMessageBar(combatLogi.displayMessage);
    console.log(creature.name + " deals " + Math.floor(creature.strength * 3) + " damage to " + target.name + " and themself!");
    skills.damageUnit(Math.floor(creature.strength * 3), target);
    skills.damageUnit(Math.floor(creature.strength * 3), creature);
  }//end skillOrcSmash()

  //////////////////////////////////////////////////////////////////////////////
  //  Attack skill - Damages a single enemy unit based on attacker's strength.
  //////////////////////////////////////////////////////////////////////////////
  skillAttack(creature, target){
    combatLogi.displayMessage = (creature.name + " deals " + Math.floor(creature.strength * 1.5) + " damage to " + target.name + " with Attack.");
    myCombatScreen.printMessageBar(combatLogi.displayMessage);
    console.log(creature.name + " deals " + Math.floor(creature.strength * 1.5) + " damage to " + target.name + " with Attack.");
    skills.damageUnit(Math.floor(creature.strength * 1.5), target);
  }//end skillAttack()

  //////////////////////////////////////////////////////////////////////////////
  //  Explode skill - Damages all units on field an amount equal to the level of the unit that used the skill.
  //////////////////////////////////////////////////////////////////////////////
  skillExplode(creature){
    combatLogi.displayMessage = (creature.name + " deals " + Math.floor(creature.level) + " damage to all creatures!");
    myCombatScreen.printMessageBar(combatLogi.displayMessage);
    console.log(creature.name + " deals " + Math.floor(creature.level) + " damage to all creatures!");
    skills.damageAll(creature.level);
  }//end skillExplode()

  //////////////////////////////////////////////////////////////////////////////
  //  Scythe skill - Damages all enemy units an amount equal to 1.5x the unit's strength.
  //////////////////////////////////////////////////////////////////////////////
  skillScythe(creature){
    combatLogi.displayMessage = (creature.name + " deals " + Math.floor(skills.skillList[5][5] * creature.speed) + " damage to all enemies");
    myCombatScreen.printMessageBar(combatLogi.displayMessage);
    console.log(skills.skillList[5][5]);
    console.log(creature.name + " deals " + Math.floor(skills.skillList[5][5] * creature.speed) + " damage to all enemies");
    skills.damageAllEnemies(Math.floor(skills.skillList[5][5] * creature.speed));
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
