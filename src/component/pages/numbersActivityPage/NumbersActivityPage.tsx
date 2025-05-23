import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Layout, Modal, Row } from 'antd';
import { contentContainer, mainLayoutContainer } from './NumbersActivityPageStyle';
import { MainLayout } from '../../templates';
import { useTranslation } from "react-i18next";
import axios from '../../../services/axiosInstance'; 
import { CheckCircleOutlined } from '@ant-design/icons';

const TOTAL_QUESTIONS = 10;

  const NumbersActivityPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [equation, setEquation] = useState<string>('');
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
  const [prediction, setPrediction] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isSavingScore, setIsSavingScore] = useState<boolean>(false);
  const [saveScoreError, setSaveScoreError] = useState<string | null>(null);
  const { t } = useTranslation();

  const generateEquation = () => {
    if (currentQuestion >= TOTAL_QUESTIONS) return;

    const num1 = Math.floor(Math.random() * 25) + 1;
    const num2 = Math.floor(Math.random() * 25) + 1;
    const isAddition = Math.random() > 0.5;
    const currnetUser = localStorage.getItem('userDetails');
  
    if (!isAddition && num1 < num2) {
      generateEquation();
      return;
    }
  
    const equationText = isAddition ? `${num1} + ${num2}` : `${num1} - ${num2}`;
    setEquation(equationText);
    setCorrectAnswer(isAddition ? num1 + num2 : num1 - num2);
    setResultMessage(null);
  };

  useEffect(() => {
    const openCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };
    openCamera();
  }, []);

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const startRecording = () => {
    if (!videoRef.current || isRecording) return;
    setRecordedChunks([]);
    setPrediction(null);
    setStartTime(new Date());
    setEndTime(null);
    setDuration(null);
    
    const stream = videoRef.current.srcObject as MediaStream;
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setRecordedChunks([event.data]);
      }
    };

    mediaRecorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      const end = new Date();
      setEndTime(end);
      if (startTime) {
        const totalDuration = (end.getTime() - startTime.getTime()) / 1000;
        setDuration(Number(totalDuration.toFixed(1)));
      }
    }
  };

  useEffect(() => {
    if (recordedChunks.length > 0) {
      submitVideo();
    }
  }, [recordedChunks]);

  const submitVideo = async () => {
    setLoading(true);
    if (recordedChunks.length === 0 || correctAnswer === null) return;
  
    const blob = new Blob(recordedChunks, { type: "video/webm" });
    const formData = new FormData();
    formData.append("file", blob, "recording.webm");
    formData.append("expected_number", correctAnswer.toString());
  
    let modelKey = "";
    if (correctAnswer >= 0 && correctAnswer <= 10) modelKey = "0-10";
    else if (correctAnswer >= 11 && correctAnswer <= 20) modelKey = "11-20";
    else if (correctAnswer >= 21 && correctAnswer <= 30) modelKey = "21-30";
    else if (correctAnswer >= 31 && correctAnswer <= 40) modelKey = "31-40";
    else if (correctAnswer >= 41 && correctAnswer <= 50) modelKey = "41-50";
  
    formData.append("model_key", modelKey);
  
    try {
      const response = await fetch("http://0.0.0.0:9090/numbers/validate_number/",  {
        // const response = await fetch('http://127.0.0.1:2220/numbers/validate_number/',  {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const result = await response.json();
        setPrediction(result.predicted_number);
  
        if (result.correct) {
          if (currentQuestion < TOTAL_QUESTIONS - 1) {
            setScore(score + 1);
          }
          setResultMessage(`✅ Correct! Answer is ${correctAnswer}`);
        } else {
          setResultMessage(`❌ Wrong! The correct answer is ${correctAnswer}`);
        }
      } else {
        alert('Failed to upload video');
      }
    } catch (error) {
      console.error('Error uploading video:', error);
    } finally {
      setLoading(false);
      setTimeout(() => {
        if (currentQuestion < TOTAL_QUESTIONS - 1) {
          setCurrentQuestion(currentQuestion + 1);
          generateEquation();
        } else {
          setIsModalVisible(true); 
        }
      }, 1000);
    }
  };  

  // save the user's score to the database
  const saveUserScore = async () => {
    try {
      setIsSavingScore(true);
      setSaveScoreError(null);
      
      const userDetailsStr = localStorage.getItem('userDetails');
      // console.log("User details from localStorage:", userDetailsStr);
      
      let userId = null; 
      if (userDetailsStr) {
        try {
          const userDetails = JSON.parse(userDetailsStr);
          userId = userDetails.id || userDetails.userId;
        } catch (e) {
          console.error("Failed to parse user details:", e);
        }
      }

      const response = await axios.post('/scores/save', {
        userId: userId,
        score: score
      });
      
      console.log("Score saved successfully:", response.data);
    } catch (error) {
      console.error("Error saving score:", error);
      setSaveScoreError("Failed to save score. Please try again.");
    } finally {
      setIsSavingScore(false);
    }
  };

  const resetPage = () => {
    setScore(0);
    setCurrentQuestion(0);
    setRecordedChunks([]);
    setIsRecording(false);
  };

  useEffect(() => {
    generateEquation();
  }, [currentQuestion]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault();
        toggleRecording();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isRecording]);

  return (
    <MainLayout>
      <Layout style={mainLayoutContainer}>
        <div style={contentContainer}>
          <h1>{t("MathsActivity")}</h1>
          <h2>{t("Question")} {currentQuestion + 1} / {TOTAL_QUESTIONS}</h2>
          <h2>{equation} = ?</h2>
          <Row gutter={16}>
            <Col span={12}>
              <div style={{ textAlign: "center" }}>
                <video ref={videoRef} autoPlay playsInline style={{ width: "100%", maxWidth: "500px" }}></video>
                <p>🎥 {t("Press")} <b>{t("Space")}</b> {t("Start/StopRecording")}</p>
              </div>
              <Button
                type="primary"
                onClick={toggleRecording}
                loading={loading}
                style={{ marginTop: 16, backgroundColor: isRecording ? '#ff4d4f' : '#2e6ae3' }}
              >
                {isRecording ? t("StopRecording") : t("startRecoding")}
              </Button>
            </Col>
            <Col span={12}>
              <div style={{ flex: 1, textAlign: "center" }}>
                <div style={{ textAlign: "left" }}>
                  {startTime && <p><b>{t("StartTime")} :</b> {startTime.toLocaleTimeString()}</p>}
                  {endTime && <p><b>{t("EndTime")} :</b> {endTime.toLocaleTimeString()}</p>}
                  {duration !== null && <p><b>{t("Duration")} :</b> {duration.toFixed(1)} seconds</p>}
                </div>
                <div style={contentContainer}>
                  {loading && <p>⏳ {t("Processing")}</p>}
                  {prediction !== null && !loading && <p>{t("YourAnswer")}: {prediction}</p>}
                  {resultMessage && (
                    <p style={{ fontSize: "20px", fontWeight: "bold", color: resultMessage.includes("Correct") ? "green" : "red" }}>
                      {resultMessage}
                    </p>
                  )}
                  <h3>{t("Score")}: {score} / {TOTAL_QUESTIONS}</h3>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        {/* Final Score Modal */}
        <Modal
          title={
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                {t("ActivityCompleted")}
              </div>
              <CheckCircleOutlined style={{ color: "green", fontSize: "75px", marginTop: 8 }} />
            </div>
          }
          visible={isModalVisible}
           footer={[
            <Button
              key="continue"
              type="primary"
              onClick={() => {
                saveUserScore(); 
                resetPage(); 
                setIsModalVisible(false);  
              }}
            >
              {t("Continue")}
            </Button>
          ]}
          closable={false}
          centered
        >
          <div style={{ textAlign: "center" }}>
            <p>{t("YourFinalScoreIs")} : {score} / {TOTAL_QUESTIONS}</p>
          </div>
        </Modal>
      </Layout>
    </MainLayout>
  );
};

export default NumbersActivityPage;
