



function generateEquippables(){
  equippables.push(new Equippable(0, "No Item", function doNothing(){}, "Creature has no item equipped.", false, imageLoader.noItemImg, 0));
  equippables.push(new Equippable(1, "Red Sludge", redSludge, "Restore 8 HP to this Creature.", false, imageLoader.redSludgeImg, 10));
  equippables.push(new Equippable(2, "Blue Sludge", blueSludge, "Restore 5 Spirit to this Creature.", false, imageLoader.blueSludgeImg, 12));
  equippables.push(new Equippable(3, "Purp. Sludge", purpleSludge, "Restore 5 HP and 3 Spirit to this Creature.", false, imageLoader.purpleSludgeImg, 20));


  this.list[0] = [0, "No Head", 0, "Creature has no head.",false, imageLoader.noHeadImg, 0];
  this.list[1] = [1, "Goblin Head", 5, "Goblin head grants the Scythe skill.",false, imageLoader.goblinHeadImg, 16];
  this.list[2] = [2, "Orc Head", 6, "Orc head grants the Orc Smash skill.",false, imageLoader.orcHeadImg, 16];
  this.list[3] = [3, "Mage Head", 7, "Mage head grants the Spirit Dagger skill.",false, imageLoader.mageHeadImg, 16];
  this.list[4] = [4, "Anubis Head", 9, "Anubis head grants the Divine Aura skill.",false, imageLoader.anubisHeadImg, 16];
  this.list[5] = [5, "Gruff Head", 0, "Gruff head is gruff.",[4, 5], imageLoader.gruffHeadImg, 16];
  this.list[6] = [6, "Armored Head", 0, "A head, a helmet, or both?",[2,3], imageLoader.armoredHeadImg, 16];
  this.list[7] = [7, "Cyclops Head", 0, "Only one eye...",[0,10], imageLoader.cyclopsHeadImg, 16];
  this.list[8] = [8, "Skeletal Pirate Head", 0, "The severed head of a long dead pirate.", [6,4], imageLoader.skeletonPirateHeadImg, 16];

}//end generateEquippables()


//////////////////////////////////////////////////////////////////////////////
//  Red Sludge function - Grants 8 HP
//////////////////////////////////////////////////////////////////////////////
function redSludge(target){
  target.giveHealth(8);
}//end redSludge()

//////////////////////////////////////////////////////////////////////////////
//  Blue Sludge function - Grants 5 Spirit
//////////////////////////////////////////////////////////////////////////////
function blueSludge(target){
  target.giveSpirit(5);
}//end blueSLudge()

//////////////////////////////////////////////////////////////////////////////
//  Purple Sludge function - Grants 5 HP and 3 Spirit
//////////////////////////////////////////////////////////////////////////////
function purpleSludge(target){
  target.giveHealth(5);
  target.giveSpirit(3);
}//end purpleSludge()
