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

    this.blockSize = 80;

    this.mapSize = [canvas.width/this.blockSize, canvas.height/this.blockSize];

    this.initialPosition = [10,4];
    this.currentLocation = [10,4];

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
        this.randomMap[x][y] = (Math.abs(x - this.initialPosition[0]) + Math.abs(y - this.initialPosition[1])) * 7;
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

    this.randomMap[this.initialPosition[0]][this.initialPosition[1]] = 2;

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
    this.tempGrid[this.initialPosition[0]][this.initialPosition[1]] = 1;



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
    ctx.arc(this.blockSize/2 + this.currentLocation[0] * this.blockSize, this.blockSize/2 + this.currentLocation[1] * this.blockSize, 1.5*this.blockSize, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.clip();


    ctx.fillStyle = "#aba";
    for(let x = 0; x < this.mapSize[0]; x++){
      for(let y = 0; y < this.mapSize[1]; y++){
        if(this.randomMap[x][y] == 1){
          ctx.fillStyle = "#aba";
          ctx.fillRect(x*this.blockSize, y*this.blockSize, this.blockSize, this.blockSize);
        }
        else if(this.randomMap[x][y] == -1){
          ctx.fillStyle = "#2a1506";
          ctx.fillRect(x*this.blockSize, y*this.blockSize, this.blockSize, this.blockSize);
        }
      }
    }

    console.log(this.initialPosition);
    ctx.fillStyle = "#787";
    ctx.fillRect(this.initialPosition[0]*this.blockSize, this.initialPosition[1]*this.blockSize, this.blockSize, this.blockSize);

    //Mark our current location
    ctx.fillStyle = "#a44";
    ctx.fillRect(this.currentLocation[0]*this.blockSize, this.currentLocation[1]*this.blockSize, this.blockSize, this.blockSize);

    ctx.restore();

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

    //Move the player in hte desired direction
    this.currentLocation[0] += this.movement[0];
    this.currentLocation[1] += this.movement[1];

    this.updateScreen();

  }//end movePlayer()

  //////////////////////////////////////////////////////////////////////////////
  //
  //////////////////////////////////////////////////////////////////////////////
  crystalCavernsClickHandler(clickPositionX,clickPositionY){
    console.log("CAVE!");

    if(clickPositionX < this.currentLocation[0]*this.blockSize){
      this.movePlayer("west");
    }
    else if(clickPositionX > this.blockSize + this.currentLocation[0] * this.blockSize){
      this.movePlayer("east");
    }
    else if(clickPositionY > this.blockSize + this.currentLocation[1] * this.blockSize){
      this.movePlayer("south");
    }
    else if(clickPositionY < this.currentLocation[1] * this.blockSize){
      this.movePlayer("north");
    }

  }//end crystalCavernsClickHandler()

}//end CrystalCavernsMap
