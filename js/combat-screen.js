//Written by Wyatt Dorn

class CombatScreen{

  /////////////////////////////////////////////////////////////////////////////\
  //    This class will handle displaying the combat screen as well as the
  //    action that takes place in combat
  /////////////////////////////////////////////////////////////////////////////\


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

    ctx.fillStyle = "#171b04";//"#303030";
    ctx.fillRect(0, 0, this.canvas.width, ctx.canvas.height);

    this.drawRandomSquares();
    this.drawUnitBar();
    this.drawControlBar();

    this.drawFriendlyUnits();
    this.drawEnemyUnits();
    this.drawSkulls();

    this.drawButtons();

    this.checkForWounds();
  }

  //////////////////////////////////////////////////////////////////////////////
  //  To be called when combat begins to draw "wounds" on all units starting combat wounded.
  //////////////////////////////////////////////////////////////////////////////
  checkForWounds(){

    //Check all allies first
    for(var x = 0; x < this.numAllies; x++){
      if(player.myCreatures[x].currentHP <= (player.myCreatures[x].maxHP/2)){
        this.drawWounds(unitBarWidth + 50 + (150*Math.floor(x/3)), 50+(150*(x%3)));
      }
    }

    //Check all enemies second
    for(var x = 0; x < this.numEnemies; x++){
      if(enemyCreatures[x].currentHP <= (enemyCreatures[x].maxHP/2)){
        this.drawWounds(unitBarWidth + 750 - (150*Math.floor(x/3)), 50+(150*(x%3)));
      }
    }
  }//end checkForWounds()

  //////////////////////////////////////////////////////////////////////////////
  //  Draws the buttons in the Control Bar. Called by drawControlBar().
  //////////////////////////////////////////////////////////////////////////////
  drawButtons(){
    //ctx.save();

    //Draw the buttons in black
    ctx.fillStyle = "#000000";
    ctx.fillRect(20, canvas.height - controlBarHeight + 20 , 200, 100);

    ctx.fillRect(20, canvas.height - controlBarHeight + 130 , 200, 100);

    ctx.fillRect(245, canvas.height - controlBarHeight + 20 , 400, 100);

    ctx.fillRect(245, canvas.height - controlBarHeight + 130 , 400, 100);

    ctx.fillRect(655, canvas.height - controlBarHeight + 20 , 400, 100);

    ctx.fillRect(655, canvas.height - controlBarHeight + 130 , 400, 100);

    ctx.fillRect(1080, canvas.height - controlBarHeight + 20 , 100, 100);

    ctx.fillRect(1080, canvas.height - controlBarHeight + 130 , 100, 100);



    //Draw text for buttons in white
    ctx.fillStyle = "#cccccc";
    ctx.font = "25px Arial";
    ctx.fillText("Menu", 50, canvas.height - controlBarHeight + 50);

    ctx.fillText("Items", 50, canvas.height - controlBarHeight + 160);

    ctx.fillText("Skill 1", 275, canvas.height - controlBarHeight + 50);

    ctx.fillText("Skill 3", 275, canvas.height - controlBarHeight + 160);

    ctx.fillText("Skill 2", 675, canvas.height - controlBarHeight + 50);

    ctx.fillText("Skill 4", 675, canvas.height - controlBarHeight + 160);

    this.drawMultipleLines("END TURN", 4, 25, 1095, canvas.height - controlBarHeight + 65);

    ctx.fillText("Run", 1100, canvas.height - controlBarHeight + 160);

    ctx.font = "15px Arial";
    ctx.fillStyle = "#aaaaaa";
    this.drawMultipleLines("This is a piece of sample flavor text for the first skill on screen.", 51, 20, 275, canvas.height - controlBarHeight + 80);

  }//end drawButtons()

  //////////////////////////////////////////////////////////////////////////////
  // Draws multiple lines of text from a single string
  //////////////////////////////////////////////////////////////////////////////
  drawMultipleLines(myString, maxLength, lineHeight, startX, startY){
    var tempString = "";

    for(var x = 0; x < (myString.length/maxLength); x++){
      tempString = "";
      for(var y = 0; y < maxLength; y++){
        if(myString.length <= y+(maxLength*x)){
          break;
        }
        tempString += ("" + myString[y + (maxLength * x)]);
      }
      ctx.fillText(tempString, startX, startY + (lineHeight * x));
    }

    /*prototype:
    for(var x = 0; x < (textString.length/10); x++){
      tempString = "";
      for(var y = 0; y < 10; y++){
        if(textString.length <= y+(10*x)){
          break;
        }
        tempString += ("" + textString[y+(10*x)]);
      }
      ctx.fillText(tempString, 275, canvas.height - controlBarHeight +70+(20*x));
      console.log(tempString + " - run: " + x);
    }
    */
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

      //Loop 30 times to create 30 "blood streaks"
      for(var x=0; x<30; x++){
        //Randomly fenerate the x and y coordinates
        var xRand = Math.floor(Math.random()*140);
        var yRand = Math.floor(Math.random()*130);

        //Fill style is red with a touch of tranparency
        ctx.fillStyle = "#771111cc";//"#303030";
        ctx.fillRect(startX + xRand, startY + yRand, 4, 13);
      }
    }, 100);
  } //end drawWounds()

  //////////////////////////////////////////////////////////////////////////////
  // Draws the bar containing unit invormation of the left of the screen
  //////////////////////////////////////////////////////////////////////////////
  drawUnitBar(){

    //pink bar
    ctx.fillStyle = "#af197b";//"#303030";
    ctx.fillRect(0, 0, unitBarWidth, canvas.height);

    this.drawUnitInfo();//0, 10, 10);
    //this.drawUnitInfo(1, 10, 100);
    //this.drawUnitInfo(2, 10, 190);
    //this.drawUnitInfo(3, 10, 280);

  }//end drawUnitBar

  //////////////////////////////////////////////////////////////////////////////
  // Draws the bar containing the control buttons onmm the bottom of the screen
  //////////////////////////////////////////////////////////////////////////////
  drawControlBar(){

    //red bar
    ctx.fillStyle = "#441111";//"#303030";
    ctx.fillRect(0, canvas.height - controlBarHeight, canvas.width, controlBarHeight);

  }//end drawControlBar

  //////////////////////////////////////////////////////////////////////////////
  // Draws to the screen a given unit's name, hp bar, and spirit bar.
  //////////////////////////////////////////////////////////////////////////////
  drawUnitInfo(){
    ctx.save();

    for(var i = 0; i < this.numAllies; i++){
      ctx.font = "25px Arial";
      ctx.fillStyle = "white";
      ctx.fillText(player.myCreatures[i].name, 10, 30+(90*i));
      ctx.fillText('Level: ' + player.myCreatures[i].level, 10, 65+(90*i));
      this.drawHPBar(i, 10, 5);
      this.drawSpiritBar(i, 10, 38);
    }

    this.drawFlourish();

    ctx.restore;
  }//end drawUnitInfo()

  //////////////////////////////////////////////////////////////////////////////
  // Draws to the screen a hp bar. Called by drawUnitInfo().
  //////////////////////////////////////////////////////////////////////////////
  drawHPBar(creature){
    ctx.save();
    var percentHP = player.myCreatures[creature].currentHP/player.myCreatures[creature].maxHP;
    ctx.font = "12px Arial";
    //Draw outline of HP Bar
    ctx.fillStyle = "black";
    ctx.fillText('HP: ' + player.myCreatures[creature].currentHP+'/'+player.myCreatures[creature].maxHP, 115, 20+(creature*90));
    ctx.fillRect(115, 25+(creature*90), 102, 12);
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
    ctx.fillRect(116, 26+(creature*90), percentHP*100, 10);
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
    ctx.fillText('Spirit: ' + player.myCreatures[creature].currentSpirit+'/'+player.myCreatures[creature].maxSpirit, 115, 50+(creature*90));
    ctx.fillRect(115, 55+(creature*90), 102, 12);
    //Fill bar with respective amount of HP
    ctx.fillStyle = "blue";
    ctx.fillRect(116, 56+(creature*90), percentSpirit*100, 10);
    ctx.restore;

  } //end drawSpiritBar()

  //////////////////////////////////////////////////////////////////////////////
  // Draws all friendly units to the screen by calling drawUnit().
  //////////////////////////////////////////////////////////////////////////////
  drawFriendlyUnits(){

    //Atarting x position is unitBarWidth plus 50
    var baseX = unitBarWidth + 50;

    //Loop through all the allies we have in combat
    for(var x = 0; x < this.numAllies; x++){
       //If we have more than 3 allies, the next row is 150 pixels to the right
      if(x==3){baseX += 150};
      this.drawUnit(player.myCreatures[x].imgSrc, baseX, 50+(150*(x%3)));
    }

  }//end drawFriendlyUnits()

  //////////////////////////////////////////////////////////////////////////////
  // Draws all enemy units to the screen by calling drawUnit().
  //////////////////////////////////////////////////////////////////////////////
  drawEnemyUnits(){

    //Atarting x position is unitBarWidth plus 50
    var baseX = unitBarWidth + 750;

    //Loop through all the allies we have in combat
    for(var x = 0; x < this.numEnemies; x++){
       //If we have more than 3 allies, the next row is 150 pixels to the right
      if(x==3){baseX -= 150};
      this.drawUnit(enemyCreatures[x].imgSrc, baseX, 50+(150*(x%3)));
    }

  }

  //////////////////////////////////////////////////////////////////////////////
  //  Draws a single unit sprite given the sprite file's location and x/y coodinates
  //////////////////////////////////////////////////////////////////////////////
  drawUnit(source, x, y){

    var newImg = new Image();

    newImg.addEventListener('load',function(){
      ctx.drawImage(newImg, x, y, 150, 150);
    }, false);

    newImg.src = '' + source;

  }//end drawUnit()

  //////////////////////////////////////////////////////////////////////////////
  //  Draws flourishes to the Unit Bar to seperate info for each unit.
  //////////////////////////////////////////////////////////////////////////////
  drawFlourish(){

    var newImg = new Image();

    newImg.addEventListener('load',function(){
      for(var x = 0; x < 5; x++){
        ctx.drawImage(newImg, 10, 65+(90*x), 230, 45);
      }
    }, false);

    newImg.src = 'media/images/gui/style/flourish-1.png';

  }//end drawFlourish()

  //////////////////////////////////////////////////////////////////////////////
  //  Draws line of skulls above the Control Bar
  //////////////////////////////////////////////////////////////////////////////
  drawSkulls(){

    //IN THE FUTURE, THIS SHOULD DRAW DIFFERENT COLORED SKULLS BASED ON THE TERRAIN TYPE

    var newImg = new Image();

    newImg.addEventListener('load',function(){
      for(var x = 0; x < 60; x++){
        ctx.drawImage(newImg, 20*x-2, 526, 24, 30);
      }
    }, false);

    newImg.src = 'media/images/gui/style/skull1-green.png';

  }//end drawSkulls()

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
