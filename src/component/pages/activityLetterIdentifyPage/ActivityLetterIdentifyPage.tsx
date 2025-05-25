import React, { useEffect, useRef, useState } from "react";
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
  videoContainer,
  videoStyle,
} from "./ActivityLetterIdentifyPageStyle";
import { MainLayout } from "../../templates";
import { useTranslation } from "react-i18next";
import axios from "../../../services/axiosInstance";
import { LanguageContext } from "../../../context/LanguageContext";

const { TabPane } = Tabs;

const ActivityLetterIdentifyPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = React.useState(false);

  const [targetLetter, setTargetLetter] = useState<string>("");
  const [result, setResult] = useState<string | null>(null);
  const [sinhalaResult, setSinhalaResult] = useState<string | null>(null);

  const [targetSinhalaLetter, setTargetSinhalaLetter] = useState<string>("");

  const targetEnglishLetterRef = useRef<string>("");
  const targetSinhalaLetterRef = useRef<string>("");

  const [activeTab, setActiveTab] = useState("1");

  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [sinhalaScore, setSinhalaScore] = useState(0);
  const [sinhalaRound, setSinhalaRound] = useState(0);
  const [sinhalaGameOver, setSinhalaGameOver] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const finalEnglishScoreRef = useRef(0);
  const finalSinhalaScoreRef = useRef(0);

   const { language, changeLanguage } = React.useContext(LanguageContext);

  const generateRandomEnglishLetter = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXY";
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];
    setTargetLetter(randomLetter);
    targetEnglishLetterRef.current = randomLetter;
    setResult(null);
  };

  const sinhalaLetters = ["අ", "ආ", "ඇ", "ඉ", "ඊ", "උ", "ඌ", "එ", "ඒ", "ක්"];

  const generateRandomSinhalaLetter = () => {
    const randomLetter =
      sinhalaLetters[Math.floor(Math.random() * sinhalaLetters.length)];
    setTargetSinhalaLetter(randomLetter);
    targetSinhalaLetterRef.current = randomLetter;
    setSinhalaResult(null);
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

  const saveLetterScore = async (score: number, language: string) => {
    const userDetailsStr = localStorage.getItem("userDetails");
    const userId = userDetailsStr ? JSON.parse(userDetailsStr).id : null;

    if (!userId) {
      console.error("⚠️ User ID not found in localStorage.");
      return;
    }

    console.log("📝 Saving score...");
    console.log("User ID:", userId);
    console.log("Language:", language);
    console.log("Score:", score);
    console.log("Total Items:", 10);

    try {
      await axios.post(`/letter-scores/save`, {
        score,
        language,
        totalItems: 10,
        userId,
      });
      console.log(`✅ ${language} score saved`);
    } catch (err) {
      console.error(`❌ Failed to save ${language} score:`, err);
    }
  };

  const captureAndPredict = async () => {
    if (gameOver) return;
    if (result === "Correct") return;

    const canvas = document.createElement("canvas");
    const video = videoRef.current;
    if (!video || !targetEnglishLetterRef.current) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL("image/jpeg");
    const base64Image = dataUrl.split(",")[1];

    try {
      const response = await fetch(
        "http://0.0.0.0:9090/letter/predict-activity/english-letter",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ frame: base64Image }),
        }
      );

      const resultData = await response.json();

      if (resultData.error === "No hand detected") {
        if (!gameOver) {
          setResult(t("No hand detected"));
        }
        return;
      }

      if (resultData.predicted_letter) {
        const prediction = resultData.predicted_letter;
        const isCorrect = prediction === targetEnglishLetterRef.current;

        console.log(
          `Predicted: ${prediction}, Target: ${
            targetEnglishLetterRef.current
          } → ${isCorrect ? "✅ Correct" : "❌ Incorrect"}`
        );

        if (!gameOver) {
          setResult(isCorrect ? t("Correct") : t("Incorrect"));
        }

       if (!gameOver && isCorrect) {
         setResult(t("Correct"));

         setTimeout(() => {
           handleEnglishNextRound(true);
           setResult(null);
         }, 3000);
       }

      } else if (resultData.error) {
        console.log("⚠️ Error from server:", resultData.error);
      }
    } catch (error) {
      console.error("Prediction request failed:", error);
    }
  };

  const captureAndPredictSinhala = async () => {
    if (sinhalaGameOver) return;
    if (sinhalaResult === "Correct") return;

    const canvas = document.createElement("canvas");
    const video = videoRef.current;
    if (!video || !targetSinhalaLetterRef.current) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL("image/jpeg");
    const base64Image = dataUrl.split(",")[1];

    try {
      const response = await fetch(
        "http://0.0.0.0:9090/letter/predict-activity/sinhala-letter",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ frame: base64Image }),
        }
      );

      const resultData = await response.json();

      if (resultData.error === "No hand detected") {
        if (!sinhalaGameOver) {
          setSinhalaResult(t("No hand detected"));
        }
        return;
      }

      if (resultData.predicted_letter) {
        const prediction = resultData.predicted_letter;
        const isCorrect = prediction === targetSinhalaLetterRef.current;

        console.log(
          `Predicted: ${prediction}, Target: ${
            targetSinhalaLetterRef.current
          } → ${isCorrect ? "✅ Correct" : "❌ Incorrect"}`
        );

        if (!sinhalaGameOver) {
          setSinhalaResult(isCorrect ? t("Correct") : t("Incorrect"));
        }

        if (!sinhalaGameOver && isCorrect) {
          setSinhalaResult(t("Correct"));

          setTimeout(() => {
            handleSinhalaNextRound(true);
            setSinhalaResult(null);
          }, 3000);
        }
      } else if (resultData.error) {
        console.log("⚠️ Error from server:", resultData.error);
      }
    } catch (error) {
      console.error("Prediction request failed:", error);
    }
  };

