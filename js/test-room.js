//Written by Wyatt Dorn

class TestRoom{


  constructor(context, canvas){
      this.ctx = context;
      this.canvas = canvas;
  }//end constructor()

  init(){

    this.buttonLocations = [];
    this.buttonLocations[0] = [50, 100]; //Souls
    this.buttonLocations[1] = [50, 150]; //Malachite
    this.buttonLocations[2] = [50, 200]; //Chapter
    this.buttonLocations[3] = [50, 250]; //Section


    this.updateScreen();

  }//end init()

  //////////////////////////////////////////////////////////////////////////////
  //  Draws a black rectangle over the screen to clear it out between drawings
  //////////////////////////////////////////////////////////////////////////////
  clearScreen(){
    //black out the screen, covering whatever was drawn previously
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, this.canvas.width, ctx.canvas.height);
  }//end clearScreen()

  //////////////////////////////////////////////////////////////////////////////
  //  Clears the screen, and redraws all the info
  //////////////////////////////////////////////////////////////////////////////
  updateScreen(){
    this.clearScreen();
    this.drawWelcome();
    this.drawSouls();
    this.drawMalachite();
    this.drawBackButton();
    this.drawCampaignChapter();
    this.drawCampaignSection();
  }//end updateScreen()

  drawWelcome(){
    ctx.font = "25px Arial";
    ctx.fillStyle = "#32cd32"
    ctx.fillText("WELCOME TO THE TEST ROOM!", 50,50);

  }//end drawKeyStats()

  drawCampaignChapter(){
    this.baseLocation = this.buttonLocations[2];
    ctx.font = "25px Arial";
    ctx.fillStyle = "#32cd32"
    ctx.fillText("Chapter: " + player.campaignProgress[0], this.baseLocation[0]+70, this.baseLocation[1]+25);

    ctx.fillRect(this.baseLocation[0], this.baseLocation[1], 30, 30);
    ctx.fillRect(this.baseLocation[0] + 35, this.baseLocation[1], 30, 30);

    ctx.font = "25px Arial";
    ctx.fillStyle = "#000000"
    ctx.fillText("-", this.baseLocation[0]+11, this.baseLocation[1]+25);
    ctx.fillText("+", this.baseLocation[0]+43, this.baseLocation[1]+25);

  }//end drawCampaignChapter()

  drawCampaignSection(){
    this.baseLocation = this.buttonLocations[3];
    ctx.font = "25px Arial";
    ctx.fillStyle = "#32cd32"
    ctx.fillText("Section: " + player.campaignProgress[1], this.baseLocation[0]+70, this.baseLocation[1]+25);

    ctx.fillRect(this.baseLocation[0], this.baseLocation[1], 30, 30);
    ctx.fillRect(this.baseLocation[0] + 35, this.baseLocation[1], 30, 30);

    ctx.font = "25px Arial";
    ctx.fillStyle = "#000000"
    ctx.fillText("-", this.baseLocation[0]+11, this.baseLocation[1]+25);
    ctx.fillText("+", this.baseLocation[0]+43, this.baseLocation[1]+25);

  }//end drawCampaignSection()

  drawSouls(){
    this.baseLocation = this.buttonLocations[0];
    ctx.font = "25px Arial";
    ctx.fillStyle = "#32cd32"
    ctx.fillText("Souls: " + player.soulsOwned, this.baseLocation[0]+70, this.baseLocation[1]+25);

    ctx.fillRect(this.baseLocation[0], this.baseLocation[1], 30, 30);
    ctx.fillRect(this.baseLocation[0] + 35, this.baseLocation[1], 30, 30);

    ctx.font = "25px Arial";
    ctx.fillStyle = "#000000"
    ctx.fillText("-", this.baseLocation[0]+11, this.baseLocation[1]+25);
    ctx.fillText("+", this.baseLocation[0]+43, this.baseLocation[1]+25);

  }//end drawSouls()

  drawMalachite(){
    this.baseLocation = this.buttonLocations[1];
    ctx.font = "25px Arial";
    ctx.fillStyle = "#32cd32"
    ctx.fillText("Malachite: " + player.malachite, this.baseLocation[0]+70, this.baseLocation[1]+25);

    ctx.fillRect(this.baseLocation[0], this.baseLocation[1], 30, 30);
    ctx.fillRect(this.baseLocation[0] + 35, this.baseLocation[1], 30, 30);

    ctx.font = "25px Arial";
    ctx.fillStyle = "#000000"
    ctx.fillText("-", this.baseLocation[0]+11, this.baseLocation[1]+25);
    ctx.fillText("+", this.baseLocation[0]+43, this.baseLocation[1]+25);

  }//end drawMalachite()

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
  }//end drawBackButton()

  testRoomClickHandler(clickPositionX,clickPositionY){

    if(clickPositionX > 0 && clickPositionX < 100 && clickPositionY > 0 && clickPositionY < 100){
      mapLocations.generateEncounter(1, 1);
    }

    //Checking if the click was on the "BACK" button
    if(clickPositionX > canvas.width - 70 && clickPositionX < canvas.width - 10 && clickPositionY > 10 && clickPositionY < 30){
      console.log("BACK");
      setGameMode(5);
    }

    //Remove souls
    if(clickPositionX > this.buttonLocations[0][0] && clickPositionX < this.buttonLocations[0][0] + 30 && clickPositionY > this.buttonLocations[0][1] && clickPositionY < this.buttonLocations[0][1] + 30){
      console.log("REMOVED ONE SOUL!");
        player.removeLastSoul();
        this.updateScreen();
    }
    //Add souls
    else if(clickPositionX > this.buttonLocations[0][0] + 35 && clickPositionX < this.buttonLocations[0][0] + 65 && clickPositionY > this.buttonLocations[0][1] && clickPositionY < this.buttonLocations[0][1] + 30){
      console.log("ADDED ONE SOUL!");
        player.addSoul();
        this.updateScreen();
    }
    //Remove malachite
    else if(clickPositionX > this.buttonLocations[1][0] && clickPositionX < this.buttonLocations[1][0] + 30 && clickPositionY > this.buttonLocations[1][1] && clickPositionY < this.buttonLocations[1][1] + 30){
      console.log("REMOVED ONE MALACHITE!");
        player.malachite--;
        this.updateScreen();
    }
    //Add malachite
    else if(clickPositionX > this.buttonLocations[1][0] + 35 && clickPositionX < this.buttonLocations[1][0] + 65 && clickPositionY > this.buttonLocations[1][1] && clickPositionY < this.buttonLocations[1][1] + 30){
      console.log("ADDED ONE MALACHITE!");
        player.malachite++;
        this.updateScreen();
    }
    //Next chapter
    else if(clickPositionX > this.buttonLocations[2][0] + 35 && clickPositionX < this.buttonLocations[2][0] + 65 && clickPositionY > this.buttonLocations[2][1] && clickPositionY < this.buttonLocations[2][1] + 30){
      console.log("NEXT CHAPTER!");
        player.nextChapter();
        this.updateScreen();
    }




  }//end playerScreenClickHandler()

}
