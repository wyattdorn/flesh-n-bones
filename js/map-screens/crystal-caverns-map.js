//Written by Wyatt Dorn

class CrystalCavernsMap{

  constructor(context, canvas){

      this.ctx = context;
      this.canvas = canvas;

      //WHere on the map the camera is currently looking
      //By default, we start at the top left of the map (0,0)
      this.scrollIndex = [0,0];

  }//end constructor()

  init(){

    this.timeInCave = 0;

    this.blockSize = 80;

    this.mapSize = [canvas.width/this.blockSize, canvas.height/this.blockSize];

    this.initialLocation = [7,5];
    this.currentLocation = [7,5];

    this.randomMap = [];

    for(let x = 0; x < this.mapSize[0]; x++){
      this.randomMap[x] = [];
      for(let y = 0; y < this.mapSize[1]; y++){
        this.randomMap[x][y] = 0;
      }
    }

    this.randomMap[0][0] = 1;

    console.log(this.randomMap);

    this.generateRandomMap();

    this.removeIsolatedCaves();

    this.updateScreen();


  }//end init()

  //////////////////////////////////////////////////////////////////////////////
  //
  //////////////////////////////////////////////////////////////////////////////
  updateScreen(){

    this.clearScreen();
    this.drawRandomMap();

  }//end updateScreen()


  //////////////////////////////////////////////////////////////////////////////
  //
  //////////////////////////////////////////////////////////////////////////////
  generateRandomMap(){
    console.log(this.mapSize[0] + " = " + this.mapSize[1] + " = ")

    //0 to 99
    //Math.floor(Math.random() * 100);

    for(let x = 0; x < this.mapSize[0]; x++){
      for(let y = 0; y < this.mapSize[1]; y++){
        this.randNum = Math.floor(Math.random() * 100);
        this.randomMap[x][y] = (Math.abs(x - this.initialLocation[0]) + Math.abs(y - this.initialLocation[1])) * 7;
        if(this.randomMap[x][y] < this.randNum){
          // 1 signifies an open section of cave
          this.randomMap[x][y] = 1;
        }
        else{
          // -1 signifies a cave wall
          this.randomMap[x][y] = -1;
        }
      }
    }

    //Set the initial location to the exit point
    this.randomMap[this.initialLocation[0]][this.initialLocation[1]] = 2;

    //The who topmost right tiles are always blocks (so we can put buttons there)
    this.randomMap[this.mapSize[0], 0] = -1;

  }//end generateRandomMap()

  //////////////////////////////////////////////////////////////////////////////
  //  Find cave sections that cannot be reached and remove them
  //////////////////////////////////////////////////////////////////////////////
  removeIsolatedCaves(){

    this.neighbors = [[1, 0], [-1, 0], [0, 1], [0, -1]];

    this.continueLoop = true;

    this.counter = 0;

    //create a temporary grid for storing values
    this.tempGrid = [];
    for(let x = 0; x < this.mapSize[0]; x++){
      this.tempGrid[x] = [];
      for(let y = 0; y < this.mapSize[1]; y++){
        this.tempGrid[x][y] = -1;
      }
    }

    //Indicate that the initila position of the player is reachable
    this.tempGrid[this.initialLocation[0]][this.initialLocation[1]] = 1;



    //loop until the entire main chamber
    //while(this.continueLoop == true){
    for(let c = 0; c < 20; c++){
      //by default we assume the loop will not continue
      this.continueLoop = false;

      for(let x = 0; x < this.mapSize[0]; x++){
        for(let y = 0; y < this.mapSize[1]; y++){
          //if(this.tempGrid[x][y] == 1){console.log("apple");}
          for(let z = 0; z < 4; z++){
            if(x + this.neighbors[z][0] < 0 || y + this.neighbors[z][1] < 0 || x + this.neighbors[z][0] >= this.mapSize[0] || y + this.neighbors[z][1] >= this.mapSize[1]){
              //do nothing
            }
            else if(this.tempGrid[x][y] == 1 && this.randomMap[x + this.neighbors[z][0]][y + this.neighbors[z][1]] == 1 && this.tempGrid[x + this.neighbors[z][0]][y + this.neighbors[z][1]] !=1){
              this.tempGrid[x + this.neighbors[z][0]][y + this.neighbors[z][1]] = 1;
              console.log(x + " - " + y + " - " + this.continueLoop + " - " + this.counter);
              this.continueLoop = true;
            }
          }

        }
      }

      this.counter++;


    }//while(this.continueLoop == true);

    console.log(this.tempGrid);

    this.randomMap = this.tempGrid;

  }//end removeIsolatedCaves()


  //////////////////////////////////////////////////////////////////////////////
  //
  //////////////////////////////////////////////////////////////////////////////
  clearScreen(){
    //black out the screen, covering whatever was drawn previously
    ctx.fillStyle = "#131313";
    ctx.fillRect(0, 0, this.canvas.width, ctx.canvas.height);
  }//end clearScreen()


