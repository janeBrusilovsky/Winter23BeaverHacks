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
    console.log('current emotion before resetting:', currentEmotion)
    const randomNumber = Math.floor(Math.random() * emotionList.length)
    if (emotionList[randomNumber] === currentEmotion) {
      getRandomEmotion()
    }
    console.log('new emotion is:', emotionList[randomNumber])
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
          <p><strong>Score:</strong> {score}</p>
          {/* <p>Best: {best}</p> */}
          <p><strong>Lives:</strong> {lives}</p>
      </div>
      <Game emotion={emotion} setEmotion={setEmotion} setResult={setResult} getRandomEmotion={getRandomEmotion} 
      score={score} setScore={setScore} lives={lives} setLives={setLives}/>
      {/* {result && alert(result)} */}
      {/* <button className="startButton">Start</button> */}
      <div className="info" id="info">
        <h2>How To Play</h2>
        <p>In game 2, Emotion Imitation, you can practice your ability to recreate a set of facial expressions.</p>
        <ol>
          <li>You can either use your camera or upload an image from your device. Click on either.</li>
          <li>If you click 'Use Your Camera', set your facial expression, and then click 'Capture'. Retake by clicking 'Retake'.</li>
          <li>If you click 'Custom Upload', select a file from your device.</li>
          <li>Once done, simply click on 'Check Facial Expression' to know if you've recreated/matched the emotion above!</li>
          <li>+1 Score if it's a match. -1 Life if it's not.</li>
          <li>You have 3 lives <span>&#x28;</span>chances<span>&#41;</span> to set a new high-score, or you can simply press 'Stop' to end the game and save your score.</li>
        </ol>
        <a href="#game-area">Start Playing → </a>
      </div>
      <hr></hr>
      <div className="tempFooter">
        <a
          className="btn--Github"
          target="_top"
          href="https://github.com/janeBrusilovsky/Winter23BeaverHacks"
        >
        <img
          src="https://cdn.glitch.global/43c6b896-d61a-4458-8e5a-44ec582a72e9/github_icon1.png?v=1673730485074"
        />
        </a> 
      </div>
    </div>
  )
}

export default App