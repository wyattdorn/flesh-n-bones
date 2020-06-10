//Written by Wyatt Dorn


//////////////////////////////////////////////////////////////////////////////
// Draws multiple lines of text from a single string
//////////////////////////////////////////////////////////////////////////////
function drawMultipleLines(myString, maxLength, lineHeight, startX, startY){
  var tempString = "";

  for(var x = 0; x < (myString.length/maxLength); x++){
    tempString = "";
    for(var y = 0; y < maxLength; y++){
      if(myString.length <= y+(maxLength*x)){
        break;
      }
      tempString += ("" + myString[y + (maxLength * x)]);
    }
    ctx.fillText(tempString, startX, startY + (lineHeight * x));
  }
}
