// ImageViewer.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageViewer = ({ imageId }) => {
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/images/${imageId}`, {
          responseType: 'arraybuffer',
        });

        const base64 = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );

        setImageData(`data:image/jpeg;base64,${base64}`);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    if (imageId) {
      fetchImage();
    }
  }, [imageId]);

  return <img src={imageData} alt="Uploaded" />;
};

export default ImageViewer;
