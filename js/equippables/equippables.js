//Written by Wyatt Dorn

class Equippable{

  constructor(idNum, name, myFunction, description, buff, image, cost){
    this.idNum = idNum;
    this.name = name;
    this.function = myFunction;
    this.description = description;
    this.buff = buff;
    this.image = image
    this.cost = cost;
  }//end constructor()

}

class Head extends Equippable{
  Head0(idNum, name, myFunction, description, buff, image, cost){
    Equippable.call(this, idNum, name, myFunction, description, buff, image, cost);
  }//end constructor
}

class Body extends Equippable{
  Body0(idNum, name, myFunction, description, buff, image, cost){
    Equippable.call(this, idNum, name, myFunction, description, buff, image, cost);
  }//end constructor
}

class Guts extends Equippable{
  Guts0(idNum, name, myFunction, description, buff, image, cost){
    Equippable.call(this, idNum, name, myFunction, description, buff, image, cost);
  }//end constructor
}

class Item extends Equippable{
  Item(idNum, name, myFunction, description, buff, image, cost){
    Equippable.call(this, idNum, name, myFunction, description, buff, image, cost);
    this.function = itemFunctions[myFunction];
  }//end constructor
}
