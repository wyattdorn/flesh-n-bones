//Written by Wyatt Dorn

class WorldMap{

  constructor(context, canvas){

      this.ctx = context;
      this.canvas = canvas;

  }//end constructor()

  init(){
      //By default, we set the Forgotten Temple to the highlighted location
      this.highlightedLocation = 0;

      //Populate the list of location coodinates using the data from mapo-locations.js
      this.locationCoordinates = [];
      for(var x = 0; x < mapLocations.list.length; x++){
        this.locationCoordinates[x] = [mapLocations.list[x][2], mapLocations.list[x][3]];
      }

      canvas.onmousemove = this.checkForHighlights;

      this.updateScreen();

      //Have dialogue box appear 1/10th a second after the page loads
      setTimeout(function() {
          campaign.list[player.campaignProgress[0]](player.campaignProgress[1]);
      }, 100);

  }//end init()


  //////////////////////////////////////////////////////////////////////////////
  //  ?
  //////////////////////////////////////////////////////////////////////////////
  checkCampaignProgress(){


  }//end checkCampaignProgress()


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
  }//end updateScreen()


  //////////////////////////////////////////////////////////////////////////////
  //  Returns a boolean if the selected location is within the player's Sphere of Influence
  //////////////////////////////////////////////////////////////////////////////
  checkIfInInfluence(location){

    //Calculate the distance between the Temple and the given location
    this.distance = Math.sqrt(Math.pow((mapLocations.list[0][2] - mapLocations.list[location][2]), 2) + Math.pow((mapLocations.list[0][3] - mapLocations.list[location][3]), 2));

    //Return true if the location is within the player's current sphere of influence
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
    ctx.fillText(mapLocations.list[this.highlightedLocation][8], 10, 750);
    if(mapLocations.list[this.highlightedLocation][4]){
      ctx.fillStyle = "#40a040";
      ctx.fillText("You're safe here, this location is friendly.", 10, 770);
      ctx.fillStyle = "#cccccc";
      ctx.fillText("You're safe here, this location is", 10, 770);
    }
    else{
      ctx.fillStyle = "#a04040";
      ctx.fillText("There may be monsters, this location is hostile.", 10, 770);
      ctx.fillStyle = "#cccccc";
      ctx.fillText("There may be monsters, this location is", 10, 770);
    }

    if(this.checkIfInInfluence(this.highlightedLocation)){
      ctx.fillText("This location is within your Sphere of Influence.", 10, 790);
    }
    else{
      ctx.fillText("This location is outside your Sphere of Influence.", 10, 790);
    }

    ctx.restore();
  }//end drawLocationDescription()


  //////////////////////////////////////////////////////////////////////////////
  //  Draws map background image to screen
  //////////////////////////////////////////////////////////////////////////////
  drawBackground(){
    ctx.drawImage(imageLoader.worldMapBackgroudImg, 0, 0);
  }//end drawBackgrounds()

  //////////////////////////////////////////////////////////////////////////////
  //  Draws map locations to screen
  //////////////////////////////////////////////////////////////////////////////
  drawLocations(){
    ctx.save();

    //Itterate through the list of locations in map-locations.js
    for(var x = 0; x < mapLocations.list.length; x++){

      //Set default ccolor of blue for locations within the sphere of influence
      ctx.fillStyle = "#111199";

      //If the location is friendly, it will be colored green, and we draw the "friendly" icon
      if(mapLocations.list[x][4]){
        ctx.fillStyle = "#144003";
        this.locationImage = mapLocations.list[x][7];
      }
      else{
        this.locationImage = mapLocations.list[x][6];
      }
      //If the location is outside the sphere of influence, color it red
      if(!this.checkIfInInfluence(x)){
        ctx.fillStyle = "#450505";
      }
      //The currently highlighted location will be colored white
      if(x == this.highlightedLocation){
        ctx.fillStyle = "#aabbcc";
      }

      //Draw colored circle behind the location icon
      ctx.globalAlpha = 0.75;
      ctx.beginPath();
      ctx.arc(mapLocations.list[x][2]+mapLocations.locationSize/2, mapLocations.list[x][3]+mapLocations.locationSize/2, mapLocations.locationSize/2, 0, 2 * Math.PI);
      ctx.fill();
      
      //Draws the location icon to screen
      ctx.globalAlpha = 1;
      ctx.drawImage(this.locationImage, mapLocations.list[x][2], mapLocations.list[x][3], mapLocations.locationSize, mapLocations.locationSize);

    }

    ctx.restore();
  }//end drawLocations()

  //////////////////////////////////////////////////////////////////////////////
  //  Click Handler function for teh Creature Editor screen
  //////////////////////////////////////////////////////////////////////////////
  worldMapClickHandler(clickPositionX,clickPositionY){

    //Check if the "MENU" button was pressed
    if(clickPositionX > 1105 && clickPositionY > 705){
      console.log("Entering menu!");
      //Go directly to Creature Editor Screen
      setGameMode(3);
      canvas.onmousemove = null;
    }

    //Itterate through the coordinates of all the map locations
    for(var x = 0; x < this.locationCoordinates.length; x++){
      //Check if the click was on a map location
      if(clickPositionX > this.locationCoordinates[x][0] && clickPositionX < this.locationCoordinates[x][0] + mapLocations.locationSize && clickPositionY > this.locationCoordinates[x][1] && clickPositionY < this.locationCoordinates[x][1] + mapLocations.locationSize){
        console.log(mapLocations.list[x][1] + " was clicked on!");
        //If the click was on a location make sure that location is within the sphere of influencce
        if(this.checkIfInInfluence(x)){
          //First, we stop the onmousemove function that is specific to the world map
          canvas.onmousemove = null;
          //If the location was the FOrgotten Temple, we enter the player stat screes
          if(x == 0){
            setGameMode(4);
          }
          //Otherwise, we launch combat based on the location that was clicked on
          else{
            //If the location is already friendly, do not enter combat
            if(mapLocations.list[x][4]==true){
              //do nothing for now...
            }
            //If the location is still hostile, we enter combat
            else{
              setGameMode(1, x);
            }
          }
        }
      }
    }
  }//end worldMapClickHandler()

}
