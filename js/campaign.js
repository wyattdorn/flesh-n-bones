
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
                              "First, go to the Creature Editor Screen, and equip some bones to the one poor soul you own.",
                              "Then return here to combat the goblins of Goblin Woods."],
                              [audioLoader.campaignAud, audioLoader.c1_1Aud, audioLoader.c1_2Aud],
                              200, 100, 1250, 280);
        break;
      case 3:
        dialogueWindow.init(  ["A Goglin Skin has been dropped!",
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
        dialogueWindow.init(  ["You found another lost soul who wishes to join you."],
                              [audioLoader.c4_1Aud],
                              200, 100, 1250, 280);
        player.addSoul();
        player.nextChapter();
        break;
      default:

    }
  }//end chapter1

}//end class Campaign
