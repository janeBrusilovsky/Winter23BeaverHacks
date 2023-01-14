//---Global Variables--//

class Image {
  constructor(image, emotion){
    this.imageSrc = image;
    this.emotion = emotion;
    this.used = false
  }
}

let images = [new Image('https://cdn.glitch.global/43c6b896-d61a-4458-8e5a-44ec582a72e9/happy_person.png?v=1673647621933', 'happy'), 
              new Image('https://cdn.glitch.global/43c6b896-d61a-4458-8e5a-44ec582a72e9/sad_person.png?v=1673647622768', 'sad')] 

var score = 0
var topScore = 0
var gamePlaying = false
var displayedImage = null
var counter = 0

// [“neutral”, “happy”, “sad”, “surprise”, “anger”] is what the api returns

//-------------------//


function startGame() {
  // initialize game variables
    // get random image to start
  score = 0
  console.log("Start");
  // swap the displayed button
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  displayedImage = getRandomImage();
  console.log('images after starting game', images)
}

/*
function guess(buttonId) {
 
  while(counter < images.length()){
    if (buttonId == displ) {
      
    }
        // compare buttons' id to image's emotion
  // if correct
    // document create element to display 'correct'
    // continue game
  // if incorrect
    // document create element to display 'try again'
  
  }
  
  var guess = checkUser
  //waits for user checkUserInput() (aka wait for user to press button)
  //
  
  
}
*/

function stopGame() {
  // reset game variables (after saving them to user?)
  if (score > topScore) {
    topScore = score;
    // can save other variables if there's a new topScore, 
    // or save each gameplay data regardless of score for metrics
  }
    
  // reset Image Object flags to false
  //for (let image of images) {
  //  image.used = false
  //}
  
  
  images.forEach(images => images.used = false)
  console.log('after stopping', images)
  // swap the displayed button
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
}


function getRandomImage() {
  var num = Math.floor(Math.random() * images.length)
  if (images[num].used == true) {
    getRandomImage() // if an image has been used, call getRandomImage() until new one is found
  }
  images[num].used = true // set the new image flag to true since it is now used
  document.getElementById("randImg").src=images[num].imageSrc
  //https://www.w3schools.com/js/tryit.asp?filename=tryjs_intro_lightbulb
  return images[num]
}
  

  
function checkUserInput(buttonID) {
  

}

