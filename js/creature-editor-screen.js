//Written by Wyatt Dorn

class CreatureEditorScreen{

  constructor(context, canvas){

      this.ctx = context;
      this.canvas = canvas;

  }//end constructor()

  init(){

    this.buttonStyle = "rgba(119, 17, 17, 0.80)";

    //For tutorial purposes
    worldMap.travelEnabled = true;

    //set width for left column on screen
    this.creatureListWidth = 200;
    this.creatureScrollIndex = 0;
    this.organScrollIndex = 0;
    this.skillScrollIndex = 0;
    this.selectedCreature = 0;
    this.selectedOrganType = 0;//at launch, Body are selected by default
    this.statBlockStart = [210, 215];

    //this.inventoryList = [player.myOrgans[0], player.myOrgans[1], player.myOrgans[2], player.myEquipableItems];

    player.myCreatures[this.selectedCreature].calculateBuffs();

    this.updateScreen();
  } //end init()

  //////////////////////////////////////////////////////////////////////////////
  //  Draws a black rectangle over the screen to clear it out between drawings
  //////////////////////////////////////////////////////////////////////////////
  clearScreen(){
    //black out the screen, covering whatever was drawn previously
    ctx.fillStyle = "#272727";
    ctx.fillRect(0, 0, this.canvas.width, ctx.canvas.height);

    ctx.drawImage(imageLoader.creatureEditorBackgroundImg, 0, 0);//, 1200, 700);

  }//end clearScreen()

  //////////////////////////////////////////////////////////////////////////////
  //  Draws buttons for scrolling up/down the list of owned Creatures
  //////////////////////////////////////////////////////////////////////////////
  drawScrollButtons(){
    ctx.save();
    ctx.fillStyle = "white";
    //up arrow
    ctx.beginPath();
    ctx.moveTo(100, 5);
    ctx.lineTo(75, 25);
    ctx.lineTo(125, 25);
    ctx.fill();
    //down arrow
    ctx.beginPath();
    ctx.moveTo(100, ctx.canvas.height - 5);
    ctx.lineTo(75, ctx.canvas.height - 25);
    ctx.lineTo(125, ctx.canvas.height - 25);
    ctx.fill();

    ctx.restore();
  }//end drawScrollButtons()

  //////////////////////////////////////////////////////////////////////////////
  //  Draws buttons for selecting what list of organs is viweable
  //////////////////////////////////////////////////////////////////////////////
  drawButtons(){
    ctx.save();
    ctx.fillStyle = this.buttonStyle;

    for(var x = 0; x < 4; x++){
      ctx.fillRect(this.creatureListWidth + 10, 620 + (45 * x), 90, 35);
    }

    //ctx.fillRect(this.creatureListWidth + 10, 620, 90, 35);
    //ctx.fillRect(this.creatureListWidth + 10, 665, 90, 35);
    //ctx.fillRect(this.creatureListWidth + 10, 710, 90, 35);
    //ctx.fillRect(this.creatureListWidth + 10, 755, 90, 35);

    ctx.font = "25px Arial";
    ctx.fillStyle = "#cccccc";
    if(this.selectedOrganType == 0){ctx.fillStyle = "#fcc201";}
    ctx.fillText('Body', this.creatureListWidth + 15, 645);
    ctx.fillStyle = "#cccccc";
    if(this.selectedOrganType == 1){ctx.fillStyle = "#fcc201";}
    ctx.fillText('Guts', this.creatureListWidth + 15, 690);
    ctx.fillStyle = "#cccccc";
    if(this.selectedOrganType == 2){ctx.fillStyle = "#fcc201";}
    ctx.fillText('Head', this.creatureListWidth + 15, 735);
    ctx.fillStyle = "#cccccc";
    if(this.selectedOrganType == 3){ctx.fillStyle = "#fcc201";}
    ctx.fillText('Items', this.creatureListWidth + 15, 780);

    ctx.restore();
  }//end drawButtons()

