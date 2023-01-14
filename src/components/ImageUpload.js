import axios from 'axios'
import { useState, useEffect } from 'react'

const ImageUpload = ({ emotion, setEmotion, setResult, getRandomEmotion }) => {
  const [image, setImage] = useState('')
  // const [userImageEmotion, setUserImageEmotion] = useState('')
  let userImageEmotion = null

  const handleImage = (e) => {
    console.log('e', e)
    setImage(e.target.files[0])
  }

  const handleImageSubmit = () => {
    const data = new FormData()
    data.append('image_input', image, image.name)
    console.log('image is', image, image.name)

    const options = {
      method: 'POST',
      url: 'https://face-detection-and-analysis.p.rapidapi.com/face_analysis',
      headers: {
        'X-RapidAPI-Key': '',
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
          setResult(`The person in the image is not showing a ${emotion} emotion, try again!`)
          return
        }
        setResult(`Great job! The person in the image is showing a ${emotion} emotion!`)
        getRandomEmotion()
      })
      .catch(error => {
        console.error(error)
      })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const imageURL = URL.createObjectURL(image)
    console.log('imageurl', imageURL)
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="file" name="image-file" onChange={handleImage}/>
        <button type="submit" onClick={handleImageSubmit}>Submit Photo</button>
      </form>

    {image && (
      <div>
        <img
          src={URL.createObjectURL(image)}
        />
      </div>
    )}
    </div>
  )
}

export default ImageUpload