import Webcam from 'react-webcam'
import { useCallback, useRef, useState } from 'react'

const WebcamComponent = () => <Webcam />

const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: 'user',
}

const Profile = ({ setImage }) => {
  const [picture, setPicture] = useState('')
  const webcamRef = useRef(null)

  const capture = useCallback(
    async () => {
      const pictureSrc = webcamRef.current.getScreenshot()
      const res = await fetch(pictureSrc)
      const buf = await res.arrayBuffer()
      const file = new File([buf], "capture_camera.jpeg", {
        type: 'image/jpeg',
      })
      setImage(file)
      setPicture(pictureSrc)
    }
  )
  return (
    <div>
      {/* <h2 className="mb-5 text-center">
        Use Your Own Camera!
      </h2> */}
      <div>
        {picture == '' ? (
          <Webcam
            audio={false}
            height={400}
            ref={webcamRef}
            width={400}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
        ) : (
          <img src={picture} />
        )}
      </div>
      <div>
        {picture != '' ? (
          <button
            onClick={(e) => {
              e.preventDefault()
              setPicture('')
            }}
            className="btn btn-primary"
          >
            Retake
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault()
              capture()
            }}
            className="captureButton"
          >
            Capture
          </button>
        )}
      </div>
    </div>
  )
}

export default Profile