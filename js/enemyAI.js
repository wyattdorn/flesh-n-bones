//Written by Wyatt Dorn

class enemyAI{

  constructor(){
    this.init();
  }//end constructor()

  init(){
    this.list = [];

    //                   0  1                         2           3       4             5         6           7                           8
    //                      function()               Name        Target  Ability       Multiplier Cost       Description
    this.list[0] = [0, this.dumb];//,             "No Skill",     0,  "",           0,        0,      "- - - - - - - -"];
    this.list[1] = [1, this.random];//
    this.list[2] = [2, this.antimage];//

  }//end init()

  //////////////////////////////////////////////////////////////////////////////
  // Enemies with a DUMB temperment will:
  // Always attack the opposing Creature with the HIGHEST current HP
  //////////////////////////////////////////////////////////////////////////////
  dumb(targetArray){
    this.target = targetArray[0];
    for(var x = 1; x < targetArray.length; x++){
      if(player.myCreatures[targetArray[x]].currentHP > player.myCreatures[targetArray[this.target]].currentHP){
        this.target = x;
      }
    }
    return this.target;
  }//end dumb()


  //////////////////////////////////////////////////////////////////////////////
  // Enemies with a RANDOM temperment will:
  // Always attack a randomly determined player-controlled unit
  //////////////////////////////////////////////////////////////////////////////
  random(targetArray){
    this.currentTime = new Date;
    Math.seedrandom(this.currentTime.getTime());
    console.log("---------------------" + targetArray.length);
    return Math.floor(Math.random() * targetArray.length);
    //Attacks a random opposing Creature
  }//end random()


  //////////////////////////////////////////////////////////////////////////////
  // Enemies with aa ANTIMAGE temperment will:
  // Always attack the opposing Creature with the HIGHEST current Spirit
  //////////////////////////////////////////////////////////////////////////////
  antimage(targetArray){
    this.target = 0;
    for(var x = 1; x < targetArray.length; x++){
      if(player.myCreatures[targetArray[x]].currentSpirit > player.myCreatures[targetArray[this.target]].currentSpirit){
        this.target = x;
      }
    }
    return this.target;
  }//end antimage()


  vengeful(targetArray){
    //Attacks the creature that last damaged this unit
  }


}
