class ShopScreen{

  constructor(context, canvas){

      this.ctx = context;
      this.canvas = canvas;

  }//end constructor()

  init(){

    //Determine which shop we are visiting
    this.shopLocation = 0;

    //Boolean to store whether the screen is in "buy" or "sell" mode
    this.isInBuyMode = true;

    console.log("ENTERING SHOP!");

    this.buttonStyle = "rgba(119, 17, 17, 0.80)";

    //this.buySellMenuStats = [10, 10, 100, 80];

    this.menuList = [];
    this.menuList[0] = ["Shop Malachite", 120, 10, 190, 35];
    this.menuList[1] = ["Player Inventory", 620, 10, 300, canvas.height - 20];


    this.buttonList = [];
    this.buttonList[0] = ["Buy/Sell button", 10, 410, 100, 80, this.toggleBuySell];

    this.updateScreen();
  } //end init()

  //////////////////////////////////////////////////////////////////////////////
  // Updates screen
  //////////////////////////////////////////////////////////////////////////////
  updateScreen(){

    this.clearScreen();

    this.drawBuySellButton();

    this.drawShopMalachite();

    this.drawPlayerInventory();

  }//end updateScreen()

  //////////////////////////////////////////////////////////////////////////////
  //  Draws the amount of Malachite the shop has to spend
  //////////////////////////////////////////////////////////////////////////////
  drawPlayerInventory(){
    //black out the screen, covering whatever was drawn previously
    ctx.fillStyle = this.buttonStyle;
    ctx.fillRect(this.menuList[1][1], this.menuList[1][2], this.menuList[1][3], this.menuList[1][4]);

    ctx.font = "19px Courier";
    ctx.fillStyle = "#cccccc";
    for(let x = 0; x < 4; x++){
      for(let y = 0; y < player.inventoryList[x].length; y++){
        ctx.fillText(masterInventoryList[x].list[player.inventoryList[x][y]][1], this.menuList[1][1] + (150 * x), this.menuList[1][2]+(23 * (y+1)));
      }
    }

  }//end drawPlayerInventory()

  //////////////////////////////////////////////////////////////////////////////
  //  Draws the amount of Malachite the shop has to spend
  //////////////////////////////////////////////////////////////////////////////
  drawShopMalachite(){
    //black out the screen, covering whatever was drawn previously
    ctx.fillStyle = this.buttonStyle;
    ctx.fillRect(this.menuList[0][1], this.menuList[0][2], this.menuList[0][3], this.menuList[0][4]);

    ctx.font = "19px Courier";
    ctx.fillStyle = "#cccccc";
    console.log(shopInventory.shopList[0]);
    ctx.fillText("Malachite: " + shopInventory.shopList[this.shopLocation][0], this.menuList[0][1]+15, this.menuList[0][2]+23);


  }//end drawShopMalachite()

  //////////////////////////////////////////////////////////////////////////////
  //Draws the buy/sell button
  //////////////////////////////////////////////////////////////////////////////
  drawBuySellButton(){

    ctx.fillStyle = this.buttonStyle;
    ctx.fillRect(this.buttonList[0][1], this.buttonList[0][2], this.buttonList[0][3], this.buttonList[0][4]);

    //Bold and underline whichever option is currently selected
    ctx.font = "19px Courier";
    ctx.fillStyle = "#cccccc";
    if(this.isInBuyMode){
      ctx.fillText("  SELL", this.buttonList[0][1]+15, this.buttonList[0][2]+55);
      ctx.font = "bold 19px Courier";
      ctx.fillText("> BUY/", this.buttonList[0][1]+15, this.buttonList[0][2]+30);
      let { width } = ctx.measureText("> BUY/");
      ctx.fillRect(this.buttonList[0][1]+15, this.buttonList[0][2]+32, width, 2);
    }
    else{
      ctx.fillText("  BUY/", this.buttonList[0][1]+15, this.buttonList[0][2]+30);
      ctx.font = "bold 19px Courier";
      ctx.fillText("> SELL", this.buttonList[0][1]+15, this.buttonList[0][2]+55);
      let { width } = ctx.measureText("> SELL");
      ctx.fillRect(this.buttonList[0][1]+15, this.buttonList[0][2]+57, width, 2);
    }

  }//end drawBuySellMenu()

  //////////////////////////////////////////////////////////////////////////////
  //  Draws a black rectangle over the screen to clear it out between drawings
  //////////////////////////////////////////////////////////////////////////////
  clearScreen(){
    //black out the screen, covering whatever was drawn previously
    ctx.fillStyle = "#272727";
    ctx.fillRect(0, 0, this.canvas.width, ctx.canvas.height);

    ctx.drawImage(imageLoader.creatureEditorBackgroundImg, 0, 0);//, 1200, 700);

  }//end clearScreen()


  //////////////////////////////////////////////////////////////////////////////
  //  Toggles whether the shop is in buy or sell mode
  //////////////////////////////////////////////////////////////////////////////
  toggleBuySell(){

    myShopScreen.isInBuyMode = !myShopScreen.isInBuyMode;


  }//end toggleBuySell()


  //////////////////////////////////////////////////////////////////////////////
  //  Click Handler function for teh Creature Editor screen
  //////////////////////////////////////////////////////////////////////////////
  shopScreenMapClickHandler(clickPositionX,clickPositionY){

    for(let x = 0; x < this.buttonList.length; x++){
      if(isWithinBounds(clickPositionX, clickPositionY, this.buttonList[0][1], this.buttonList[0][2], this.buttonList[0][3], this.buttonList[0][4])){
        console.log(this.buttonList[0][0]);
        this.buttonList[0][5]();
        this.updateScreen();
      }
    }

  }//end shopScreenMapClickHandler()



}
