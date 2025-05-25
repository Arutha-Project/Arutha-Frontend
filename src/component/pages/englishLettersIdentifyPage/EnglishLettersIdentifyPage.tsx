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
  titleContainer,
  titleStyle,
  contentRightPanel,
} from "./EnglishLettersIdentifyPageStyle";

import englishLetters from "/src/assets/images/english_letters.png";
import { MainLayout } from "../../templates";
import { useTranslation } from "react-i18next";

const EnglishLettersIdentifyPage: React.FC = () => {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [predictedLetter, setPredictedLetter] = useState<string>("");
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  // Open camera on mount
  useEffect(() => {
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

    openCamera();

    // Cleanup on unmount
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, []);

  const captureFrame = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx?.drawImage(video, 0, 0);

      canvas.toBlob((blob) => {
        if (blob) {
          const formData = new FormData();
          formData.append("file", blob, "frame.jpg");

          fetch("http://localhost:8000/predict-letter-english", {
            method: "POST",
            body: formData,
          })
            .then((res) => res.json())
            .then((data) => {
              setPredictedLetter(data.letter || "");
            })
            .catch((error) => {
              console.error("Prediction error:", error);
            });
        }
      }, "image/jpeg");
    }
  };

  return (
    <MainLayout>
      <Layout style={mainLayoutContainer}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            padding: "10px 20px",
          }}
        >
          <Button
            type="default"
            onClick={() => navigate("/sign-letters")}
            style={
              isHovered ? { ...backButton, ...backButtonHover } : backButton
            }
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            ← {t("Back")}
          </Button>
        </div>

        <div style={pageContainer}>
          {/* Left Side */}
          <div style={contentContainer}>
            <div style={titleContainer}>
              <h1 style={titleStyle}>{t("EnglishLettersSigningPractice")}</h1>
            </div>

            <div style={contentInnerContainer}>
              {/* Video */}
              <div style={videoContainer}>
                <video ref={videoRef} autoPlay muted />
                <canvas ref={canvasRef} style={{ display: "none" }} />
              </div>

              {/* Instructions and Result */}
              <div style={contentRightPanel}>
                <h2>{t("Instructions")}</h2>
                <p>* {t("InstructionSteps")}.</p>
                <h2
                  style={{
                    fontSize: "30px",
                    fontWeight: "bold",
                    color: "#3b0b96",
                  }}
                >
                  {t("PredictedLetter")}:{" "}
                  <span style={{ fontSize: "48px", color: "red" }}>
                    {predictedLetter}
                  </span>
                </h2>
              </div>
            </div>

            <div
              style={{
                marginTop: "10px",
                display: "flex",
                gap: "10px",
                justifyContent: "center",
              }}
            >
              <Button
                type="default"
                style={{ backgroundColor: "#1677ff", color: "white" }}
                onClick={captureFrame}
              >
                {t("CaptureFrame")}
              </Button>
            </div>
          </div>

          {/* Right Side */}
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
