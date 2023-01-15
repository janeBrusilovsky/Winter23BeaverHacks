//---Global Variables--//

var score, bestScore, counter, lives;
score = bestScore = counter = lives = 0;
var displayedImage = null

class Image {
  constructor(image, emotion){
    this.imageSrc = image;
    this.emotion = emotion;
    this.used = false
  }
}

// images from Warsaw Set of EMotional Facial Expression Pictures (https://osf.io/7xgz9/, DOI 10.17605/OSF.IO/7XGZ9)
let images = [new Image('https://cdn.glitch.global/43c6b896-d61a-4458-8e5a-44ec582a72e9/h1.jpg?v=1673728273404','happy'),
              new Image('https://cdn.glitch.global/43c6b896-d61a-4458-8e5a-44ec582a72e9/h2.jpg?v=1673728276234','happy'),
              new Image('https://cdn.glitch.global/43c6b896-d61a-4458-8e5a-44ec582a72e9/h3.jpg?v=1673728279287','happy'),
              new Image('https://cdn.glitch.global/43c6b896-d61a-4458-8e5a-44ec582a72e9/h4.jpg?v=1673728282487','happy'),
              new Image('https://cdn.glitch.global/43c6b896-d61a-4458-8e5a-44ec582a72e9/h5.jpg?v=1673728285358','happy'),
              new Image('https://cdn.glitch.global/43c6b896-d61a-4458-8e5a-44ec582a72e9/h6.jpg?v=1673728288400','happy'),
              new Image('https://cdn.glitch.global/43c6b896-d61a-4458-8e5a-44ec582a72e9/h7.jpg?v=1673728291563','happy'),
              new Image('https://cdn.glitch.global/43c6b896-d61a-4458-8e5a-44ec582a72e9/h8.jpg?v=1673728294547','happy'),
              new Image('https://cdn.glitch.global/43c6b896-d61a-4458-8e5a-44ec582a72e9/h9.jpg?v=1673728297732','happy'),
              new Image('https://cdn.glitch.global/43c6b896-d61a-4458-8e5a-44ec582a72e9/h10.jpg?v=1673728299730','happy'),
              new Image('https://cdn.glitch.global/43c6b896-d61a-4458-8e5a-44ec582a72e9/n1.jpg?v=1673728301809','neutral'),
              new Image('https://cdn.glitch.global/43c6b896-d61a-4458-8e5a-44ec582a72e9/n2.jpg?v=1673728303572','neutral'),
              new Image('https://cdn.glitch.global/43c6b896-d61a-4458-8e5a-44ec582a72e9/n3.jpg?v=1673728305946','neutral'),
              new Image('https://cdn.glitch.global/43c6b896-d61a-4458-8e5a-44ec582a72e9/n4.jpg?v=1673728307928','neutral'),
              new Image('https://cdn.glitch.global/43c6b896-d61a-4458-8e5a-44ec582a72e9/n5.jpg?v=1673728310085','neutral'),
              new Image('https://cdn.glitch.global/43c6b896-d61a-4458-8e5a-44ec582a72e9/n6.jpg?v=1673728311993','neutral'),
              new Image('https://cdn.glitch.global/43c6b896-d61a-4458-8e5a-44ec582a72e9/n7.jpg?v=1673728314013','neutral'),
              new Image('https://cdn.glitch.global/43c6b896-d61a-4458-8e5a-44ec582a72e9/n8.jpg?v=1673728315964','neutral'),
              new Image('https://cdn.glitch.global/43c6b896-d61a-4458-8e5a-44ec582a72e9/n9.jpg?v=1673728317977','neutral'),
              new Image('https://cdn.glitch.global/43c6b896-d61a-4458-8e5a-44ec582a72e9/n10.jpg?v=1673728319912','neutral'),
              new Image('https://cdn.glitch.global/43c6b896-d61a-4458-8e5a-44ec582a72e9/s1.jpg?v=1673728321919','sad'),
              new Image('https://cdn.glitch.global/43c6b896-d61a-4458-8e5a-44ec582a72e9/s2.jpg?v=1673728323924','sad'),
              new Image('https://cdn.glitch.global/43c6b896-d61a-4458-8e5a-44ec582a72e9/s3.jpg?v=1673728326027','sad'),
              new Image('https://cdn.glitch.global/43c6b896-d61a-4458-8e5a-44ec582a72e9/s4.jpg?v=1673728327955','sad'),
              new Image('https://cdn.glitch.global/43c6b896-d61a-4458-8e5a-44ec582a72e9/s5.jpg?v=1673728330056','sad'),
              new Image('https://cdn.glitch.global/43c6b896-d61a-4458-8e5a-44ec582a72e9/s6.jpg?v=1673728332164','sad'),
              new Image('https://cdn.glitch.global/43c6b896-d61a-4458-8e5a-44ec582a72e9/s7.jpg?v=1673728334239','sad'),
              new Image('https://cdn.glitch.global/43c6b896-d61a-4458-8e5a-44ec582a72e9/s8.jpg?v=1673728336159','sad'),
              new Image('https://cdn.glitch.global/43c6b896-d61a-4458-8e5a-44ec582a72e9/s9.jpg?v=1673728338048','sad'),
              new Image('https://cdn.glitch.global/43c6b896-d61a-4458-8e5a-44ec582a72e9/s10.jpg?v=1673728339749','sad'),
              new Image('https://cdn.glitch.global/43c6b896-d61a-4458-8e5a-44ec582a72e9/su7.jpg?v=1673728240136','surprise'),
              new Image('https://cdn.glitch.global/43c6b896-d61a-4458-8e5a-44ec582a72e9/su8.jpg?v=1673728241594','surprise'),
              new Image('https://cdn.glitch.global/43c6b896-d61a-4458-8e5a-44ec582a72e9/su9.jpg?v=1673728243036','surprise'),
              new Image('https://cdn.glitch.global/43c6b896-d61a-4458-8e5a-44ec582a72e9/su10.jpg?v=1673728244472','surprise'),
              new Image('https://cdn.glitch.global/43c6b896-d61a-4458-8e5a-44ec582a72e9/su1.jpg?v=1673728341543','surprise'),
              new Image('https://cdn.glitch.global/43c6b896-d61a-4458-8e5a-44ec582a72e9/su2.jpg?v=1673728343251','surprise'),
              new Image('https://cdn.glitch.global/43c6b896-d61a-4458-8e5a-44ec582a72e9/su3.jpg?v=1673728344953','surprise'),
              new Image('https://cdn.glitch.global/43c6b896-d61a-4458-8e5a-44ec582a72e9/su4.jpg?v=1673728346718','surprise'),
              new Image('https://cdn.glitch.global/43c6b896-d61a-4458-8e5a-44ec582a72e9/su5.jpg?v=1673728348490','surprise'),
              new Image('https://cdn.glitch.global/43c6b896-d61a-4458-8e5a-44ec582a72e9/su6.jpg?v=1673728350185','surprise'),
              new Image('https://cdn.glitch.global/43c6b896-d61a-4458-8e5a-44ec582a72e9/a1.jpg?v=1673728245920','anger'),
              new Image('https://cdn.glitch.global/43c6b896-d61a-4458-8e5a-44ec582a72e9/a2.jpg?v=1673728247326','anger'),
              new Image('https://cdn.glitch.global/43c6b896-d61a-4458-8e5a-44ec582a72e9/a3.jpg?v=1673728248760','anger'),
              new Image('https://cdn.glitch.global/43c6b896-d61a-4458-8e5a-44ec582a72e9/a4.jpg?v=1673728250237','anger'),
              new Image('https://cdn.glitch.global/43c6b896-d61a-4458-8e5a-44ec582a72e9/a5.jpg?v=1673728254247','anger'),
              new Image('https://cdn.glitch.global/43c6b896-d61a-4458-8e5a-44ec582a72e9/a6.jpg?v=1673728257607','anger'),
              new Image('https://cdn.glitch.global/43c6b896-d61a-4458-8e5a-44ec582a72e9/a7.jpg?v=1673728260843','anger'),
              new Image('https://cdn.glitch.global/43c6b896-d61a-4458-8e5a-44ec582a72e9/a8.jpg?v=1673728263947','anger'),
              new Image('https://cdn.glitch.global/43c6b896-d61a-4458-8e5a-44ec582a72e9/a9.jpg?v=1673728267076','anger'),
              new Image('https://cdn.glitch.global/43c6b896-d61a-4458-8e5a-44ec582a72e9/a10.jpg?v=1673728270266','anger')]

