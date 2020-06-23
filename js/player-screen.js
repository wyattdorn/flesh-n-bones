//Written by Wyatt Dorn

class PlayerScreen{


  constructor(context, canvas){

      this.ctx = context;
      this.canvas = canvas;

  }//end constructor()

  init(){

    this.statBlockStart = [30, 30];

    this.clearScreen();
    this.updateScreen();

  }//end init()

  //////////////////////////////////////////////////////////////////////////////
  //  Draws a black rectangle over the screen to clear it out between drawings
  //////////////////////////////////////////////////////////////////////////////
  clearScreen(){
    //black out the screen, covering whatever was drawn previously
    ctx.fillStyle = "#131313";
    ctx.fillRect(0, 0, this.canvas.width, ctx.canvas.height);
  }//end clearScreen()

  //////////////////////////////////////////////////////////////////////////////
  //  Clears the screen, and redraws all the info
  //////////////////////////////////////////////////////////////////////////////
  updateScreen(){
    this.clearScreen();
    this.drawKeyStats();
    this.drawBackButton();
  }//end updateScreen()

  drawKeyStats(){
    ctx.font = "25px Arial";
    ctx.fillStyle = "#286355"
    ctx.fillText("Malachite: " + player.malachite, this.statBlockStart[0] + 10, this.statBlockStart[1] + 10);
    ctx.fillText("Impetus: " + player.impetus, this.statBlockStart[0] + 10, this.statBlockStart[1] + 40);
    ctx.fillText("Souls: " + player.soulsOwned, this.statBlockStart[0] + 10, this.statBlockStart[1] + 70)

  }//end drawKeyStats()

  //////////////////////////////////////////////////////////////////////////////
  //  Draws "BACK" button to return to the previous screen
  //////////////////////////////////////////////////////////////////////////////
  drawBackButton(){
    ctx.save();

    ctx.fillStyle = "#771111";
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

  playerScreenClickHandler(clickPositionX,clickPositionY){

    //Checking if the click was on the "BACK" button
    if(clickPositionX > canvas.width - 70 && clickPositionX < canvas.width - 10 && clickPositionY > 10 && clickPositionY < 30){
      console.log("BACK");
      setGameMode(5);
    }

  }//end playerScreenClickHandler()


}
