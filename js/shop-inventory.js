//Written by Wyatt Dorn

class ShopInventory{

  constructor(){

    this.init();

  }//end constructor()

  init(){

    this.shopList = [];

    //Afinity is the relationship the Player has with the shop, determines discount
    //1 afinity = 5%


    //                  B  G  H  I  M  Afinity
    this.shopList[0]= [[], [], [], [], 520, 15];

    this.shopList[0][0].push(1);
    this.shopList[0][0].push(2);
    this.shopList[0][0].push(3);
    this.shopList[0][0].push(4);
    this.shopList[0][0].push(5);
    this.shopList[0][0].push(6);

    this.shopList[0][1].push(1);
    this.shopList[0][1].push(2);
    this.shopList[0][1].push(3);
    this.shopList[0][1].push(4);
    this.shopList[0][1].push(5);
    this.shopList[0][1].push(6);

    this.shopList[0][2].push(1);
    this.shopList[0][2].push(2);
    this.shopList[0][2].push(3);
    this.shopList[0][2].push(4);
    this.shopList[0][2].push(5);
    this.shopList[0][2].push(6);
    this.shopList[0][2].push(7);
    this.shopList[0][2].push(8);

    this.shopList[0][3].push(1);
    this.shopList[0][3].push(2);
    this.shopList[0][3].push(3);


  } //end init()

}
