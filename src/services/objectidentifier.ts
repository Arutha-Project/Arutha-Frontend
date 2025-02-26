export const uploadVideo = async (recordedChunks: BlobPart[]) => {
    if (recordedChunks.length === 0) return Promise.reject('No recorded video');
  
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const formData = new FormData();
    formData.append('file', blob, 'recording.webm');
  
    try {
      const response = await fetch('http://127.0.0.1:2220/predict/', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Failed to upload video');
      }
  
      const result = await response.json();
      return Promise.resolve(result.predicted_sign);
    } catch (error) {
      return Promise.reject(error);
    }
  };