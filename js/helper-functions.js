//Written by Wyatt Dorn


//////////////////////////////////////////////////////////////////////////////
// Draws multiple lines of text from a single string
//////////////////////////////////////////////////////////////////////////////
function drawMultipleLines(myString, maxLength, lineHeight, startX, startY){
  var tempString = "";

  for(var x = 0; x < (myString.length/maxLength); x++){
    tempString = "";
    //If the first character of a new line would be a blank space, we skip it
    if(myString[maxLength * x] != " "){
      tempString += ("" + myString[maxLength * x]);
    }
    //Itterate through the rest of the line, adding the chaaracters to the output
    for(var y = 1; y < maxLength; y++){
      //If we reach trhe end of the string, stop printing
      if(myString.length <= y+(maxLength*x)){
        break;
      }
      tempString += ("" + myString[y + (maxLength * x)]);
    }
    //Print the line to the screen
    ctx.fillText(tempString, startX, startY + (lineHeight * x));
  }
}//end drawMultipleLines()



//////////////////////////////////////////////////////////////////////////////
// Draws friendly creature to screen
//////////////////////////////////////////////////////////////////////////////
function drawFriendlyCreature(creature, x, y){

  ctx.save();

  //Draw body and organ glow
  ctx.shadowBlur = 30;
  ctx.shadowColor = guts.list[player.myCreatures[creature].myGuts][5];
    ctx.drawImage(body.list[player.myCreatures[creature].myBody][5], x, y, 150, 150);
  //}, false);

  //newImg.src = '' + source;
  ctx.restore();
  //draw head
  ctx.drawImage(head.list[player.myCreatures[creature].myHead][5], x, y, 150, 150);

}//end drawFriendlyCreature()
