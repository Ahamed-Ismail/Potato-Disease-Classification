import WebcamCap from './components/WebcamCapture.js';
import Upload from './components/Upload.js';
import { useState } from 'react';
import './app.css'


function App() {

  const [capture, setCapture] = useState(true);

  return (
    <div className="App">
      <header>
        <button onClick={()=> setCapture(false)}>Upload image</button>
        <button onClick={()=> setCapture(true)}>Capture image</button>
      </header>
      {capture?<WebcamCap />:<Upload />}
    </div>
  );
}

export default App;
