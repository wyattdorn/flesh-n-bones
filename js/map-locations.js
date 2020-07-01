

class MapLocations{

  constructor(){
    this.init();
  }

  init(){

    //For the sake of ease, all locations on the map will be 75px by 75px
    this.locationSize = 75;

    this.list = [];

    //              0  1                      2    3    4          5                                         6                7
    //                  Name                  x    y   friendly    Color Pallet                              Icon Name        Description
    this.list[0] = [0, "Forgotten Temple",    300, 300, true,  ["#131313", "#286355", "#111199", "#003000"], imageLoader.templeIcon,    "Where this story began, though who can say where it will end?"];
    this.list[1] = [1, "Goblin Woods",        100, 200, false, ["#171b04", "#303030", "#009000", "#003000"], imageLoader.woodsIcon,     "Goblins stalk these woods, and few can match them when fighting amongs the trees."];
    this.list[2] = [2, "Bleak Barrows",       200, 550, false, ["#131313", "#286355", "#111199", "#003000"], imageLoader.barrowsIcon,   "Once the home of a worl-renowned mage college, now only the dead remain."];
    this.list[3] = [3, "Groknag's Caves",     400, 150, false, ["#452301", "#303030", "#201000", "#003000"], imageLoader.caveIcon,      "The mighty orc chief Groknag has ruled these caves for years."];
    this.list[4] = [4, "Feragolis",           500, 400, false, ["#441111", "#220505", "#442222", "#773300"], imageLoader.feragolisIcon, "Home of the fire golems. None who enter leave unburned."];
    this.list[5] = [5, "Den of Thieves",      900, 400, false, ["#006994", "#999999", "#404070", "#000000"], imageLoader.thievesIcon,   "A band of cuthroats and thieves once lived here. They remain even beyond death"];

  }//end init()

}