//-------------------//


function startGame() {
  // initialize game variables
  score = 0
  lives = 0
  document.getElementById("score").innerHTML = "Your Score: " + (score);
  document.getElementById("score").classList.remove("hidden");
  // hide/display the Start/Stop button
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  // show game text & buttons
  document.getElementById("gameText").classList.remove("hidden");
  document.getElementById("happy").classList.remove("hidden");
  document.getElementById("sad").classList.remove("hidden");
  document.getElementById("surprise").classList.remove("hidden");
  document.getElementById("anger").classList.remove("hidden");
  document.getElementById("neutral").classList.remove("hidden");
  // display random image from array
  displayedImage = getRandomImage();
}


function guess(buttonId) { 
  if(counter < images.length - 1) {
    if (buttonId == displayedImage.emotion) {
      score++;
      counter++;
      alert("Correct! This emotion is " + displayedImage.emotion);
      document.getElementById("score").innerHTML = "Your Score: " + (score);
    } else {
      alert("Incorrect. This emotion is " + displayedImage.emotion);
      lives++;
      counter++;
      if (lives == 3) {
        alert("Out of lives! Practice makes perfect, so don't give up!");
        stopGame();
      }
    }
    // after correct/incorrect result, display another image
    displayedImage = getRandomImage();
    
    return;
  
  } else {
    alert("Game over!");
    stopGame();
  }
}


