//Written by Wyatt Dorn

class enemyAI{

  constructor(){
    //empty for now
  }

  vengeful(){
    //Attacks the creature that last damaged this unit
  }

  //////////////////////////////////////////////////////////////////////////////
  // Enemies with a DUMB temperment will:
  // Always attack the opposing Creature with the HIGHEST current HP
  //////////////////////////////////////////////////////////////////////////////
  dumb(){
    this.target = 0;
    for(var x = 1; x < player.myCombatCreatures.length; x++){
      if(player.myCreatures[player.myCombatCreatures[x]].currentHP > player.myCreatures[player.myCombatCreatures[this.target]].currentHP){
        if(!player.myCreatures[player.myCombatCreatures[x]].isDead()){
          this.target = x;
        }
      }
    }
    return this.target;
  }//end dumb()

  //////////////////////////////////////////////////////////////////////////////
  // Enemies with aa ANTIMAGE temperment will:
  // Always attack the opposing Creature with the HIGHEST current Spirit
  //////////////////////////////////////////////////////////////////////////////
  antimage(){
    this.target = 0;
    for(var x = 1; x < player.myCombatCreatures.length; x++){
      if(player.myCreatures[player.myCombatCreatures[x]].currentSpirit > player.myCreatures[player.myCombatCreatures[this.target]].currentSpirit){
        if(!player.myCreatures[player.myCombatCreatures[x]].isDead() ){
          this.target = x;
        }
      }
    }
    return this.target;
  }//end antimage()

  //////////////////////////////////////////////////////////////////////////////
  // Enemies with a RANDOM temperment will:
  // Always attack a randomly determined player-controlled unit
  //////////////////////////////////////////////////////////////////////////////
  random(){
    console.log("---------------------" + player.myCombatCreatures.length);
    return Math.floor(Math.random() * player.myCombatCreatures.length);
    //Attacks a random opposing Creature
  }//end random()

}
