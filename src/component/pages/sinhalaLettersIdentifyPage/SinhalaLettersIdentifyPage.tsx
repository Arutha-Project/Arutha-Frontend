import React, { useRef, useState, useEffect } from "react";
import { Layout, Button } from "antd";
import { useNavigate } from "react-router-dom";
import {
  mainLayoutContainer,
  contentContainer,
  backButton,
  backButtonHover,
  pageContainer,
  sidePanel,
  contentInnerContainer,
  videoContainer,
  videoStyle,
  titleContainer,
  titleStyle,
  contentRightPanel
} from "./SinhalaLettersIdentifyPageStyle";

import sinhalaLetters from "/src/assets/images/sinhala_letters.png";
import { MainLayout } from "../../templates";


const SinhalaLettersIdentifyPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  // Function to open the camera
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

  // Function to close the camera
  const closeCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  // Automatically open camera when component mounts
  useEffect(() => {
    openCamera(); // Open camera when component mounts

    return () => {
      closeCamera(); // Cleanup: close camera when component unmounts
    };
  }, []);


  return (
    <MainLayout>
    <Layout style={mainLayoutContainer}>
      {/* Back Button */}
      <div style={{ padding: "10px", top: "20px", left: "20px" }}>
        <Button
          type="default"
          onClick={() => navigate("/sign-letters")}
          style={isHovered ? { ...backButton, ...backButtonHover } : backButton}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          ← Back
        </Button>
      </div>

      {/* Two-Column Layout */}
      <div style={pageContainer}>


        {/* Left Side: Content with Video and Right Panel Inside */}
        <div style={contentContainer}>

          <div style={titleContainer}>
            <h1 style={titleStyle}>Sinhala Letters Signing Practice</h1>
          </div>

          {/* Two-Column Layout Inside Content Container */}
          <div style={contentInnerContainer}>
            {/* Left: Video */}
            <div style={videoContainer}>
              <video ref={videoRef} autoPlay playsInline style={videoStyle}></video>
            </div>

            {/* Right: White Background Panel */}
            <div style={contentRightPanel}>
              <h2>Instructions</h2>
              <p>Follow the signing instructions carefully and practice along.</p>
            </div>
          </div>

          {/* Camera Controls */}
          <div style={{ marginTop: "10px", display: "flex", gap: "10px", justifyContent: "center" }}>
            <Button type="primary" onClick={openCamera}>Open Camera</Button>
            <Button type="primary" danger onClick={closeCamera}>Close Camera</Button>
          </div>
        </div>

        {/* Right Side: Side Panel */}
        <div style={sidePanel}>
          <img src={sinhalaLetters} style={{ height: "850px", width: "100%" }} alt="Sinhala_Letters" />
        </div>
      </div>
    </Layout>
    </MainLayout>
  );
};

export default SinhalaLettersIdentifyPage;
