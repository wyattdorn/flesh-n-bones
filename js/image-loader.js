//Written by Wyatt Dorn

//Goblin sprite found at: https://gameartpartners.com/downloads/goblin-medieval-character-art/
//Orc sprite found at: http://www.gamebuildingtools.com/product/lumbering-orc-club/
//Fire Elementaql sprite found at: http://wiki.rivalkingdomsgame.com/summons:greater-fire-elemental
//Skull sprite found at: https://www.pixilart.com/art/skull-pixelart-fecd760036053e9

class ImageLoader{

  constructor(context, canvas){

      this.ctx = context;
      this.canvas = canvas;

      mediaLoader = new PxLoader();

      this.noHeadImg = mediaLoader.addImage('media/images/heads/no-head.png'),
      this.orcHeadImg = mediaLoader.addImage('media/images/heads/orc-head.png'),
      this.goblinHeadImg = mediaLoader.addImage('media/images/heads/goblin-head.png'),
      this.mageHeadImg = mediaLoader.addImage('media/images/heads/dark-mage-head.png');


      this.oldBodyImg = mediaLoader.addImage('media/images/bodies/old-body.png'),
      this.brittleBodyImg = mediaLoader.addImage('media/images/bodies/brittle-body.png'),
      this.bigBodyImg = mediaLoader.addImage('media/images/bodies/big-body.png');


      //////////////////////////////// CREATURE SPRITES ///////////////////////////////
        this.skeletonImg = mediaLoader.addImage('media/images/character-sprites/new-sprites/skeleton-warrior.png'),
        this.orcImg = mediaLoader.addImage('media/images/character-sprites/orc-1.png'),
        this.goblinImg = mediaLoader.addImage('media/images/character-sprites/goblin-1.png'),
        this.fireElementalImg = mediaLoader.addImage('media/images/character-sprites/fireelemental-1.png'),
        this.pileOfBonesImg = mediaLoader.addImage('media/images/character-sprites/pile-of-bones.png'),
        this.soulImg = mediaLoader.addImage('media/images/character-sprites/new-sprites/soul.png');
        this.bigBoneImg = mediaLoader.addImage('media/images/character-sprites/new-sprites/green-ogre.png');
        this.brittleBoneImg = mediaLoader.addImage('media/images/character-sprites/new-sprites/dark-mage.png');
        this.blueMonsterImg = mediaLoader.addImage('media/images/character-sprites/new-sprites/blue-monster.png');
        this.thiefImg = mediaLoader.addImage('media/images/character-sprites/new-sprites/thief.png');
        this.kappaImg = mediaLoader.addImage('media/images/character-sprites/new-sprites/kappa.png');
        this.skullKnightImg = mediaLoader.addImage('media/images/character-sprites/new-sprites/skull-knight.png');
        this.anubisImg = mediaLoader.addImage('media/images/character-sprites/new-sprites/anubis.png');

      //////////////////////////// GUI IMAGES /////////////////////////////////////////
        this.worldMapBackgroudImg = mediaLoader.addImage('media/images/backgrounds/bg-1.png');
        this.combatScreenSkullsImg = mediaLoader.addImage('media/images/gui/style/skull1-green.png');
        this.combatScreenFlourishImg = mediaLoader.addImage('media/images/gui/style/flourish-1.png');

      ///////////////////////// ITEM ICONS ///////////////////////////////////////////
        this.blueSludgeImg = mediaLoader.addImage('media/images/items/blue-sludge.png');
        this.redSludgeImg = mediaLoader.addImage('media/images/items/red-sludge.png');
        this.purpleSludgeImg = mediaLoader.addImage('media/images/items/purple-sludge.png');
        this.noItemImg = mediaLoader.addImage('media/images/cube.png');


      ////////////////////////// MAP LOCATIONS //////////////////////////////////////
        this.templeIcon = mediaLoader.addImage('media/images/map-locations/eye.png');
        this.caveIcon = mediaLoader.addImage('media/images/map-locations/fist.png');
        this.barrowsIcon = mediaLoader.addImage('media/images/map-locations/skull.png');
        this.feragolisIcon = mediaLoader.addImage('media/images/map-locations/skull3.png');
        this.woodsIcon = mediaLoader.addImage('media/images/map-locations/axe.png');
        this.thievesIcon = mediaLoader.addImage('media/images/map-locations/flag2.png');
        this.cavernIcon = mediaLoader.addImage('media/images/map-locations/crystal.png');
        this.hatcheryIcon = mediaLoader.addImage('media/images/map-locations/egg.png');
        this.eyrieIcon = mediaLoader.addImage('media/images/map-locations/feathers.png');
        this.portalIcon = mediaLoader.addImage('media/images/map-locations/portal.png');
        this.friendlyWoodsIcon = mediaLoader.addImage('media/images/map-locations/woods.png');

      // callback that will be run once images are ready
      mediaLoader.addCompletionListener(function() {
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
      //mediaLoader.start();



  }//end constructor()


}