  //////////////////////////////////////////////////////////////////////////////
  //  Draws scrolling list, of all player-owned Creatures, on the left of the screen
  //////////////////////////////////////////////////////////////////////////////
  drawCreatureList(){


    //ctx.globalAlpha = 0.80;
    ctx.fillStyle = this.buttonStyle;
    ctx.fillRect(0, 0, this.creatureListWidth, ctx.canvas.height);

    //Check if the player owns less than 8 Creatures
    if(player.myCreatures.length < 8){this.max = player.myCreatures.length;}
    else{this.max = 8;}

    for(var i = 0; i < this.max; i++){
      ctx.save();
      //If a Creature is in our Combat Party, a burgundy diamond is drawn behing their info
      for(var x = 0; x < player.myCombatCreatures.length; x++){
        if(i + this.creatureScrollIndex == player.myCombatCreatures[x]){
          ctx.fillStyle = "#550505";
          ctx.beginPath();
          ctx.moveTo(10, 69+(90*i));
          ctx.lineTo((this.creatureListWidth-5)/2, 40+(90*i));
          ctx.lineTo(this.creatureListWidth-15, 69+(90*i));
          ctx.lineTo((this.creatureListWidth-5)/2, 97+(90*i));
          ctx.fill();

        }
      }

      ctx.font = "25px Arial";
      ctx.fillStyle = "#cccccc";

      //If the Creature is currently selected, draw text in gold instead
      if(this.selectedCreature == this.creatureScrollIndex + i){
        ctx.fillStyle = "#fcc201";
      }
      ctx.fillText(player.myCreatures[this.creatureScrollIndex + i].name, 10, 60+(90*i));
      ctx.fillText('Level: ' + player.myCreatures[this.creatureScrollIndex + i].level, 10, 95+(90*i));

      //If the Creature has a body, draw an "B" to indicate it
      if(player.myCreatures[this.creatureScrollIndex + i].myBody != 0){
        ctx.fillText("B", 180, 60+(90*i));
      }
      //If the Creature has guts, draw a "G" to indicate it
      if(player.myCreatures[this.creatureScrollIndex + i].myGuts != 0){
        ctx.fillText("G", 178, 80+(90*i));
      }
      //If the Creature has a head, draw an "H" to indicate it
      if(player.myCreatures[this.creatureScrollIndex + i].myHead != 0){
        ctx.fillText("H", 180, 100+(90*i));
      }

      ctx.restore();
    }
  }//end drawCreatureList()

  //////////////////////////////////////////////////////////////////////////////
  //  Clears the screen, and redraws all the info
  //////////////////////////////////////////////////////////////////////////////
  updateScreen(){
    this.clearScreen();
    this.drawCreatureList();
    this.drawScrollButtons();
    this.drawSelectedCreature();
    this.drawButtons();
    this.drawOrganList();
    this.drawMemorizedSkills();
    this.drawBackButton();
    this.drawEquippedItem();
    this.drawAddRemovePartyButton();

    //console.log(items.list[player.inventoryList[3][0]][1]);

  }//end updateScreen()

