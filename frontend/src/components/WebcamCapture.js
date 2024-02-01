import Webcam from 'react-webcam';
import React, { useState, useEffect, useRef } from 'react';

function WebcamCap() {

    const webcamRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [res, setRes] = useState(null);

    useEffect(() => {              // on refresh set capture image as null
        setCapturedImage(null);
        setRes(null);
    }, []);

    const videoConstraints = {
        width: 256,
        height: 256,
        facingMode: 'environment', // 'user' for front camera, 'environment' for back camera
    };


    // useEffect(() => {
    //     console.log('webcamRef:', webcamRef);
    // }, [webcamRef]);


    const captureImage = () => {
        if (webcamRef && webcamRef.current) {
            setTimeout(() => {
                const imageSrc = webcamRef.current.getScreenshot({
                    width: 256,
                    height: 256,
                    screenshotQuality: 1,
                });
                setCapturedImage(imageSrc);
                // console.log(imageSrc);
            }, 500);
        }
        else {
            console.log('no image');
        }
    };

    const uploadImage = async () => {
        try {
            const formdata = new FormData();
            const blob = await fetch(capturedImage).then(r => r.blob());
            formdata.append('file', blob, 'image.jpeg');

            const result = await fetch('http://localhost:8000/predict', {
                method: 'POST',
                body: formdata
            });
            const data = result.json().then(r=>setRes(r));
        } catch (err) {
            console.log(err);
        }
        
    };

    const takeAnother = () => {
        setCapturedImage(null);
    }
    
    
    return (
    <div className='container'>
            {capturedImage ? (<div>
                <img src={capturedImage} alt='img' />
                <button className='upload-image' onClick={uploadImage}>Upload</button>
                <button className='discard-image' onClick={takeAnother}>Take Another</button>
            </div>) : (<div>
            <Webcam
                audio={false}
                width={256}
                height={256}
                ref={webcamRef}
                videoConstraints={videoConstraints}
                screenshotFormat="image/jpeg"
            />
            <button className='capture-button' onClick={captureImage}>Capture</button>
            </div>)}
            {res && <div><label>Class predicted: {res.class}, Confidence: {res.confidence}</label></div>}
    </div>
     )
}

export default WebcamCap;
