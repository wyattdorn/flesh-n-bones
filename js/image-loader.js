

class ImageLoader{

  constructor(context, canvas){

      this.ctx = context;
      this.canvas = canvas;

      this.loader = new PxLoader();
        this.skeletonImg = this.loader.addImage('media/images/character-sprites/skeleman-1.png'),
        this.orcImg = this.loader.addImage('media/images/character-sprites/orc-1.png'),
        this.goblinImg = this.loader.addImage('media/images/character-sprites/goblin-1.png'),
        this.fireElementalImg = this.loader.addImage('media/images/character-sprites/fireelemental-1.png'),
        this.pileOfBonesImg = this.loader.addImage('media/images/character-sprites/pile-of-bones.png'),
        this.worldMapBackgroudImg = this.loader.addImage('media/images/backgrounds/bg.png');

      // callback that will be run once images are ready
      this.loader.addCompletionListener(function() {
          //var canvas = document.getElementById('sample1-canvas'),
          if (canvas.getContext) {
            ctx = canvas.getContext('2d');
          }
          else{
            return false;
          }

          //ctx.drawImage(backgroundImg, 0, 0);
          //ctx.drawImage(treesImg, 0, 104);
          //ctx.drawImage(ufoImg, 360, 50);
      });

      // begin downloading images
      this.loader.start();



  }//end constructor()

  init(){


  }//end init()


}
