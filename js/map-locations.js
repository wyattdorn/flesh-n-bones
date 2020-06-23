

class MapLocations{

  constructor(){
    this.init();
  }

  init(){

    //For the sake of ease, all locations on the map will be 75px by 75px
    this.locationSize = 100;

    this.list = [];

    //              0  1                      2    3    4        5
    //                  Name                  x    y   friendly  Description
    this.list[0] = [0, "Forgotten Temple",    100, 100, true,   "Where this story began, though who can say where it will end?"];
    this.list[1] = [1, "Goblin Woods",        200, 300, false,  "Goblins stalk these woods, and few can match them when fighting amongs the trees."];
    this.list[2] = [2, "Bleak Barrows",       900, 500, false,  "Once the home of a worl-renowned mage college, now only the dead remain."];
    this.list[3] = [3, "Groknag's Caves",     700, 100, false,  "The mighty orc chief Groknag has ruled these caves for years."];
    this.list[4] = [4, "Feragolis",           500, 400, false,  "Home of the fire golems. None who enter leave unburned."];


  }//end init()

}
