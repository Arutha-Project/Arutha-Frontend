import React, { useRef, useState } from 'react';

import { Button, Layout } from 'antd';
import { contentContainer, mainLayoutContainer } from './NumbersPageStyle';
import { MainLayout } from '../../templates';

const NumbersPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  const openCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const startRecording = () => {
    if (!stream) return;

    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setRecordedChunks((prev) => [...prev, event.data]);
      }
    };

    setStartTime(new Date());
    setEndTime(null);
    setDuration(null);
    setPrediction(null);
    setLoading(false); // Reset loading state

    mediaRecorder.start();
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      const end = new Date();
      setEndTime(end);

      if (startTime) {
        const recordedDuration = (end.getTime() - startTime.getTime()) / 1000;
        setDuration(recordedDuration);
      }
    }
  };

  const submitVideo = async () => {
    if (recordedChunks.length === 0) return;

    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const formData = new FormData();
    formData.append('file', blob, 'recording.webm');

    setLoading(true); // Show loading animation

    try {
      const response = await fetch('http://127.0.0.1:2220/predict_numbers/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setPrediction(result.predicted_number); // Set prediction result
      } else {
        alert('Failed to upload video');
      }
    } catch (error) {
      console.error('Error uploading video:', error);
    } finally {
      setLoading(false); // Hide loading animation when response is received
    }
  };


  return (
    <MainLayout>
      <Layout style={mainLayoutContainer}>
        <div style={contentContainer}>
          <h1>Numbers Identification Activity</h1>

          <video ref={videoRef} autoPlay playsInline style={{ width: '100%', maxWidth: '600px' }}></video>

          <div style={{ marginTop: "10px" }}>
            <Button type="primary" onClick={openCamera}>Open Camera</Button>
            <Button type="default" onClick={startRecording}>Start Recording</Button>
            <Button type="dashed" onClick={stopRecording}>Stop Recording</Button>
            <Button type="primary" danger onClick={submitVideo}>Submit</Button>
          </div>

          <div style={{ marginTop: '20px' }}>
            {startTime && <p>📍 Start Time: {startTime.toLocaleTimeString()}</p>}
            {endTime && <p>🛑 End Time: {endTime.toLocaleTimeString()}</p>}
            {duration !== null && <p>⏳ Duration: {duration.toFixed(2)} seconds</p>}
          </div>

          {/* Show Loading Animation */}
          {loading && (
            <div style={{ marginTop: '20px', fontSize: '18px', fontWeight: 'bold', color: 'blue' }}>
              ⏳ Processing... Please wait...
            </div>
          )}

          {/* Show Prediction Result */}
          {prediction && !loading && (
            <p style={{ fontSize: '18px', fontWeight: 'bold', color: 'green' }}>
              🔍 Predicted Sign: {prediction}
            </p>
          )}
        </div>
      </Layout>
    </MainLayout>
  );
};


export default NumbersPage;
