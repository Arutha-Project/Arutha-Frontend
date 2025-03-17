import React, { useRef, useState, useEffect } from "react";
import { Layout, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client"; // Socket.IO for real-time communication

// Import the styles
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
} from "./SinhalaLettersIdentifyPageStyle";

// Initialize Socket.IO connection
const socket = io("http://localhost:5000");

const SinhalaLettersIdentifyPage: React.FC = () => {
  const videoRef = useRef<any>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [predictedLetter, setPredictedLetter] = useState("");
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Start video capture
    const startVideo = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    };

    startVideo();

    // Handle incoming processed frames
    socket.on("processed_frame", (frameData: BlobPart) => {
      const img = new Image();
      img.src = URL.createObjectURL(new Blob([frameData]));
      img.onload = () => {
        if (canvasRef.current) {
          const ctx = canvasRef.current.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0);
          }
        }
      };
    });

    // Handle incoming predictions
    socket.on("predicted_letter", (letter: any) => {
      setPredictedLetter(letter);
    });

    return () => {
      socket.off("processed_frame");
      socket.off("predicted_letter");
    };
  }, []);

  const captureFrame = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      if (ctx) {
        ctx.drawImage(video, 0, 0);
      }

      // Capture the frame and send to the server
      canvas.toBlob((blob: Blob | null) => {
        if (blob) {
          const reader = new FileReader();
          reader.onloadend = () => {
            socket.emit("frame", reader.result);
          };
          reader.readAsArrayBuffer(blob);
        }
      });
    }
  };

  return (
    <Layout style={mainLayoutContainer}>
      <div style={{ padding: "10px", top: "20px", left: "20px" }}>
        <Button
          type="default"
          onClick={() => navigate("/sign-letters")}
          style={isHovered ? { ...backButton, ...backButtonHover } : backButton}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          ← Back
        </Button>
      </div>

      <div style={pageContainer}>
        {/* Left Side: Content with Video and Right Panel Inside */}
        <div style={contentContainer}>
          <div style={titleContainer}>
            <h1 style={titleStyle}>Sinhala Letters Signing Practice</h1>
          </div>

          <div style={contentInnerContainer}>
            <div style={videoContainer}>
              <video ref={videoRef} autoPlay muted />
              <canvas ref={canvasRef} style={{ display: "none" }} />
            </div>

            <div style={contentRightPanel}>
              <h2>Instructions</h2>
              <p>
                * Follow the signing instructions carefully and practice along.
              </p>
              <p
                style={{ fontSize: "36px", fontWeight: "bold", color: "green" }}
              >
                Predicted Letter:{" "}
                <span style={{ fontSize: "48px", color: "red" }}>
                  {predictedLetter}
                </span>
              </p>
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
            {/* <Button type="primary" onClick={openCamera}>
              Open Camera
            </Button>
            <Button type="primary" danger onClick={closeCamera}>
              Close Camera
            </Button> */}
            <Button type="default" onClick={captureFrame}>
              Capture Frame
            </Button>
          </div>
        </div>

        {/* Right Side: Side Panel */}
        <div style={sidePanel}>
          <img
            src="/src/assets/images/sinhala_letters.png"
            style={{ height: "850px", width: "100%" }}
            alt="Sinhala_Letters"
          />
        </div>
      </div>
    </Layout>
  );
};

export default SinhalaLettersIdentifyPage;
