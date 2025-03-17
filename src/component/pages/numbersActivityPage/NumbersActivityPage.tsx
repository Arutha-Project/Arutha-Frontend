import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Layout, Row } from 'antd';
import { contentContainer, mainLayoutContainer } from './NumbersActivityPageStyle';
import { MainLayout } from '../../templates';
import { useTranslation } from "react-i18next";

const NumbersActivityPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [equation, setEquation] = useState<string>('');
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
  const [prediction, setPrediction] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const { t } = useTranslation();

  const generateEquation = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const isAddition = Math.random() > 0.5;
  
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
    formData.append("correct_answer", correctAnswer.toString());

    try {
      const response = await fetch('http://127.0.0.1:2220/predict_answer/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setPrediction(result.predicted_number);
        if (result.is_correct) {
          setResultMessage(`✅ Correct! answer is ${correctAnswer}`);
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
        <div style={contentContainer}>

          <h1>{t("MathsActivity")}</h1>
            <Button type="primary" onClick={generateEquation}>Generate Equation</Button>
            {equation && <h2>{equation} = ?</h2>}
          <Row gutter={16}>
            <Col span={12}>
              {/* Left Side - Camera */}
              <div style={{ flex: 1, textAlign: "center" }}>
                <video ref={videoRef} autoPlay playsInline style={{ width: "100%", maxWidth: "500px" }}></video>
                <p>🎥 Press <b>Space</b> to Start/Stop Recording</p>
              </div>
            </Col>

            <Col span={12}>
              {/* Right Side - Results */}
              <div style={{ flex: 1, textAlign: "center" }}>
                <div style={{textAlign: "left" }}>
                  {startTime && <p><b>Start Time:</b> {startTime.toLocaleTimeString()}</p>}
                  {endTime && <p><b>End Time:</b> {endTime.toLocaleTimeString()}</p>}
                  {duration !== null && <p><b>Duration:</b> {duration.toFixed(1)} seconds</p>}
                </div>

                {loading && <p>⏳ {t("Processing")}</p>}
                {prediction && !loading && <p>Your Answer: {prediction}</p>}
                {resultMessage && <h2>{resultMessage}</h2>}
              </div>
            </Col>
          </Row>
        </div>
      </Layout>
    </MainLayout>
  );
};

export default NumbersActivityPage;
