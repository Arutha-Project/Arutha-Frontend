import React, { useRef, useState, useEffect } from 'react';
import { uploadVideo } from '../../../services';
import { t } from 'i18next';
import { Layout, Select } from 'antd';
import { LanguageContext } from '../../../context/LanguageContext';
import { nextButtonStyle, startButtonStyle, videoStyle, Container1, mainLayoutContainerOI, leftShowingData, processingGif, startButtonDevTagStyle, startRecordingButtonStyle, startRecordingButtonDisabledStyle, stopButtonStyle, stopButtonDisabledStyle } from '../objectIdentifierPage/objectIdentifierPageStyle';
import { MainLayout } from '../../templates';

const ObjectIdentifierPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showRecordingDetails, setShowRecordingDetails] = useState<boolean>(false);
  const [recordingEnabled, setRecordingEnabled] = useState<boolean>(false);
  const [randomName, setRandomName] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const intervalRef = useRef<number | null>(null);
  const [category, setCategory] = useState<string | null>(null);

  const { language, changeLanguage } = React.useContext(LanguageContext);

  const [categories, setCategories] = useState<{
    shapes: string[];
    animals: string[];
    fruits: string[];
  }>({
    shapes: [],
    animals: [],
    fruits: [],
  });

  useEffect(() => {
    setCategories({
      shapes: language === 'si' ? ["වෘත්තය", "සෘජුකෝණාස්‍රය", "සමචතුරස්‍රය", "ත්‍රිකෝණය"] : ["circle", "rectangle", "square", "triangle"],
        
      animals: language === 'si' ? ["අලියා", "පූසා1", "පූසා2", "බල්ලා1", "බල්ලා2", "ගිරවා",  "සමනලයා"] : ["elephant", "cat1", "cat2", "dog1", "dog2", "Parrot", "butterfly"],
  
      fruits: language === 'si' ? ["ඇපල්", "කෙසෙල්1", "කෙසෙල්2", "අඹ", "අන්නාසි"] : ["apple", "banana1", "banana2", "Mango", "Pineapple"]
    });
  }, [language]);

  type CategoryType = keyof typeof categories;


  const selectCategory = (selectedCategory: CategoryType) => {
    setCategory(selectedCategory);
    setShowRecordingDetails(true);
    setRecordingEnabled(true);
    
    const items = categories[selectedCategory];
    setRandomName(items[Math.floor(Math.random() * items.length)]);
  };

  const openCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      const mediaRecorder = new MediaRecorder(mediaStream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks((prev) => [...prev, event.data]);
        }
      };
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  useEffect(() => {
    openCamera();
  }, []);

  const startRecording = () => {
    if (!mediaRecorderRef.current || isRecording || !recordingEnabled) return;

    setRecordedChunks([]);
    setStartTime(new Date());
    setEndTime(null);
    setDuration(null);
    setElapsedTime(0);
    setPrediction(null);
    setLoading(false);

    mediaRecorderRef.current.start();
    setIsRecording(true);

    // Start stopwatch
    intervalRef.current = window.setInterval(() => {
      setElapsedTime((prev) => Number((prev + 0.1).toFixed(1)));
    }, 100);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      const end = new Date();
      setEndTime(end);
      if (startTime) {
        const totalDuration = (end.getTime() - startTime.getTime()) / 1000;
        setDuration(Number(totalDuration.toFixed(1)));
        setElapsedTime(Number(totalDuration.toFixed(1)));
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

    const recordedVideo = document.createElement("video");
    recordedVideo.src = URL.createObjectURL(new Blob(recordedChunks, { type: "video/webm" }));
    recordedVideo.style.transform = "scaleX(-1)"; 

    uploadVideo(recordedChunks)
      .then(prediction => {
        setPrediction(prediction);
        if (randomName) {
          setResult(t(prediction) === randomName ? t("Correct") : t("Incorrect"));
        }
      })
      .catch(error => {
        console.error('Error uploading video:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };


  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === 'Space' && recordingEnabled) {
      event.preventDefault();
      isRecording ? stopRecording() : startRecording();
    }
  };

  const startNewRound = () => {
    setShowRecordingDetails(false);
    setRecordingEnabled(false);
    setIsRecording(false);
    setRecordedChunks([]);
    setStartTime(null);
    setEndTime(null);
    setDuration(null);
    setPrediction(null);
    setResult(null);
    if (category) {
      const selectedItems = categories[category as keyof typeof categories];
      setRandomName(selectedItems[Math.floor(Math.random() * selectedItems.length)]);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isRecording, recordingEnabled]);

  return (
    <div>
      <MainLayout>
      <Layout style={mainLayoutContainerOI}>
        <Select value={language} onChange={changeLanguage} style={{ width: 120, marginBottom: 10 }}>
          <Select.Option value="en">English</Select.Option>
          <Select.Option value="si">සිංහල</Select.Option>
        </Select>

        <div style={Container1}>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              style={videoStyle}></video>

            <div style={{ marginTop: '15px' }}>
              <button
                onClick={startRecording}
                disabled={!recordingEnabled || isRecording}
                style={!recordingEnabled || isRecording ? startRecordingButtonDisabledStyle : startRecordingButtonStyle}
              >
                {t("startRecoding")}
              </button>

              <button
                onClick={stopRecording}
                disabled={!recordingEnabled || !isRecording}
                style={!recordingEnabled || !isRecording ? stopButtonDisabledStyle : stopButtonStyle}
              >
                {t("StopRecording")}
              </button>
            </div>
          </div>

          <div style={{ flex: 1, textAlign: 'left' }}>
            {!showRecordingDetails ? (
              <div style={startButtonDevTagStyle}>

                <button onClick={() => selectCategory('shapes')} style={startButtonStyle}>{t("Shapes")}</button>
                <button onClick={() => selectCategory('animals')} style={startButtonStyle}>{t("Animals")}</button>
                <button onClick={() => selectCategory('fruits')} style={startButtonStyle}>{t("Fruits")}</button>

                <p style={{ marginTop: '20px', fontSize: '16px' }}>
                  🎥 {t("Press")} <b>{t("Space")}</b> {t("Start/StopRecording")}
                </p>

              </div>
            ) : (
              <>
                <div style={leftShowingData}>
                  {randomName && (
                    <p>🌟 <b>{t("RandomName")}:</b> {randomName}</p>
                  )}

                  {startTime && <p>📍 <b>{t("StartTime")}:</b> {startTime.toLocaleTimeString()}</p>}

                  {endTime && <p>🛑 <b>{t("EndTime")}:</b> {endTime.toLocaleTimeString()}</p>}

                  {isRecording ? (
                    <p>⏳ <b>{t("Duration")}:</b> {elapsedTime.toFixed(1)} {t("seconds")}</p>
                  ) : duration !== null && (
                    <p>⏳ <b>{t("Duration")}:</b> {duration.toFixed(1)} {t("seconds")}</p>
                  )}

                  {loading && (
                    <div style={processingGif}>
                      ⏳ {t("Processing")}
                    </div>
                  )}
                </div>

                {prediction && !loading && (
                  <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <p style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>
                      🔍 <b>{t("PredictedSign")}:</b> {t(prediction)}
                    </p>
                    <p style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "50px", color: t(prediction) == randomName ? "green" : "red" }}>
                      {result}
                    </p>
                  </div>
                )}

                <div style={{ marginTop: '20px', textAlign: 'center', }}>
                  <button
                    onClick={startNewRound}
                    style={nextButtonStyle}
                  >
                    {t("Next")}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </Layout>
      </MainLayout>
    </div>
  );
};

export default ObjectIdentifierPage;
