import React, { useRef, useState } from "react";
import { Layout , Button } from "antd";
import {  contentContainer, mainLayoutContainer } from './LettersIdentifyPageStyle';

const LettersIdentifyPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string | null>(null);

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

  const closeCamera = async () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };


  return (
    <Layout style={mainLayoutContainer}>
      <div style={contentContainer}>
          <h1>English Letters Signing Practice</h1>

          <video ref={videoRef} autoPlay playsInline style={{ width: "100%", maxWidth: "600px" }}></video>
          
          <div style={{ marginTop: "10px", display: "flex", gap: "10px", justifyContent: "center" }}>
            <Button type="primary" onClick={openCamera}>Open Camera</Button>
            <Button type="primary" danger onClick={closeCamera}>Close Camera</Button>
          </div>
          
        </div>

        <div>
          {loading && <p>⏳ Processing... Please wait...</p>}
          {prediction && !loading && <p>Your Answer: {prediction}</p>}
          {result && <p style={{ fontSize: "18px", fontWeight: "bold", color: result.includes("Correct") ? "green" : "red" }}>{result}</p>}
        </div>
    </Layout>

  );
};

export default LettersIdentifyPage;
