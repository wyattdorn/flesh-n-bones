//Written by Wyatt Dorn

class CreatureEditorScreen{

  constructor(context, canvas){

      this.ctx = context;
      this.canvas = canvas;



  }//end constructor()

  init(){
    //set width for left column on screen
    this.creatureListWidth = 200;
    this.scrollIndex = 0;
    this.selectedCreature = 0;

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
      if(this.selectedCreature == this.scrollIndex + i){
        ctx.fillStyle = "#fcc201";
      }
      ctx.fillText(player.myCreatures[this.scrollIndex + i].name, 10, 60+(90*i));
      ctx.fillText('Level: ' + player.myCreatures[this.scrollIndex + i].level, 10, 95+(90*i));

      //If the Creature has skin, draw an "S" to indicate it
      if(player.myCreatures[this.scrollIndex + i].mySkin[0] != 0){
        ctx.fillText("S", 180, 60+(90*i));
      }
      //If the Creature has guts, draw a "G" to indicate it
      if(player.myCreatures[this.scrollIndex + i].myGuts[0] != 0){
        ctx.fillText("G", 178, 80+(90*i));
      }
      //If the Creature has bones, draw a "B" to indicate it
      if(player.myCreatures[this.scrollIndex + i].myGuts[0] != 0){
        ctx.fillText("B", 180, 100+(90*i));
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
  }//end updateScreen()

  drawSelectedCreature(){
    this.drawUnit(player.myCreatures[this.selectedCreature].imgSrc, 250, 50);
  }//end drawSelectedCreature()

  creatuerEditorClickHandler(clickPositionX,clickPositionY){
    //First we check if the click was in the creature list on the left of the screen
    if(clickPositionX < this.creatureListWidth){
      if(clickPositionY < 30){
        console.log("UP!");
        if(this.scrollIndex > 0){
          this.scrollIndex--;
          console.log(this.scrollIndex);
          this.updateScreen();
        }
      }
      else if(clickPositionY > this.canvas.height - 30){
        console.log("DOWN");
        if(this.scrollIndex < player.myCreatures.length - 8){
          this.scrollIndex++;
          console.log(this.scrollIndex);
          this.updateScreen();
        }
        else{
          console.log("End of list!");
        }
      }
      //If the click was not on one of the scroll buttons, it must have been on one of our Creatures
      else{
        this.selectedCreature = Math.floor((clickPositionY-30)/95) + this.scrollIndex;
        this.updateScreen();
        console.log(this.selectedCreature);
      }
    }
  }//end creatuerEditorClickHandler()

}
