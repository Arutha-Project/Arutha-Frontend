import React, { useRef, useState, useEffect } from "react";
import { Layout, Button, Space, Col, Row } from "antd";
import {  contentContainer, mainLayoutContainer } from './NumbersIdentifyPageStyle';
import { Link } from "react-router-dom";
import { MainLayout } from "../../templates";
import { useTranslation } from "react-i18next";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const NumbersIdentifyPage: React.FC = () => {
  const [currentNumber, setCurrentNumber] = useState(0); // Start from 0
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const { t } = useTranslation();

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
    setResult(null);
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
  
    const blob = new Blob(recordedChunks, { type: "video/webm" });
    const formData = new FormData();
    formData.append("file", blob, "recording.webm");
    formData.append("expected_number", currentNumber.toString());
  
    // Dynamically select model_key based on currentNumber
    let modelKey = "";
    if (currentNumber >= 0 && currentNumber <= 10) modelKey = "0-10";
    else if (currentNumber >= 11 && currentNumber <= 20) modelKey = "11-20";
    else if (currentNumber >= 21 && currentNumber <= 30) modelKey = "21-30";
    else if (currentNumber >= 31 && currentNumber <= 40) modelKey = "31-40";
    else if (currentNumber >= 41 && currentNumber <= 50) modelKey = "41-50";
  
    formData.append("model_key", modelKey);
  
    try {
      const response = await fetch('http://127.0.0.1:2220/numbers/validate_number/', {
      // const response = await fetch("http://0.0.0.0:9090/numbers/validate_number/",  {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        const result = await response.json();
        setPrediction(result.predicted_number.toString());
        setResult(result.correct ? "✅ Correct!" : `❌ Wrong! The correct answer is ${currentNumber}`);
      } else {
        alert("Failed to upload video. Server returned: " + response.status);
      }
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("Error uploading video. See console for details.");
    } finally {
      setLoading(false);
    }
  };
  

  const nextNumber = () => {
    if (currentNumber < 50) {
      setCurrentNumber((prev) => prev + 1);
      setPrediction(null);
      setResult(null);
      setRecordedChunks([]);
      setStartTime(null);
      setEndTime(null);
      setDuration(null);
    }
  };

  const backNumber = () => {
    if (currentNumber > 0 && currentNumber < 50) {
      setCurrentNumber((prev) => prev - 1);
      setPrediction(null);
      setResult(null);
      setRecordedChunks([]);
      setStartTime(null);
      setEndTime(null);
      setDuration(null);
    }
  };

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
      <Space size="middle">
          <Link to="/numbers-Page">
            <Button type="primary" style={{width:200}}>{t("GoToSelfStudy")}</Button>
          </Link>
          <Link to="/numbers-Activity-Page">
            <Button type="primary"  style={{width:200}}>{t("GoToNumbersActivity")}</Button>
          </Link>
        </Space>
        <div style={contentContainer}>
          <h1>{t("NumberSigningPractice")}</h1>
          <h2>🔢 {t("SignThisNumber")} : {currentNumber}</h2>
          <Row gutter={16}>
            <Col span={12}>
              {/* Left Side - Camera */}
              <div style={{ flex: 1, textAlign: "center" }}>
                <video ref={videoRef} autoPlay playsInline style={{ width: "100%", maxWidth: "500px" }}></video>
                <p>🎥 {t("Press")} <b>{t("Space")}</b> {t("Start/StopRecording")}</p>
              </div>
            </Col>
            <Col span={12}>
              {/* Right Side - Results */}
              <div style={{ flex: 1, textAlign: "center" }}>
                <div style={{textAlign: "left" }}>
                  {startTime && <p><b>{t("StartTime")} :</b> {startTime.toLocaleTimeString()}</p>}
                  {endTime && <p><b>{t("EndTime")} :</b> {endTime.toLocaleTimeString()}</p>}
                  {duration !== null && <p><b>{t("Duration")} :</b> {duration.toFixed(1)} seconds</p>}
                </div>                
                {loading && <p>⏳ {t("Processing")}</p>}
                {prediction && !loading && <p>{t("YourAnswer")} : {prediction}</p>}
                {result && <p style={{ fontSize: "28px", fontWeight: "bold", color: result.includes("Correct") ? "green" : "red" }}>{result}</p>}
                <Space size="middle">
                  <Button color="cyan" variant="solid"  onClick={backNumber} disabled={currentNumber >= 50}><LeftOutlined />{t("PreviousNumber")}</Button>
                  <Button color="cyan" variant="solid" onClick={nextNumber} disabled={currentNumber >= 50}>{t("NextNumber")}<RightOutlined /></Button>
                </Space>
              </div>
            </Col>
          </Row>
        </div>
      </Layout>
    </MainLayout>
  );
};

export default NumbersIdentifyPage;