  //////////////////////////////////////////////////////////////////////////////
  //  Draw list of owned organs
  //////////////////////////////////////////////////////////////////////////////
  drawOrganList(){
    ctx.save();
    //Rectangle to  hold list
    ctx.fillStyle = this.buttonStyle;
    ctx.fillRect(310, 620, 880, 170);

    ctx.fillStyle = "#cccccc";
    //left arrow
    ctx.beginPath();
    ctx.moveTo(315, 705);
    ctx.lineTo(335, 655);
    ctx.lineTo(335, 755);
    ctx.fill();

    //right arrow
    ctx.beginPath();
    ctx.moveTo(1185, 705);
    ctx.lineTo(1165, 655);
    ctx.lineTo(1165, 755);
    ctx.fill();

    //Draw seperator bars
    for(var x = 0; x < 5; x++){
      ctx.fillStyle = "#272727";
      ctx.fillRect(145 + (200 * (x+1)), 635, 10, 150);
    }

    //First, we make sure that the array exists
    if(player.inventoryList[this.selectedOrganType]){
      //If there are less than 4 of a given organ type, only print that many,
      //If there's 4 or more of the organ type, print 4 at a time
      if(player.inventoryList[this.selectedOrganType].length < 4){this.max = player.inventoryList[this.selectedOrganType].length;}
      else{this.max = 4;}
    }
    else{
      this.max = 0;
    }

    if(this.selectedOrganType == 3){
      //Print out the name and description of the owned organs
      for(var x = 0; x < this.max; x++){
        ctx.font = "20px Arial";
        ctx.fillStyle = "#cccccc";
        //Print the name of the organ
        ctx.fillText(items.list[player.inventoryList[this.selectedOrganType][x + this.organScrollIndex]][1], this.creatureListWidth + 160 + (200 * x), 650);
        ctx.font = "10px Arial";
        ctx.fillStyle = "#999999";
        ctx.fillText(x + this.organScrollIndex, this.creatureListWidth + 160 + (200 * x), 780);
        ctx.font = "15px Courier";
        ctx.fillStyle = "#aaaaaa";
        //Print the flavor text for the organ
        drawMultipleLines(items.list[player.inventoryList[this.selectedOrganType][x + this.organScrollIndex]][3], 20, 20, this.creatureListWidth + 160 + (200 * x), 675);
        ctx.font = "20px Arial";
        ctx.fillStyle = "#cccccc";
        //Draw the "EQUIP" buttons
        ctx.fillText("EQUIP", 420 + (200 * x), 780);
      }
    }
    else{
      //Print out the name and description of the owned organs
      for(var x = 0; x < this.max; x++){
        ctx.font = "20px Arial";
        ctx.fillStyle = "#cccccc";
        //Print the name of the organ
        //console.log(player.inventoryList[x + this.organScrollIndex][x]);
        //console.log(organs[this.selectedOrganType].list[player.inventoryList[x + this.organScrollIndex][1]][1]);
        ctx.fillText(organs[this.selectedOrganType].list[player.inventoryList[this.selectedOrganType][x + this.organScrollIndex]][1], this.creatureListWidth + 160 + (200 * x), 650);
        ctx.font = "10px Arial";
        ctx.fillStyle = "#999999";
        ctx.fillText(x + this.organScrollIndex, this.creatureListWidth + 160 + (200 * x), 780);
        ctx.font = "15px Courier";
        ctx.fillStyle = "#aaaaaa";
        //Print the flavor text for the organ
        //console.log(player.inventoryList[this.selectedOrganType] [x + this.organScrollIndex] [3]);
        //organs[this.selectedOrganType].list[player.inventoryList[x + this.organScrollIndex]][2]
        drawMultipleLines(organs[this.selectedOrganType].list[player.inventoryList[this.selectedOrganType][x + this.organScrollIndex]][3], 20, 20, this.creatureListWidth + 160 + (200 * x), 675);
        //drawMultipleLines(player.inventoryList[this.selectedOrganType][x + this.organScrollIndex][3], 20, 20, this.creatureListWidth + 160 + (200 * x), 675);
        ctx.font = "20px Arial";
        ctx.fillStyle = "#cccccc";
        //Draw the "EQUIP" buttons
        ctx.fillText("EQUIP", 420 + (200 * x), 780);
      }
    }

    ctx.restore();
  }//end drawOrganList()

  //////////////////////////////////////////////////////////////////////////////
  //  Draw the button to add/remove a Creature from the combat party
  //////////////////////////////////////////////////////////////////////////////
  drawAddRemovePartyButton(){
    ctx.save();

    ctx.fillStyle = "771111";
    ctx.fillRect(210, 170, 210, 35);

    ctx.font = "20px Arial";
    ctx.fillStyle = "#cccccc";

    //If the creature has a body, allow it to be added
    if(player.myCreatures[this.selectedCreature].myBody!=0){
      this.text = "Add to party"
    }
    //If the creature does not have a body, notify the Player
    else{
      ctx.font = "17px Arial";
      this.text = "Cannot add without body.";
    }

    //Check if the creature is in the Player's party
    for(var x = 0; x < player.myCombatCreatures.length; x++){
      if(this.selectedCreature == player.myCombatCreatures[x]){
        this.text = "Remove from party";
      }
    }

    ctx.fillText(this.text, 220, 195);

    ctx.restore();
  }//end drawAddRemovePartyButton()

