import uvicorn
import numpy as np
import tensorflow as tf
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, File, UploadFile

from utils import read_file_as_image, load_model

VERSION="1"
MODEL=load_model(VERSION)
CLASSES=['Early_blight', 'Late_blight', 'Healthy']

app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/ping')
async def ping():
    return "Now alive"

@app.post('/predict')
async def predict(file: UploadFile=File(...)):

    image_batch=  read_file_as_image(await file.read())
    

    predictions=MODEL.predict(image_batch)
    print (predictions)

    predicted_class=CLASSES[np.argmax(predictions[0])]

    confidence=float(np.max(predictions[0]))

    return {
        'class':predicted_class,
        'confidence':confidence
    }


if __name__=='__main__':
    uvicorn.run(app, host='localhost', port=8000)