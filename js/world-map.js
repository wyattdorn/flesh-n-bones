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
        if(mousePosition.x > worldMap.locationCoordinates[x][0] && mousePosition.x < worldMap.locationCoordinates[x][0] + mapLocations.locationSize && mousePosition.y > worldMap.locationCoordinates[x][1] && mousePosition.y < worldMap.locationCoordinates[x][1] + mapLocations.locationSize){
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
    this.drawSphereOfInfluence();
    this.drawLocations();
    this.drawLocationDescription();
    this.drawMenuButton();


    //this.drawBackground();

  }//end updateScreen()


  //////////////////////////////////////////////////////////////////////////////
  //  Returns a boolean if the selected location is within the player's Sphere of Influence
  //////////////////////////////////////////////////////////////////////////////
  checkIfInInfluence(location){

    this.distance = Math.sqrt(Math.pow((mapLocations.list[0][2] - mapLocations.list[location][2]), 2) + Math.pow((mapLocations.list[0][3] - mapLocations.list[location][3]), 2));

    if(this.distance - (mapLocations.locationSize/2) <= (20 * player.impetus)){
      return true;
    }
    else{
      return false;
    }

  }//end checkIfInInfluence()


  //////////////////////////////////////////////////////////////////////////////
  //  Drawss Sphere of Influence, based on the player's current Impetous
  //////////////////////////////////////////////////////////////////////////////
  drawSphereOfInfluence(){
    ctx.save();

      ctx.fillStyle = "#1212aa";
      ctx.globalAlpha = 0.1;

      ctx.beginPath();
      ctx.arc(mapLocations.list[0][2]+mapLocations.locationSize/2, mapLocations.list[0][3]+mapLocations.locationSize/2, 20*player.impetus, 0, 2 * Math.PI);
      ctx.fill();

      ctx.lineWidth = 3;
      ctx.globalAlpha = 0.5;
      ctx.strokeStyle = "#ffffff";
      ctx.stroke();

    ctx.restore();
  }//end drawSphereOfInfluence()

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
    ctx.fillText(mapLocations.list[this.highlightedLocation][7], 10, 750);
    if(mapLocations.list[this.highlightedLocation][4]){
      ctx.fillText("This location if friendly.", 10, 770);
    }
    else{
      ctx.fillText("This location if hostile, there may be monsters.", 10, 770);
    }

    if(this.checkIfInInfluence(this.highlightedLocation)){
      ctx.fillText("This location is within your Sphere of Influence.", 10, 790);
    }
    else{
      ctx.fillText("This location is outside your Sphere of Influence.", 10, 790);
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
    ctx.save();

    for(var x = 0; x < mapLocations.list.length; x++){

      ctx.fillStyle = "#111199";
      if(mapLocations.list[x][4]){
        ctx.fillStyle = "#144003";
      }
      if(!this.checkIfInInfluence(x)){
        ctx.fillStyle = "#450505";
      }
      if(x == this.highlightedLocation){
        ctx.fillStyle = "#aabbcc";
      }

      ctx.globalAlpha = 0.75;
      ctx.beginPath();
      ctx.arc(mapLocations.list[x][2]+mapLocations.locationSize/2, mapLocations.list[x][3]+mapLocations.locationSize/2, mapLocations.locationSize/2, 0, 2 * Math.PI);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.drawImage(mapLocations.list[x][6], mapLocations.list[x][2], mapLocations.list[x][3], mapLocations.locationSize, mapLocations.locationSize);

    }

    ctx.restore();
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
      if(clickPositionX > this.locationCoordinates[x][0] && clickPositionX < this.locationCoordinates[x][0] + mapLocations.locationSize && clickPositionY > this.locationCoordinates[x][1] && clickPositionY < this.locationCoordinates[x][1] + mapLocations.locationSize){
        console.log(mapLocations.list[x][1] + " was clicked on!");
        if(this.checkIfInInfluence(x)){
          switch (x) {
            case 0:
              //Enter player stat screen
              setGameMode(4);
              canvas.onmousemove = null;
              break;
            case 1: case 2: case 3: case 4: case 5:
              //Enter combat
              setGameMode(1, x);
              canvas.onmousemove = null;
            default:
        }
      }
      }

    }

  }

}
