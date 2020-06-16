//Written by Wyatt Dorn

class enemyAI{

  constructor(){
    //empty for now
  }

  vengeful(){
    //Attacks the creature that last damaged this unit
  }

  dumb(){
    //Will always attack the opposing Creature with the HIGHEST current HP
  }

  antimage(){
    //Will always target the opposing Creature with the HIGHEST current Spirit
  }

  random(){
    console.log("---------------------" + player.myCombatCreatures.length);
    return Math.floor(Math.random() * player.myCombatCreatures.length);
    //Attacks a random opposing Creature
  }

}
