import Webcam from 'react-webcam'
import axios from 'axios'
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

  // const capture = useCallback(() => {
  //   // const pictureSrc = webcamRef.current.getScreenshot()
  //   // var screenshot = new Image()
  //   // screenshot.src = pictureSrc
  //   // setImage(screenshot)
  //   async () => {
  //     const pictureSrc = webcamRef.current.getScreenshot()
  //     const res = await fetch(pictureSrc)
  //     const buf = await res.arrayBuffer()
  //     const file = new File([buf], "capture_camera.jpeg", {
  //       type: 'image/jpeg',
  //     })
  //     setImage(file)
  //   }
  //   setPicture(pictureSrc)    
  // })

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

  // base64ToFile(base64) {
  //   const res = await fetch(base64)
  //   const buf = await res.arrayBuffer()
  //   const file = new File([buf], "capture_camera.jpeg", {
  //     type: 'image/jpeg',
  //   })
  //   return file;
  // };

    // const capture = useCallback(
    //   async () => {
    //     const imageSrc = webcamRef.current.getScreenshot();
    //     const blob = await fetch(imageSrc).then((res) => res.blob());
    //     setImage(blob)
    //   }
    // )

  // const dataURLtoBlob = (dataurl) => {
  //   var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
  //       bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  //   while(n--){
  //       u8arr[n] = bstr.charCodeAt(n);
  //   }
  //   return new Blob([u8arr], {type:mime});
  // }

//   function dataURIToBlob(dataURI) {
//     dataURI = dataURI.replace(/^data:/, '');

//     const type = dataURI.match(/image\/[^;]+/);
//     const base64 = dataURI.replace(/^[^,]+,/, '');
//     const arrayBuffer = new ArrayBuffer(base64.length);
//     const typedArray = new Uint8Array(arrayBuffer);

//     for (let i = 0; i < base64.length; i++) {
//         typedArray[i] = base64.charCodeAt(i);
//     }

//     return new Blob([arrayBuffer], {type});
// }

  return (
    <div>
      <h2 className="mb-5 text-center">
        Use Your Own Camera!
      </h2>
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
            className="btn btn-danger"
          >
            Capture
          </button>
        )}
      </div>
    </div>
  )
}

export default Profile