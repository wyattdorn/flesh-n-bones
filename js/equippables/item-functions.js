//Written by Wyatt Dorn

function generateItems(){
  items = [];
  items.push(new Item(0, "No Item", function doNothing(){}, "Creature has no item equipped.", false, imageLoader.noItemImg, 0));
  items.push(new Item(1, "Red Sludge", redSludge, "Restore 8 HP to this Creature.", false, imageLoader.redSludgeImg, 10));
  items.push(new Item(2, "Blue Sludge", blueSludge, "Restore 5 Spirit to this Creature.", false, imageLoader.blueSludgeImg, 12));
  items.push(new Item(3, "Purp. Sludge", purpleSludge, "Restore 5 HP and 3 Spirit to this Creature.", false, imageLoader.purpleSludgeImg, 20));

  itemFunctions = [];
  itemFunctions.push(redSludge);
  itemFunctions.push(blueSludge);
  itemFunctions.push(purpleSludge);
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
