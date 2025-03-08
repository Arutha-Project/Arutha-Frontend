import React, { useRef, useState, useEffect } from 'react';
import { uploadVideo } from '../../../services';

const ObjectIdentifierPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const openCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      // Initialize MediaRecorder when camera is opened
      const mediaRecorder = new MediaRecorder(mediaStream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks((prev) => [...prev, event.data]);
        }
      };
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const startRecording = () => {
    if (!mediaRecorderRef.current || isRecording) return;

    setRecordedChunks([]); // Clear previous recordings
    setStartTime(new Date());
    setEndTime(null);
    setDuration(null);
    setPrediction(null);
    setLoading(false);

    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      const end = new Date();
      setEndTime(end);
      if (startTime) {
        setDuration((end.getTime() - startTime.getTime()) / 1000);
      }
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === 'Space') {
      event.preventDefault();
      isRecording ? stopRecording() : startRecording();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isRecording]); // Keep event listener updated with latest recording state

  const submitVideo = async () => {
    setLoading(true);

    uploadVideo(recordedChunks)
      .then(prediction => {
        setPrediction(prediction);
      })
      .catch(error => {
        console.error('Error uploading video:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <h1>Welcome to the Object Identifier Page</h1>
      <video ref={videoRef} autoPlay playsInline style={{ width: '100%', maxWidth: '600px', transform: 'scaleX(-1)' }}></video>
      
      <div>
        <button onClick={openCamera}>Open Camera</button>
        <button onClick={startRecording} disabled={isRecording}>Start Recording</button>
        <button onClick={stopRecording} disabled={!isRecording}>Stop Recording</button>
        <button onClick={submitVideo}>Submit</button>
      </div>

      <div style={{ marginTop: '20px' }}>
        {startTime && <p>📍 Start Time: {startTime.toLocaleTimeString()}</p>}
        {endTime && <p>🛑 End Time: {endTime.toLocaleTimeString()}</p>}
        {duration !== null && <p>⏳ Duration: {duration.toFixed(2)} seconds</p>}
      </div>

      {loading && (
        <div style={{ marginTop: '20px', fontSize: '18px', fontWeight: 'bold', color: 'blue' }}>
          ⏳ Processing... Please wait...
        </div>
      )}

      {prediction && !loading && (
        <p style={{ fontSize: '18px', fontWeight: 'bold', color: 'green' }}>
          🔍 Predicted Sign: {prediction}
        </p>
      )}

      <p style={{ marginTop: '20px', fontSize: '16px' }}>
        🎥 Press <b>Space</b> to Start/Stop Recording
      </p>
    </div>
  );
};

export default ObjectIdentifierPage;
