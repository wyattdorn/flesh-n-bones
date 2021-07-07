function diamondSquare() {
    var mapWidth = 16;
    var mapLength = 16;
    var mapHeight = 40;

    var heightMap = [];

    for(let x = 0; x < mapWidth; x++){
      heightMap[x] = []
      for(let y = 0; y < mapLength; y++){
          heightMap[x][y] = [mapHeight / 2];
      }
    }


    console.log(heightMap);
}
