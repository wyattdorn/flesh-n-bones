//Written by Wyatt Dorn

////////////////////////////////////////////////////////////////////////////////
// Skills are abilities that can be learned by creatures for use in combat.
////////////////////////////////////////////////////////////////////////////////
class Skill{
  constructor(idNum, myFunction, name, target, ability, multiplier, cost, description, usesUntilMastered){
    this.idNum = idNum;
    this.function = myFunction;
    this.name = name;
    this.target = target;
    this.ability = ability;
    this.multiplier = multiplier;
    this.cost = cost;
    this.description = description
    this.usesUntilMastered = usesUntilMastered
  }//end constructor()

}

function getSkillByidNum(myFunction){
  masterSkillList.forEach((Skill, skill) => {
    if(skill.idNum == myFunction){return skill.function;}
  });
}

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


function generateCombatSkills(){
  masterSkillList = [];
  masterSkillList.push(new Skill(0, noSkill,            "No Skill",      0,      "",             0,         0,      "- - - - - - - -"));
  masterSkillList.push(new Skill(1, skillAttack,        "Attack",        4,      "strength",     1.5,       0,      "Damage a single enemy.", 1));
  masterSkillList.push(new Skill(2, skillDefend,        "Defend",        3,      "strength",     1.2,       0,     "Give an ally a buff to their defense for asingle turn.", 10));
  masterSkillList.push(new Skill(3, skillHeal,          "Heal",          3,      "mind" ,        1.5,       3,     "Heal a single unit.", 10));
  masterSkillList.push(new Skill(4, skillExplode,       "Explode",       7,      "level",        1.0,       1,    "Damage all creature on the field, including allies.", 10));
  masterSkillList.push(new Skill(5, skillScythe,        "Scythe",        6,      "speed",        1.0,       2,    "Damage all enemy creatures on the field.", 10));
  masterSkillList.push(new Skill(6, skillOrcSmash,      "Orc Smash",     4,      "strength",     3.0,       1,     "Damage an enemy and yourself for the same amount (avaialble to orcs only).", 10));
  masterSkillList.push(new Skill(7, skillSpiritDagger,  "Spirit Dagger", 4,      "mind",         2.0,       1,     "Expend spirit to damage a single enemy.", 10));
  masterSkillList.push(new Skill(8, skillRegenerate,    "Regenerate",    2,      "strength",     2.0,       1,     "Heal yourself based on your strength.", 10));
  masterSkillList.push(new Skill(9, skillDivineAura,    "Divine Aura",   5,      "mind",         1.0,       3,     "Heal all allies.", 10));

}//end generateCombatSkills()

//////////////////////////////////////////////////////////////////////////////
//  This skill does nothing, and exists to represent a lack of a skill
//////////////////////////////////////////////////////////////////////////////
function noSkill(){
  console.log("No skill.");
}//end noSkill()

function skillDivineAura(creature){
  combatLogi.displayMessage = (creature.name + " heals all allies for " + Math.floor(creature.mind * 1.0) + "!");
  myCombatScreen.printMessageBar(combatLogi.displayMessage);
  console.log(creature.name + " heals all allies for " + Math.floor(creature.mind * 1.0) + "!");
  for(let x = 0; x < player.myCombatCreatures.length; x++){
    healUnit(Math.floor(creature.mind * 1.0), player.myCreatures[player.myCombatCreatures[x]]);
  }
}

function skillRegenerate(creature){
  combatLogi.displayMessage = (creature.name + " heals " + Math.floor(creature.strength * 2.0) + " to itself!");
  myCombatScreen.printMessageBar(combatLogi.displayMessage);
  console.log(creature.name + " heals " + Math.floor(creature.strength * 2.0) + " to itself!");
  healUnit(Math.floor(creature.strength * 2.0), creature);
}//end skillRegenerate()


//////////////////////////////////////////////////////////////////////////////
//  Defend skill - Damages a single enemy unit based on attacker's mind.
//  NEED TO BE IMPLEMENTED
//////////////////////////////////////////////////////////////////////////////
function skillDefend(creature, target){
  combatLogi.displayMessage = (creature.name + " moves to defend " + target.name + ".");
  myCombatScreen.printMessageBar(combatLogi.displayMessage);
  console.log(creature.name + " moves to defend " + target.name + ".");
  //healUnit(Math.floor(creature.mind * 1.5), target);
}//end skillDefend()


//////////////////////////////////////////////////////////////////////////////
//  Heal skill - Heals a single ally based on caster's mind
//////////////////////////////////////////////////////////////////////////////
function skillHeal(creature, target){
  combatLogi.displayMessage = (creature.name + " heals " + Math.floor(creature.mind * 1.5) + " health to " + target.name + "!");
  myCombatScreen.printMessageBar(combatLogi.displayMessage);
  console.log(creature.name + " heals " + Math.floor(creature.mind * 1.5) + " health to " + target.name);
  healUnit(Math.floor(creature.mind * 1.5), target);
}//end skillHeal()


