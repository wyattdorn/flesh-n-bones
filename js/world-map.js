//Written by Wyatt Dorn

class WorldMap{

  constructor(context, canvas){

      this.ctx = context;
      this.canvas = canvas;

      //this.loader = new PxLoader(),
      //this.bgImg = this.loader.addImage('media/images/backgrounds/bg.png');
      //this.loader.start();

  }//end constructor()

  init(){

      this.highlightedLocation = 0;

      this.locationCoordinates = [];
      for(var x = 0; x < mapLocations.list.length; x++){
        this.locationCoordinates[x] = [mapLocations.list[x][2], mapLocations.list[x][3]];
      }

      canvas.onmousemove = this.checkForHighlights;

      //this.loader.addCompletionListener(function() {
        this.clearScreen();
        this.updateScreen();
        //this.drawBackground();
      //});


  }//end init()


  //////////////////////////////////////////////////////////////////////////////
  //  Checks to see if the mouse is over an item that can be highlighted
  //////////////////////////////////////////////////////////////////////////////
  checkForHighlights(e){

    var mousePosition = [];
    var mouseXPos, mouseYPos;

    //get mouse location at time of click
    e = event || window.event;
    mouseXPos = e.mouseXPos;
    mouseYPos = e.mouseYPos;

    if (mouseXPos === undefined) {
            mousePosition.x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      }
    if (mouseYPos === undefined) {
          mousePosition.y = e.clientY;// + document.body.scrollLeft + document.documentElement.scrollLeft;
      }

      for(var x = 0; x < worldMap.locationCoordinates.length; x++){
        if(mousePosition.x > worldMap.locationCoordinates[x][0] && mousePosition.x < worldMap.locationCoordinates[x][0] + 100 && mousePosition.y > worldMap.locationCoordinates[x][1] && mousePosition.y < worldMap.locationCoordinates[x][1] + 100){
          worldMap.highlightedLocation = x;
        }
      }
      worldMap.updateScreen();

  }//end checkForHighlights();

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
    this.drawBackground();
    this.drawLocations();
    this.drawLocationDescription();
    this.drawMenuButton();

    //this.drawBackground();

  }//end updateScreen()

  //////////////////////////////////////////////////////////////////////////////
  //  Draws button that opens the menu
  //////////////////////////////////////////////////////////////////////////////
  drawMenuButton(){
    ctx.save();

    ctx.fillStyle = "#cccccc";
    ctx.fillRect(1100, 700, 5, 100);


      ctx.font = "25px Arial";
      ctx.fillStyle = "#cccccc";
      ctx.fillText("MENU", 1115, 760);

    ctx.restore();
  }//end drawLocationDescription()

  //////////////////////////////////////////////////////////////////////////////
  //  Writes the location of the currently selected location to the screen
  //////////////////////////////////////////////////////////////////////////////
  drawLocationDescription(){
    ctx.save();

    ctx.fillStyle = "#cccccc";
    ctx.fillRect(0, 700, this.canvas.width, 5);
    ctx.fillStyle = "#170342";
    ctx.fillRect(0, 705, this.canvas.width, 95);


    ctx.font = "25px Arial";
    ctx.fillStyle = "#cccccc";
    ctx.fillText(mapLocations.list[this.highlightedLocation][1], 10, 730);
    ctx.font = "15px Arial";
    ctx.fillText(mapLocations.list[this.highlightedLocation][6], 10, 750);
    if(mapLocations.list[this.highlightedLocation][4]){
      ctx.fillText("This location if friendly.", 10, 770);
    }
    else{
      ctx.fillText("This location if hostile, there may be monsters.", 10, 770);
    }

    ctx.restore();
  }//end drawLocationDescription()

  drawBackground(){

    ctx.drawImage(imageLoader.worldMapBackgroudImg, 0, 0);
        //ctx.drawImage(worldMap.bgImg, 0, 0);


  }//end drawBackgrounds()

  drawPaths(){

  }//end drawPaths()


  //////////////////////////////////////////////////////////////////////////////
  //  Draws map locations to screen
  //////////////////////////////////////////////////////////////////////////////
  drawLocations(){

    for(var x = 0; x < mapLocations.list.length; x++){

      ctx.fillStyle = "#111199";
      if(mapLocations.list[x][4]){
        ctx.fillStyle = "#144003";
      }
      if(x == this.highlightedLocation){
        ctx.fillStyle = "#aabbcc";
      }
      ctx.fillRect(mapLocations.list[x][2], mapLocations.list[x][3], mapLocations.locationSize, mapLocations.locationSize);

    }


  }//end drawLocations()

  //////////////////////////////////////////////////////////////////////////////
  //  Click Handler function for teh Creature Editor screen
  //////////////////////////////////////////////////////////////////////////////
  worldMapClickHandler(clickPositionX,clickPositionY){


    if(clickPositionX > 1105 && clickPositionY > 705){
      console.log("Entering menu!");
      setGameMode(2);
      canvas.onmousemove = null;
    }

    for(var x = 0; x < this.locationCoordinates.length; x++){
      if(clickPositionX > this.locationCoordinates[x][0] && clickPositionX < this.locationCoordinates[x][0] + 100 && clickPositionY > this.locationCoordinates[x][1] && clickPositionY < this.locationCoordinates[x][1] + 100){
        console.log(mapLocations.list[x][1] + " was clicked on!");

        switch (x) {
          case 0:
            //Enter player stat screen
            setGameMode(4);
            canvas.onmousemove = null;
            break;
          case 1: case 2: case 3: case 4:
            //Enter combat
            setGameMode(1, x);
            canvas.onmousemove = null;
          default:

        }
      }

    }

  }

}
