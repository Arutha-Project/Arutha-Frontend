import React, { useRef, useState } from "react";
import { Layout, Button } from "antd";
import { contentContainer, mainLayoutContainer } from './NumbersIdentifyPageStyle';
import { Link } from "react-router-dom";
import { MainLayout } from "../../templates";

const NumbersIdentifyPage: React.FC = () => {
  const [currentNumber, setCurrentNumber] = useState(0); // Start from 0
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string | null>(null); // "Correct" or "Wrong"

  const openCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const startRecording = () => {
    if (!stream) return;
    setRecordedChunks([]);

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
    if (recordedChunks.length === 0) return;

    const blob = new Blob(recordedChunks, { type: "video/webm" });
    const formData = new FormData();
    formData.append("file", blob, "recording.webm");
    formData.append("expected_number", currentNumber.toString()); // Send expected number

    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:2220/validate_number/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setPrediction(result.predicted_number.toString());
        setResult(result.correct ? "✅ Correct!" : `❌ Wrong! The correct answer is ${currentNumber}`);
      } else {
        alert("Failed to upload video");
      }
    } catch (error) {
      console.error("Error uploading video:", error);
    } finally {
      setLoading(false);
    }
  };

  const nextNumber = () => {
    if (currentNumber < 50) {
      setCurrentNumber((prev) => prev + 1);
      setPrediction(null);
      setResult(null);
      setRecordedChunks([]);
    }
  };

  return (
    <MainLayout>
      <Layout style={mainLayoutContainer}>
        <div>
          <Link to="/numbers_Page">
            <Button type="primary">Go to Self Study</Button>
          </Link>
          <Link to="/numbers-Activity-Page">
            <Button type="primary">Go to Numbers Activity</Button>
          </Link>
        </div>
        <div style={contentContainer}>
          <h1>Number Signing Practice</h1>
          <h2>🔢 Sign this number: {currentNumber}</h2>

          <video ref={videoRef} autoPlay playsInline style={{ width: "100%", maxWidth: "600px" }}></video>

          <div style={{ marginTop: "10px" }}>
            <Button type="primary" onClick={openCamera}>Open Camera</Button>
            <Button type="default" onClick={startRecording}>Start Recording</Button>
            <Button type="dashed" onClick={stopRecording}>Stop Recording</Button>
            <Button type="primary" danger onClick={submitVideo}>Submit</Button>
          </div>

          <Button type="primary" onClick={nextNumber} disabled={currentNumber >= 50}> Next ➡ </Button>
        </div>

        <div>
          {loading && <p>⏳ Processing... Please wait...</p>}
          {prediction && !loading && <p>Your Answer: {prediction}</p>}
          {result && <p style={{ fontSize: "18px", fontWeight: "bold", color: result.includes("Correct") ? "green" : "red" }}>{result}</p>}
        </div>
      </Layout>
    </MainLayout>
  );
};

export default NumbersIdentifyPage;
