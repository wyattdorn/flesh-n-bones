//Written by Wyatt Dorn

class WorldMap{

  constructor(context, canvas){

      this.ctx = context;
      this.canvas = canvas;

      //Boolean to enable/disable world map travel
      this.travelEnabled = !campaignMode;

      //WHere on the map the camera is currently looking
      //By default, we start at the top left of the map (0,0)
      this.scrollIndex = [0,0];

  }//end constructor()

  init(){

    rootCanvent.children = [];
    this.worldMapCanvent = new Canvent([0,0], [this.canvas.width, this.canvas.height], "#222");
    rootCanvent.addChild(this.worldMapCanvent);

    this.scrollButtonLocation = [975, 710];

    //By default, we set the Forgotten Temple to the highlighted location
    this.highlightedLocation = 0;

    //Populate the list of location coodinates using the data from mapo-locations.js
    this.locationCoordinates = [];
    for(var x = 0; x < mapLocations.list.length; x++){
      this.locationCoordinates[x] = [mapLocations.list[x][2], mapLocations.list[x][3]];
    }

    canvas.onmousemove = this.checkForHighlights;

    this.updateScreen();

    this.generateMenuBar();
    this.generateScrollButtons();

    //Have dialogue box appear 1/10th a second after the page loads
    setTimeout(function() {
      //console.log("Campaign progress: " + player.campaignProgress[0]);
      campaign.list[player.campaignProgress[0]](player.campaignProgress[1]);


      rootCanvent.addToDrawBuffer();

      console.log(drawBuffer);

      executeDrawBuffer();
    }, /*was 100*/ 200);

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
        if(mousePosition.x > worldMap.locationCoordinates[x][0] + worldMap.scrollIndex[0] &&
           mousePosition.x < worldMap.locationCoordinates[x][0] + mapLocations.locationSize + worldMap.scrollIndex[0] &&
           mousePosition.y > worldMap.locationCoordinates[x][1] + worldMap.scrollIndex[1] &&
           mousePosition.y < worldMap.locationCoordinates[x][1] + mapLocations.locationSize + worldMap.scrollIndex[1]){
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
      ctx.arc(mapLocations.list[0][2]+mapLocations.locationSize/2 +   this. scrollIndex[0], mapLocations.list[0][3]+mapLocations.locationSize/2 +   this. scrollIndex[1], 20*player.impetus, 0, 2 * Math.PI);
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

    ctx.font = "15px Arial";
    ctx.fillStyle = "#cccccc";
    ctx.fillText("CREATURE", 1112, 745);
    ctx.fillText("EDITOR", 1127, 765);


    this.drawScrollButtons();

    ctx.restore();
  }//end drawMenuButton()

  generateMenuBar(){

    //White "border" area//
    this.worldMapCanvent.addChild(this.menuBar = new Canvent([0, 700], [this.canvas.width, this.canvas.height - 700], "#ccc"));

    //menu button//
    this.menuBar.addChild(this.menuButton = new Canvent([1105, 5], [100, this.menuBar.height - 5], "#170342"));
    this.menuButton.addChild(new TextBox([7, 40], "#ccc", 15, "CREATURE"));
    this.menuButton.addChild(new TextBox([22, 60], "#ccc", 15, "EDITOR"));

    //map info bar//
    this.menuBar.addChild(this.infoBar = new Canvent([0, 5], [1100, this.menuBar.height - 5], "#170342"));
    this.infoBar.addChild(new TextBox([10, 25], "#ccc", 25, mapLocations.list[this.highlightedLocation][1]));
    this.infoBar.addChild(new TextBox([10, 45], "#ccc", 15, mapLocations.list[this.highlightedLocation][8]));
    //Notify the Player whether the location is friendly or hostile
    if(mapLocations.list[this.highlightedLocation][4]){
      this.infoBar.addChild(new TextBox([10, 65], "#40a040", 15, "You're safe here, this location is friendly."));
      this.infoBar.addChild(new TextBox([10, 65], "#ccc", 15, "You're safe here, this location is"));
    }
    else{
      this.infoBar.addChild(new TextBox([10, 65], "#a04040", 15, "There may be monsters, this location is hostile."));
      this.infoBar.addChild(new TextBox([10, 65], "#ccc", 15, "There may be monsters, this location is"));
    }
    //Notify the Player whether the location is or isn't in their sphere of influence
    if(this.checkIfInInfluence(this.highlightedLocation)){
      this.infoBar.addChild(new TextBox([10, 85], "#ccc", 15, "This location is within your Sphere of Influence."));
    }
    else{
      this.infoBar.addChild(new TextBox([10, 85], "#ccc", 15, "This location is outside your Sphere of Influence."));
    }


  }//end generateMenuBar()

  generateScrollButtons(){

    //up arrow
    this.menuBar.addChild(this.northArrow = new SpecialCanvent(
        [1010, 10],
        [50, 35],
        function(){
          ctx.fillStyle = "#ccc";
          let localPosition = worldMap.northArrow.position;
          ctx.beginPath();
          ctx.moveTo(localPosition[0] + 25, localPosition[1]);
          ctx.lineTo(localPosition[0] + 50, localPosition[1] + 35);
          ctx.lineTo(localPosition[0], localPosition[1] + 35);
          ctx.fill();

        },
        function(){worldMap.scrollIndex[1] += 100;}));

      this.northArrow.addChild(new TextBox([20, 28], "black", 15, "N"));

      //down arrow
      this.menuBar.addChild(this.southArrow = new SpecialCanvent(
          [1010, 60],
          [50, 35],
          function(){
            ctx.fillStyle = "#ccc";
            let localPosition = worldMap.southArrow.position;
            ctx.beginPath();
            ctx.moveTo(localPosition[0] + 25, localPosition[1] + 35);
            ctx.lineTo(localPosition[0] + 50, localPosition[1]);
            ctx.lineTo(localPosition[0], localPosition[1]);
            ctx.fill();

          },
          function(){worldMap.scrollIndex[1] -= 100;}));

        this.southArrow.addChild(new TextBox([20, 18], "black", 15, "S"));


        //right arrow
        this.menuBar.addChild(this.eastArrow = new SpecialCanvent(
            [1065, 25],
            [50, 35],
            function(){
              ctx.fillStyle = "#ccc";
              let localPosition = worldMap.eastArrow.position;
              ctx.beginPath();
              ctx.moveTo(localPosition[0], localPosition[1]);
              ctx.lineTo(localPosition[0], localPosition[1] + 55);
              ctx.lineTo(localPosition[0] + 30, localPosition[1] + 27.5);
              ctx.fill();

            },
            function(){worldMap.scrollIndex[0] += 100;}));

          this.eastArrow.addChild(new TextBox([5, 32], "black", 15, "E"));

          //left arrow
          this.menuBar.addChild(this.westArrow = new SpecialCanvent(
              [975, 25],
              [50, 35],
              function(){
                ctx.fillStyle = "#ccc";
                let localPosition = worldMap.westArrow.position;
                ctx.beginPath();
                ctx.moveTo(localPosition[0] + 30, localPosition[1]);
                ctx.lineTo(localPosition[0] + 30, localPosition[1] + 55);
                ctx.lineTo(localPosition[0], localPosition[1] + 27.5);
                ctx.fill();

              },
              function(){worldMap.scrollIndex[0] -= 100;}));

            this.westArrow.addChild(new TextBox([12, 32], "black", 15, "W"));

  }//end generateScrollButtons()


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
    //Notify the Player whether the location is friendly or hostile
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
    //Notify the Player whether the location is or isn't in their sphere of influence
    if(this.checkIfInInfluence(this.highlightedLocation)){
      ctx.fillText("This location is within your Sphere of Influence.", 10, 790);
    }
    else{
      ctx.fillText("This location is outside your Sphere of Influence.", 10, 790);
    }

    ctx.restore();
  }//end drawLocationDescription()

