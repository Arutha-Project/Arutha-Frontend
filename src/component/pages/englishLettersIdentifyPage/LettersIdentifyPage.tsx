import React, { useRef, useState } from "react";
import { Layout, Tabs, Button } from "antd";
import { VideoCameraOutlined, PlayCircleOutlined, ExperimentOutlined } from "@ant-design/icons";
import { mainLayoutContainer, contentContainer, titleStyle, tabContainer, tabContent, videoContainer } from "./LettersIdentifyPageStyle";

const { Content } = Layout;
const { TabPane } = Tabs;

const LettersIdentifyPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

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

  const closeCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  return (
    <Layout style={mainLayoutContainer}>
      
    </Layout>
  );
};

export default LettersIdentifyPage;
