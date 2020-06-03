//Written by Wyatt Dorn

class CreatureEditorScreen{

  constructor(context, canvas){

      this.ctx = context;
      this.canvas = canvas;



  }//end constructor()

  init(){
    //set width for left column on screen
    this.creatureListWidth = 200;
    this.creatureScrollIndex = 0;
    this.organScrollIndex = 0;
    this.selectedCreature = 0;
    this.selectedOrganType = 0;//at launch, Bones are selected by default

    this.updateScreen();
  } //end init()

  clearScreen(){
    //black out the screen, covering whatever was drawn previously
    ctx.fillStyle = "#272727";
    ctx.fillRect(0, 0, this.canvas.width, ctx.canvas.height);
  }//end clearScreen()

  drawText(){
    ctx.font = "20px Courier";
    ctx.fillStyle = "white";
    ctx.fillText("Creature Editor", 10, 30);
  }//end drawText()

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
  //  Draws buttons
  //////////////////////////////////////////////////////////////////////////////
  drawButtons(){
    ctx.save();
    ctx.fillStyle = "#771111";
    ctx.fillRect(this.creatureListWidth + 10, 620, 90, 50);
    ctx.fillRect(this.creatureListWidth + 10, 680, 90, 50);
    ctx.fillRect(this.creatureListWidth + 10, 740, 90, 50);

    ctx.font = "25px Arial";
    ctx.fillStyle = "#cccccc";
    if(this.selectedOrganType == 0){ctx.fillStyle = "#fcc201";}
    ctx.fillText('Bones', this.creatureListWidth + 15, 650);
    ctx.fillStyle = "#cccccc";
    if(this.selectedOrganType == 1){ctx.fillStyle = "#fcc201";}
    ctx.fillText('Guts', this.creatureListWidth + 15, 715);
    ctx.fillStyle = "#cccccc";
    if(this.selectedOrganType == 2){ctx.fillStyle = "#fcc201";}
    ctx.fillText('Skin', this.creatureListWidth + 15, 775);

    ctx.restore();
  }//end drawButtons()

  //////////////////////////////////////////////////////////////////////////////
  //  Draws scrolling list, of all player-owned Creatures, on the left of the screen
  //////////////////////////////////////////////////////////////////////////////
  drawCreatureList(){
    ctx.fillStyle = "#771111";
    ctx.fillRect(0, 0, this.creatureListWidth, ctx.canvas.height);

    for(var i = 0; i < 8; i++){
      ctx.save();
      ctx.font = "25px Arial";
      ctx.fillStyle = "#cccccc";
      //If the Creature is currently selected, draw text in gold instead
      if(this.selectedCreature == this.creatureScrollIndex + i){
        ctx.fillStyle = "#fcc201";
      }
      ctx.fillText(player.myCreatures[this.creatureScrollIndex + i].name, 10, 60+(90*i));
      ctx.fillText('Level: ' + player.myCreatures[this.creatureScrollIndex + i].level, 10, 95+(90*i));

      //If the Creature has skin, draw an "S" to indicate it
      if(player.myCreatures[this.creatureScrollIndex + i].myBones[0] != 0){
        ctx.fillText("B", 180, 60+(90*i));
      }
      //If the Creature has guts, draw a "G" to indicate it
      if(player.myCreatures[this.creatureScrollIndex + i].myGuts[0] != 0){
        ctx.fillText("G", 178, 80+(90*i));
      }
      //If the Creature has bones, draw a "B" to indicate it
      if(player.myCreatures[this.creatureScrollIndex + i].mySkin[0] != 0){
        ctx.fillText("S", 180, 100+(90*i));
      }

      ctx.restore();
    }
  }//end drawCreatureList()


