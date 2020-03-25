//Written by Wyatt Dorn

class CombatScreen{

  //////////////////////////////////////////////////////////////////////////////////////
  //    This class will handle displaying the combat screen as well as the
  //    action that takes place in combat
  //////////////////////////////////////////////////////////////////////////////////////


  /////////////////////////////////////////////////////////////////////////////\
  //    Constructor
  /////////////////////////////////////////////////////////////////////////////\
  constructor(context, canvas){

      this.ctx = context;
      this.canvas = canvas;

  }

  init(playerCreatures, enemyCreatures, isPlayerTurn, context, canvas){

    this.numEnemies = enemyCreatures.length;
    this.numAllies = playerCreatures.length;

    ctx.fillStyle = "#444444";//"#303030";
    ctx.fillRect(0, 0, this.canvas.width, ctx.canvas.height);

    this.drawRandomSquares();
    this.drawUnitBar();
    this.drawControlBar();

    this.drawFriendlyUnits();
    this.drawEnemyUnits();

    this.drawFlourish(10,70);
    this.drawFlourish(10,160);
    this.drawFlourish(10,250);

    this.drawWounds(unitBarWidth + 50, 50);

  }

  //////////////////////////////////////////////////////////////////////////////
  //  To be used to handle all click events wneh in the game's combat screen
  //////////////////////////////////////////////////////////////////////////////
  combatClickHandler(x,y){
    console.log("Booger");
    this.drawWounds(unitBarWidth + 50, 50);
  }// end combatClickHandler()

