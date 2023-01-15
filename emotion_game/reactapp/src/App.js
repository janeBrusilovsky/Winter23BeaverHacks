import './App.css'
import { useState } from 'react'
import ImageUpload from './components/ImageUpload'

const App = () => {
  const emotionList = ['neutral', 'happy', 'sad', 'surprise', 'anger']
  const [emotion, setEmotion] = useState('happy')
  const [result, setResult] = useState(null)

  const getRandomEmotion = () => {
    const currentEmotion = emotion
    console.log('current emotion before resetting', currentEmotion)
    const randomNumber = Math.floor(Math.random() * emotionList.length)
    if (emotionList[randomNumber] === currentEmotion) {
      getRandomEmotion()
    }
    setEmotion(emotionList[randomNumber])
  }

  return (
    <div className="App">
      <h1 className="title">Emotion Imitation</h1>
      <h2 id="game-area">Match Your Own Face or Images to a Random Emotion!</h2>
      <p>Show a</p>
      <p className="displayedEmotion"><strong>{emotion}</strong></p>
      <p>emotion</p>
      <div className="scoresContainer">
        <div className="scoreContainer">
          Score:
        </div>
        <div className="bestScoreContainer">
          Best:
        </div>
        <div className="livesContainer">
          Lives:
        </div>
      </div>
      <ImageUpload emotion={emotion} setEmotion={setEmotion} setResult={setResult} getRandomEmotion={getRandomEmotion} />
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