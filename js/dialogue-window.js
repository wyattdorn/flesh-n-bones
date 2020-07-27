//Created by Wyatt Kelledorn

class DialogueWindow{

  constructor(context, canvas){

      this.ctx = context;
      this.canvas = canvas;

  }//end constructor()

  init(text, xPos, yPos, width, height){

    ctx.save();

    setGameMode(6, 0);

    previousGameMode = gameMode;

    //Keep the screen from updating every time the mouse moves
    canvas.onmousemove = null;

    //Define passed-in variable locally for use by other functions
    this.text = text;
    this.startLocation = [xPos, yPos];
    this.size = [width, height];
    this.numberOfDialogueBoxes = text.length;

    //We start by printing out the first line of dialogue, then progress on from there
    this.currentDialogue = 0;

    this.drawDialogue();

    ctx.restore();

  }


  ////////////////////////////////////////////////////////////////////////////////
  // Draw the dialogue box and text
  ////////////////////////////////////////////////////////////////////////////////
  drawDialogue(){

    this.drawBox();
    this.drawText();

  }//end drawDialogue()

  ////////////////////////////////////////////////////////////////////////////////
  // Draw the next piece of dialogue
  ////////////////////////////////////////////////////////////////////////////////
  itterateDialogue(){

    if(this.currentDialogue < this.numberOfDialogueBoxes - 1){
      this.currentDialogue++;
      this.drawDialogue();
    }
    else{
      this.exitDialogue();
    }
  }//end itterateDialogue()

  ////////////////////////////////////////////////////////////////////////////////
  // Exit the dialogue
  ////////////////////////////////////////////////////////////////////////////////
  exitDialogue(){

    //Update the campaign progress tracker of the player
    player.updateCampaignProgress();

    //Return to the World Map
    setGameMode(5, 0);

  }//end exitDialogue()


  ////////////////////////////////////////////////////////////////////////////////
  // Draws dialogue box to screen
  ////////////////////////////////////////////////////////////////////////////////
  drawBox(){
    //Draw window
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(this.startLocation[0], this.startLocation[1], this.size[0]/2, this.size[1]/2);
    ctx.fillStyle = "#000000";
    ctx.fillRect(this.startLocation[0]+2, this.startLocation[1]+2, this.size[0]/2-4, this.size[1]/2-4);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(this.startLocation[0]+4, this.startLocation[1]+4, this.size[0]/2-8, this.size[1]/2-8);
    ctx.fillStyle = "#000000";
    ctx.fillRect(this.startLocation[0]+6, this.startLocation[1]+6, this.size[0]/2-12, this.size[1]/2-12);

  }//end drawBox()

  ////////////////////////////////////////////////////////////////////////////////
  // Draws dialogue text to screen
  ////////////////////////////////////////////////////////////////////////////////
  drawText(){
    //Draw text
    ctx.fillStyle = "#ffffff";
    ctx.font = "25px Courier";
    //ctx.fillText(this.text[this.currentDialogue], this.startLocation[0] + 10, this.startLocation[1] + 30);

    drawMultipleLines(this.text[this.currentDialogue], 40, 30, this.startLocation[0] + 10, this.startLocation[1] + 30);




    console.log(this.text[this.currentDialogue]);

  }//end drawText()


}//end DialogueWindow