  //  For testing purposes
  printNumAllies(){
    console.log(this.numAllies);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Creates a textured background for the combat screen
  //////////////////////////////////////////////////////////////////////////////
  drawRandomSquares(baseColor, startX, endX, startY, endY){

    for(var x=0; x<1000; x++){
      var size = Math.floor(Math.random() * 5)+7
      ctx.fillStyle = "#303030";//"#303030";
      ctx.fillRect(ctx.canvas.width*(Math.random()), ctx.canvas.height*(Math.random()), size, size);
    }
    for(var x=0; x<1000; x++){
      var size = Math.floor(Math.random() * 5)+7
      ctx.fillStyle = "#009000";//"#303030";
      ctx.fillRect(ctx.canvas.width*(Math.random()), ctx.canvas.height*(Math.random()), size, size);
    }
    for(var x=0; x<1000; x++){
      var size = Math.floor(Math.random() * 5)+7
      ctx.fillStyle = "#003000";//"#303030";
      ctx.fillRect(ctx.canvas.width*(Math.random()), ctx.canvas.height*(Math.random()), size, size);
    }
  } //end drawRandomSquares()


  //////////////////////////////////////////////////////////////////////////////
  // Dwaws red "wounds" over character sprite to signify their healtrh being below 50%
  //////////////////////////////////////////////////////////////////////////////
  drawWounds(startX, startY){

    //100ms delay set to give sprites time to be drawn under wounds
    setTimeout(function(){
      for(var x=0; x<30; x++){
        var xRand = Math.floor(Math.random()*100);
        var yRand = Math.floor(Math.random()*90);
        ctx.fillStyle = "#771111";//"#303030";
        ctx.fillRect(startX + xRand, startY + yRand, 4, 13);
      }

      console.log("blood");
      }, 100);
  } //end drawWounds()


  //////////////////////////////////////////////////////////////////////////////
  // Draws the bar containing unit invormation of the left of the screen
  //////////////////////////////////////////////////////////////////////////////
  drawUnitBar(){

    //pink bar
    ctx.fillStyle = "#af197b";//"#303030";
    ctx.fillRect(0, 0, unitBarWidth, canvas.height);

    this.drawUnitInfo(0, 10, 10);
    this.drawUnitInfo(1, 10, 100);
    this.drawUnitInfo(2, 10, 190);
    this.drawUnitInfo(3, 10, 280);

  }//end drawUnitBar

  //////////////////////////////////////////////////////////////////////////////
  // Draws the bar containing the control buttons onmm the bottom of the screen
  //////////////////////////////////////////////////////////////////////////////
  drawControlBar(){

    //red bar
    ctx.fillStyle = "#441111";//"#303030";
    ctx.fillRect(0, (canvas.height/3)*2, canvas.width, canvas.height/3);

  }//end drawControlBar

  //////////////////////////////////////////////////////////////////////////////
  // Draws to the screen a given unit's name, hp bar, and spirit bar.
  //////////////////////////////////////////////////////////////////////////////
  drawUnitInfo(creature, x, y){
    ctx.save();

    ctx.font = "25px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(player.myCreatures[creature].name, x, y+30);
    ctx.fillText('Level: ' + player.myCreatures[creature].level, x, y+60);
    this.drawHPBar(creature, x,y+5);
    this.drawSpiritBar(creature, x, y + 38);

    ctx.restore;
  }//end drawUnitInfo()

  //////////////////////////////////////////////////////////////////////////////
  // Draws to the screen a hp bar. Called by drawUnitInfo().
  //////////////////////////////////////////////////////////////////////////////
  drawHPBar(creature, x, y){
    ctx.save();
    var percentHP = player.myCreatures[creature].currentHP/player.myCreatures[creature].maxHP;
    ctx.font = "12px Arial";
    //Draw outline of HP Bar
    ctx.fillStyle = "black";
    ctx.fillText('HP: ' + player.myCreatures[creature].currentHP+'/'+player.myCreatures[creature].maxHP, x+105, y+10);
    ctx.fillRect(x+105, y+15, 102, 12);
    //The HP bar will be colored according to how full the unit's health is
    if(percentHP>0.50){
      ctx.fillStyle = "green";
    }
    else if(percentHP>0.25){
      ctx.fillStyle = "yellow";
    }
    else{
      ctx.fillStyle = "red";
    }
    //Fill bar with respective amount of HP
    ctx.fillRect(x+106, y+16, percentHP*100, 10);
    ctx.restore;

  } //end drawHPBar()

  //////////////////////////////////////////////////////////////////////////////
  // Draws to the screen a spirit bar. Called by drawUnitInfo().
  //////////////////////////////////////////////////////////////////////////////
  drawSpiritBar(creature, x, y){
    ctx.save();
    var percentSpirit = player.myCreatures[creature].currentSpirit/player.myCreatures[creature].maxSpirit;
    ctx.font = "12px Arial";
    //Draw outline of HP Bar
    ctx.fillStyle = "black";
    ctx.fillText('Spirit: ' + player.myCreatures[creature].currentSpirit+'/'+player.myCreatures[creature].maxSpirit, x+105, y+10);
    ctx.fillRect(x+105, y+15, 102, 12);
    //Fill bar with respective amount of HP
    ctx.fillStyle = "blue";
    ctx.fillRect(x+106, y+16, percentSpirit*100, 10);
    ctx.restore;

  } //end drawSpiritBar()

  drawFriendlyUnits(){

    this.drawUnit(player.myCreatures[0].imgSrc, unitBarWidth + 50, 50);

    //this.drawWounds(0,0);

    this.drawUnit(player.myCreatures[1].imgSrc, unitBarWidth + 50, 200);

    this.drawUnit(player.myCreatures[2].imgSrc, unitBarWidth + 50, 350);

    this.drawUnit(player.myCreatures[2].imgSrc, unitBarWidth + 200, 50);

    this.drawUnit(player.myCreatures[3].imgSrc, unitBarWidth + 200, 200);

    this.drawUnit(player.myCreatures[3].imgSrc, unitBarWidth + 200, 350);

    //this.drawWounds(0,0);

  }//end drawFriendlyUnits()

  drawEnemyUnits(){
    this.drawUnit(enemyCreatures[0].imgSrc, unitBarWidth + 750, 50);

    this.drawUnit(enemyCreatures[0].imgSrc, unitBarWidth + 750, 200);

    this.drawUnit(enemyCreatures[0].imgSrc, unitBarWidth + 750, 350);
  }

  //////////////////////////////////////////////////////////////////////////////
  //  Draws a single unit sprite given the sprite file's location and x/y coodinates
  //////////////////////////////////////////////////////////////////////////////
  drawUnit(source, x, y){

    var newImg = new Image();

    newImg.addEventListener('load',function(){
      ctx.drawImage(newImg, x, y, 150, 150);
      console.log('poof');
    }, false);

    newImg.src = '' + source;

    console.log("drawn unit");

  }//end drawUnit()


  drawFlourish(x, y){

    var newImg = new Image();

    newImg.addEventListener('load',function(){
      ctx.drawImage(newImg, x, y, 230, 45);
      console.log('poof');
    }, false);

    newImg.src = 'media/images/gui/style/flourish-1.png';

  }//end drawUnit()

}


class CombatGrid{
  //////////////////////////////////////////////////////////////////////////////////////
  //
  //   Allies     Enemies
  //   [][]       [][]
  //   [][]       [][]
  //   [][]       [][]
  //
  //
  //
  //
  //////////////////////////////////////////////////////////////////////////////////////

}