  //////////////////////////////////////////////////////////////////////////////
  //  Add or remove a Creature from the combat party
  //////////////////////////////////////////////////////////////////////////////
  addRemoveParty(){

    //The combat party must always have at least one member
    if(player.myCombatCreatures.length > 1){
      //Check to see if the party alraedy contains the selected Creature
      for(var x = 0; x < player.myCombatCreatures.length; x++){
        if(this.selectedCreature == player.myCombatCreatures[x]){
          //If the Creature is already in the party, we remove them and exit the function
          player.myCombatCreatures.splice(x, 1);
          this.updateScreen();
          return;
        }
      }
    }

    //If the Creature was not already in the party, we check that we have not reached the maximum size for the party
    //We also ensure that the creature has a body in order to be added to the party
    if(player.myCombatCreatures.length < player.maxPartySize && player.myCreatures[this.selectedCreature].myBody!=0){
      //Add the Creature to the party
      player.myCombatCreatures.push(this.selectedCreature);
      this.updateScreen();
    }
    else{
      console.log("PARTY SIZE HAS BEEN REACHED");
    }
  }


  //////////////////////////////////////////////////////////////////////////////
  //  Draw the list of memorized skills for the selected Creature
  //////////////////////////////////////////////////////////////////////////////
  drawMemorizedSkills(){
    ctx.save();
    ctx.fillStyle = this.buttonStyle;

    ctx.fillRect(870, 100, 320, 305);
    ctx.beginPath();
    ctx.moveTo(870, 405);
    ctx.lineTo(1030, 425);
    ctx.lineTo(1190, 405);
    ctx.fill();

    ctx.fillRect(870, 435, 320, 170);
    ctx.beginPath();
    ctx.moveTo(870, 435);
    ctx.lineTo(870, 415);
    ctx.lineTo(1030, 435);
    ctx.lineTo(1190, 415);
    ctx.lineTo(1190, 435);
    ctx.fill();

    if(player.myCreatures[this.selectedCreature].memorizedSkills.length == 0){
      ctx.font = "20px Arial";
      ctx.fillStyle = "#cccccc";
      //Draw the "EQUIP" buttons
      ctx.fillText("No skills memorized", 880, 140);
    }
    else{
      ctx.font = "20px Arial";
      ctx.fillStyle = "#cccccc";
      if(player.myCreatures[this.selectedCreature].memorizedSkills.length < 6){this.max = player.myCreatures[this.selectedCreature].memorizedSkills.length;}
      else{this.max = 6;}
      for(var x = 0; x < this.max; x++){
        ctx.fillText(skills.skillList[player.myCreatures[this.selectedCreature].memorizedSkills[x + this.skillScrollIndex][0]][2], 880, 140 + (x * 50));
        //ctx.fillText(player.myCreatures[this.selectedCreature].memorizedSkills[x][1], 1080, 125 + (x * 50));
        this.drawMemorizationBar(x + this.skillScrollIndex);
      }
    }

    ctx.font = "20px Arial";
    ctx.fillStyle = "#cccccc";
    ctx.fillText(skills.skillList[player.myCreatures[this.selectedCreature].skillList[3]][2], 880, 470);
    ctx.font = "15px Courier";
    ctx.fillStyle = "#aaaaaa";
    drawMultipleLines(skills.skillList[player.myCreatures[this.selectedCreature].skillList[3]][7], 32, 20, 880, 500);

    //draw scroll arrows
    ctx.beginPath();
    ctx.moveTo(1030, 105);
    ctx.lineTo(1010, 115);
    ctx.lineTo(1050, 115);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(1030, 415);
    ctx.lineTo(1010, 405);
    ctx.lineTo(1050, 405);
    ctx.fill();

    ctx.restore();
  }//end drawMemorizedSkills()

