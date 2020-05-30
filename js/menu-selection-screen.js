//Written by Wyatt Dorn

class MenuSelectionScreen{

  constructor(context, canvas){

      this.ctx = context;
      this.canvas = canvas;
      this.init();

  }//end constructor()

  init(){
    this.drawButtons();
  }

  drawButtons(){
    ctx.fillStyle = "#771111";//"#303030";
    ctx.fillRect(5, 5, this.canvas.width/2-5, ctx.canvas.height-5);

    ctx.fillStyle = "#771111";//""#171b04";//"#303030";
    ctx.fillRect(this.canvas.width/2+5, 5, this.canvas.width-5, ctx.canvas.height-5);

    ctx.font = "20px Courier";
    ctx.fillStyle = "black";
    ctx.fillText("Creature Editor", this.canvas.width/4, ctx.canvas.height/2-15);

    ctx.fillText("Combat", 3*this.canvas.width/4, ctx.canvas.height/2-15);

  }

  menuSelectionClickHandler(clickPositionX,clickPositionY){
    if(clickPositionX > 5 && clickPositionX < this.canvas.width/2-5){
      console.log("LEFT");
      launchCreatureEditor();
    }
    else if(clickPositionX > this.canvas.width/2+5 && clickPositionX < this.canvas.width-5){
      console.log("RIGHT");
      gameMode = 1;
      initiateCombat();
    }
  }

}
