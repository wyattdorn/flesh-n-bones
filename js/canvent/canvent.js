class Canvent{

  constructor(position, size, bgColor, func){
    this.position = position;
    this.size = size;
    this.backgroundColor = bgColor;
    this.children = [];
    this.function = func;
    this.priority = 'medium';
    this.width = this.size[0];
    this.height = this.size[1];
    this.isVisible = true;
    this.opacity = 1;
  }//end constructor()

  setVisibility(isVisible){
    if(isVisible === true || isVisible === false){
      this.isVisible = isVisible;
    }
    else{
      console.log(isVisible + " is not a valid option (true/false only).");
    }
  }


  setPriority(priority){
    this.priority = priority;
  }

  addImage(xPos, yPos, width, height, src){
    //add an image
  }

  setFunction(func){
    this.function = func;
  }

  setOpacity(opacity){
    this.opacity = opacity;
  }

  setHeight(height){
    this.height = height;
    this.size[1] = height;
  }

  setWidth(width){
    this.width = width;
    this.size[0] = width;
  }

  addChild(child){
      this.children.push(child);
      child.setParent(this);
  }

  checkForClick(clickPosition){

      if(clickPosition[0] >= this.position[0] &&
        clickPosition[1] >= this.position[1] &&
        clickPosition[0] <= this.position[0] + this.width &&
        clickPosition[1] <= this.position[1] + this.height){
      if(this.function){
        this.function();
      }

      if(this.children){
        for(let x = 0; x < this.children.length; x++){
          this.children[x].checkForClick(clickPosition);
        }
      }
    }
  }

  setParent(parent){
    this.parent = parent;
    //Since the cild exists within the parent, we offest the starting location of
    //the child by the starting location of the aprent
    this.position[0] += parent.position[0];
    this.position[1] += parent.position[1];
  }

  addToDrawBuffer(){

    if(this.priority == 'high'){
      priorityDrawBuffer.push(this);
    }
    else{
      drawBuffer.push(this);
    }

    if(this.children){
      for(let x = 0; x < this.children.length; x++){
        this.children[x].addToDrawBuffer();
      }
    }

  }


  drawFromBuffer(){

    ctx.save();

    ctx.globalAlpha = this.opacity;

    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(this.position[0], this.position[1], this.size[0], this.size[1]);

    if(this.text){
      ctx.fillStyle = btn.fontColor;
      ctx.font = btn.fontSize + "px " + btn.fontStyle;
      ctx.fillText(btn.text, btn.xPos + btn.textOffset[0], btn.yPos + btn.textOffset[1]);
    }

    ctx.restore();

  }


}//end Canvent

class TextBox{

  constructor(position, fontColor, fontSize, text) {
    this.position = position;
    this.fontColor = fontColor;
    this.children = [];
    this.fontSize = fontSize;
    this.font = "Arial";
    this.text = text;
    this.isVisible = true;
  }//end constructor()


  setFont(font){
    this.font = font;
  }

  checkForClick(){}

  setText(string){
    this.text = string;
  }

  setPosition(newPosition){
    this.position = [newPosition[0] + this.parent.position[0], newPosition[1] + this.parent.position[1]];
    //console.log(this.position);
  }

  setParent(parent){
    this.parent = parent;
    this.position[0] += parent.position[0];
    this.position[1] += parent.position[1];
  }


  addToDrawBuffer(){

    if(this.priority == 'high'){
      priorityDrawBuffer.push(this);
    }
    else{
      drawBuffer.push(this);
    }

    if(this.children){
      for(let x = 0; x < this.children.length; x++){
        this.children[x].addToDrawBuffer();
      }
    }

  }

  drawFromBuffer(){
    console.log(this.text);
    ctx.font = this.fontSize + "px " + this.font;
    ctx.fillStyle = this.fontColor;
    ctx.fillText(this.text, this.position[0], this.position[1]);
  }


}//end TextBox

class SpecialCanvent{

  constructor(position, size,  instructions, func) {
    this.position = position;
    this.instructions = instructions;
    this.children = [];
    this.size = size;
    this.width = this.size[0];
    this.height = this.size[1];
    this.function = func;
    this.isVisible = true;
  }//end constructor()

  setVisibility(isVisible){
    if(isVisible === true || isVisible === false){
      this.isVisible = isVisible;
    }
    else{
      console.log(isVisible + " is not a valid option (true/false only).");
    }
  }

  addInstructions(instructions){
    this.instructions = instructions;
  }

  addChild(child){
      this.children.push(child);
      child.setParent(this);
  }

  checkForClick(clickPosition){

      if(clickPosition[0] >= this.position[0] &&
        clickPosition[1] >= this.position[1] &&
        clickPosition[0] <= this.position[0] + this.width &&
        clickPosition[1] <= this.position[1] + this.height){
      if(this.function){
        this.function();
      }

      if(this.children){
        for(let x = 0; x < this.children.length; x++){
          this.children[x].checkForClick(clickPosition);
        }
      }
    }
  }


  setPosition(newPosition){
    this.position = [newPosition[0] + this.parent.position[0], newPosition[1] + this.parent.position[1]];
    //console.log(this.position);
  }

  setParent(parent){
    this.parent = parent;
    this.position[0] += parent.position[0];
    this.position[1] += parent.position[1];
  }


  addToDrawBuffer(){

    if(this.priority == 'high'){
      priorityDrawBuffer.push(this);
    }
    else{
      drawBuffer.push(this);
    }

    if(this.children){
      for(let x = 0; x < this.children.length; x++){
        this.children[x].addToDrawBuffer();
      }
    }

  }

  drawFromBuffer(){
    ctx.save();
    this.instructions(this.position);
    ctx.restore();
  }


}//end SpecialCanvent



function executeDrawBuffer(){
  for(let x = 0; x < drawBuffer.length; x++){
    drawBuffer[x].drawFromBuffer();
  }
  for(let x = 0; x < priorityDrawBuffer.length; x++){
    priorityDrawBuffer[x].drawFromBuffer();
  }

  /*
  for(let x = drawBuffer.length - 1; x >= 0; x--){
    drawBuffer[x].drawFromBuffer();
  }*/
  priorityDrawBuffer = [];
  drawBuffer = [];
}
