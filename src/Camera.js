import React, {useEffect, useRef, useState} from "react";
import Webcam from "react-webcam";

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
    // facingMode: { exact: "environment" }
  };

const Camera = () => {

    const webcamRef = React.useRef(null);

    const [url, setUrl] = useState(null);

    const capture = React.useCallback(
      async() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setUrl(imageSrc);
      },
      [webcamRef]
    );

    const onUserMedia = (e) =>{
        console.log(e);
    }
    return (
        <>
        <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={videoConstraints}
        onUserMedia = {onUserMedia}
        mirrored={true}
      />
      <button onClick={capture}>Capture photo</button>
      <button onClick={() => setUrl(null)}>Refresh</button>

      {url && (

            <div>
                <img src={url} alt="Screenshot"/>
            </div>


      )
      
      
      }

        </>
      );
}

export default Camera;