const handleEnglishSkip = () => {
  if (!gameOver) {
    handleEnglishNextRound(false);
  }
};


  const handleSinhalaSkip = () => {
    if (!sinhalaGameOver) {
      handleSinhalaNextRound(false); // skip: no score
    }
  };

const handleEnglishRestart = () => {
  setScore(0);
  setRound(0);
  setGameOver(false);
  setResult(null);
  generateRandomEnglishLetter();

  if (!stream) {
    openCamera();
  }
};

const handleSinhalaRestart = () => {
  setSinhalaScore(0);
  setSinhalaRound(0);
  setSinhalaGameOver(false);
  setSinhalaResult(null);
  generateRandomSinhalaLetter();

  if (!stream) {
    openCamera();
  }
};


  const handleEnglishNextRound = (addScore: boolean) => {
    setRound((prev) => {
      const newRound = prev + 1;
      if (addScore) {
        setScore((prevScore) => prevScore + 10);
      }

      if (newRound >= 10) {
        setGameOver(true);
      } else {
        generateRandomEnglishLetter();
      }

      return newRound;
    });
  };

  const handleSinhalaNextRound = (addScore: boolean) => {
    setSinhalaRound((prev) => {
      const newRound = prev + 1;
      if (addScore) {
        setSinhalaScore((prevScore) => prevScore + 10);
      }

      if (newRound >= 10) {
        setSinhalaGameOver(true);
      } else {
        generateRandomSinhalaLetter();
      }

      return newRound;
    });
  };

  useEffect(() => {
    openCamera();
    generateRandomEnglishLetter();
    generateRandomSinhalaLetter();

    let interval: ReturnType<typeof setInterval>;
    if (activeTab === "1") {
      interval = setInterval(() => {
        captureAndPredict();
      }, 3000);
    } else if (activeTab === "2") {
      interval = setInterval(() => {
        captureAndPredictSinhala();
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [activeTab]);

  useEffect(() => {
    if (gameOver) {
      saveLetterScore(score, "English");
    }
  }, [gameOver]);

  useEffect(() => {
    if (sinhalaGameOver) {
      saveLetterScore(sinhalaScore, "Sinhala");
    }
  }, [sinhalaGameOver]);

  useEffect(() => {
    finalEnglishScoreRef.current = score;
  }, [score]);

  useEffect(() => {
    finalSinhalaScoreRef.current = sinhalaScore;
  }, [sinhalaScore]);


  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  useEffect(() => {
    if (gameOver && activeTab === "1") {
      stopCamera();
    }
  }, [gameOver, activeTab]);

  useEffect(() => {
    if (sinhalaGameOver && activeTab === "2") {
      stopCamera();
    }
  }, [sinhalaGameOver, activeTab]);


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

          <Select
            value={language}
            onChange={changeLanguage}
            style={{ width: 120, marginBottom: 10, marginLeft: 10 }}
          >
            <Select.Option value="en">English</Select.Option>
            <Select.Option value="si">සිංහල</Select.Option>
          </Select>
          
        </div>
        <div style={contentContainer}>
          <Tabs
            defaultActiveKey="1"
            centered
            onChange={(key) => setActiveTab(key)}
          >
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
                      onClick={handleEnglishSkip}
                      style={{ marginBottom: "20px" }}
                    >
                      {t("Skip")}
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

                    <div
                      style={{
                        position: "absolute",
                        top: 8,
                        left: 8,
                        zIndex: 10,
                        backgroundColor: "rgba(0,0,0,0.5)",
                        color: "white",
                        padding: "4px 10px",
                        borderRadius: 6,
                        fontWeight: "bold",
                        fontSize: 16,
                      }}
                    >
                      {t("Round")}: {round} / 10
                    </div>

                    {gameOver && (
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          backgroundColor: "rgba(54, 60, 123, 0.6)",
                          padding: "30px 50px",
                          borderRadius: "12px",
                          color: "#fff",
                          fontSize: "36px",
                          fontWeight: "bold",
                          zIndex: 2,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          textAlign: "center",
                        }}
                      >
                        {t("Activity Over")}
                        <br />
                        {t("Your Score")}: {finalEnglishScoreRef.current} / 100
                        <Button
                          type="primary"
                          onClick={handleEnglishRestart}
                          style={{
                            marginTop: "20px",
                            fontSize: "18px",
                            padding: "6px 20px",
                          }}
                        >
                          {t("Restart")}
                        </Button>
                      </div>
                    )}

                    {result && !gameOver && (
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
                      onClick={handleSinhalaSkip}
                      style={{ marginBottom: "20px" }}
                    >
                      {t("Skip")}
                    </Button>
                  </div>
                </div>

                {/* Right Side Content */}
                <div style={rightSideSinhala}>
                  <div style={{ ...videoContainer, position: "relative" }}>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      style={{ ...videoStyle, width: "100%", height: "100%" }}
                    ></video>

                    <div
                      style={{
                        position: "absolute",
                        top: 8,
                        left: 8,
                        zIndex: 10,
                        backgroundColor: "rgba(0,0,0,0.5)",
                        color: "white",
                        padding: "4px 10px",
                        borderRadius: 6,
                        fontWeight: "bold",
                        fontSize: 16,
                      }}
                    >
                      {t("Round")}: {sinhalaRound} / 10
                    </div>

                    {sinhalaGameOver && (
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          backgroundColor: "rgba(54, 123, 65, 0.6)",
                          padding: "30px 50px",
                          borderRadius: "12px",
                          color: "#fff",
                          fontSize: "36px",
                          fontWeight: "bold",
                          zIndex: 2,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          textAlign: "center",
                        }}
                      >
                        {t("Activity Over")}
                        <br />
                        {t("Your Score")}: {finalSinhalaScoreRef.current} / 100
                        <Button
                          type="primary"
                          onClick={handleSinhalaRestart}
                          style={{
                            marginTop: "20px",
                            fontSize: "18px",
                            padding: "6px 20px",
                          }}
                        >
                          {t("Restart")}
                        </Button>
                      </div>
                    )}

                    {sinhalaResult && !sinhalaGameOver && (
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
                        {sinhalaResult}
                      </div>
                    )}
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
