import React, { useRef, useState } from "react";
import { Layout, Button } from "antd";
import { mainLayoutContainer, contentContainer } from "./EnglishLettersIdentifyPageStyle";


const EnglishLettersIdentifyPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

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

  const closeCamera = () => {
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
          <h1>Enlish Letters Signing Practice</h1>

          <video ref={videoRef} autoPlay playsInline style={{ width: "100%", maxWidth: "600px" }}></video>
          
          <div style={{ marginTop: "10px" }}>
            <Button type="primary" onClick={openCamera}>Open Camera</Button>
            <Button type="primary" danger onClick={closeCamera}>Submit</Button>
          </div>
          
        </div>

    </Layout>
  );
};

export default EnglishLettersIdentifyPage;
