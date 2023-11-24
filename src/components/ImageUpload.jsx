import { useState } from 'react';
import {useDropzone} from 'react-dropzone';

export default function ImageUpload() {

  const [plant, setPlant] = useState("");
  const [confidence, setConfidence] = useState(0);

    const onDrop = async (acceptedFiles) => {
      // Handle file upload logic here
      // console.log(acceptedFiles);
      const formData = new FormData();
      formData.append('file', acceptedFiles[0]);

      try {
        const response = await fetch('http://localhost:8000/predict', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        console.log(data);
        setPlant(data.class)
        setConfidence(data.confidence)

      } catch (error) {
        console.error(error);
      }
    };
  
    const { getRootProps, getInputProps } = useDropzone({ onDrop });
  
    return (
      <div>
        <div {...getRootProps()} className="dropzone" style={{
        backgroundColor: 'gray',
        padding: '10px',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '10px',
        cursor: 'pointer',
      }}>
        <input {...getInputProps()} />
        <p>Drag and drop an image file here, or click to browse</p>
      </div>
      <div style={{marginTop: '20px', fontWeight: 'bold'}}>
        {plant ? <div>Plant : {plant}</div> : ""}
        {confidence ? <div>Confidence : {Math.round(confidence * 100)}%</div> : ""}
      </div>
      </div>
    );
  }
