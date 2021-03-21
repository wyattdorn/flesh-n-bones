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

      this.malachiteVeinImg = mediaLoader.addImage('media/images/cave-tiles/malachite-vein-small.png'),
      this.directionArrowsImg = mediaLoader.addImage('media/images/cave-tiles/direction-arrows-hollow.png'),
      this.caveExitButtonActive = mediaLoader.addImage('media/images/cave-tiles/cave-exit-button-active.png'),
      this.caveExitButtonInactive = mediaLoader.addImage('media/images/cave-tiles/cave-exit-button-inactive.png'),
      this.caveExitTile = mediaLoader.addImage('media/images/cave-tiles/cave-exit.png'),
      this.caveFloorTile = mediaLoader.addImage('media/images/cave-tiles/cave-floor.png'),
      this.darkCaveTile = mediaLoader.addImage('media/images/cave-tiles/cave-blocks-dark.png'),
      this.lightCaveTile = mediaLoader.addImage('media/images/cave-tiles/cave-blocks-light.png');

      /////////////////////////////HEAD SPRITES/////////////////////////////////
      this.armoredHeadImg = mediaLoader.addImage('media/images/heads/armored-head.png'),
      this.noHeadImg = mediaLoader.addImage('media/images/heads/no-head.png'),
      this.skeletonPirateHeadImg = mediaLoader.addImage('media/images/heads/skeleton-pirate-head.png'),
      this.cyclopsHeadImg = mediaLoader.addImage('media/images/heads/cyclops-head.png'),
      this.goblinHeadImg = mediaLoader.addImage('media/images/heads/goblin-head.png'),
      this.gruffHeadImg = mediaLoader.addImage('media/images/heads/gruff-head.png'),
      this.anubisHeadImg = mediaLoader.addImage('media/images/heads/anubis-head.png'),
      this.orcHeadImg = mediaLoader.addImage('media/images/heads/orc-head.png'),
      this.goblinHeadImg = mediaLoader.addImage('media/images/heads/goblin-head.png'),
      this.mageHeadImg = mediaLoader.addImage('media/images/heads/dark-mage-head.png');

      this.wrappedBodyImg = mediaLoader.addImage('media/images/bodies/wrapped-body.png'),
      this.mysteriousBodyImg = mediaLoader.addImage('media/images/bodies/mysterious-body.png'),
      this.oldBodyImg = mediaLoader.addImage('media/images/bodies/old-body.png'),
      this.woolyBodyImg = mediaLoader.addImage('media/images/bodies/wooly-body.png'),
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
        this.worldMapBackgroudImg = mediaLoader.addImage('media/images/backgrounds/med-world-map.png'); //bg-4.png created via: https://www.redblobgames.com/maps/mapgen4/
        this.worldMapBackgroudDarkImg = mediaLoader.addImage('media/images/backgrounds/med-world-map-dark.png');
        this.creatureEditorBackgroundImg = mediaLoader.addImage('media/images/backgrounds/creature-editor-bg.png');
        this.combatScreenSkullsImg = mediaLoader.addImage('media/images/gui/style/skull1-green.png');
        this.combatScreenFlourishImg = mediaLoader.addImage('media/images/gui/style/flourish-1.png');
        this.compassRoseImg = mediaLoader.addImage('media/images/gui/compass-rose.png');
        this.organHeartImg = mediaLoader.addImage('media/images/gui/organ-heart.png');

      ///////////////////////// ITEM ICONS ///////////////////////////////////////////
        this.blueSludgeImg = mediaLoader.addImage('media/images/items/blue-sludge.png');
        this.redSludgeImg = mediaLoader.addImage('media/images/items/red-sludge.png');
        this.purpleSludgeImg = mediaLoader.addImage('media/images/items/purple-sludge.png');
        this.noItemImg = mediaLoader.addImage('media/images/cube.png');


      ////////////////////////// MAP LOCATIONS //////////////////////////////////////
        this.shop2Icon = mediaLoader.addImage('media/images/map-locations/shop-icon-2.png'); //shop-icon-2.png taken from: https://themightyquest.fandom.com/wiki/Bling
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
