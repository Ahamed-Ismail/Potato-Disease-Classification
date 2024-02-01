from setuptools import setup, find_packages
from typing import List

def get_requirements(file_path: str)->List:
    with open(file_path, 'r') as file_obj:
        requirements=file_obj.readlines()
        requirements=[module.replace('\n','') for module in requirements]
    
    return requirements


setup(
    name='Potato_disease_classification',
    version='1.0.1',
    author='Ahamed Ismail',
    author_email='ahamedismailhisamm@gmail.com',
    install_requires=get_requirements('requirements.txt'),
    packages=find_packages(),
    description= "A CNN network to predict where a potato plant has the disease Early Blight, Late Blight or if the potato is healthy",
    platforms= "python 3.10.1",
)