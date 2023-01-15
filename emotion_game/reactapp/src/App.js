import './App.css'
import { useState } from 'react'
import Game from './components/Game'

const App = () => {
  const emotionList = ['neutral', 'happy', 'sad', 'surprise', 'anger']
  const [emotion, setEmotion] = useState('happy')
  const [result, setResult] = useState(null)
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(0)
  const [lives, setLives] = useState(3)

  const getRandomEmotion = () => {
    const currentEmotion = emotion
    console.log('current emotion before resetting', currentEmotion)
    const randomNumber = Math.floor(Math.random() * emotionList.length)
    if (emotionList[randomNumber] === currentEmotion) {
      getRandomEmotion()
    }
    console.log('new emotion is', emotionList[randomNumber])
    setEmotion(emotionList[randomNumber])
    return
  }

  return (
    <div className="App">
      <h1 className="title">Affective: Emotion Imitation</h1>
      <h2 className="emotionP1" id="game-area">Show a<span>&#x28;</span>n<span>&#41;</span></h2>
      <p className="displayedEmotion"><strong>{emotion}</strong></p>
      <h2>facial expression!</h2>
      <div className="scoresContainer">
          <p>Score: {score}</p>
          <p>Best: {best}</p>
          <p>Lives: {lives}</p>
      </div>
      <Game emotion={emotion} setEmotion={setEmotion} setResult={setResult} getRandomEmotion={getRandomEmotion} 
      score={score} setScore={setScore} lives={lives} setLives={setLives}/>
      {result && alert(result)}
      <div className="info">
        <h2>How To Play</h2>
        <p>In game 2, Emotion Imitation, you can practice your ability to recreate a set of facial expressions.</p>
        <ol>
          <li>You can either take a selfie with your camera or upload an image on your device, so click on either.</li>
          <li>If you pick 'Take Picture With Camera', set your facial expression, and click 'Capture'.</li>
          <li>If you pick 'Choose File', select a file from your device.</li>
          <li>Once done, simply click on 'Submit Photo' to know if you've recreated/matched the emotion above!</li>
          <li>You have 3 lives <span>&#x28;</span>chances<span>&#41;</span> to set a new high-score, or you can simply press 'Stop' to end the game and save your score.</li>
        </ol>
        <a href="#game-area">Start Playing → </a>
      </div>
      <hr></hr>
    </div>
  )
}

export default App