  //////////////////////////////////////////////////////////////////////////////
  //  Draws a single unit sprite given the sprite file's location and x/y coodinates
  //  -NEED TO MOVE TO HELPER FUNCTION FILE-
  //////////////////////////////////////////////////////////////////////////////
  drawUnit(source, x, y){

    var newImg = new Image();

    newImg.addEventListener('load',function(){
      ctx.drawImage(newImg, x, y, 150, 150);
    }, false);

    newImg.src = '' + source;

  }//end drawUnit()

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
  }//end updateScreen()

  //////////////////////////////////////////////////////////////////////////////
  //  Draw list of owned organs
  //////////////////////////////////////////////////////////////////////////////
  drawOrganList(){
    ctx.save();
    //Rectangle to  hold list
    ctx.fillStyle = "#771111";
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

    //If there are less than 4 of a given organ type, only print that many,
    //If there's 4 or more of the organ type, print 4 at a time
    if(player.myOrgans[this.selectedOrganType].length<4){ this.max = player.myOrgans[this.selectedOrganType].length;}
    else{this.max = 4;}

    //Print out the name and description of the owned organs
    for(var x = 0; x < this.max; x++){
      ctx.font = "20px Arial";
      ctx.fillStyle = "#cccccc";
      ctx.fillText(player.myOrgans[this.selectedOrganType][x + this.organScrollIndex][1], this.creatureListWidth + 160 + (200 * x), 650);
      ctx.font = "15px Courier";
      ctx.fillStyle = "#aaaaaa";
      myCombatScreen.drawMultipleLines(player.myOrgans[this.selectedOrganType][x + this.organScrollIndex][3], 20, 20, this.creatureListWidth + 160 + (200 * x), 675);
      ctx.font = "20px Arial";
      ctx.fillStyle = "#cccccc";
      ctx.fillText("EQUIP", 420 + (200 * x), 780);
    }

    ctx.restore();
  }//end drawOrganList()

  //////////////////////////////////////////////////////////////////////////////
  //  Draw the selected Creature's sprite, along with their pertinent information
  //////////////////////////////////////////////////////////////////////////////
  drawSelectedCreature(){
    this.drawUnit(player.myCreatures[this.selectedCreature].imgSrc, 250, 40);
    this.drawStats();
    this.drawCreatureOrgans();
  }//end drawSelectedCreature()

  //////////////////////////////////////////////////////////////////////////////
  //  Draw the creature's equipped organs
  //////////////////////////////////////////////////////////////////////////////
  drawCreatureOrgans(){
    ctx.fillStyle = "#771111";
    ctx.fillRect(430, 15, 200, 190);
    ctx.fillRect(430, 215, 200, 190);
    ctx.fillRect(430, 415, 200, 190);

    //ctx.fillText(player.myCreatures[this.selectedCreature].myOrgans[0][1], 435, 25 + (190));

    for(var x = 0; x < 3; x++){
      ctx.font = "20px Arial";
      ctx.fillStyle = "#cccccc";
      ctx.fillText(player.myCreatures[this.selectedCreature].getOrgan(x)[1], 435, 40 + (200 * x));
      ctx.font = "15px Courier";
      ctx.fillStyle = "#aaaaaa";
      myCombatScreen.drawMultipleLines(player.myCreatures[this.selectedCreature].myOrgans[x][3], 20, 20, 435, 65 + (200 * x));
    }
  }//end drawCreatureOrgans()

  //////////////////////////////////////////////////////////////////////////////
  //  Draw the selected Creature's stats
  //////////////////////////////////////////////////////////////////////////////
  drawStats(){
    ctx.save();

    ctx.fillStyle = "#771111";
    ctx.fillRect(210, 190, 210, 400);

    ctx.font = "30px Arial";
    ctx.fillStyle = "#cccccc";
    ctx.fillText(player.myCreatures[this.selectedCreature].name, 220, 225);
    ctx.font = "20px Courier";
    ctx.fillText("Level:        " + player.myCreatures[this.selectedCreature].level, 220, 250);
    ctx.fillText("HP:           " + player.myCreatures[this.selectedCreature].maxHP, 220, 275);
    ctx.fillText("Spirit:       " + player.myCreatures[this.selectedCreature].maxSpirit, 220, 300);
    ctx.fillText("Dexterity:    " + player.myCreatures[this.selectedCreature].dexterity, 220, 325);
    ctx.fillText("Agility:      " + player.myCreatures[this.selectedCreature].agility, 220, 350);
    ctx.fillText("Might:        " + player.myCreatures[this.selectedCreature].might, 220, 375);
    ctx.fillText("Fortitude:    " + player.myCreatures[this.selectedCreature].fortitude, 220, 400);
    ctx.fillText("Intelligence: " + player.myCreatures[this.selectedCreature].intelligence, 220, 425);
    ctx.fillText("Wits:         " + player.myCreatures[this.selectedCreature].wits, 220, 450);

    ctx.restore();
  }//end drawStats();

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
        this.updateScreen();
        console.log(this.selectedCreature);
      }
    }

    if(clickPositionX > 310 && clickPositionX < 345 && clickPositionY > 620 && clickPositionY < 790){
      if(this.organScrollIndex > 0){
        this.organScrollIndex--;
      }
      this.updateScreen();
    }
    else if(clickPositionX > 1155 && clickPositionX < 1190 && clickPositionY > 620 && clickPositionY < 790){
      if(this.organScrollIndex < player.myOrgans[this.selectedOrganType].length - 4){
        this.organScrollIndex++;
      }
      this.updateScreen();
    }

    //If the click was not in the creature list, we check if it's one of the body part buttons
    if(clickPositionX > this.creatureListWidth + 10 && clickPositionX < this.creatureListWidth + 100){
      if(clickPositionY > 620 && clickPositionY < 670){
        this.selectedOrganType = 0;
        this.organScrollIndex = 0;
        this.updateScreen();
        console.log("BONES");
      }
      else if(clickPositionY > 680 && clickPositionY < 730){
        this.selectedOrganType = 1;
        this.organScrollIndex = 0;
        this.updateScreen();
        console.log("GUTS");
      }
      else if(clickPositionY > 740 && clickPositionY < 790){
        this.selectedOrganType = 2;
        this.organScrollIndex = 0;
        this.updateScreen();
        console.log("SKIN");
      }
    }

    if(clickPositionY > 764 && clickPositionY < 785){
      console.log("eq");
    }

  }//end creatuerEditorClickHandler()

}