//////////////////////////////////////////////////////////////////////////////
//  Spirit Dagger skill - Damages a single enemy unit based on attacker's mind.
//////////////////////////////////////////////////////////////////////////////
function skillSpiritDagger(creature, target){
  combatLogi.displayMessage = (creature.name + " deals " + Math.floor(creature.mind * 2.0) + " damage to " + target.name + " with " + masterSkillList[7].name + ".");
  myCombatScreen.printMessageBar(combatLogi.displayMessage);
  console.log(creature.name + " deals " + Math.floor(creature.mind * 2.0) + " damage to " + target.name + " with Spirit Dagger.");
  damageUnit(Math.floor(creature.mind * 2.0), target);
}//end skillSpiritDagger()

//////////////////////////////////////////////////////////////////////////////
//  Orc Smash skill - Damages a single enemy unit and attacker based on attacker's strength.
//////////////////////////////////////////////////////////////////////////////
function skillOrcSmash(creature, target){
  combatLogi.displayMessage = (creature.name + " deals " + Math.floor(creature.strength * 3) + " damage to " + target.name + " and themself!");
  myCombatScreen.printMessageBar(combatLogi.displayMessage);
  console.log(creature.name + " deals " + Math.floor(creature.strength * 3) + " damage to " + target.name + " and themself!");
  damageUnit(Math.floor(creature.strength * 3), target);
  damageUnit(Math.floor(creature.strength * 3), creature);
}//end skillOrcSmash()

//////////////////////////////////////////////////////////////////////////////
//  Attack skill - Damages a single enemy unit based on attacker's strength.
//////////////////////////////////////////////////////////////////////////////
function skillAttack(creature, target){
  combatLogi.displayMessage = (creature.name + " deals " + Math.floor(creature.strength * 1.5) + " damage to " + target.name + " with Attack.");
  myCombatScreen.printMessageBar(combatLogi.displayMessage);
  console.log(creature.name + " deals " + Math.floor(creature.strength * 1.5) + " damage to " + target.name + " with Attack.");
  damageUnit(Math.floor(creature.strength * 1.5), target);
}//end skillAttack()

//////////////////////////////////////////////////////////////////////////////
//  Explode skill - Damages all units on field an amount equal to the level of the unit that used the skill.
//////////////////////////////////////////////////////////////////////////////
function skillExplode(creature){
  combatLogi.displayMessage = (creature.name + " deals " + Math.floor(creature.level) + " damage to all creatures!");
  myCombatScreen.printMessageBar(combatLogi.displayMessage);
  console.log(creature.name + " deals " + Math.floor(creature.level) + " damage to all creatures!");
  damageAll(creature.level);
}//end skillExplode()

//////////////////////////////////////////////////////////////////////////////
//  Scythe skill - Damages all enemy units an amount equal to 1.5x the unit's strength.
//////////////////////////////////////////////////////////////////////////////
function skillScythe(creature){
  combatLogi.displayMessage = (creature.name + " deals " + Math.floor(masterSkillList[5].multiplier * creature.speed) + " damage to all enemies");
  myCombatScreen.printMessageBar(combatLogi.displayMessage);
  console.log(creature.name + " deals " + Math.floor(masterSkillList[5].multiplier * creature.speed) + " damage to all enemies");
  damageAllEnemies(Math.floor(masterSkillList[5].multiplier * creature.speed));
}//end skillScythe()

//////////////////////////////////////////////////////////////////////////////
//  Function heals a given unit a given number of hit points
//////////////////////////////////////////////////////////////////////////////
function healUnit(num, unit){
  unit.giveHealth(num);
}//end healUnit()

//////////////////////////////////////////////////////////////////////////////
//  Function removes a given number of hit points from a creature's currentHP
//////////////////////////////////////////////////////////////////////////////
function damageUnit(num, unit){
  //while loop until unit is selected?
  unit.removeHealth(num);
}//end damageUnit()

//////////////////////////////////////////////////////////////////////////////
//  Function removes a given number of hit points from all creatures in combat
//////////////////////////////////////////////////////////////////////////////
function damageAll(num){
  player.myCreatures.forEach(Creature => Creature.removeHealth(num));
  enemyCreatures.forEach(Creature => Creature.removeHealth(num));
  myCombatScreen.updateScreen(true, false, true);
}//end damageAll()

//////////////////////////////////////////////////////////////////////////////
//  Function removes a given number of hit points from all enemy creatures in combat
//////////////////////////////////////////////////////////////////////////////
function damageAllEnemies(num){
  enemyCreatures.forEach(Creature => Creature.removeHealth(num));
  myCombatScreen.updateScreen(true, false, true);
}//end damageAll()
