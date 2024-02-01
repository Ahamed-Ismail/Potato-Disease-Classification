import React, {useState, useEffect} from 'react'

function Upload() {

    const [image, setImage] = useState(null);
    const [res, setRes] = useState(null);
    const [msg, setMsg] = useState(null);

    useEffect(() => {
        setRes(null);
    },[]);

    const handleUpload = async(e) => {
        try {
            const file = await e.target.files[0];
            if (file) {
                setImage(file);
                console.log(image);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const uploadImage = async() => {
        try {
            if (image) {
                const formdata = new FormData();
                // const blob = await fetch(image).then(r => r.blob());
                formdata.append('file', image, 'image.jpeg');

                const result = await fetch('http://localhost:8000/predict', {
                    method: 'POST',
                    body: formdata
                });
                const data = result.json().then(r => setRes(r));
                console.log(res);
            }
            else {
                setMsg('Upload an image to predict');
                setTimeout(() => {
                    setMsg(null);
                },2000);
            }
        } catch (err) {
            console.log(err);
        }
    }

  return (
      <div className='container'>
          <label for='upload-file'>Upload image</label>
          <input type='file' accept='image/*' id='upload-file' onChange={e=>handleUpload(e)} />
          <button onClick={uploadImage}>Upload</button>
          {msg && <div><label>{msg}</label></div>}
          {res && <div><label>Class predicted: {res.class}, Confidence: {res.confidence}</label></div>}
    </div>
  )
}

export default Upload;