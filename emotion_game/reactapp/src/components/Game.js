import axios from 'axios'
import { useState, useEffect } from 'react'
import Profile from './Profile'

const Game = ({ emotion, setEmotion, setResult, getRandomEmotion, score, setScore, lives, setLives }) => {
  const [image, setImage] = useState('')
  const [camera, setCamera] = useState(false)
  const [gameFlag, setGameFlag] = useState(false)
  let userImageEmotion = null

  const onSubmit = (e) => {
    e.preventDefault()
  }

  const handleImage = (e) => {
    console.log('e', e)
    setImage(e.target.files[0])
    setCamera(false)
  }

  const handleImageSubmit = () => {
    const data = new FormData()
    console.log('image is', image)
    data.append('image_input', image, image.name)

    const options = {
      method: 'POST',
      url: 'https://face-detection-and-analysis.p.rapidapi.com/face_analysis',
      headers: {
        'X-RapidAPI-Key': 'e177f1fff9msh86f355bbe6c7e24p1ba68ejsnf004fbfdd24a',
        'X-RapidAPI-Host': 'face-detection-and-analysis.p.rapidapi.com'
      },
      data: data
    }

    axios
      .request(options)
      .then(res => {
        console.log('analysis data', res.data)

        if (res.data.face_count === 0) {
          alert('Zero faces detected, please try again!')
          setImage('')
          return
        }

        userImageEmotion = (res.data.analysis_result[0].emotion)
        console.log('userimageemotion', userImageEmotion)
        console.log('emotion desired', emotion)
        if (userImageEmotion !== emotion) {
          console.log('# of lives', lives)
          if (lives === 1) {
            setLives(3)
            setScore(0)
            setImage('')
            // setResult(`Game over: Out of lives! You scored ${score} points. Practice makes perfect, so don't give up!`)
            alert(`Game over: Out of lives! You scored ${score} points. Practice makes perfect, so don't give up!`)
            return
          }
          setLives(lives-1)
          // setResult(`We did not detect the ${emotion} emotion, try again!`)
          alert(`We did not detect the ${emotion} emotion, try again!`)
          setTimeout(() => {
            // setResult('')
            setImage('')
          }, 8000)
          return
        }
        // setResult(`Great job, the image matches the emotion. Practice again with the new emotion listed now!`)
        alert(`Great job, the image matches the emotion. Take another turn with the new emotion listed now!`)
        setScore(score+1)
        getRandomEmotion()
        // setTimeout(() => {
        //   // setResult('')
        // }, 5500)
      })
      .catch(error => {
        console.error(error)
      })
  }

  const handleStopGame = () => {
    if (score === 0) {
      setLives(3)
      alert(`Game stopped and has been reset. You scored ${score} points.`)
      return
    }

    setLives(3)
    setScore(0)
    alert(`Game stopped and has been reset. You scored ${score} points. Nice job!`)
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="imageContainer">
          {camera && <Profile setImage={setImage}/>}
          {image && (
            <div>
              {camera === true ? (
                ''
              ) : (
                <img
                  src={URL.createObjectURL(image)}
                />
              )}
            </div>
            )}
        </div>
        <div className="buttonContainer">
          <input type="file" name="image-file" onChange={handleImage}/>
          <button onClick={() => setCamera(true)}>Take Picture With Camera</button>
        </div>
        <div>
          <button className="submitButton" type="submit" onClick={handleImageSubmit}>Submit Photo</button>
        </div>
        <div>
          <button className="stopGameButton" onClick={handleStopGame}>Stop / Reset Game</button>
        </div>
      </form>
    </div>
  )
}

export default Game