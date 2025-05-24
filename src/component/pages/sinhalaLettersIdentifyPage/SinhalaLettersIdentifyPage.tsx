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
} from "./SinhalaLettersIdentifyPageStyle";

import sinhalaLetters from "/src/assets/images/sinhala_letters.png";
import { MainLayout } from "../../templates";
import { useTranslation } from "react-i18next";
import { getSinhalaLetterPrediction } from "../../../services";

const SinhalaLettersIdentifyPage: React.FC = () => {
  const { t } = useTranslation();
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [predictedLetter, setPredictedLetter] = useState("");
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Start video capture on mount
    const startVideo = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    };

    startVideo();

    // Cleanup
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
          getSinhalaLetterPrediction(formData)
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
              <h1 style={titleStyle}>{t("SinhalaLettersSigningPractice")}</h1>
            </div>

            <div style={contentInnerContainer}>
              {/* Video */}
              <div style={videoContainer}>
                <video ref={videoRef} autoPlay muted />
                <canvas ref={canvasRef} style={{ display: "none" }} />
              </div>

              {/* Prediction Panel */}
              <div style={contentRightPanel}>
                <h2>{t("Instructions")}</h2>
                <p>* {t("InstructionSteps")}.</p>
                <p
                  style={{
                    fontSize: "36px",
                    fontWeight: "bold",
                    color: "green",
                  }}
                >
                  {t("PredictedLetter")}:{" "}
                  <span style={{ fontSize: "48px", color: "red" }}>
                    {predictedLetter}
                  </span>
                </p>
              </div>
            </div>

            {/* Capture Button */}
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

          {/* Right Side: Reference Image */}
          <div style={sidePanel}>
            <img
              src={sinhalaLetters}
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
