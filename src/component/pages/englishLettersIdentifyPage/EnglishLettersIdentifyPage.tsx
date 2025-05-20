import React, { useRef, useState, useEffect, useContext } from "react";
import { Layout, Button, Select } from "antd";
import { useNavigate } from "react-router-dom"; 
import  io from "socket.io-client";

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
  contentRightPanel,
  selectorDiv
} from "./EnglishLettersIdentifyPageStyle";

import { MainLayout } from "../../templates";

import englishLetters from "/src/assets/images/english_letters.png"; 
import { LanguageContext } from "../../../context/LanguageContext";
import { useTranslation } from "react-i18next";

// const socket = io("http://localhost:5000");

const EnglishLettersIdentifyPage: React.FC = () => {
  const { t } = useTranslation();
  const { language, changeLanguage } = useContext(LanguageContext);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const navigate = useNavigate(); 
  const [isHovered, setIsHovered] = useState(false); 
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [predictedLetter, setPredictedLetter] = useState<string>("");

  // Function to open the camera
  const openCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
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

    // Handle incoming predictions from backend
    socket.on("predicted_letter", (letter: string) => {
      setPredictedLetter(letter); // Update predicted letter
    });

    return () => {
      closeCamera(); // Cleanup: close camera when component unmounts
      socket.off("predicted_letter");
    };
  }, []);

  const captureFrame = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx?.drawImage(video, 0, 0); // Draw the current frame to the canvas

      // Capture the frame and send to the server
      canvas.toBlob((blob: Blob | null) => {
        if (blob) {
          const reader = new FileReader();
          reader.onloadend = () => {
            socket.emit("frame", reader.result); // Send the frame data to Flask backend
          };
          reader.readAsArrayBuffer(blob); // Convert to ArrayBuffer
        }
      });
    }
  };

  return (
    <MainLayout>
    <Layout style={mainLayoutContainer}>

<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", padding: "10px 20px" }}>
  
  {/* Back Button */}
  <Button
    type="default"
    onClick={() => navigate("/sign-letters")}
    style={isHovered ? { ...backButton, ...backButtonHover } : backButton}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
    ← {t("Back")}
  </Button>

  {/* Language Selector */}
  <Select value={language} onChange={changeLanguage} style={selectorDiv}>
    <Select.Option value="en">English</Select.Option>
    <Select.Option value="si">සිංහල</Select.Option>
  </Select>

</div>

      {/* Two-Column Layout */}
      <div style={pageContainer}>

        
        {/* Left Side: Content with Video and Right Panel Inside */}
        <div style={contentContainer}>
          
           <div style={titleContainer}>
          <h1 style={titleStyle}>{t("EnglishLettersSigningPractice")}</h1>
        </div>
        
          {/* Two-Column Layout Inside Content Container */}
          <div style={contentInnerContainer}>
            {/* Left: Video */}
            <div style={videoContainer}>
              <video ref={videoRef} autoPlay muted />
              <canvas ref={canvasRef} style={{ display: "none" }} />
            </div>

            {/* Right: White Background Panel */}
            <div style={contentRightPanel}>
            <h2>{t("Instructions")}</h2>
              <p>
                * {t("InstructionSteps")}.
              </p>
              <h2
                style={{ fontSize: "30px", fontWeight: "bold", color:"#3b0b96" }}
              >
                {t("PredictedLetter")}:{" "}
                <span style={{ fontSize: "48px", color: "red" }}>
                  {predictedLetter}
                </span>
              </h2>
            </div>
          </div>

          {/* Camera Controls */}
          <div style={{ marginTop: "10px", display: "flex", gap: "10px", justifyContent: "center" }}>
          <Button type="default" style={{backgroundColor:"#1677ff" , color:"white"}} onClick={captureFrame}>
          {t("CaptureFrame")}
            </Button>
          </div>
        </div>

        {/* Right Side: Side Panel */}
        <div style={sidePanel}>
          <img
            src={englishLetters}
            style={{ height: "800px", width: "100%" }}
            alt="English_Letters"
          />
        </div>
      </div>
    </Layout>
    </MainLayout>
  );
};

export default EnglishLettersIdentifyPage;
