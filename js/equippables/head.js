//Written by Wyatt Dorn

class Head{

  this.list[0] = [0, "No Head", 0, "Creature has no head.",false, imageLoader.noHeadImg, 0];

  constructor(idNum, name, myFunction, description, buff, image, cost){
    this.idNum = idNum;
    this.name = name;
    this.function = myFunction;
    this.description = description;
    this.buff = buff;
    this.image = image
    this.cost = cost;
  }//end constructor()

}//end Equippable