  //////////////////////////////////////////////////////////////////////////////
  //
  //////////////////////////////////////////////////////////////////////////////
  drawRandomMap(){
    ctx.save();

    ctx.beginPath();
    ctx.arc(this.blockSize/2 + this.currentLocation[0] * this.blockSize, this.blockSize/2 + this.currentLocation[1] * this.blockSize, 1.6*this.blockSize, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.clip();


    ctx.fillStyle = "#aba";
    for(let x = 0; x < this.mapSize[0]; x++){
      for(let y = 0; y < this.mapSize[1]; y++){
        if(this.randomMap[x][y] == 1){
          ctx.fillStyle = "#aba";
          //ctx.fillRect(x*this.blockSize, y*this.blockSize, this.blockSize, this.blockSize);
          ctx.drawImage(imageLoader.caveFloorTile, x*this.blockSize, y*this.blockSize, this.blockSize, this.blockSize);
        }
        //Walls of cave
        else if(this.randomMap[x][y] == -1){
          ctx.fillStyle = "#2a1506";
          //ctx.fillRect(x*this.blockSize, y*this.blockSize, this.blockSize, this.blockSize);
          ctx.drawImage(imageLoader.darkCaveTile, x*this.blockSize, y*this.blockSize, this.blockSize, this.blockSize);
        }
      }
    }

    //Ladder out (initial position)
    ctx.fillStyle = "#787";
    ctx.drawImage(imageLoader.caveExitTile, this.initialLocation[0]*this.blockSize, this.initialLocation[1]*this.blockSize, this.blockSize, this.blockSize);
    //ctx.fillRect(this.initialLocation[0]*this.blockSize, this.initialLocation[1]*this.blockSize, this.blockSize, this.blockSize);

    //Mark our current location
    ctx.fillStyle = "#a44";
    ctx.drawImage(imageLoader.directionArrowsImg, this.currentLocation[0]*this.blockSize-this.blockSize*0.2, this.currentLocation[1]*this.blockSize-this.blockSize*0.2, this.blockSize*1.4, this.blockSize*1.4);
    ctx.drawImage(imageLoader.templeIcon, this.currentLocation[0]*this.blockSize, this.currentLocation[1]*this.blockSize, this.blockSize, this.blockSize);
    //ctx.fillRect(this.currentLocation[0]*this.blockSize+ this.blockSize*0.1, this.currentLocation[1]*this.blockSize + this.blockSize*0.1, this.blockSize*0.8, this.blockSize*0.8);

    ctx.restore();

    //Check if the player is at the exit point
    if(this.currentLocation[0] == this.initialLocation[0] && this.currentLocation[1] == this.initialLocation[1]){
      ctx.drawImage(imageLoader.caveExitButtonActive, (this.mapSize[0]-1)*this.blockSize, 0, this.blockSize, this.blockSize);
    }
    else{
      ctx.drawImage(imageLoader.caveExitButtonInactive, (this.mapSize[0]-1)*this.blockSize, 0, this.blockSize, this.blockSize);
    }

  }//end drawRandomMap();

  //////////////////////////////////////////////////////////////////////////////
  // Given a direction, moves the player's token if able
  //////////////////////////////////////////////////////////////////////////////
  movePlayer(direction){
    console.log("Moving " + direction);

    this.movement = [0,0];

    switch (direction) {
      case "west":
        this.movement = [-1,0];
        break;
      case "east":
        this.movement = [1,0];
        break;
      case "north":
        this.movement = [0,-1];
        break;
      case "south":
        this.movement = [0,1];
        break;
      default:
        console.log(direction + " is not a valid direction.");
    }

    //If the square that he player is trying to move in to is a wall, do not move
    if(this.randomMap[this.currentLocation[0]+this.movement[0]][this.currentLocation[1] + this.movement[1]] == -1){
      return;
    }

    //Itterate the counter
    this.timeInCave++;
    console.log("Time in cave: " + this.timeInCave);

    //Move the player in hte desired direction
    this.currentLocation[0] += this.movement[0];
    this.currentLocation[1] += this.movement[1];

    console.log(this.currentLocation + " -- " + this.initialLocation);

    this.updateScreen();

  }//end movePlayer()

  //////////////////////////////////////////////////////////////////////////////
  //  If the Player is at the ladder (exit point), exit back to the World Map
  //////////////////////////////////////////////////////////////////////////////
  exitCaves(){

    if(this.currentLocation[0] == this.initialLocation[0] && this.currentLocation[1] == this.initialLocation[1]){
      setGameMode(5);
    }
    else{
      console.log("Not at the exit point!");
    }

  }//end exitCaves()

  //////////////////////////////////////////////////////////////////////////////
  //
  //////////////////////////////////////////////////////////////////////////////
  crystalCavernsClickHandler(clickPositionX,clickPositionY){
    console.log("CAVE!");

    //Check if the "Exit Cave" button was clicked
    if(clickPositionX > canvas.width-(this.blockSize) && clickPositionY < this.blockSize){
      this.exitCaves();
    }
    else if(clickPositionX < this.currentLocation[0]*this.blockSize && clickPositionY < (this.currentLocation[1]+1)*this.blockSize && clickPositionY > this.currentLocation[1]*this.blockSize){
      this.movePlayer("west");
    }
    else if(clickPositionX > this.blockSize + this.currentLocation[0] * this.blockSize && clickPositionY < (this.currentLocation[1]+1)*this.blockSize && clickPositionY > this.currentLocation[1]*this.blockSize){
      this.movePlayer("east");
    }
    else if(clickPositionY > this.blockSize + this.currentLocation[1] * this.blockSize && clickPositionX < (this.currentLocation[0]+1)*this.blockSize && clickPositionX > this.currentLocation[0]*this.blockSize){
      this.movePlayer("south");
    }
    else if(clickPositionY < this.currentLocation[1] * this.blockSize && clickPositionX < (this.currentLocation[0]+1)*this.blockSize && clickPositionX > this.currentLocation[0]*this.blockSize){
      this.movePlayer("north");
    }

  }//end crystalCavernsClickHandler()

}//end CrystalCavernsMap
