

class MapLocations{

  constructor(){
    this.init();
  }//end constructor()

  init(){

    //For the sake of ease, all locations on the map will be 75px by 75px
    this.locationSize = 75;

    //List of location and their pertinent information
    this.list = [];

    //List of the encounters found at each location
    this.encounterList = [];

    //              0  1                      2    3    4          5                                         6                7
    //                  Name                  x    y   friendly    Color Pallet                              Icon Name        Description
    this.list[0] = [0, "Forgotten Temple",    300, 300, true,  ["#131313", "#286355", "#111199", "#003000"], imageLoader.templeIcon,    "Where this story began, though who can say where it will end?"];
    this.list[1] = [1, "Goblin Woods",        100, 200, false, ["#171b04", "#303030", "#009000", "#003000"], imageLoader.woodsIcon,     "Goblins stalk these woods, and few can match them when fighting amongs the trees."];
    this.list[2] = [2, "Bleak Barrows",       200, 550, false, ["#131313", "#286355", "#111199", "#003000"], imageLoader.barrowsIcon,   "Once the home of a worl-renowned mage college, now only the dead remain."];
    this.list[3] = [3, "Groknag's Caves",     400, 150, false, ["#452301", "#303030", "#201000", "#003000"], imageLoader.caveIcon,      "The mighty orc chief Groknag has ruled these caves for years."];
    this.list[4] = [4, "Feragolis",           500, 400, false, ["#441111", "#220505", "#442222", "#773300"], imageLoader.feragolisIcon, "Home of the fire golems. None who enter leave unburned."];
    this.list[5] = [5, "Den of Thieves",      900, 400, false, ["#006994", "#999999", "#404070", "#000000"], imageLoader.thievesIcon,   "A band of cuthroats and thieves once lived here. They remain even beyond death."];
    this.list[6] = [6, "Crystal Caverns",     430, 550, false, ["#006994", "#999999", "#404070", "#000000"], imageLoader.cavernIcon,    "The crystals found underground here have a strange influence on their surroundings."];
    this.list[7] = [7, "Abandoned Hatchery",  750, 200, false, ["#006994", "#999999", "#404070", "#000000"], imageLoader.hatcheryIcon,  "This place was aboned for good reason."];
    this.list[8] = [8, "Harpy's Eyrie",       820, 550, false, ["#006994", "#999999", "#404070", "#000000"], imageLoader.eyrieIcon,     "Even at the best of times, harpies are not pleasant."];
    this.list[9] = [9, "Screaming Portal",    1000, 50, false, ["#006994", "#999999", "#404070", "#000000"], imageLoader.portalIcon,    "Tortured screaming eminates from this portal witout end."];

    //temperment  bones Guts  skin  stats

    this.encounterList[0] = [0];
    this.encounterList[1] = [1, [[0, 1, 0, 1, 2, 2, 2, 2, 2, 2], [0, 1, 0, 1, 2, 2, 2, 2, 2, 2]],
                                [[/*three goblins*/], [/*some loot*/]],
                                [[/*Boss goblin*/], [/*good loot*/]]];


  }//end init()


  //////////////////////////////////////////////////////////////////////////////
  //  Generates an encounter for a given location, using this.encounterList, based on the player's progress
  //////////////////////////////////////////////////////////////////////////////
  generateEncounter(location, encounterNum){

    //Loop through each enemy creature in the encounter table
    for(var x = 0; x < this.encounterList[location][encounterNum].length; x++){
      enemyCreatures.push(new enemyCreature());
    }

  }//end generateEncounter()

}
