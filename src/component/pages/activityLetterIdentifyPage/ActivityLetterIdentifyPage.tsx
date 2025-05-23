import React, { useContext, useEffect, useRef, useState } from "react";
import { Layout, Button, Tabs, Select } from "antd";
import { useNavigate } from "react-router-dom";
import {
  mainLayoutContainer,
  backButton,
  backButtonHover,
  contentContainer,
  activitySection,
  leftSideEnglish,
  leftSideSinhala,
  rightSideEnglish,
  rightSideSinhala,
  selectorDiv,
  videoContainer,
  videoStyle,
} from "./ActivityLetterIdentifyPageStyle";
import { MainLayout } from "../../templates";
import { LanguageContext } from "../../../context/LanguageContext";
import { useTranslation } from "react-i18next";

const { TabPane } = Tabs;

const ActivityLetterIdentifyPage: React.FC = () => {
  const { t } = useTranslation();
  const { language, changeLanguage } = useContext(LanguageContext);
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isHovered, setIsHovered] = React.useState(false);

  const [targetLetter, setTargetLetter] = useState<string>("");
  const [result, setResult] = useState<string | null>(null);

    const [targetSinhalaLetter, setTargetSinhalaLetter] = useState<string>("");

  const targetLetterRef = useRef<string>("");

  const generateRandomEnglishLetter = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXY";
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];
    setTargetLetter(randomLetter);
    targetLetterRef.current = randomLetter;
    setResult(null);
  };

  const generateRandomSinhalaLetter = () => {
    const letters = "අආඇඉඊඋඌඑඒක්";
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];
    setTargetSinhalaLetter(randomLetter);
    targetLetterRef.current = randomLetter;
    setResult(null);
  };

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

  const captureAndPredict = async () => {
    if (result === "Correct") return;

    const canvas = document.createElement("canvas");
    const video = videoRef.current;
    if (!video || !targetLetterRef.current) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL("image/jpeg");
    const base64Image = dataUrl.split(",")[1];

    try {
      const response = await fetch(
        "http://localhost:8000/predict-activity/english-letter",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ frame: base64Image }),
        }
      );

      const resultData = await response.json();

      if (resultData.predicted_letter) {
        const prediction = resultData.predicted_letter;
        const isCorrect = prediction === targetLetterRef.current;

        console.log(
          `Predicted: ${prediction}, Target: ${targetLetterRef.current} → ${
            isCorrect ? "✅ Correct" : "❌ Incorrect"
          }`
        );

        setResult(isCorrect ? t("Correct") : t("Incorrect"));

        if (isCorrect) {
          setTimeout(() => {
            generateRandomEnglishLetter();
          }, 3000);
        }
      } else if (resultData.error === "No hand detected") {
        setResult(t("No hand detected"));
      } else if (resultData.error) {
        console.log("⚠️ Error from server:", resultData.error);
      }
    } catch (error) {
      console.error("Prediction request failed:", error);
    }
  };

  useEffect(() => {
    openCamera();
    generateRandomEnglishLetter();
    generateRandomSinhalaLetter();
    const interval = setInterval(() => {
      captureAndPredict();
    }, 1000); // every 1 second

    return () => clearInterval(interval);
  }, []);

  
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
          {/* Back Button */}
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

          {/* Language Selector */}
          <Select
            value={language}
            onChange={changeLanguage}
            style={selectorDiv}
          >
            <Select.Option value="en">English</Select.Option>
            <Select.Option value="si">සිංහල</Select.Option>
          </Select>
        </div>
        <div style={contentContainer}>
          <Tabs defaultActiveKey="1" centered>
            <TabPane
              tab={
                <span
                  style={{
                    fontFamily: "'Comic Sans MS', cursive, sans-serif",
                    fontSize: "20px",
                  }}
                >
                  {t("EnglishActivity")}
                </span>
              }
              key="1"
            >
              <div style={activitySection}>
                <div style={leftSideEnglish}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                      textAlign: "center",
                    }}
                  >
                    {targetLetter && (
                      <h2 style={{ fontSize: "100px", fontWeight: "bold" }}>
                        {targetLetter}
                      </h2>
                    )}
                    <Button
                      type="primary"
                      onClick={generateRandomEnglishLetter}
                      style={{ marginBottom: "20px" }}
                    >
                      {t("Generate Letter")}
                    </Button>
                  </div>
                </div>

                <div style={rightSideEnglish}>
                  <div style={{ ...videoContainer, position: "relative" }}>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      style={{ ...videoStyle, width: "100%", height: "100%" }}
                    ></video>

                    {result && (
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          backgroundColor: "rgba(0, 0, 0, 0.6)",
                          padding: "20px 40px",
                          borderRadius: "10px",
                          color: "#fff",
                          fontSize: "36px",
                          fontWeight: "bold",
                          zIndex: 2,
                        }}
                      >
                        {result}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabPane>

            {/* Sinhala Signing Activity */}
            <TabPane
              tab={
                <span
                  style={{
                    fontFamily: "'Comic Sans MS', cursive, sans-serif",
                    fontSize: "20px",
                  }}
                >
                  {t("SinhalaActivity")}
                </span>
              }
              key="2"
            >
              <div style={activitySection}>
                {/* Left Side Content */}
                <div style={leftSideSinhala}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                      textAlign: "center",
                    }}
                  >
                    {targetSinhalaLetter && (
                      <h2 style={{ fontSize: "100px", fontWeight: "bold" }}>
                        {targetSinhalaLetter}
                      </h2>
                    )}
                    <Button
                      type="primary"
                      onClick={generateRandomSinhalaLetter}
                      style={{ marginBottom: "20px" }}
                    >
                      {t("Generate Letter")}
                    </Button>
                  </div>
                </div>

                {/* Right Side Content */}
                <div style={rightSideSinhala}>
                  <div style={videoContainer}>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      style={videoStyle}
                    ></video>
                  </div>
                </div>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </Layout>
    </MainLayout>
  );
};

export default ActivityLetterIdentifyPage;
