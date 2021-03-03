//Written by Wyatt Dorn


//////////////////////////////////////////////////////////////////////////////
// Draws multiple lines of text from a single string
//////////////////////////////////////////////////////////////////////////////
function drawMultipleLines(myString, maxLength, lineHeight, startX, startY){
  //Counter for determining what line of text we're printing
  var line = 0;

  do{
    //Remove any whitespaces at the start of the line
    while(myString[0] == " "){
      myString = myString.substring(1);
    }

    //Keep words from being split between lines
    while(myString.length > maxLength && myString[maxLength-1] != " "){
      for(let x = maxLength-2; x >= 0; x--){
        if(myString[x] == " "){
          //Add a whitespace after the last full word
          myString = myString.slice(0, x) + " " + myString.slice(x);
          break;
        }
      }
    }

    //Print out the line of text
    ctx.fillText(myString.slice(0, maxLength), startX, startY + (lineHeight * line));
    //Remove from the string the line that was just printed
    myString = myString.slice(maxLength);
    //Itterate to the next line on the screen
    line++;
  }while(myString.length > 0);

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
