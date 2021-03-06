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

    this.buttonList = [];

    this.drawExpandedMessageBar = false;

    //Setting the dimentions of te gui assets in the Combat Screen
    this.unitBarWidth = 250;
    this.controlBarHeight = 250;

    this.eventLog = [];//[0] = "COMBT BEGINS!";

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

    //If a new string is passed, we add it to the queue
    if(myString){
      //Only 13 lines of text will fit on screee, so we cap the array at 13
      if(this.eventLog.length >= 13){
        this.eventLog.shift();
      }
      //push the new string to the array
      this.eventLog.push(myString);
    }

    ctx.save();
    ctx.fillStyle = "black";
    ctx.font = "20px Courier";

    if(!this.drawExpandedMessageBar){

      ctx.fillRect(this.unitBarWidth, 526, canvasWidth, 30);

      ctx.fillStyle = "#cccccc";
      ctx.fillText(this.eventLog[this.eventLog.length-1], this.unitBarWidth + 5, 546);

    }
    else{

      ctx.fillRect(this.unitBarWidth, 526, canvasWidth, 300);

      ctx.fillStyle = "#cccccc";

      //Draw all lines of text in the array in order from the top down
      for(let x = this.eventLog.length - 1; x >= 0; x--){
        ctx.fillText(this.eventLog[x], this.unitBarWidth + 5, 786 - 20 * (x + 13 - this.eventLog.length));
      }

    }

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
      this.drawControlBar();
      this.drawSkulls();
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
  //  Generate all buttons to be drawn to screen
  //////////////////////////////////////////////////////////////////////////////
  generateButtons(){

    let selectedAlly_ = player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]];

    ctx.fillStyle = "#000000";

    this.buttonList.push( {
      name: "Toggle Combat Log",
      text: "Combat Log",
      textOffset: [30, 55],
      fontSize: 25,
      fontStyle: "Arial",
      fontColor: "#ccc",
      buttonColor: "#000000",
      xPos: 20,
      yPos: canvas.height - this.controlBarHeight + 20,
      width: 200,
      height: 100,
      function: function a(){
        //tbd
      }
    });

    this.buttonList.push( {
      name: "Equipped Item",

      text: items[selectedAlly_.myItem].name,
      textOffset: [10, 30],
      fontSize: 20,
      fontStyle: "Arial",
      fontColor: "#ccc",

      imgSrc: items[selectedAlly_.myItem].image,
      imgSize: [35, 25],
      imgOffset: [145, 10],

      //multipleLines:

      buttonColor: "#000000",
      xPos: 20,
      yPos: canvas.height - this.controlBarHeight + 130,
      width: 200,
      height: 100,
      function: function a(){
        //tbd
      }
    });

    let btn;

    //Itterate through each button, drawing them to screen
    for(let x = 0; x < this.buttonList.length; x++){

      btn = this.buttonList[x];

      ctx.fillStyle = btn.buttonColor;
      ctx.fillRect(btn.xPos, btn.yPos, btn.width, btn.height);

      ctx.fillStyle = btn.fontColor;
      ctx.font = btn.fontSize + "px " + btn.fontStyle;
      ctx.fillText(btn.text, btn.xPos + btn.textOffset[0], btn.yPos + btn.textOffset[1]);

      if(btn.imgSrc){
        ctx.drawImage(btn.imgSrc, btn.xPos + btn.imgOffset[0], btn.yPos + btn.imgOffset[1], btn.imgSize[0], btn.imgSize[1]);
      }

    }

  }//end generateButtons()

  //////////////////////////////////////////////////////////////////////////////
  //  Draws the buttons in the Control Bar. Called by drawControlBar().
  //////////////////////////////////////////////////////////////////////////////
  drawButtons(){
    //ctx.save();

    //Draw the buttons in black
    ctx.fillStyle = "#000000";
    ctx.fillRect(245, canvas.height - this.controlBarHeight + 20 , 400, 100);
    ctx.fillRect(245, canvas.height - this.controlBarHeight + 130 , 400, 100);
    ctx.fillRect(655, canvas.height - this.controlBarHeight + 20 , 400, 100);
    ctx.fillRect(655, canvas.height - this.controlBarHeight + 130 , 400, 100);
    ctx.fillRect(1080, canvas.height - this.controlBarHeight + 20 , 100, 100);
    ctx.fillRect(1080, canvas.height - this.controlBarHeight + 130 , 100, 100);

    //Display info for the selected Creature's equipped Item
    ctx.fillStyle = "#cccccc";
    ctx.font = "20px Arial";
    //ctx.fillText(items[player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].myItem].name, 30, canvas.height - this.controlBarHeight + 160);
    //ctx.fillText(items.list[player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].myItem][1], 30, canvas.height - this.controlBarHeight + 160);
    ctx.font = "15px Courier";
    drawMultipleLines(items[player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].myItem].description, 20, 20, 30, canvas.height - this.controlBarHeight + 180);
    //drawMultipleLines(items.list[player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].myItem][3], 20, 20, 30, canvas.height - this.controlBarHeight + 180);

    //ctx.drawImage(items[player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].myItem].image, 175, canvas.height - this.controlBarHeight + 140, 35, 25);
    //ctx.drawImage(items.list[player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].myItem][5], 175, canvas.height - this.controlBarHeight + 140, 35, 25);

    //Print Skill text to the skill buttons
    for(var i = 0; i < 4; i++){//player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].skillList.length; i++){
      ctx.fillStyle = "#cccccc";
      ctx.font = "25px Arial";
      var x = 275;
      if(i%2==1){x = 675;}
      var y = 50;
      if(i>1){y=160;}
      ctx.fillText(masterSkillList[player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].skillList[i]].name, x + 30, canvas.height - this.controlBarHeight + y);
      ctx.fillStyle = "#8099ff";
      ctx.font = "10px Arial";
      ctx.fillText("Cost: ", x - 12 , canvas.height - this.controlBarHeight + y - 12);
      ctx.fillText(masterSkillList[player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].skillList[i]].cost, x - 5 , canvas.height - this.controlBarHeight + y + 3);
    }

    //Drawing the descriptor text for the four skills
    ctx.font = "15px Courier";
    ctx.fillStyle = "#aaaaaa";
    drawMultipleLines(masterSkillList[player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].skillList[0]].description, 42, 20, 265, canvas.height - this.controlBarHeight + 80);
    drawMultipleLines(masterSkillList[player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].skillList[1]].description, 42, 20, 665, canvas.height - this.controlBarHeight + 80);
    drawMultipleLines(masterSkillList[player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].skillList[2]].description, 42, 20, 265, canvas.height - this.controlBarHeight + 190);
    drawMultipleLines(masterSkillList[player.myCreatures[player.myCombatCreatures[combatLogi.selectedAlly]].skillList[3]].description, 42, 20, 665, canvas.height - this.controlBarHeight + 190);

    //Print text to the "RUN" and "END TURN" buttons
    ctx.fillStyle = "#cccccc";
    ctx.font = "25px Arial";
    drawMultipleLines("END TURN", 4, 25, 1095, canvas.height - this.controlBarHeight + 65);

    ctx.fillText("RUN", 1105, canvas.height - this.controlBarHeight + 185);

    this.generateButtons();

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

    //100ms delay set to give sprites time to be drawn under wounds (this may not be necessary any more)
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
    }, 0);
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

    //console.log(combatLogi.combatLogOpen);// combatLogi.combatLogOpen);

    console.log("------------------------------");

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
      ctx.fillText('Age: ' + player.myCreatures[player.myCombatCreatures[i]].age, 10, 65+(90*i));
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

    this.printMessageBar(false);

  }//end drawSkulls()

}
