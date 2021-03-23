
class TextMenu{


  constructor(){
    this.textSpeed = 6;
  }

  init(filePath){
    ctx.font = "20px Arial";
    ctx.fillStyle = "#cccccc";
    ctx.fillText("THIS WORKS!", 100, 100);

    var firstText = "Welcome to Flesh and Bones: Undead Army! |Today you play the roll of an ancient deity, long forgotten, who has returned to the mortal plane to reclaim what was once yours! |Build your army, spread your influence, and claim the souls of the fallen! |";


  }

  readFile(){
    const fs = require('fs')

    fs.readFile('media/text/intro.txt', (err, data) => {
        if (err) throw err;
        console.log(data.toString());
    })
  }

}
