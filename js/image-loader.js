

class ImageLoader{

  constructor(context, canvas){

      this.ctx = context;
      this.canvas = canvas;

      this.loader = new PxLoader();

      //////////////////////////////// CREATURE SPRITES ///////////////////////////////
        this.skeletonImg = this.loader.addImage('media/images/character-sprites/new-sprites/skeleton-warrior.png'),
        this.orcImg = this.loader.addImage('media/images/character-sprites/orc-1.png'),
        this.goblinImg = this.loader.addImage('media/images/character-sprites/goblin-1.png'),
        this.fireElementalImg = this.loader.addImage('media/images/character-sprites/fireelemental-1.png'),
        this.pileOfBonesImg = this.loader.addImage('media/images/character-sprites/pile-of-bones.png'),
        
      //////////////////////////// GUI IMAGES /////////////////////////////////////////
        this.worldMapBackgroudImg = this.loader.addImage('media/images/backgrounds/bg-1.png');
        this.combatScreenSkullsImg = this.loader.addImage('media/images/gui/style/skull1-green.png');
        this.combatScreenFlourishImg = this.loader.addImage('media/images/gui/style/flourish-1.png');

      ///////////////////////// ITEM ICONS ///////////////////////////////////////////
        this.blueSludgeImg = this.loader.addImage('media/images/items/blue-sludge.png');
        this.redSludgeImg = this.loader.addImage('media/images/items/red-sludge.png');
        this.purpleSludgeImg = this.loader.addImage('media/images/items/purple-sludge.png');
        this.noItemImg = this.loader.addImage('media/images/cube.png');


      ////////////////////////// MAP LOCATIONS //////////////////////////////////////
        this.templeIcon = this.loader.addImage('media/images/map-locations/eye.png');
        this.caveIcon = this.loader.addImage('media/images/map-locations/fist.png');
        this.barrowsIcon = this.loader.addImage('media/images/map-locations/skull.png');
        this.feragolisIcon = this.loader.addImage('media/images/map-locations/skull3.png');
        this.woodsIcon = this.loader.addImage('media/images/map-locations/axe.png');
        this.thievesIcon = this.loader.addImage('media/images/map-locations/flag2.png');
        this.cavernIcon = this.loader.addImage('media/images/map-locations/crystal.png');
        this.hatcheryIcon = this.loader.addImage('media/images/map-locations/egg.png');
        this.eyrieIcon = this.loader.addImage('media/images/map-locations/feathers.png');
        this.portalIcon = this.loader.addImage('media/images/map-locations/portal.png');

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
