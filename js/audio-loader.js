//Written by Wyatt Dorn

//Goblin sprite found at: https://gameartpartners.com/downloads/goblin-medieval-character-art/
//Orc sprite found at: http://www.gamebuildingtools.com/product/lumbering-orc-club/
//Fire Elementaql sprite found at: http://wiki.rivalkingdomsgame.com/summons:greater-fire-elemental
//Skull sprite found at: https://www.pixilart.com/art/skull-pixelart-fecd760036053e9

class AudioLoader{

  constructor(context, canvas){


      this.loader = new PxLoader();

      //////////////////////////////// TUTORIAL VOICE LINES ///////////////////////////////
      this.welcomeAud = mediaLoader.addSound('welcome', 'media/audio/welcome.mp3');
      this.campaignAud = mediaLoader.addSound('campaign', 'media/audio/campaign.mp3');
      this.c1_1Aud = mediaLoader.addSound('c1_1', 'media/audio/c1-1.mp3');
      this.c1_2Aud = mediaLoader.addSound('c1_2', 'media/audio/c1-2.mp3');
      this.c2_1Aud = mediaLoader.addSound('c2_1', 'media/audio/c2-1.mp3');
      this.c2_2Aud = mediaLoader.addSound('c2_2', 'media/audio/c2-2.mp3');
      this.c3_1Aud = mediaLoader.addSound('c3_1', 'media/audio/c3-1.mp3');
      this.c3_2Aud = mediaLoader.addSound('c3_2', 'media/audio/c3-2.mp3');
      this.c4_1Aud = mediaLoader.addSound('c4_1', 'media/audio/c4-1.mp3');

      //mediaLoader.start();


  }//end constructor()


}
