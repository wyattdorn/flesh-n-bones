class ShopScreen{

  constructor(context, canvas){

      this.ctx = context;
      this.canvas = canvas;

  }//end constructor()

  init(){

    //If an item is selected, store the item num
    this.selectedItem = false;

    //Determine which shop we are visiting
    this.shopLocation = 0;

    //Determine the rate at which items can be sold back to the shop
    this.discount = (20 / shopInventory.shopList[this.shopLocation][5]);

    //Variable that stores which organs/item are being displayed to screen
    this.itemsToShow = 0;

    //Boolean to store whether the screen is in "buy" or "sell" mode
    this.isInBuyMode = true;

    console.log("ENTERING SHOP!");

    this.buttonStyle = "rgba(119, 17, 17, 0.80)";
    this.menuStyle = "rgba(17, 17, 119, 0.80)";

    //this.buySellMenuStats = [10, 10, 100, 80];

    this.menuList = [];
    this.menuList[0] = ["Shop Malachite", 110, canvas.height - 45, 300, 35];
    this.menuList[1] = ["Player Inventory", 780, 10, 300, canvas.height - 65];
    this.menuList[2] = ["Shop Inventory", 110, 10, 300, canvas.height - 65];
    this.menuList[3] = ["Player Malachite", 780, canvas.height - 45, 300, 35];
    this.menuList[4] = ["Item Preview", 480, canvas.height - 340, 300, 35];


    this.buttonList = [];
    this.buttonList[0] = ["Buy/Sell button", 550, 660, 100, 80, this.toggleBuySell];
    this.buttonList[1] = ["Body button", 420, canvas.height - 45, 80, 35, function a(){myShopScreen.itemsToShow = 0;}];
    this.buttonList[2] = ["Guts button", 510, canvas.height - 45, 80, 35, function a(){myShopScreen.itemsToShow = 1;}];
    this.buttonList[3] = ["Head button", 600, canvas.height - 45, 80, 35, function a(){myShopScreen.itemsToShow = 2;}];
    this.buttonList[4] = ["Item button", 690, canvas.height - 45, 80, 35, function a(){myShopScreen.itemsToShow = 3;}];
    this.buttonList[5] = ["Confirm button", 480, canvas.height - 430, 230, 100, this.confirmTransaction];

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
    this.drawShopInventory();
    this.drawShowItemToggleButtons();
    this.drawConfirmButton();
    this.drawSelectedItem();

    ctx.font = "95px Courier";
    ctx.fillStyle = "#cccccc";
    ctx.save();
    ctx.rotate(Math.PI/2);
    ctx.fillText("SHOP INVENTORY", 0, -20);

    ctx.rotate(-Math.PI);
    ctx.fillText("MY INVENTORY", -740, 1170);
    ctx.restore();

  }//end updateScreen()

  //////////////////////////////////////////////////////////////////////////////
  //  Click to confirm whether or not you want to confirm a sale/purchase
  //////////////////////////////////////////////////////////////////////////////
  drawSelectedItem(){

    //If there is no selected item, exit
    if(!myShopScreen.selectedItem){return};

    ctx.save();

    if(myShopScreen.selectedItem[0]=="player"){

      console.log(myShopScreen.selectedItem[1]);

      switch (myShopScreen.selectedItem[1]) {
        case 0:
          ctx.drawImage(masterInventoryList[myShopScreen.selectedItem[1]].list[player.inventoryList[myShopScreen.selectedItem[1]][myShopScreen.selectedItem[2]]][5], this.menuList[4][1], this.menuList[4][2], 150, 150);
          break;
        case 1:
        //Draw body and organ glow
        ctx.shadowBlur = 30;
        ctx.shadowColor = masterInventoryList[myShopScreen.selectedItem[1]].list[player.inventoryList[myShopScreen.selectedItem[1]][myShopScreen.selectedItem[2]]][5];
        ctx.drawImage(imageLoader.organHeartImg, this.menuList[4][1], this.menuList[4][2], 150, 150);

          break;
       case 2:
        ctx.drawImage(masterInventoryList[myShopScreen.selectedItem[1]].list[player.inventoryList[myShopScreen.selectedItem[1]][myShopScreen.selectedItem[2]]][5], this.menuList[4][1]+20, this.menuList[4][2]+20, 150, 150);
        break;
        case 3:
          ctx.drawImage(masterInventoryList[myShopScreen.selectedItem[1]].list[player.inventoryList[myShopScreen.selectedItem[1]][myShopScreen.selectedItem[2]]][5], this.menuList[4][1]+20, this.menuList[4][2]+20, 150, 100);
          break;
        default:

      }
    }



    ctx.restore();

  }//end drawSelectedItem()

  //////////////////////////////////////////////////////////////////////////////
  //  Click to confirm whether or not you want to confirm a sale/purchase
  //////////////////////////////////////////////////////////////////////////////
  confirmTransaction(){

    //If there is no selected item, exit
    if(!myShopScreen.selectedItem){return};

    //If the Player is selling
    if(myShopScreen.selectedItem[0]=="player"){
      this.cost = Math.floor(masterInventoryList[myShopScreen.selectedItem[1]].list[player.inventoryList[myShopScreen.selectedItem[1]][myShopScreen.selectedItem[2]]][6]/myShopScreen.discount);
      player.malachite += this.cost;
      shopInventory.shopList[myShopScreen.shopLocation][4] -= this.cost;

      //Give item to shop
      shopInventory.shopList[myShopScreen.shopLocation][myShopScreen.itemsToShow].push(masterInventoryList[myShopScreen.selectedItem[1]].list[player.inventoryList[myShopScreen.selectedItem[1]][myShopScreen.selectedItem[2]]][0]);
      //Remove item from Player
      player.removeInventoryItem(myShopScreen.selectedItem[2], myShopScreen.itemsToShow);

    }
    //If the Player is buying
    else{
      //Determine cost of item
      this.cost = masterInventoryList[myShopScreen.selectedItem[1]].list[shopInventory.shopList[myShopScreen.shopLocation][myShopScreen.selectedItem[1]][myShopScreen.selectedItem[2]]][6];
      //Remove money from Player and give it to shop
      player.malachite -= this.cost;
      shopInventory.shopList[myShopScreen.shopLocation][4] += this.cost;

      //Give item to Player
      player.giveItem(masterInventoryList[myShopScreen.selectedItem[1]].list[shopInventory.shopList[myShopScreen.shopLocation][myShopScreen.itemsToShow][myShopScreen.selectedItem[2]]][0], myShopScreen.itemsToShow);
      //Remove item from shop inventory
      shopInventory.shopList[myShopScreen.shopLocation][myShopScreen.itemsToShow].splice(myShopScreen.selectedItem[2], 1);

    }

    /*
    if(this.selectedItem[0]=="player"){
      ctx.fillText("Sell " + masterInventoryList[this.selectedItem[1]].list[player.inventoryList[this.selectedItem[1]][this.selectedItem[2]]][1], this.buttonList[5][1]+15, this.buttonList[5][2]+55);
      ctx.fillText("for m" + (masterInventoryList[this.selectedItem[1]].list[player.inventoryList[this.selectedItem[1]][this.selectedItem[2]]][6]/2) + "?", this.buttonList[5][1]+15, this.buttonList[5][2]+80);
      console.log("player");
    }
    else{
      ctx.fillText("Buy " + masterInventoryList[this.selectedItem[1]].list[shopInventory.shopList[this.shopLocation][this.selectedItem[1]][this.selectedItem[2]]][1], this.buttonList[5][1]+15, this.buttonList[5][2]+55);
      ctx.fillText("for m" + masterInventoryList[this.selectedItem[1]].list[shopInventory.shopList[this.shopLocation][this.selectedItem[1]][this.selectedItem[2]]][6] + "?", this.buttonList[5][1]+15, this.buttonList[5][2]+80);
    }*/

  }//end confirmTransaction()


  //////////////////////////////////////////////////////////////////////////////
  //
  //////////////////////////////////////////////////////////////////////////////
  drawShowItemToggleButtons(){
    ctx.save();

    for(let x = 1; x < 5; x++){
      ctx.fillStyle = this.buttonStyle;
      ctx.fillRect(this.buttonList[x][1], this.buttonList[x][2], this.buttonList[x][3], this.buttonList[x][4]);
      ctx.font = "19px Courier";
      ctx.fillStyle = "#cccccc";
      //Draw arrow in front of and make bold the option if that item is currently selected
      this.selectionIndicator = "";
      if(this.itemsToShow == x-1){
        this.selectionIndicator = ">"
        ctx.font = "bold " + ctx.font;
      };
      ctx.fillText(this.selectionIndicator + masterInventoryListNames[x-1], this.buttonList[x][1] + 15, this.buttonList[x][2] + 23);
    }

    ctx.restore();
  }//end drawShowItemToggleButtons()

  //////////////////////////////////////////////////////////////////////////////
  //  Draws the amount of Malachite the shop has to spend
  //////////////////////////////////////////////////////////////////////////////
  drawPlayerInventory(){
    ctx.save();

    //black out the screen, covering whatever was drawn previously
    ctx.fillStyle = this.menuStyle;
    ctx.fillRect(this.menuList[1][1], this.menuList[1][2], this.menuList[1][3], this.menuList[1][4]);

    ctx.font = "19px Courier";
    ctx.fillStyle = "#ccc";
    for(let y = 0; y < player.inventoryList[this.itemsToShow].length; y++){
      ctx.fillStyle = "#cccccc";
      ctx.fillText(masterInventoryList[this.itemsToShow].list[player.inventoryList[this.itemsToShow][y]][1], this.menuList[1][1] + 15, this.menuList[1][2]+(23 * (y+1)));
      ctx.fillStyle = "#589385"
      ctx.fillText("m" + Math.floor(masterInventoryList[this.itemsToShow].list[player.inventoryList[this.itemsToShow][y]][6] / this.discount), this.menuList[1][1] + 255, this.menuList[1][2]+(23 * (y+1)));
    }

    ctx.restore();
  }//end drawPlayerInventory()

  //////////////////////////////////////////////////////////////////////////////
  //  Draws the amount of Malachite the shop has to spend
  //////////////////////////////////////////////////////////////////////////////
  drawShopInventory(){
    ctx.save();

    //black out the screen, covering whatever was drawn previously
    ctx.fillStyle = this.menuStyle;
    ctx.fillRect(this.menuList[2][1], this.menuList[2][2], this.menuList[2][3], this.menuList[2][4]);

    ctx.font = "19px Courier";
    ctx.fillStyle = "#ccc";
    for(let y = 0; y < shopInventory.shopList[this.shopLocation][this.itemsToShow].length; y++){
      ctx.fillStyle = "#cccccc";
      ctx.fillText(masterInventoryList[this.itemsToShow].list[shopInventory.shopList[this.shopLocation][this.itemsToShow][y]][1], this.menuList[2][1] + 15, this.menuList[2][2]+(23 * (y+1)));
      ctx.fillStyle = "#589385"
      ctx.fillText("m"+masterInventoryList[this.itemsToShow].list[shopInventory.shopList[this.shopLocation][this.itemsToShow][y]][6], this.menuList[2][1] + 255, this.menuList[2][2]+(23 * (y+1)));
    }


    ctx.restore();
  }//end drawShopInventory()

  //////////////////////////////////////////////////////////////////////////////
  //  Draws the amount of Malachite the shop and the player has to spend
  //////////////////////////////////////////////////////////////////////////////
  drawShopMalachite(){
    ctx.save();
    //black out the screen, covering whatever was drawn previously
    ctx.fillStyle = this.menuStyle;
    ctx.fillRect(this.menuList[0][1], this.menuList[0][2], this.menuList[0][3], this.menuList[0][4]);
    ctx.fillRect(this.menuList[3][1], this.menuList[3][2], this.menuList[3][3], this.menuList[3][4]);

    ctx.font = "19px Courier";
    ctx.fillStyle = "#589385"
    ctx.fillText("Malachite: " + shopInventory.shopList[this.shopLocation][4], this.menuList[0][1]+15, this.menuList[0][2]+23);
    ctx.fillText("Malachite: " + player.malachite, this.menuList[3][1]+15, this.menuList[3][2]+23);

    ctx.restore();
  }//end drawShopMalachite()

  //////////////////////////////////////////////////////////////////////////////
  //Draws the buy/sell button
  //////////////////////////////////////////////////////////////////////////////
  drawBuySellButton(){
    ctx.save();

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
    ctx.restore();
  }//end drawBuySellMenu()



  //////////////////////////////////////////////////////////////////////////////
  //  Draws a black rectangle over the screen to clear it out between drawings
  //////////////////////////////////////////////////////////////////////////////
  clearScreen(){
    ctx.save();
    //black out the screen, covering whatever was drawn previously
    ctx.fillStyle = "#272727";
    ctx.fillRect(0, 0, this.canvas.width, ctx.canvas.height);

    ctx.drawImage(imageLoader.creatureEditorBackgroundImg, 0, 0);//, 1200, 700);

    ctx.restore();
  }//end clearScreen()


  //////////////////////////////////////////////////////////////////////////////
  //  Toggles whether the shop is in buy or sell mode
  //////////////////////////////////////////////////////////////////////////////
  toggleBuySell(){

    myShopScreen.isInBuyMode = !myShopScreen.isInBuyMode;


  }//end toggleBuySell()


  //////////////////////////////////////////////////////////////////////////////
  //
  //////////////////////////////////////////////////////////////////////////////
  selectShopItem(itemNum){
    if(itemNum <= shopInventory.shopList[this.shopLocation][this.itemsToShow].length - 1){
      console.log(itemNum + " good!");
      console.log("Selected: " + masterInventoryList[this.itemsToShow].list[shopInventory.shopList[this.shopLocation][this.itemsToShow][itemNum]][1]);
      //this.isItemSelected = true;
      this.selectedItem = ["shop", this.itemsToShow, itemNum];
      this.updateScreen();
    }
  }//end selectShopItem()

  selectPlayerItem(itemNum){
    if(itemNum <= player.inventoryList[this.itemsToShow].length - 1){
      console.log(itemNum + " good!");
      console.log(player.inventoryList[myShopScreen.itemsToShow][itemNum]);
      console.log("Selected: " + masterInventoryList[myShopScreen.itemsToShow].list[player.inventoryList[myShopScreen.itemsToShow][itemNum]][1]);
      //this.isItemSelected = true;
      this.selectedItem = ["player", this.itemsToShow, itemNum];
      this.updateScreen();
    }
  }//end selectPlayerItem()

  //////////////////////////////////////////////////////////////////////////////
  //Draws the buy/sell button
  //////////////////////////////////////////////////////////////////////////////
  drawConfirmButton(){
    ctx.save();

    //We only draw this button if there is an items slected to buy/sell
    if(this.selectedItem != false){

      //Draw button
      ctx.fillStyle = this.buttonStyle;
      ctx.fillRect(this.buttonList[5][1], this.buttonList[5][2], this.buttonList[5][3], this.buttonList[5][4]);

      if(this.selectedItem[0]=="player"){
        //Draw arrow to indicate direction of transaction
        ctx.beginPath();
        ctx.moveTo(this.buttonList[5][1], this.buttonList[5][2]);
        ctx.lineTo(this.buttonList[5][1], this.buttonList[5][2] + this.buttonList[5][4]);
        ctx.lineTo(this.buttonList[5][1] - 60, this.buttonList[5][2] + (this.buttonList[5][4]/2));
        ctx.fill();
        //Print text
        ctx.font = "19px Courier";
        ctx.fillStyle = "#cccccc";
        ctx.fillText("Sell:", this.buttonList[5][1]+15, this.buttonList[5][2]+30);
        ctx.fillText("for m" + Math.floor(masterInventoryList[this.selectedItem[1]].list[player.inventoryList[this.selectedItem[1]][this.selectedItem[2]]][6]/this.discount) + "?", this.buttonList[5][1]+15, this.buttonList[5][2]+80);
        ctx.font = "bold 19px Courier";
        ctx.fillText(masterInventoryList[this.selectedItem[1]].list[player.inventoryList[this.selectedItem[1]][this.selectedItem[2]]][1], this.buttonList[5][1]+15, this.buttonList[5][2]+55);
      }
      else{
        //Draw arrow to indicate direction of transaction
        ctx.beginPath();
        ctx.moveTo(this.buttonList[5][1] + this.buttonList[5][3], this.buttonList[5][2]);
        ctx.lineTo(this.buttonList[5][1] + this.buttonList[5][3], this.buttonList[5][2] + this.buttonList[5][4]);
        ctx.lineTo(this.buttonList[5][1] + this.buttonList[5][3] + 60, this.buttonList[5][2] + (this.buttonList[5][4]/2));
        ctx.fill();
        //Print text
        ctx.font = "19px Courier";
        ctx.fillStyle = "#cccccc";
        ctx.fillText("Buy:", this.buttonList[5][1]+15, this.buttonList[5][2]+30);
        ctx.fillText("for m" + masterInventoryList[this.selectedItem[1]].list[shopInventory.shopList[this.shopLocation][this.selectedItem[1]][this.selectedItem[2]]][6] + "?", this.buttonList[5][1]+15, this.buttonList[5][2]+80);
        ctx.font = "bold 19px Courier";
        ctx.fillText(masterInventoryList[this.selectedItem[1]].list[shopInventory.shopList[this.shopLocation][this.selectedItem[1]][this.selectedItem[2]]][1], this.buttonList[5][1]+15, this.buttonList[5][2]+55);
      }
    }

    ctx.restore();
  }//end drawConfirmButton()


  //////////////////////////////////////////////////////////////////////////////
  //  Click Handler function for teh Creature Editor screen
  //////////////////////////////////////////////////////////////////////////////
  shopScreenMapClickHandler(clickPositionX,clickPositionY){

    //Check if the click was on any of the buttons
    for(let x = 0; x < this.buttonList.length; x++){
      if(isWithinBounds(clickPositionX, clickPositionY, this.buttonList[x][1], this.buttonList[x][2], this.buttonList[x][3], this.buttonList[x][4])){
        console.log(this.buttonList[x][0]);
        this.buttonList[x][5]();
      }
    }

    //Check if the ckick was in the shop's inventory
    if(isWithinBounds(clickPositionX, clickPositionY, this.menuList[2][1], this.menuList[2][2], this.menuList[2][3], this.menuList[2][4])){
      //The inventory line that was clicked on
      this.line = Math.floor((clickPositionY - this.menuList[2][2])/25);
      //console.log("SHHOP INVENTORY " + masterInventoryList[this.itemsToShow].list[shopInventory.shopList[this.shopLocation][this.itemsToShow][this.line]][1]);
      this.selectShopItem(this.line);
      return;
    }
    //Check if click was in the player's inventory
    else if(isWithinBounds(clickPositionX, clickPositionY, this.menuList[1][1], this.menuList[1][2], this.menuList[1][3], this.menuList[1][4])){
      //The inventory line that was clicked on
      this.line = Math.floor((clickPositionY - this.menuList[2][2])/25);
      //console.log("SHHOP INVENTORY " + masterInventoryList[this.itemsToShow].list[shopInventory.shopList[this.shopLocation][this.itemsToShow][this.line]][1]);
      this.selectPlayerItem(this.line);
      return;
    }

    this.selectedItem = false;
    this.updateScreen();

  }//end shopScreenMapClickHandler()



}
