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
      <h2>Emotion Imitation Game</h2>
      <h3>Match an Emotion To Your Own Images or Face!</h3>
      <p>Show a</p>
      <p><strong>{emotion}</strong></p>
      <p>emotion</p>
      <ImageUpload emotion={emotion} setEmotion={setEmotion} setResult={setResult} getRandomEmotion={getRandomEmotion} />
      {result && alert(result)}
    </div>
  )
}

export default App