  //////////////////////////////////////////////////////////////////////////////
  //  Draw the progress bar of how much progress a Creature has made to memorizing a new skill
  //////////////////////////////////////////////////////////////////////////////
  drawMemorizationBar(index){
    ctx.save();
    var percentMemorized = player.myCreatures[this.selectedCreature].memorizedSkills[index][1] / skills.skillList[player.myCreatures[this.selectedCreature].memorizedSkills[index][0]][8]; //.currentHP/player.myCreatures[creature].maxHP;
    ctx.font = "12px Arial";
    //Draw outline of HP Bar
    ctx.fillStyle = "black";
    ctx.fillText(percentMemorized, 1080, 140 + (index * 50));


    ctx.fillRect(1080, 128 + (index * 50), 102, 12);
    //The HP bar will be colored according to how full the unit's health is
    if(percentMemorized >= 1){
      ctx.fillStyle = "blue";
    }
    else if(percentMemorized>0.50){
      ctx.fillStyle = "green";
    }
    else if(percentMemorized>0.25){
      ctx.fillStyle = "yellow";
    }
    else{
      ctx.fillStyle = "red";
    }
    //Fill bar with respective amount of HP
    ctx.fillRect(1081, 129 + (index * 50), percentMemorized*100, 10);

    ctx.restore();
  }//end drawMemorizationBar()

  //////////////////////////////////////////////////////////////////////////////
  //  Draw the selected Creature's sprite, along with their pertinent information
  //////////////////////////////////////////////////////////////////////////////
  drawSelectedCreature(){
    drawFriendlyCreature(this.selectedCreature, 250, 20);
    //this.drawUnit(player.myCreatures[this.selectedCreature].imgSrc, head.list[player.myCreatures[this.selectedCreature].myHead][4], 250, 20);
    this.drawStats();
    this.drawCreatureOrgans();
  }//end drawSelectedCreature()

  //////////////////////////////////////////////////////////////////////////////
  //  Draw the creature's equipped organs
  //////////////////////////////////////////////////////////////////////////////
  drawCreatureOrgans(){
    ctx.save();
    ctx.fillStyle = this.buttonStyle;

    //Store whether or not this creature is in the player's party
    this.isInParty = false;

    //Draw the red rectangle containers for the three organs
    for(var x = 0; x < 3; x++){
      ctx.fillRect(430, 15 + (200 * x), 200, 190);
      ctx.beginPath();
      ctx.moveTo(630, 15 + (200 * x));
      ctx.lineTo(630, 205 + (200 * x));
      ctx.lineTo(650, 110 + (200 * x));
      ctx.fill();
    }

    for(let x = 0; x < player.myCombatCreatures.length; x++){
      if(player.myCombatCreatures[x] == this.selectedCreature){
        this.isInParty = true;
      }
    }

    for(var x = 0; x < 3; x++){
      //Print the name & description of the Creature's equipped Organs
      ctx.font = "20px Arial";
      ctx.fillStyle = "#cccccc";
      ctx.fillText(organs[x].list[player.myCreatures[this.selectedCreature].myOrgans[x]][1], 435, 40 + (200 * x));
      ctx.font = "15px Courier";
      ctx.fillStyle = "#aaaaaa";
      drawMultipleLines(organs[x].list[player.myCreatures[this.selectedCreature].myOrgans[x]][3], 21, 20, 435, 65 + (200 * x));

      ctx.font = "15px Arial";
      ctx.fillStyle = "#cccccc";
      if(x == 0 && this.isInParty){ctx.fillStyle = "#555555";}
      ctx.fillText("UNEQUIP", 500, 200 * (x + 1));

    }
    ctx.restore();

    this.drawCreatureSkills();
  }//end drawCreatureOrgans()

  //////////////////////////////////////////////////////////////////////////////
  //  Draw the selected Creature's skills based on their equipped organs
  //////////////////////////////////////////////////////////////////////////////
  drawCreatureSkills(){
    ctx.save();

    //Draw the red rectangle containers for the three skills
    ctx.fillStyle = this.buttonStyle;
    for(var x = 0; x < 3; x++){
      ctx.fillRect(660, 15 + (200 * x), 200, 190);
      ctx.beginPath();
      ctx.moveTo(640, 15 + (200 * x));
      ctx.lineTo(660, 110 + (200 * x));
      ctx.lineTo(640, 205 + (200 * x));
      ctx.lineTo(660, 205 + (200 * x));
      ctx.lineTo(660, 15 + (200 * x));
      ctx.fill();
    }

    for(var x = 0; x < 3; x++){
      //Print the name & description of the skills associated with this Creature's Organs
      ctx.font = "20px Arial";
      ctx.fillStyle = "#cccccc";
      ctx.fillText(skills.skillList[player.myCreatures[this.selectedCreature].skillList[x]][2], 670, 40 + (200 * x));
      ctx.fillText("Buff: ", 670, 195 + (200 * x));

      ctx.font = "15px Courier";
      ctx.fillStyle = "#aaaaaa";
      drawMultipleLines(skills.skillList[player.myCreatures[this.selectedCreature].skillList[x]][7], 20, 20, 670, 65 + (200 * x));

      //If the organ provides a buff, display the buff, otherwise print "none"
      if(organs[x].list[player.myCreatures[this.selectedCreature].myOrgans[x]][4] == false){
        this.buffOutput = "none";
      }
      else{
        this.buffOutput = this.printBuff(organs[x].list[player.myCreatures[this.selectedCreature].myOrgans[x]][4]);
      }
      ctx.fillText(this.buffOutput, 720, 193 + (200 * x));

    }
    ctx.restore();
  }//end drawCreatureSkills()


