import { useState } from 'react'
import ImageUpload from './components/ImageUpload'

const App = () => {
  const emotionList = ['neutral', 'happy', 'sad', 'surprise', 'anger']
  const [emotion, setEmotion] = useState('happy')
  const [result, setResult] = useState(null)

  const getRandomEmotion = () => {
    const currentEmotion = emotion
    console.log('current emotion', currentEmotion)
    const randomNumber = Math.floor(Math.random() * emotionList.length)
    if (emotionList[randomNumber] === currentEmotion) {
      getRandomEmotion()
    }
    setEmotion(emotionList[randomNumber])
  }

  return (
    <div>
      <h2>Game 2</h2>
      <h3>Practice Matching an Emotion To Your Own Images!</h3>
      <p>Upload an image showing a <strong>{emotion}</strong> emotion</p>
      <ImageUpload emotion={emotion} setEmotion={setEmotion} setResult={setResult} getRandomEmotion={getRandomEmotion} />
      {result && result}
    </div>
  )
}

export default App