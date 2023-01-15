import axios from 'axios'
import { useState, useEffect } from 'react'
import Profile from './Profile'

const ImageUpload = ({ emotion, setEmotion, setResult, getRandomEmotion }) => {
  const [image, setImage] = useState('')
  const [camera, setCamera] = useState(false)
  // const [userImageEmotion, setUserImageEmotion] = useState('')
  let userImageEmotion = null

  const handleImage = (e) => {
    console.log('e', e)
    setImage(e.target.files[0])
    setCamera(false)
  }

  const handleImageSubmit = () => {
    const data = new FormData()
    console.log('image is', image)
    data.append('image_input', image, image.name)
    // console.log('image is', image)
    // data.append('image_input', image, 'hi')
    

    const options = {
      method: 'POST',
      url: 'https://face-detection-and-analysis.p.rapidapi.com/face_analysis',
      headers: {
        'X-RapidAPI-Key': '75afe56a5emsh53fe2378eb22489p1e3e7ajsn10763fd792d6',
        'X-RapidAPI-Host': 'face-detection-and-analysis.p.rapidapi.com'
      },
      data: data
    }

    axios
      .request(options)
      .then(res => {
        console.log('analysis data', res.data)
        userImageEmotion = (res.data.analysis_result[0].emotion)
        console.log('userimageemotion', userImageEmotion)
        console.log('emotion desired', emotion)
        if (userImageEmotion !== emotion) {
          setResult(`We did not detect the ${emotion} emotion, try again!`)
          setTimeout(() => {
            setResult('')
            setImage('')
          }, 10000)
          return
        }
        setResult(`Great job, the image matches the emotion. Practice again with the new emotion listed above!`)
        getRandomEmotion()
        setTimeout(() => {
          setResult('')
        }, 5500)

        // setTimeout(() => {
        //   setImage('')
        //   setResult('')
        // }, 10000)
        
      })
      .catch(error => {
        console.error(error)
      })
  }

  const onSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="file" name="image-file" onChange={handleImage}/>
        <button onClick={() => setCamera(true)}>Use your own camera</button>
        {/* {camera && <Profile setImage={setImage}/>} */}
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
        <div>
          <button type="submit" onClick={handleImageSubmit}>Submit Photo</button>
        </div>
      </form>

    {/* <div className="imageContainer">
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
    </div> */}

    </div>
  )
}

export default ImageUpload