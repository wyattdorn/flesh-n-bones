//Written by Wyatt Dorn

class Campaign{

  constructor(){

    this.init();

  }//end constructor()

  init(){

    //this.name = name;
    this.dialogue = [];

    this.list = [];

    //Create a list of functions that will handle the specific events that occur as the story progresses
    this.list[0] = this.redacted;
    this.list[1] =  this.chapter1;
    this.list[2] =  this.chapter2;
    this.list[3] =  this.chapter3;

    //Odd sections are campaign events (printing dialogue to the screen, etc)
    //Even sections are poins where the player must acomplish tasks to progress to teh next section


  }//end init()

  redacted(section){}

  ////////////////////////////////////////////////////////////////////////////////
  // First chapter of the campaign
  ////////////////////////////////////////////////////////////////////////////////
  chapter1(section){
    console.log("Chapter: 1 --- Section: " + section);
    switch (section) {
      case 1:

        dialogueWindow.init(  ["Click anywhere to continue.",
                              "Welcome to Flesh and Bones: RPG!",
                              "First, go to the Creature Editor Screen, and equip a body to the one poor soul you own.",
                              "Then return here to combat the goblins of Goblin Woods."],
                              [null,audioLoader.campaignAud, audioLoader.c1_1Aud, audioLoader.c1_2Aud],
                              200, 100, 1250, 280, true);
        break;
      case 3:
        dialogueWindow.init(  ["A Goglin Head has been dropped!",
                              "Add it to your creature to see what it does."],
                              [audioLoader.c2_1Aud, audioLoader.c2_2Aud],
                              200, 100, 1250, 280, true);
        break;
      case 5:
        dialogueWindow.init(  ["Now to kill the boss goblin!",
                              "Don't forget to bring along the Red Sludge!"],
                              [audioLoader.c3_1Aud, audioLoader.c3_2Aud],
                              200, 100, 1250, 280, true);
        break;
      case 7:
        dialogueWindow.init(  ["You found another lost soul who wishes to join you.",
                              "The more souls you hold sway over, the larger your sphere of influence!",
                              "The Goblin Woods are now secure, but the Bleak Barrows remain hostile."],
                              [audioLoader.c4_1Aud],
                              200, 100, 1250, 280, true);
        player.addSoul();
        player.nextChapter();
        break;
      default:

    }
  }//end chapter1

  ////////////////////////////////////////////////////////////////////////////////
  // Second chapter of the campaign
  ////////////////////////////////////////////////////////////////////////////////
  chapter2(section){
    console.log("Chapter: 2 --- Section: " + section);
    switch (section) {
      case 1:

        dialogueWindow.init(  ["Chapter 2: More Bodies, More Souls",
                              "With another soul under your influence, you can add another creature to your party!",
                              "Visit the Creature Editor Screen to build a new Creature, and add it to your party."
                              ],
                              [],
                              200, 100, 1250, 280, true);
        if(player.soulsOwned == 1){
          player.addSoul();
        }
        break;
      case 3:
        dialogueWindow.init(  ["Continue to use the body parts you have to create an army to do your bidding!"
                              ],
                              [],
                              200, 100, 1250, 280, true);
        break;
      case 5:
        //Continue to use the body parts you have to create an army to do your bidding
        dialogueWindow.init(  ["Now that the Barrows are clear of foes, a withered old creature has taken up shop here!",
                               "You may now buy and sell items when you visit this location."
                              ],
                              [],
                              200, 100, 1250, 280, true);
        player.addSoul();
        player.nextChapter();
        break;
      default:

    }
  }//end chapter2

  ////////////////////////////////////////////////////////////////////////////////
  // Second chapter of the campaign
  ////////////////////////////////////////////////////////////////////////////////
  chapter3(section){
    console.log("Chapter: 3 --- Section: " + section);
    switch (section) {
      case 1:

        dialogueWindow.init(  ["Chapter 3: Explore the world",
                              "With the skills you're learned, go forth and expand your influence!"
                              ],
                              [],
                              200, 100, 1250, 280, true);
        if(player.soulsOwned == 1){
          player.addSoul();
        }
        break;
      case 3:
        player.addSoul();
        player.addSoul();
        dialogueWindow.init(  ["This concludes the tutorial... for now...",
                                "Continue to explore Feragolis or the endless Crystal Caverns!",
                                "Or, refresh the page to try again! Thank you for playing!"
                              ],
                              [],
                              200, 100, 1250, 280, true);
        break;
      default:

    }
  }//end chapter3

}//end class Campaign
