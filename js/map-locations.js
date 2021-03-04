

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

    //List of the loot dropped when slaying monsters
    this.lootList = [];

    //              0  1                      2    3    4          5                                         6                        7                           8
    //                  Name                  x    y   friendly    Color Pallet                              Icon Name                Friendly Icon               Description
    this.list[0] = [0, "Forgotten Temple",    300, 300, true,  ["#131313", "#286355", "#111199", "#003000"], imageLoader.templeIcon,  imageLoader.templeIcon,    "Where this story began, though who can say where it will end?"];
    this.list[1] = [1, "Goblin Woods",        200, 250, false, ["#171b04", "#303030", "#009000", "#003000"], imageLoader.woodsIcon,   imageLoader.friendlyWoodsIcon,     "Goblins stalk these woods, and few can match them when fighting amongs the trees."];
    this.list[2] = [2, "Bleak Barrows",       220, 420, false, ["#131313", "#286355", "#111199", "#003000"], imageLoader.barrowsIcon, imageLoader.barrowsIcon,   "Once the home of a world-renowned mage college, now only the dead remain."];
    this.list[3] = [3, "Groknag's Caves",     400, 150, false, ["#452301", "#303030", "#201000", "#003000"], imageLoader.caveIcon,    imageLoader.caveIcon,      "The mighty orc chief Groknag has ruled these caves for years."];
    this.list[4] = [4, "Feragolis",           500, 400, false, ["#441111", "#220505", "#442222", "#773300"], imageLoader.feragolisIcon,imageLoader.feragolisIcon, "Home of the fire golems. None who enter leave unburned."];
    this.list[5] = [5, "Den of Thieves",      900, 400, false, ["#006994", "#999999", "#404070", "#000000"], imageLoader.thievesIcon, imageLoader.thievesIcon,   "A band of cuthroats and thieves once lived here. They remain even beyond death."];
    this.list[6] = [6, "Crystal Caverns",     410, 540, false, ["#002040", "#999999", "#404070", "#000000"], imageLoader.cavernIcon,  imageLoader.cavernIcon,    "The crystals found underground here have a strange influence on their surroundings."];
    this.list[7] = [7, "Abandoned Hatchery",  250, 20, false, ["#006994", "#999999", "#404070", "#000000"], imageLoader.hatcheryIcon, imageLoader.hatcheryIcon,  "This place was aboned for good reason."];
    this.list[8] = [8, "Harpy's Eyrie",       820, 550, false, ["#006994", "#999999", "#404070", "#000000"], imageLoader.eyrieIcon, imageLoader.eyrieIcon,     "Even at the best of times, harpies are not pleasant."];
    this.list[9] = [9, "Screaming Portal",    1000, 50, false, ["#40a9ff", "#999999", "#404070", "#000000"], imageLoader.portalIcon,  imageLoader.portalIcon,    "Tortured screaming eminates from this portal witout end."];

    //name temperment  bones Guts  skin  stats

    this.encounterList[0] = [0];
    this.encounterList[1] = [1, [["Glibglob", 0, 1, 0, 1, 2, 2, 2, 2, 2, 2, imageLoader.goblinImg], ["Frank", 0, 1, 0, 1, 2, 2, 2, 2, 2, 2, imageLoader.goblinImg]],
                                [["Jopp", 0, 1, 0, 1, 2, 2, 2, 2, 2, 2, imageLoader.goblinImg], ["Kitl", 0, 1, 0, 1, 2, 2, 2, 2, 2, 2, imageLoader.orcImg], ["Gak", 0, 1, 0, 1, 2, 2, 2, 2, 2, 2, imageLoader.goblinImg]],
                                [["Chungus", 0, 1, 0, 10, 5, 5, 5, 7, 5, 5, imageLoader.goblinImg]]];

    this.encounterList[2] = [2, [["Aglar", 0, 1, 0, 1, 2, 2, 2, 2, 2, 2, imageLoader.skeletonImg], ["Girlov", 0, 1, 0, 1, 2, 2, 2, 2, 2, 2, imageLoader.skeletonImg]],
                                [["Aglar", 0, 1, 0, 1, 2, 2, 2, 2, 2, 2, imageLoader.skeletonImg], ["Girlov", 0, 1, 0, 1, 2, 2, 2, 2, 2, 2, imageLoader.skeletonImg], ["Aglar", 0, 1, 0, 1, 2, 2, 2, 2, 2, 2, imageLoader.skeletonImg]],
                                ];

    this.encounterList[3] = [3, [["Jopp", 0, 1, 0, 1, 2, 2, 2, 2, 2, 2, imageLoader.orcImg], ["Kitl", 0, 1, 0, 1, 2, 2, 2, 2, 2, 2, imageLoader.orcImg], ["Gak", 0, 1, 0, 1, 2, 2, 2, 2, 2, 2, imageLoader.orcImg]],
                                ];

    this.encounterList[4] = [4, [["Aglar", 2, 1, 0, 1, 7, 7, 7, 7, 7, 7, imageLoader.fireElementalImg]],
                                [[/*three goblins*/], [/*some loot*/]],
                                [[/*Boss goblin*/], [/*good loot*/]]];

    this.encounterList[5] = [5, [["Pete", 0, 1, 0, 1, 2, 2, 2, 2, 2, 2, imageLoader.thiefImg], ["Rolf", 0, 1, 0, 1, 2, 2, 2, 2, 2, 2, imageLoader.thiefImg], ["Jorg", 0, 1, 0, 1, 2, 2, 2, 2, 2, 2, imageLoader.thiefImg]],
                                [[/*Boss goblin*/], [/*good loot*/]]];

    this.encounterList[6] = [6, [["Zipp", 0, 1, 0, 1, 2, 2, 2, 2, 2, 2, imageLoader.blueMonsterImg], ["Zopp", 0, 1, 0, 1, 2, 2, 2, 2, 2, 2, imageLoader.blueMonsterImg]],
                                [[/*three goblins*/], [/*some loot*/]],
                                [[/*Boss goblin*/], [/*good loot*/]]];

    this.encounterList[7] = [7, [["Aglar", 2, 1, 0, 1, 7, 7, 7, 7, 7, 7, imageLoader.skullKnightImg]],
                                [[/*three goblins*/], [/*some loot*/]],
                                [[/*Boss goblin*/], [/*good loot*/]]];

    this.encounterList[8] = [8, [["Aglar", 2, 1, 0, 1, 7, 7, 7, 7, 7, 7, imageLoader.kappaImg]],
                                [[/*three goblins*/], [/*some loot*/]],
                                [[/*Boss goblin*/], [/*good loot*/]]];

    this.encounterList[9] = [9, [["iiiiiii", 2, 1, 0, 1, 7, 7, 7, 7, 7, 7, imageLoader.anubisImg]],
                                [[/*three goblins*/], [/*some loot*/]],
                                [[/*Boss goblin*/], [/*good loot*/]]];



    this.lootList[0] = [0];
    this.lootList[1] = [1, [[1,2]],            //Goblin Head
                            [[1,3]],          //Red sludge
                            [[1,1], [3,3]]];  //Explosive guts and purp sludge

    this.lootList[2] = [1, [[1,0], [2,1]],   //old body and dubious guts
                            [[1,3]],          //Red sludge
                            [[1,1], [3,3]]];  //Explosive guts and purp sludge

  }//end init()


  //////////////////////////////////////////////////////////////////////////////
  //  Generates an encounter for a given location, using this.encounterList, based on the player's progress
  //////////////////////////////////////////////////////////////////////////////
  generateEncounter(location, encounterNum){

    console.log("Generating encounter #" + encounterNum + " for " + this.list[location][1]);

    enemyCreatures = [];

    //Loop through each enemy creature in the encounter table
    for(var x = 0; x < this.encounterList[location][encounterNum].length; x++){
      enemyCreatures.push(new EnemyCreature(this.encounterList[location][encounterNum][x]));
    }

  }//end generateEncounter()

}
