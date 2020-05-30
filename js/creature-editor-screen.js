//Written by Wyatt Dorn

class CreatureEditorScreen{

  constructor(context, canvas){

      this.ctx = context;
      this.canvas = canvas;

  }//end constructor()

  init(){
    //black out the screen, covering whatever was drawn previously
    ctx.fillStyle = "black";//"#303030";
    ctx.fillRect(0, 0, this.canvas.width, ctx.canvas.height);
    this.drawText();
  } //end init()

  drawText(){
    ctx.font = "20px Courier";
    ctx.fillStyle = "white";
    ctx.fillText("Creature Editor", 10, 30);
  }

}