function stopGame() {
  // reset game variables (after saving them to user profile with Django?)
  /*
  send score to backend
  somewhere here
  Post request to URL (will be given by Matt in Discord)
  */
  if (score > bestScore) {
    //display previous score too?
    bestScore = score;
    // update score on screen
    document.getElementById("score").innerHTML = "Your Score: " + bestScore.toString();
    // can save other variables if there's a new topScore, 
    // or save each gameplay data regardless of score for metrics
  }
    
  counter = 0;
  
  // reset Image Object flags to false
  images.forEach(images => images.used = false)
  // hide/display the Start/Stop button
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
  // rehide game text & buttons
  document.getElementById("gameText").classList.add("hidden");
  document.getElementById("happy").classList.add("hidden");
  document.getElementById("sad").classList.add("hidden");
  document.getElementById("surprise").classList.add("hidden");
  document.getElementById("anger").classList.add("hidden");
  document.getElementById("neutral").classList.add("hidden");
  document.getElementById("score").classList.add("hidden");
  // display original website image, can change this to whatever header image we'd like
  document.getElementById("randImg").src="https://cdn.glitch.global/43c6b896-d61a-4458-8e5a-44ec582a72e9/faces.png?v=1673742504057"
}


function getRandomImage() {
  // get a random index, 0 - 49 (inclusive), from images array to get random image
  var count = 0 // test variable
  var min = Math.ceil(0);
  var max = Math.floor(images.length - 1);
  
  var num = Math.floor(Math.random() * (max - min + 1)) + min;
  
  // just added additional counter conditional so we don't run into infinite looping while debugging :)
  while (images[num].used && count < 50) {
    num = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(num);
    count++;
  }
    
  document.getElementById("randImg").src=images[num].imageSrc
  images[num].used = true // set the new image flag to true since it is now "used"
  
  return images[num]
}

  