  //////////////////////////////////////////////////////////////////////////////
  //  Change where the camera is looking at the map
  //////////////////////////////////////////////////////////////////////////////
  scrollMap(direction){

    //Move the scrollIndex in the indicated direction
    switch (direction) {
      case 'north':
          this. scrollIndex[1] += 100;
        break;
      case 'south':
          this. scrollIndex[1] -= 100;
        break;
      case 'east':
          this. scrollIndex[0] += 100;
        break;
      case 'west':
          this. scrollIndex[0] -= 100;
        break;
    default:
      console.log("Invalid directional input!");
    }

    //If scrolling would lead us off the map, stick to the edge and do not go over
    if(this.scrollIndex[1] > 0){
      this.scrollIndex[1] = 0;
    }
    else if(this.scrollIndex[1] < -900){
      this.scrollIndex[1] = -900;
    }
    if(this.scrollIndex[0] > 0){
      this.scrollIndex[0] = 0;
    }
    else if(this.scrollIndex[0] < -400){
      this.scrollIndex[0] = -400;
    }

    this.updateScreen();

  }//end scrollMap()

  //////////////////////////////////////////////////////////////////////////////
  //  Draws buttons for navigating around the map
  //////////////////////////////////////////////////////////////////////////////
  drawScrollButtons(){


    ctx.save();
    ctx.fillStyle = "white";
    //up arrow
    ctx.beginPath();
    ctx.moveTo(this.scrollButtonLocation[0] + 60, this.scrollButtonLocation[1]);
    ctx.lineTo(this.scrollButtonLocation[0] + 85, 35 + this.scrollButtonLocation[1]);
    ctx.lineTo(this.scrollButtonLocation[0] + 35, 35 + this.scrollButtonLocation[1]);
    ctx.fill();
    //down arrow
    ctx.beginPath();
    ctx.moveTo(this.scrollButtonLocation[0] + 60, 85 + this.scrollButtonLocation[1]);
    ctx.lineTo(this.scrollButtonLocation[0] + 85, 50 + this.scrollButtonLocation[1]);
    ctx.lineTo(this.scrollButtonLocation[0] + 35, 50 + this.scrollButtonLocation[1]);
    ctx.fill();
    //right arrow
    ctx.beginPath();
    ctx.moveTo(this.scrollButtonLocation[0] + 90, 70 + this.scrollButtonLocation[1]);
    ctx.lineTo(this.scrollButtonLocation[0] + 90, 15 + this.scrollButtonLocation[1]);
    ctx.lineTo(this.scrollButtonLocation[0] + 120, 42.5 + this.scrollButtonLocation[1]);
    ctx.fill();
    //left arrow
    ctx.beginPath();
    ctx.moveTo(this.scrollButtonLocation[0] + 30, 70 + this.scrollButtonLocation[1]);
    ctx.lineTo(this.scrollButtonLocation[0] + 30, 15 + this.scrollButtonLocation[1]);
    ctx.lineTo(this.scrollButtonLocation[0], 42.5 + this.scrollButtonLocation[1]);
    ctx.fill();


    ctx.fillStyle = "black";

    //Print N/S/E/W on arrows to indicate direction
    ctx.font = "bold 15px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("N", this.scrollButtonLocation[0] + 55, 28 + this.scrollButtonLocation[1]);
    ctx.fillText("S", this.scrollButtonLocation[0] + 55, 68 + this.scrollButtonLocation[1]);
    ctx.fillText("W", this.scrollButtonLocation[0] + 12, 49 + this.scrollButtonLocation[1]);
    ctx.fillText("E", this.scrollButtonLocation[0] + 97, 49 + this.scrollButtonLocation[1]);

    ctx.restore();

  }//end drawScrollButtons()


