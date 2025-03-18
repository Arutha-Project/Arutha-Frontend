import React, { useRef, useState, useEffect, useContext } from "react";
import { Layout, Button, Select } from "antd";
import { useNavigate } from "react-router-dom";
import  io  from "socket.io-client";
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
} from "./SinhalaLettersIdentifyPageStyle";

import sinhalaLetters from "/src/assets/images/sinhala_letters.png";
import { MainLayout } from "../../templates";
import { LanguageContext } from "../../../context/LanguageContext";
import { useTranslation } from "react-i18next";

const socket = io("http://localhost:5000");

const SinhalaLettersIdentifyPage: React.FC = () => {
  const { t } = useTranslation();
  const { language, changeLanguage } = useContext(LanguageContext);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<any>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [predictedLetter, setPredictedLetter] = useState("");
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Start video capture
    const startVideo = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    };

    startVideo();

    // Handle incoming processed frames
    socket.on("processed_frame", (frameData: BlobPart) => {
      const img = new Image();
      img.src = URL.createObjectURL(new Blob([frameData]));
      img.onload = () => {
        if (canvasRef.current) {
          const ctx = canvasRef.current.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0);
          }
        }
      };
    });

    // Handle incoming predictions
    socket.on("predicted_letter", (letter: any) => {
      setPredictedLetter(letter);
    });

    return () => {
      socket.off("processed_frame");
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
      if (ctx) {
        ctx.drawImage(video, 0, 0);
      }

      // Capture the frame and send to the server
      canvas.toBlob((blob: Blob | null) => {
        if (blob) {
          const reader = new FileReader();
          reader.onloadend = () => {
            socket.emit("frame", reader.result);
          };
          reader.readAsArrayBuffer(blob);
        }
      });
    }
  };

  return (
    <MainLayout>
    <Layout style={mainLayoutContainer}>
    
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", padding: "10px 20px" }}>

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
            <h1 style={titleStyle}>{t("SinhalaLettersSigningPractice")}</h1>
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
              <p
                style={{ fontSize: "36px", fontWeight: "bold", color: "green" }}
              >
                {t("PredictedLetter")}:{" "}
                <span style={{ fontSize: "48px", color: "red" }}>
                  {predictedLetter}
                </span>
              </p>
            </div>
          </div>

          {/* Camera Controls */}
          <div style={{ marginTop: "10px", display: "flex", gap: "10px", justifyContent: "center" }}>
            {/* <Button type="primary" onClick={openCamera}>{t("OpenCamera")}</Button>
            <Button type="primary" danger onClick={closeCamera}>{t("CloseCamera")}</Button> */}
             <Button type="default" style={{backgroundColor:"#1677ff" , color:"white"}} onClick={captureFrame}>
             {t("CaptureFrame")}
            </Button>
          </div>
        </div>

        {/* Right Side: Side Panel */}
        <div style={sidePanel}>
          <img
            src="/src/assets/images/sinhala_letters.png"
            style={{ height: "850px", width: "100%" }}
            alt="Sinhala_Letters"
          />
        </div>
      </div>
    </Layout>
    </MainLayout>
  );
};

export default SinhalaLettersIdentifyPage;
