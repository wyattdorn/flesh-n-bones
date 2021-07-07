

function generateCombatCanvents(){

  let combatCanvents = [];

  combatCanvents.push( {
    name: "controlBar",
    text: null,
    fontSize: 25,
    fontStyle: "Arial",
    fontColor: "#ccc",
    backgroundColor: "#000000",
    xPos: 0,
    yPos: 0,
    width: 200,
    height: 100,
    children: []
  });

}//end generateCombatCanvents

function generateCombatButtons(selectedAlly){

  let buttonList = [];

  ctx.save();

  ctx.fillStyle = "#000000";

  this.buttonList.push( {
    name: "Toggle Combat Log",
    text: "Combat Log",
    textOffset: [30, 55],
    fontSize: 25,
    fontStyle: "Arial",
    fontColor: "#ccc",
    buttonColor: "#000000",
    xPos: 20,
    yPos: canvas.height - this.controlBarHeight + 20,
    width: 200,
    height: 100,
    function: function a(){
      //tbd
    }
  });

  this.buttonList.push( {
    name: "Equipped Item",

    text: items[selectedAlly_.myItem].name,
    textOffset: [10, 30],
    fontSize: 20,
    fontStyle: "Arial",
    fontColor: "#ccc",

    imgSrc: items[selectedAlly_.myItem].image,
    imgSize: [35, 25],
    imgOffset: [145, 10],

    //multipleLines:

    buttonColor: "#000000",
    xPos: 20,
    yPos: canvas.height - this.controlBarHeight + 130,
    width: 200,
    height: 100,
    function: function a(){
      //tbd
    }
  });

  ctx.restore();

}//end generateCombatButtons
