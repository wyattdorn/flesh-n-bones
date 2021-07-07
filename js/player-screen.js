//Written by Wyatt Dorn

class PlayerScreen{


  constructor(context, canvas){
      this.ctx = context;
      this.canvas = canvas;
  }//end constructor()

  init(){

    this.statBlockStart = [30, 30];

    rootCanvent.children = [];

    this.playerScreenCanvent = new Canvent([0,0], [this.canvas.width, this.canvas.height], "#222");

    rootCanvent.addChild(this.playerScreenCanvent);

    this.generateKeyStats();
    this.generateBackButton();

    //this.updateScreen();

    this.playerScreenCanvent.addToDrawBuffer();
    executeDrawBuffer();

  }//end init()

  generateKeyStats(){

    //position, fontColor, fontSize, text
    this.playerScreenCanvent.addChild(new TextBox([this.statBlockStart[0] + 10, this.statBlockStart[1] + 10], "#286355", 25, "Malachite: " + player.malachite));
    this.playerScreenCanvent.addChild(new TextBox([this.statBlockStart[0] + 10, this.statBlockStart[1] + 70], "#286355", 25, "Impetus: " + player.impetus));
    this.playerScreenCanvent.addChild(new TextBox([this.statBlockStart[0] + 10, this.statBlockStart[1] + 130], "#286355", 25, "Souls: " + player.soulsOwned));

    this.playerScreenCanvent.addChild(new TextBox([this.statBlockStart[0] + 10, this.statBlockStart[1] + 30], "#589385", 15, "The closest thing this world has to money."));
    this.playerScreenCanvent.addChild(new TextBox([this.statBlockStart[0] + 10, this.statBlockStart[1] + 90], "#589385", 15, "Your divine influence on the world."));
    this.playerScreenCanvent.addChild(new TextBox([this.statBlockStart[0] + 10, this.statBlockStart[1] + 150], "#589385", 15, "A Creature cannot be made without a Soul."));

  }



  generateBackButton(){

    //position, size, bgColor, func

    /*
    this.backButton = new Canvent([this.playerScreenCanvent.width - 60, 10], [50, 20], "#771111", function(){setGameMode(5);});

    this.playerScreenCanvent.addChild(this.backButton);

    this.backButtonText = new TextBox([0, 15], "#cccccc", 19, "BACK");
    this.backButtonText.setFont("Courier");

    this.backButton.addChild(this.backButtonText);
    */

    ////////////////////////////////////////////

    this.backButton = new SpecialCanvent(
      [this.playerScreenCanvent.width - 70, 10],
      [60, 20],
      function([posX, posY]){
        ctx.save();

        ctx.fillStyle = "#771111";
        ctx.fillRect(posX, posY, 50, 20);
        ctx.beginPath();
        ctx.moveTo(posX, 10);
        ctx.lineTo(posX, 30);
        ctx.lineTo(posX - 10, 20);
        ctx.fill();

        ctx.restore();
    }, function(){setGameMode(5);});

    this.playerScreenCanvent.addChild(this.backButton);

    this.backButtonText = new TextBox([0, 15], "#cccccc", 19, "BACK");
    this.backButtonText.setFont("Courier");

    this.backButton.addChild(this.backButtonText);


  }



  playerScreenClickHandler(clickPositionX,clickPositionY){

    this.playerScreenCanvent.checkForClick([clickPositionX, clickPositionY]);

    console.log("YARP");

  }//end playerScreenClickHandler()

}
