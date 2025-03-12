import React, { useRef, useState } from 'react';
import { Button, Layout } from 'antd';

const NumbersActivityPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [equation, setEquation] = useState<string>('');
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
  const [prediction, setPrediction] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [resultMessage, setResultMessage] = useState<string | null>(null);

  const generateEquation = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const isAddition = Math.random() > 0.5;
    
    const equationText = isAddition ? `${num1} + ${num2}` : `${num1} - ${num2}`;
    setEquation(equationText);
    setCorrectAnswer(isAddition ? num1 + num2 : num1 - num2);
    setResultMessage(null);
  };

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
    mediaRecorder.start();
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  const submitVideo = async () => {
    if (recordedChunks.length === 0 || correctAnswer === null) return;

    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const formData = new FormData();
    formData.append('file', blob, 'recording.webm');
    formData.append('correct_answer', correctAnswer.toString());

    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:2220/predict_answer/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setPrediction(result.predicted_number);
        if (result.is_correct) {
          setResultMessage(`✅ Correct! answer is ${correctAnswer}`);
        } else {
          setResultMessage(`❌ Wrong! The correct answer is ${correctAnswer}`);
        }
      } else {
        alert('Failed to upload video');
      }
    } catch (error) {
      console.error('Error uploading video:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Maths Sign Language Activity</h1>
      <Button type="primary" onClick={generateEquation}>Generate Equation</Button>
      {equation && <h2>{equation} = ?</h2>}
      
      <video ref={videoRef} autoPlay playsInline style={{ width: '100%', maxWidth: '600px' }}></video>

      <div>
        <button onClick={openCamera}>Open Camera</button>
        <button onClick={startRecording}>Start Recording</button>
        <button onClick={stopRecording}>Stop Recording</button>
        <button onClick={submitVideo}>Submit Answer</button>
      </div>

      {loading && <p>⏳ Processing... Please wait...</p>}
      {resultMessage && <h2>{resultMessage}</h2>}
    </Layout>
  );
};

export default NumbersActivityPage;
