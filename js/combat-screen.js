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

  }//end constructor()

  init(isPlayerTurn, context, canvas, locationIndex){

    //Setting the dimentions of te gui assets in the Combat Screen
    this.unitBarWidth = 250;
    this.controlBarHeight = 250;

    this.currentTime = new Date;//.getTime();
    this.randSeed = this.currentTime.getTime();
    Math.seedrandom(this.randSeed);

    this.locationIndex = locationIndex;

    this.colorScheme = mapLocations.list[locationIndex][5];

    ctx.fillStyle = this.colorScheme[0];//"#303030";
    ctx.fillRect(this.unitBarWidth, 0, this.canvas.width, ctx.canvas.height - this.controlBarHeight-24);

    this.drawRandomSquares();
    ctx.fillStyle = "#60584f";//"#af197b";//"#303030";
    ctx.fillRect(0, 0, this.unitBarWidth, ctx.canvas.height - this.controlBarHeight-24);
    this.drawUnitInfoBar();
    this.drawControlBar();

    this.drawFriendlyUnits();
    this.drawEnemyUnits();
    this.drawSkulls();
    this.drawFlourish();

    combatLogi.checkCreatureStatuses();

  }//end init()

  //////////////////////////////////////////////////////////////////////////////
  //  Prints a message to the onscreen Message Bar
  //////////////////////////////////////////////////////////////////////////////
  printMessageBar(myString){
    //console.log("Printing: " + myString);
    ctx.save();
    ctx.fillStyle = "black";
    ctx.fillRect(this.unitBarWidth, 526, canvasWidth, 30);

    ctx.font = "20px Courier";
    ctx.fillStyle = "#cccccc";
    ctx.fillText(myString, this.unitBarWidth + 5, 546);
    ctx.restore();
  }//end printMessageBar()


  //////////////////////////////////////////////////////////////////////////////
  // Testing drawing a check mark
  //////////////////////////////////////////////////////////////////////////////
  drawCheckMark(startX, startY){
    ctx.save();
    console.log("Drawing check!");
    ctx.fillStyle = "red";
    //ctx.fillRect(10, 10, 100, 1000);
    ctx.beginPath();
    ctx.moveTo(startX+5, startY+7);
    ctx.lineTo(startX+0, startY+13);
    ctx.lineTo(startX+13, startY+25);
    ctx.lineTo(startX+32, startY+6);
    ctx.lineTo(startX+26, startY+0);
    ctx.lineTo(startX+13, startY+15);
    ctx.fill();
    ctx.restore();
  }//end drawCheckMark()

  /////////////////////////////////////////////////////////////////////////////\
  //    This function takes three boolean inputs and redraws parts of the screen
  //    based on the inputs recieved.
  //  --THIS FUNCTION IS CURRENTLY UNNECCESARY, AND WILL BE REPLACED WITH A SIMPLER VERSION AT A LATER DATE
  /////////////////////////////////////////////////////////////////////////////\
  updateScreen(unitBar, controlBar, combatField){
    console.log("Updated screen.");
    if(unitBar){
      this.drawUnitInfoBar();
    }
    if(controlBar){
      //The buttons are the only part of the Control Bar that need updating once
      //combat starts, so the buttons are the only part that is redrawn.
      this.drawButtons();
    }
    if(combatField){
      ctx.fillStyle = mapLocations.list[this.locationIndex][5][0];//"#303030";
      ctx.fillRect(this.unitBarWidth, 0, this.canvas.width, ctx.canvas.height - this.controlBarHeight-24);
      this.drawRandomSquares();
      this.drawFriendlyUnits();
      this.drawEnemyUnits();
      combatLogi.checkCreatureStatuses();
    }
    this.testDrawEnemyHealth();

  }//end updateScreen()

  //////////////////////////////////////////////////////////////////////////////
  //  Draws the buttons in the Control Bar. Called by drawControlBar().
  //////////////////////////////////////////////////////////////////////////////
  drawButtons(){
    //ctx.save();

    //Draw the buttons in black
    ctx.fillStyle = "#000000";
    ctx.fillRect(20, canvas.height - this.controlBarHeight + 20 , 200, 100);
    ctx.fillRect(20, canvas.height - this.controlBarHeight + 130 , 200, 100);
    ctx.fillRect(245, canvas.height - this.controlBarHeight + 20 , 400, 100);
    ctx.fillRect(245, canvas.height - this.controlBarHeight + 130 , 400, 100);
    ctx.fillRect(655, canvas.height - this.controlBarHeight + 20 , 400, 100);
    ctx.fillRect(655, canvas.height - this.controlBarHeight + 130 , 400, 100);
    ctx.fillRect(1080, canvas.height - this.controlBarHeight + 20 , 100, 100);
    ctx.fillRect(1080, canvas.height - this.controlBarHeight + 130 , 100, 100);

    //Draw text for buttons in white
    ctx.fillStyle = "#cccccc";
    ctx.font = "25px Arial";
    ctx.fillText("Menu", 50, canvas.height - this.controlBarHeight + 50);

    //Display info for the selected Creature's equipped Item
    ctx.fillStyle = "#cccccc";
    ctx.font = "20px Arial";
    ctx.fillText(items.list[player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].myItem][1], 30, canvas.height - this.controlBarHeight + 160);
    ctx.font = "15px Courier";
    drawMultipleLines(items.list[player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].myItem][3], 20, 20, 30, canvas.height - this.controlBarHeight + 180);

    ctx.drawImage(items.list[player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].myItem][4], 175, canvas.height - this.controlBarHeight + 140, 35, 25);

    //Print Skill text to the skill buttons
    for(var i = 0; i < 4; i++){//player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].skillList.length; i++){
      ctx.fillStyle = "#cccccc";
      ctx.font = "25px Arial";
      var x = 275;
      if(i%2==1){x = 675;}
      var y = 50;
      if(i>1){y=160;}
      ctx.fillText(skills.skillList[player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].skillList[i]][2], x + 30, canvas.height - this.controlBarHeight + y);
      ctx.fillStyle = "#8099ff";
      ctx.font = "10px Arial";
      ctx.fillText("Cost: ", x - 12 , canvas.height - this.controlBarHeight + y - 12);
      ctx.fillText(skills.skillList[player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].skillList[i]][6], x - 5 , canvas.height - this.controlBarHeight + y + 3);
    }

    //Drawing the descriptor text for the four skills
    ctx.font = "15px Courier";
    ctx.fillStyle = "#aaaaaa";
    drawMultipleLines(skills.skillList[player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].skillList[0]][7], 42, 20, 265, canvas.height - this.controlBarHeight + 80);
    drawMultipleLines(skills.skillList[player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].skillList[1]][7], 42, 20, 665, canvas.height - this.controlBarHeight + 80);
    drawMultipleLines(skills.skillList[player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].skillList[2]][7], 42, 20, 265, canvas.height - this.controlBarHeight + 190);
    drawMultipleLines(skills.skillList[player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].skillList[3]][7], 42, 20, 665, canvas.height - this.controlBarHeight + 190);

    //Print text to the "RUN" and "END TURN" buttons
    ctx.fillStyle = "#cccccc";
    ctx.font = "25px Arial";
    drawMultipleLines("END TURN", 4, 25, 1095, canvas.height - this.controlBarHeight + 65);

    ctx.fillText("RUN", 1105, canvas.height - this.controlBarHeight + 185);

  }//end drawButtons()



  //////////////////////////////////////////////////////////////////////////////
  // Creates a textured background for the combat screen
  //////////////////////////////////////////////////////////////////////////////
  drawRandomSquares(baseColor, startX, endX, startY, endY){
    //Set the seed every time the function is called
    Math.seedrandom(this.randSeed);

    //First itteration (first color)
    for(var x=0; x<1000; x++){
      var size = Math.floor(Math.random() * 5)+7
      ctx.fillStyle = this.colorScheme[1];
      ctx.fillRect(this.unitBarWidth+ctx.canvas.width*(Math.random()), ctx.canvas.height*(Math.random())-this.controlBarHeight-size-23, size, size);
    }
    //Second itteration (second color)
    for(var x=0; x<1000; x++){
      var size = Math.floor(Math.random() * 5)+7
      ctx.fillStyle = this.colorScheme[2];
      ctx.fillRect(this.unitBarWidth+ctx.canvas.width*(Math.random()), ctx.canvas.height*(Math.random())-this.controlBarHeight-size-23, size, size);
    }
    //Third itteration (third color)
    for(var x=0; x<1000; x++){
      var size = Math.floor(Math.random() * 5)+7
      ctx.fillStyle = this.colorScheme[3];
      ctx.fillRect(this.unitBarWidth+ctx.canvas.width*(Math.random()), ctx.canvas.height*(Math.random())-this.controlBarHeight-size-23, size, size);
    }
  } //end drawRandomSquares()

  //////////////////////////////////////////////////////////////////////////////
  // Dwaws red "wounds" over character sprite to signify their healtrh being below 50%
  //////////////////////////////////////////////////////////////////////////////
  drawWounds(startX, startY){

    //Set the seed every time the function is called
    Math.seedrandom(this.randSeed + startX + startY);

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
  }//end drawWounds()

  //////////////////////////////////////////////////////////////////////////////
  // Draws the bar containing unit invormation of the left of the screen
  //////////////////////////////////////////////////////////////////////////////
  drawUnitInfoBar(){

    ctx.fillStyle = "#60584f";

    if(player.myCombatCreatures.length<6){ this.max = player.myCombatCreatures.length;}
    else{this.max = 6;}

    //Loop through all the allies we have in combat
    for(var i = 0; i < this.max; i++){
      ctx.fillRect(0, 10+(i*90), this.unitBarWidth, 65);
      this.drawUnitInfo(i);
      this.drawHPBar(i, 10, 5);
      this.drawSpiritBar(i, 10, 38);
      if(player.myCreatures[player.myCombatCreatures[i]].hasAction == false){
        this.drawCheckMark(215, 35 + 90*i);
      }
    }

  }//end drawUnitInfoBar

  //////////////////////////////////////////////////////////////////////////////
  // Draws the bar containing the control buttons onmm the bottom of the screen
  //////////////////////////////////////////////////////////////////////////////
  drawControlBar(){
    //red bar
    ctx.fillStyle = this.colorScheme[0];
    ctx.fillRect(0, canvas.height - this.controlBarHeight, canvas.width, this.controlBarHeight);

    this.drawButtons();

  }//end drawControlBar

  //////////////////////////////////////////////////////////////////////////////
  // Draws to the screen a given unit's name, hp bar, and spirit bar.
  //////////////////////////////////////////////////////////////////////////////
  drawUnitInfo(i){
      ctx.save();
      ctx.font = "25px Arial";
      ctx.fillStyle = "#cccccc";
      if(combatLogi.selectedAlly == i){
        ctx.fillStyle = "#fcc201";
      }
      ctx.fillText(player.myCreatures[player.myCombatCreatures[i]].name, 10, 30+(90*i));
      ctx.fillText('Level: ' + player.myCreatures[player.myCombatCreatures[i]].level, 10, 65+(90*i));
      ctx.restore();

  }//end drawUnitInfo()

  //////////////////////////////////////////////////////////////////////////////
  // Draws to the screen a hp bar. Called by drawUnitInfo().
  //////////////////////////////////////////////////////////////////////////////
  drawHPBar(creature){
    ctx.save();
    var percentHP = player.myCreatures[player.myCombatCreatures[creature]].currentHP/player.myCreatures[player.myCombatCreatures[creature]].maxHP;
    ctx.font = "12px Arial";
    //Draw outline of HP Bar
    ctx.fillStyle = "black";
    ctx.fillText('HP: ' + player.myCreatures[player.myCombatCreatures[creature]].currentHP+'/'+player.myCreatures[player.myCombatCreatures[creature]].maxHP, 115, 20+(creature*90));
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
    ctx.restore();

  } //end drawHPBar()

  //////////////////////////////////////////////////////////////////////////////
  // Draws to the screen a spirit bar. Called by drawUnitInfo().
  //////////////////////////////////////////////////////////////////////////////
  drawSpiritBar(creature, x, y){
    ctx.save();
    var percentSpirit = player.myCreatures[player.myCombatCreatures[creature]].currentSpirit/player.myCreatures[player.myCombatCreatures[creature]].maxSpirit;
    ctx.font = "12px Arial";
    //Draw outline of HP Bar
    ctx.fillStyle = "black";
    ctx.fillText('Spirit: ' + player.myCreatures[player.myCombatCreatures[creature]].currentSpirit+'/'+player.myCreatures[player.myCombatCreatures[creature]].maxSpirit, 115, 50+(creature*90));
    ctx.fillRect(115, 55+(creature*90), 102, 12);
    //Fill bar with respective amount of HP
    ctx.fillStyle = "blue";
    ctx.fillRect(116, 56+(creature*90), percentSpirit*100, 10);
    ctx.restore();

  } //end drawSpiritBar()

  //////////////////////////////////////////////////////////////////////////////
  // Draws all friendly units to the screen by calling drawUnit().
  //////////////////////////////////////////////////////////////////////////////
  drawFriendlyUnits(){
    //Starting x position is this.unitBarWidth plus 50
    var baseX = this.unitBarWidth + 50;

    if(player.myCombatCreatures.length<6){ this.max = player.myCombatCreatures.length;}
    else{this.max = 6;}

    //Loop through all the allies we have in combat
    for(var x = 0; x < this.max; x++){
       //If we have more than 3 allies, the next row is 150 pixels to the right
      if(x==3){baseX += 150};
      if(player.myCreatures[player.myCombatCreatures[x]].isDead()){
        this.drawUnit(imageLoader.pileOfBonesImg, baseX, 50+(150*(x%3)), true);
      }
      else{
        //ctx.save();
        //ctx.shadowBlur = 30;
        //ctx.shadowColor = guts.list[player.myCreatures[player.myCombatCreatures[x]].myOrgans[1]][4];
        drawFriendlyCreature(player.myCombatCreatures[x], baseX, 50+(150*(x%3)));
        //this.drawUnit(player.myCreatures[player.myCombatCreatures[x]].imgSrc, baseX, 50+(150*(x%3)), true);
        //ctx.restore();
      }
    }
  }//end drawFriendlyUnits()

  //////////////////////////////////////////////////////////////////////////////
  // Draws all enemy units to the screen by calling drawUnit().
  //////////////////////////////////////////////////////////////////////////////
  drawEnemyUnits(){
    ctx.save();

    //Starting x position is this.unitBarWidth plus 50
    var baseX = this.unitBarWidth + 750;

    //Loop through all the allies we have in combat
    for(var x = 0; x < enemyCreatures.length; x++){
       //If we have more than 3 allies, the next row is 150 pixels to the right
      if(x==3){baseX -= 150};

      if(enemyCreatures[x].isDead()){
        this.drawUnit(imageLoader.pileOfBonesImg, baseX, 50+(150*(x%3)), false);
      }
      else{
        this.drawUnit(enemyCreatures[x].imgSrc, baseX, 50+(150*(x%3)), false);
      }
    }

    this.testDrawEnemyHealth();

    ctx.restore();

  }//end drawEnemyUnits()

  //////////////////////////////////////////////////////////////////////////////
  // FOR TESTING PURPOSES ONLY. Draws the health of enemy units to the screen
  //////////////////////////////////////////////////////////////////////////////
  testDrawEnemyHealth(){
    ctx.font = "12px Arial";

    var baseX = this.unitBarWidth + 750;

    //Loop through all the allies we have in combat
    for(var x = 0; x < enemyCreatures.length; x++){
       //If we have more than 3 allies, the next row is 150 pixels to the right
      if(x==3){baseX -= 150};
      ctx.fillStyle = "black";
      ctx.fillRect(baseX, 50+(150*(x%3)), 25, 25);
      ctx.fillStyle = "white";
      ctx.fillText(enemyCreatures[x].currentHP , baseX+10, 10+50+(150*(x%3)));
    }

  }//end testDrawEnemies()

  //////////////////////////////////////////////////////////////////////////////
  //  Draws a single unit sprite given the sprite file's location and x/y coodinates
  //////////////////////////////////////////////////////////////////////////////
  drawUnit(source, x, y, isAlly){
    ctx.save();

    if(isAlly){
      ctx.drawImage(source, x, y, 150, 150);
    }
    else{
      // translate context to center of canvas
        ctx.translate(canvas.width+x-35, 0);

        // flip context horizontally
        ctx.scale(-1, 1);
        ctx.drawImage(source, x, y, 150, 150);
    }
    ctx.restore();
  }//end drawUnit()

  //////////////////////////////////////////////////////////////////////////////
  //  Draws flourishes to the Unit Bar to seperate info for each unit.
  //////////////////////////////////////////////////////////////////////////////
  drawFlourish(){

    for(var x = 0; x < 5; x++){
      ctx.drawImage(imageLoader.combatScreenFlourishImg, 10, 65+(90*x), 230, 45);
    }

  }//end drawFlourish()

  //////////////////////////////////////////////////////////////////////////////
  //  Draws line of skulls above the Control Bar
  //////////////////////////////////////////////////////////////////////////////
  drawSkulls(){
    ctx.fillStyle = "#191919";
    ctx.fillRect(0, 526, canvasWidth, 30);

    for(var x = 0; x < 13; x++){
      ctx.drawImage(imageLoader.combatScreenSkullsImg, 20*x-13, 526, 24, 30);
    }

    this.printMessageBar();

  }//end drawSkulls()

}
