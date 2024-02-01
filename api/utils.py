import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf

def read_file_as_image(data)->np.ndarray:
    img=  Image.open(BytesIO(data))
    img_arr =  np.array(img)
    return np.expand_dims(img_arr, 0)

def load_model(version):
    model=  tf.keras.models.load_model("./saved_models/"+version)
    return model