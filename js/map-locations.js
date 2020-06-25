

class MapLocations{

  constructor(){
    this.init();
  }

  init(){

    //For the sake of ease, all locations on the map will be 75px by 75px
    this.locationSize = 100;

    this.list = [];

    //              0  1                      2    3    4          5                                            6
    //                  Name                  x    y   friendly    Color Pallet                                 Description
    this.list[0] = [0, "Forgotten Temple",    100, 100, true,  ["#131313", "#286355", "#111199", "#003000"], "Where this story began, though who can say where it will end?"];
    this.list[1] = [1, "Goblin Woods",        200, 300, false, ["#171b04", "#303030", "#009000", "#003000"], "Goblins stalk these woods, and few can match them when fighting amongs the trees."];
    this.list[2] = [2, "Bleak Barrows",       900, 500, false, ["#131313", "#286355", "#111199", "#003000"], "Once the home of a worl-renowned mage college, now only the dead remain."];
    this.list[3] = [3, "Groknag's Caves",     700, 100, false, ["#452301", "#303030", "#201000", "#003000"], "The mighty orc chief Groknag has ruled these caves for years."];
    this.list[4] = [4, "Feragolis",           500, 400, false, ["#441111", "#220505", "#442222", "#773300"], "Home of the fire golems. None who enter leave unburned."];


  }//end init()

}
