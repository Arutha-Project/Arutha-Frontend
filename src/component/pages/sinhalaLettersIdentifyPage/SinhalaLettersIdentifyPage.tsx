import React, { useRef, useState, useEffect, useContext } from "react";
import { Layout, Button, Select } from "antd";
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

const SinhalaLettersIdentifyPage: React.FC = () => {
  const { t } = useTranslation();
  const { language, changeLanguage } = useContext(LanguageContext);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  // Function to open the camera
  const openCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
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
  useEffect(() => {
    openCamera();

    return () => {
      closeCamera();
    };
  }, []);


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
              <video ref={videoRef} autoPlay playsInline style={videoStyle}></video>
            </div>

            {/* Right: White Background Panel */}
            <div style={contentRightPanel}>
              <h2>Instructions</h2>
              <p>Follow the signing instructions carefully and practice along.</p>
            </div>
          </div>

          {/* Camera Controls */}
          <div style={{ marginTop: "10px", display: "flex", gap: "10px", justifyContent: "center" }}>
            <Button type="primary" onClick={openCamera}>{t("OpenCamera")}</Button>
            <Button type="primary" danger onClick={closeCamera}>{t("CloseCamera")}</Button>
          </div>
        </div>

        {/* Right Side: Side Panel */}
        <div style={sidePanel}>
          <img src={sinhalaLetters} style={{ height: "850px", width: "100%" }} alt="Sinhala_Letters" />
        </div>
      </div>
    </Layout>
    </MainLayout>
  );
};

export default SinhalaLettersIdentifyPage;