  //////////////////////////////////////////////////////////////////////////////
  //  Draws map background image to screen
  //////////////////////////////////////////////////////////////////////////////
  drawBackground(){

    ctx.drawImage(imageLoader.worldMapBackgroudDarkImg,   this. scrollIndex[0],   this. scrollIndex[1]);//, 1200, 700);

    ctx.save();

    ctx.beginPath();
    ctx.arc(mapLocations.list[0][2]+mapLocations.locationSize/2 + this.scrollIndex[0], mapLocations.list[0][3]+mapLocations.locationSize/2  +   this.scrollIndex[1], 20*player.impetus, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(imageLoader.worldMapBackgroudImg,   this. scrollIndex[0],   this. scrollIndex[1]);//, 1200, 700);

    ctx.restore();




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
      ctx.arc(mapLocations.list[x][2]+mapLocations.locationSize/2 +   this. scrollIndex[0], mapLocations.list[x][3]+mapLocations.locationSize/2  +   this. scrollIndex[1], mapLocations.locationSize/2, 0, 2 * Math.PI);
      ctx.fill();

      //Draws the location icon to screen
      ctx.globalAlpha = 1;
      ctx.drawImage(this.locationImage, mapLocations.list[x][2] +   this. scrollIndex[0], mapLocations.list[x][3] +   this. scrollIndex[1], mapLocations.locationSize, mapLocations.locationSize);

    }

    ctx.restore();
  }//end drawLocations()

  //////////////////////////////////////////////////////////////////////////////
  //  Click Handler function for the World Map screen
  //////////////////////////////////////////////////////////////////////////////
  worldMapClickHandler(clickPositionX,clickPositionY){

    //Check if the click landed in the menu bar
    if(clickPositionY > 705){
      //Check if the "MENU" button was pressed
      if(clickPositionX > 1105){
        console.log("Entering menu!");
        //Go directly to Creature Editor Screen
        setGameMode(3);
        canvas.onmousemove = null;
      }
      //Check if click is on the arrow buttons
      else if(clickPositionX > this.scrollButtonLocation[0]){
        //Right arrow
        if(clickPositionX > this.scrollButtonLocation[0] + 90){
          this.scrollMap('west');
        }
        //Up/down arrows
        else if(clickPositionX > this.scrollButtonLocation[0] + 35){
          if(clickPositionY > this.scrollButtonLocation[1] + 52.5){
            this.scrollMap('south');
          }
          else{
            this.scrollMap('north');
          }
        }
        //Left arrow
        else if(clickPositionX > this.scrollButtonLocation[0]){
          this.scrollMap('east');
        }
      }
    }

    //If map travel is disabled, exit here
    if(!this.travelEnabled){
      return;
    }

    //Itterate through the coordinates of all the map locations
    for(var x = 0; x < this.locationCoordinates.length; x++){
      //Check if the click was on a map location
      if(clickPositionX > this.locationCoordinates[x][0] + this.scrollIndex[0] &&
         clickPositionX < this.locationCoordinates[x][0] + mapLocations.locationSize + this.scrollIndex[0] &&
         clickPositionY > this.locationCoordinates[x][1] + this.scrollIndex[1] &&
         clickPositionY < this.locationCoordinates[x][1] + mapLocations.locationSize + this.scrollIndex[1]){
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
              if(x == 2){
                setGameMode(7);
              }
              else if(x == 6){
                setGameMode(8);
              }
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