  //////////////////////////////////////////////////////////////////////////////
  //  Return the buff a creature is given from an organ
  //////////////////////////////////////////////////////////////////////////////
  printBuff(buff){
    return(statList[buff[0]] + ": +" + buff[1]);
  }//end printBuff();

  //////////////////////////////////////////////////////////////////////////////
  //  Draw the selected Creature's equp item
  //////////////////////////////////////////////////////////////////////////////
  drawEquippedItem(){
    ctx.save();

    //Draw red rectangle container
    ctx.fillStyle = this.buttonStyle;
    ctx.fillRect(this.statBlockStart[0], 490, 210, 115);

    //Draw name and description of item
    ctx.font = "25px Arial";
    ctx.fillStyle = "#cccccc";
    ctx.fillText(items.list[player.myCreatures[this.selectedCreature].myItem][1], 220, 515);
    ctx.font = "15px Courier";
    ctx.fillStyle = "#aaaaaa";
    drawMultipleLines(items.list[player.myCreatures[this.selectedCreature].myItem][3], 21, 20, 220, 540);

    //Draw "UNEQUIP" buttons
    ctx.font = "15px Arial";
    ctx.fillStyle = "#cccccc";
    ctx.fillText("UNEQUIP", 280, 600);

    //Draw item icon

    ctx.drawImage(items.list[player.myCreatures[this.selectedCreature].myItem][5], 380, 495, 35, 25);

    ctx.restore();
  }//end drawEquippedItem()

  //////////////////////////////////////////////////////////////////////////////
  //  Draw the selected Creature's stats
  //////////////////////////////////////////////////////////////////////////////
  drawStats(){

    ctx.save();

    ctx.fillStyle = this.buttonStyle;
    ctx.fillRect(this.statBlockStart[0], this.statBlockStart[1], 210, 265);

    ctx.font = "30px Arial";
    ctx.fillStyle = "#cccccc";
    ctx.fillText(player.myCreatures[this.selectedCreature].name, this.statBlockStart[0] + 10, this.statBlockStart[1] + 30);
    ctx.font = "20px Courier";
    ctx.fillText("Level:        " + player.myCreatures[this.selectedCreature].level,        this.statBlockStart[0]+10, this.statBlockStart[1] + 55);
    ctx.fillText("HP:           " + (player.myCreatures[this.selectedCreature].maxHP + player.myCreatures[this.selectedCreature].myBuffs[0]),        this.statBlockStart[0]+10, this.statBlockStart[1] + 80);
    ctx.fillText("Spirit:       " + (player.myCreatures[this.selectedCreature].maxSpirit + player.myCreatures[this.selectedCreature].myBuffs[1]),    this.statBlockStart[0]+10, this.statBlockStart[1] + 105);
    ctx.fillText("Dexterity:    " + (player.myCreatures[this.selectedCreature].dexterity + player.myCreatures[this.selectedCreature].myBuffs[2]),    this.statBlockStart[0]+10, this.statBlockStart[1] + 130);
    ctx.fillText("Agility:      " + (player.myCreatures[this.selectedCreature].agility + player.myCreatures[this.selectedCreature].myBuffs[3]),      this.statBlockStart[0]+10, this.statBlockStart[1] + 155);
    ctx.fillText("Might:        " + (player.myCreatures[this.selectedCreature].might + player.myCreatures[this.selectedCreature].myBuffs[4]),        this.statBlockStart[0]+10, this.statBlockStart[1] + 180);
    ctx.fillText("Fortitude:    " + (player.myCreatures[this.selectedCreature].fortitude + player.myCreatures[this.selectedCreature].myBuffs[5]),    this.statBlockStart[0]+10, this.statBlockStart[1] + 205);
    ctx.fillText("Intelligence: " + (player.myCreatures[this.selectedCreature].intelligence + player.myCreatures[this.selectedCreature].myBuffs[6]), this.statBlockStart[0]+10, this.statBlockStart[1] + 230);
    ctx.fillText("Wits:         " + (player.myCreatures[this.selectedCreature].wits + player.myCreatures[this.selectedCreature].myBuffs[7]),         this.statBlockStart[0]+10, this.statBlockStart[1] + 255);

    ctx.restore();
  }//end drawStats();

