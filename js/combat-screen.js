class CombatScreen{

  //////////////////////////////////////////////////////////////////////////////////////
  //    This class will handle displaying the combat screen as well as the
  //    action that takes place in combat
  //////////////////////////////////////////////////////////////////////////////////////


  //////////////////////////////////////////////////////////////////////////////////////
  //    The arrays of enemy and player-controlled units are passed to the constructor
  //////////////////////////////////////////////////////////////////////////////////////
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
  }

  combatClickHandler(x,y){
    console.log("Combat click: (", x, ",",y,")");
  }

  printNumAllies(){
    console.log(this.numAllies);
  }

  // drawRandomSquares() creates a textured background for the combat screen
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
  } //end drawRandomSquares


  // drawUnitBar() draws the bar containing unit invormation of the left of the screen
  drawUnitBar(){

    //pink bar
    ctx.fillStyle = "#af197b";//"#303030";
    ctx.fillRect(0, 0, unitBarWidth, canvas.height);

    this.drawUnitInfo(0, 10, 10);
    this.drawUnitInfo(1, 10, 70);
    this.drawUnitInfo(2, 10, 130);
    this.drawUnitInfo(3, 10, 190);

  }//end drawUnitBar

  // drawControlBar() draws the bar containing the control buttons onmm the bottom of the screen
  drawControlBar(){

    //red bar
    ctx.fillStyle = "#441111";//"#303030";
    ctx.fillRect(0, (canvas.height/3)*2, canvas.width, canvas.height/3);

  }//end drawControlBar

  drawUnitInfo(creature, x, y){
    ctx.save();
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";

    ctx.fillText(myCreatures[creature].name, x, y+20);
    ctx.fillText('Level: ' + myCreatures[creature].level, x, y+40);
    this.drawHPBar(creature, x,y);


    ctx.restore;
  }//end drawUnitInfo()

  drawHPBar(creature, x, y){
    ctx.save();
    var percentHP = myCreatures[creature].currentHP/myCreatures[creature].maxHP;
    ctx.font = "12px Arial";
    //Draw outline of HP Bar
    ctx.fillStyle = "black";
    ctx.fillText('HP: ' + myCreatures[creature].currentHP+'/'+myCreatures[creature].maxHP, x+105, y+10);
    ctx.fillRect(x+105, y+15, 102, 12);
    //Fill bar with respective amount of HP
    if(percentHP>0.50){
      ctx.fillStyle = "green";
    }
    else if(percentHP>0.25){
      ctx.fillStyle = "yellow";
    }
    else{
      ctx.fillStyle = "red";
    }
    ctx.fillRect(x+106, y+16, percentHP*100, 10);
    ctx.restore;

  } //end drawHPBar()

  drawFriendlyUnits(){

    this.drawUnit(myCreatures[0].imgSrc, unitBarWidth + 50, 50);

    this.drawUnit(myCreatures[1].imgSrc, unitBarWidth + 50, 200);

    this.drawUnit(myCreatures[2].imgSrc, unitBarWidth + 50, 350);

    this.drawUnit(myCreatures[2].imgSrc, unitBarWidth + 200, 50);

    this.drawUnit(myCreatures[3].imgSrc, unitBarWidth + 200, 200);

    this.drawUnit(myCreatures[3].imgSrc, unitBarWidth + 200, 350);

  }//end drawFriendlyUnits()

  drawEnemyUnits(){
    this.drawUnit(enemyCreatures[0].imgSrc, unitBarWidth + 750, 50);

    this.drawUnit(enemyCreatures[0].imgSrc, unitBarWidth + 750, 200);

    this.drawUnit(enemyCreatures[0].imgSrc, unitBarWidth + 750, 350);
  }

  drawUnit(source, x, y){

    var newImg = new Image();

    newImg.addEventListener('load',function(){
      ctx.drawImage(newImg, x, y, 150, 150);
      console.log('poof');
    }, false);

    newImg.src = '' + source;

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
