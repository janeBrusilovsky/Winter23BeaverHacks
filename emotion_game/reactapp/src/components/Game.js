import axios from 'axios'
import { useState, useEffect } from 'react'
import Profile from './Profile'

const Game = ({ emotion, setEmotion, setResult, getRandomEmotion, score, setScore, lives, setLives, changeColor }) => {
  const [image, setImage] = useState('')
  const [camera, setCamera] = useState(false)
  let userImageEmotion = null

  const onSubmit = (e) => {
    e.preventDefault()
  }

  // set image state for display
  const handleImage = (e) => {
    console.log('e', e)
    setImage(e.target.files[0])
    setCamera(false)
  }

  // POST image to API and game logic handling 
  const handleImageSubmit = () => {
    const data = new FormData()
    console.log('image is', image)
    data.append('image_input', image, image.name)

    const options = {
      method: 'POST',
      url: 'https://face-detection-and-analysis.p.rapidapi.com/face_analysis',
      headers: {
        'X-RapidAPI-Key': '12f728e6b5msh9f75057015eabfap169eadjsn86579ecf8b5e',
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
          console.log('# of lives before dec.:', lives)
          if (lives === 1) {
            // post to DB
            setLives(3)
            setScore(0)
            setImage('')
            alert(`Game over, not a match!. You scored ${score} points. Practice makes perfect, so don't give up!`)
            return
          }
          setLives(lives-1)
          alert(`We did not detect the ${emotion} emotion, try again!`)
          setTimeout(() => {
            if (camera === false) {
              setImage('')
            }
          }, 3000)
          return
        }
        alert(`Great job, it's a match. Take another turn with the new emotion!`)
        setScore(score+1)
        getRandomEmotion()
        setTimeout(() => {
          if (camera === false) {
            setImage('')
          }
        }, 3000)
      })
      .catch(error => {
        console.error(error)
      })
  }

  // stop / reset game and POST score to db
  const handleStopGame = () => {
    if (score === 0 && lives === 3) {
      return
    }

    if (score === 0) {
      setLives(3)
      alert(`Game stopped and has been reset. You scored ${score} points.`)
      return
    }

    // if (score === 1) {
    //   setLives(3)
    //   alert(`Game stopped and has been reset. You scored ${score} point.`)
    //   return
    // }

    // POST score to db
    fetch('', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "score": score })
  })
  .then(response => response.json())
  .then(response => console.log(JSON.stringify(response)))

    setLives(3)
    setScore(0)
    alert(`Game stopped and has been reset. You scored ${score} point(s). Nice job!`)
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
          <input type="file" name="image-file" id="file" onChange={handleImage} className="inputfile"/>
          <label className="custom-up-label"htmlFor="file">Custom Upload</label>
          <button className="useCamBtn" onClick={() => setCamera(true)}>Use Your Camera</button>
        </div>
        <div>
          <button className="submitButton" type="submit" onClick={handleImageSubmit}>Check Facial Expression</button>
        </div>
        <div>
          <button className="stopResetButton" onClick={handleStopGame}>Stop / Reset Game</button>
        </div>
      </form>
    </div>
  )
}

export default Game