  //////////////////////////////////////////////////////////////////////////////
  //  Draws "BACK" button to return to the previous screen
  //////////////////////////////////////////////////////////////////////////////
  drawBackButton(){
    ctx.save();

    ctx.fillStyle = this.buttonStyle;
    ctx.fillRect(canvas.width - 60, 10, 50, 20);
    ctx.beginPath();
    ctx.moveTo(canvas.width - 60, 10);
    ctx.lineTo(canvas.width - 60, 30);
    ctx.lineTo(canvas.width - 70, 20);
    ctx.fill();

    ctx.font = "19px Courier";
    ctx.fillStyle = "#cccccc";
    ctx.fillText("BACK", canvas.width - 60, 25);

    ctx.restore();
  }

  //////////////////////////////////////////////////////////////////////////////
  //  Click Handler function for teh Creature Editor screen
  //////////////////////////////////////////////////////////////////////////////
  creatuerEditorClickHandler(clickPositionX,clickPositionY){

    //First we check if the click was in the creature list on the left of the screen
    if(clickPositionX < this.creatureListWidth){
      if(clickPositionY < 30){
        console.log("UP!");
        if(this.creatureScrollIndex > 0){
          this.creatureScrollIndex--;
          console.log(this.creatureScrollIndex);
          this.updateScreen();
        }
      }
      else if(clickPositionY > this.canvas.height - 30){
        console.log("DOWN");
        if(this.creatureScrollIndex < player.myCreatures.length - 8){
          this.creatureScrollIndex++;
          console.log(this.creatureScrollIndex);
          this.updateScreen();
        }
        else{
          console.log("End of list!");
        }
      }
      //If the click was not on one of the scroll buttons, it must have been on one of our Creatures
      else{
        this.selectedCreature = Math.floor((clickPositionY-30)/95) + this.creatureScrollIndex;
        this.skillScrollIndex = 0;
        this.updateScreen();
        console.log(this.selectedCreature);
      }
    }

    //check to see if the add/remove from party button was pressed
    if(clickPositionX > 210 && clickPositionX < 420 && clickPositionY > 170 && clickPositionY < 205){
      this.addRemoveParty();
    }

    //Check to see if the click was in the Memorized Skills box
    if(clickPositionX > 870 && clickPositionX < 1190 && clickPositionY > 100 && clickPositionY < 405){
      if((clickPositionY - 100)%50 > 24 && (clickPositionY - 100)%50 < 42){
        var heightIndex = Math.floor((clickPositionY - 100)/50);
        console.log( (clickPositionY - 100)%50 + " MEMORIZED SKILLS " + heightIndex);
        player.myCreatures[this.selectedCreature].equipLearnedSkill(player.myCreatures[this.selectedCreature].memorizedSkills[heightIndex + this.skillScrollIndex][0]);
        this.updateScreen();
      }

    }

    //Check to see if the player is unequipping the selected Creature's item
    if(clickPositionX > 280 && clickPositionX < 350 && clickPositionY > 585 && clickPositionY < 603){
      console.log("UNEQUIP");
      player.myCreatures[this.selectedCreature].unequip(3);
      this.updateScreen();
    }
    //Check to see if the player is unequipping the Creature's organs
    else if(clickPositionX > 500 && clickPositionX < 570){
      if(clickPositionY > 185 && clickPositionY < 200){
        //Store whether or not this creature is in the player's party
        this.isInParty = false;
        for(let x = 0; x < player.myCombatCreatures.length; x++){
          if(player.myCombatCreatures[x] == this.selectedCreature){
            this.isInParty = true;
          }
        }
        //Body can only be unequipped if the creature is not in the party
        if(!this.isInParty){
          player.myCreatures[this.selectedCreature].unequip(0);
          console.log("UNEQUIP 1");
          this.updateScreen();
        }
      }
      else if(clickPositionY > 385 && clickPositionY < 400){
        player.myCreatures[this.selectedCreature].unequip(1);
        console.log("UNEQUIP 2");
        this.updateScreen();
      }
      else if(clickPositionY > 585 && clickPositionY < 600){
        player.myCreatures[this.selectedCreature].unequip(2);
        console.log("UNEQUIP 3");
        this.updateScreen();
      }
    }

    //Check if the click was on the left/right scroll buttons for the Organ list
    if(clickPositionX > 310 && clickPositionX < 345 && clickPositionY > 620 && clickPositionY < 790){
      if(this.organScrollIndex > 0){
        this.organScrollIndex--;
      }
      this.updateScreen();
    }
    else if(clickPositionX > 1155 && clickPositionX < 1190 && clickPositionY > 620 && clickPositionY < 790){
      if(this.organScrollIndex < player.inventoryList[this.selectedOrganType].length - 4){
        this.organScrollIndex++;
      }
      this.updateScreen();
    }

    //If the click was not in the creature list, we check if it's one of the body part buttons
    if(clickPositionX > this.creatureListWidth + 10 && clickPositionX < this.creatureListWidth + 100){
      if(clickPositionY > 620 && clickPositionY < 655){
        this.selectedOrganType = 0;
        this.organScrollIndex = 0;
        this.updateScreen();
        console.log("BONES");
      }
      else if(clickPositionY > 665 && clickPositionY < 700){
        this.selectedOrganType = 1;
        this.organScrollIndex = 0;
        this.updateScreen();
        console.log("GUTS");
      }
      else if(clickPositionY > 710 && clickPositionY < 745){
        this.selectedOrganType = 2;
        this.organScrollIndex = 0;
        this.updateScreen();
        console.log("SKIN");
      }
      else if(clickPositionY > 755 && clickPositionY < 790){
        this.selectedOrganType = 3;
        this.organScrollIndex = 0;
        this.updateScreen();
        console.log("ITEMS");
      }
    }

    //Checking if the click was on one of the "Equip" organ buttons
    if(clickPositionY > 764 && clickPositionY < 785){
      if(clickPositionX > 420 && clickPositionX < 485){
        //console.log(player.myOrgans[this.selectedOrganType][this.organScrollIndex][1]);
        this.equipOrgan(this.organScrollIndex);
      }
      else if(clickPositionX > 620 && clickPositionX < 685){
        //console.log(player.myOrgans[this.selectedOrganType][this.organScrollIndex + 1][1]);
        this.equipOrgan(this.organScrollIndex + 1);
      }
      else if(clickPositionX > 820 && clickPositionX < 885){
        //console.log(player.myOrgans[this.selectedOrganType][this.organScrollIndex + 2][1]);
        this.equipOrgan(this.organScrollIndex + 2);
      }
      else if(clickPositionX > 1020 && clickPositionX < 1085){
        //console.log(player.myOrgans[this.selectedOrganType][this.organScrollIndex + 3][1]);
        this.equipOrgan(this.organScrollIndex + 3);
      }

    }

    //Checking if the click was on the "BACK" button
    if(clickPositionX > canvas.width - 70 && clickPositionX < canvas.width - 10 && clickPositionY > 10 && clickPositionY < 30){
      console.log("BACK");
      //Go to the World Map
      setGameMode(5);
    }

  }//end creatuerEditorClickHandler()

  //////////////////////////////////////////////////////////////////////////////
  //  Equips a given organ to the currently selected Creature
  //////////////////////////////////////////////////////////////////////////////
  equipOrgan(index){

    player.myCreatures[this.selectedCreature].equipFromInventory(index, this.selectedOrganType);

    this.organScrollIndex = 0;

    this.updateScreen();
  }//end equipOrgan()

}
