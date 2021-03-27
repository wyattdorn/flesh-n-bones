//Written by Wyatt Dorn

function generateHeads(){
  headList = [];
  headList.push(new Head(0, "No Head", 0, "Creature has no head.",false, imageLoader.noHeadImg, 0));
  headList.push(new Head(1, "Goblin Head", 5, "Goblin head grants the Scythe skill.",[3,0], imageLoader.goblinHeadImg, 16));
  headList.push(new Head(2, "Orc Head", 6, "Orc head grants the Orc Smash skill.",[4,0], imageLoader.orcHeadImg, 16));
  headList.push(new Head(3, "Mage Head", 7, "Mage head grants the Spirit Dagger skill.",[6,0], imageLoader.mageHeadImg, 16));
  headList.push(new Head(4, "Anubis Head", 9, "Anubis head grants the Divine Aura skill.",[7,0], imageLoader.anubisHeadImg, 16));
  headList.push(new Head(5, "Gruff Head", 0, "Gruff head is gruff.",[4, 5], imageLoader.gruffHeadImg, 16));
  headList.push(new Head(6, "Armored Head", 0, "A head, a helmet, or both?",[2,3], imageLoader.armoredHeadImg, 16));
  headList.push(new Head(7, "Cyclops Head", 0, "Only one eye...",[0,9], imageLoader.cyclopsHeadImg, 16));
  headList.push(new Head(8, "Skeletal Pirate Head", 0, "The severed head of a long dead pirate.", [6,4], imageLoader.skeletonPirateHeadImg, 16));

}//end generateHeads()

function generateBodies(){
  bodyList = [];
  bodyList.push(new Body(0, "No Body", 0, "Creature has no body.", false, imageLoader.soulImg, 0));
  bodyList.push(new Body(1, "Old Body", 1, "Any old pile of bones can attack.",[5,0], imageLoader.oldBodyImg, 16));
  bodyList.push(new Body(2, "Brittle Body", 3, "Brittle body grants the Heal skill.",[7,0], imageLoader.brittleBodyImg, 16));
  bodyList.push(new Body(3, "Big Body", 2, "Big body grant the Defend skill.",[4,0], imageLoader.bigBodyImg, 16));
  bodyList.push(new Body(4, "Wooly Body", 0, "Big body grants additional fortitude.",[5,3], imageLoader.woolyBodyImg, 16));
  bodyList.push(new Body(5, "Mysterious Body", 0, "This body is mysterious.",[1,7], imageLoader.mysteriousBodyImg, 16));
  bodyList.push(new Body(6, "Wrapped Body", 0, "This body is wrapped in linen.",[6,2], imageLoader.wrappedBodyImg, 16));

}//end generateBodies()

function generateGuts(){
  gutsList = [];
  gutsList.push(new Guts(0, "No Guts", 0, "Creature has no guts.",false, null, 0));
  gutsList.push(new Guts(1, "Explosive Guts", 4, "Explosive guts grants the Explode skill.", [0,1], "red", 16));
  gutsList.push(new Guts(2, "Dubious Guts", 0, "No one knows what these guts do...", [3,2], "green", 16));
  gutsList.push(new Guts(3, "Healthy Guts", 8, "Healthy guts allow the owner to heal themself.",[6,0], "yellow", 16));
  gutsList.push(new Guts(4, "Bizarre Guts", 0, "Bizarre guts grant wisdom to a creature.",[1,1], "blue", 16));
  gutsList.push(new Guts(5, "Luminous Guts", 0, "Luminous guts glow with their own light.",[6,5], "white", 16));
  gutsList.push(new Guts(6, "Stinking Guts", 0, "There is no denying the odor of these guts.",[7,5], "orange", 16));

}//end generateGuts()
