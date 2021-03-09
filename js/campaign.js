
class Campaign{

  constructor(){

    this.init();

  }//end constructor()

  init(){

    //this.name = name;
    this.dialogue = [];

    this.list = [];

    //Create a list of functions that will handle the specific events that occur as the story progresses
    this.list[0] = this.nothing;
    this.list[1] =  this.chapter1;
    this.list[2] =  this.chapter2;

    //Odd sections are campaign events (printing dialogue to the screen, etc)
    //Even sections are poins where the player must acomplish tasks to progress to teh next section


  }//end init()

  nothing(){}

  ////////////////////////////////////////////////////////////////////////////////
  // First chapter of the campaign
  ////////////////////////////////////////////////////////////////////////////////
  chapter1(section){
    console.log("Chapter: 1 --- Section: " + section);
    switch (section) {
      case 1:

        dialogueWindow.init(  ["Welcome to Flesh and Bones: RPG!",
                              "First, go to the Creature Editor Screen, and equip a body to the one poor soul you own.",
                              "Then return here to combat the goblins of Goblin Woods."],
                              [audioLoader.campaignAud, audioLoader.c1_1Aud, audioLoader.c1_2Aud],
                              200, 100, 1250, 280);
        break;
      case 3:
        dialogueWindow.init(  ["A Goglin Head has been dropped!",
                              "Add it to your creature to see what it does."],
                              [audioLoader.c2_1Aud, audioLoader.c2_2Aud],
                              200, 100, 1250, 280);
        break;
      case 5:
        dialogueWindow.init(  ["Now to kill the boss goblin!",
                              "Don't forget to bring along the Red Sludge!"],
                              [audioLoader.c3_1Aud, audioLoader.c3_2Aud],
                              200, 100, 1250, 280);
        break;
      case 7:
        dialogueWindow.init(  ["You found another lost soul who wishes to join you.",
                              "The more souls you hold sway over, the larger your sphere of influence!",
                              "The Goblin Woods are now secure, but the Bleak Barrows remain hostile."],
                              [audioLoader.c4_1Aud],
                              200, 100, 1250, 280);
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

        dialogueWindow.init(  ["Chapter 2: Explore the world",
                              "With the skills you're learned, go forth and expand your influence!"
                              ],
                              [],
                              200, 100, 1250, 280);
        if(player.soulsOwned == 1){
          player.addSoul();
        }
        break;
      case 3:
        dialogueWindow.init(  ["Continue to use the body parts you have to create an army to do your bidding!"
                              ],
                              [],
                              200, 100, 1250, 280);
        break;
      case 5:
        //Continue to use the body parts you have to create an army to do your bidding
        dialogueWindow.init(  ["Now that the Barrows are clear of foes, a withered old creature has taken up shop!",
                               "You may now buy and sell items when you visit this location."
                              ],
                              [],
                              200, 100, 1250, 280);
        player.addSoul();
        break;
      default:

    }
  }//end chapter2

}//end class Campaign
