// import React, { useRef, useState, useEffect } from "react";
// import { Layout, Button } from "antd";
// import { useNavigate } from "react-router-dom"; 
// import { 
//   mainLayoutContainer, 
//   contentContainer, 
//   backButton, 
//   backButtonHover, 
//   pageContainer, 
//   sidePanel,
//   contentInnerContainer, 
//   videoContainer, 
//   videoStyle,
//   titleContainer,
//   titleStyle,
//   contentRightPanel 
// } from "./EnglishLettersIdentifyPageStyle";

// import { MainLayout } from "../../templates";

// import englishLetters from "/src/assets/images/english_letters.png"; 


// const EnglishLettersIdentifyPage: React.FC = () => {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [stream, setStream] = useState<MediaStream | null>(null);
//   const navigate = useNavigate(); 
//   const [isHovered, setIsHovered] = useState(false); 

//   // Function to open the camera
//   const openCamera = async () => {
//     try {
//       const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
//       setStream(mediaStream);
//       if (videoRef.current) {
//         videoRef.current.srcObject = mediaStream;
//       }
//     } catch (error) {
//       console.error("Error accessing camera:", error);
//     }
//   };

//   // Function to close the camera
//   const closeCamera = () => {
//     if (stream) {
//       stream.getTracks().forEach((track) => track.stop());
//       setStream(null);
//     }
//     if (videoRef.current) {
//       videoRef.current.srcObject = null;
//     }
//   };

//   // Automatically open camera when component mounts
//   useEffect(() => {
//     openCamera(); // Open camera when component mounts

//     return () => {
//       closeCamera(); // Cleanup: close camera when component unmounts
//     };
//   }, []);
  

//   return (
//     <MainLayout>
//     <Layout style={mainLayoutContainer}>
//       {/* Back Button */}
//       <div style={{ padding: "10px", top: "20px", left: "20px" }}>
//         <Button
//           type="default"
//           onClick={() => navigate("/sign-letters")}
//           style={isHovered ? { ...backButton, ...backButtonHover } : backButton}
//           onMouseEnter={() => setIsHovered(true)}
//           onMouseLeave={() => setIsHovered(false)}
//         >
//           ← Back
//         </Button>
//       </div>

//       {/* Two-Column Layout */}
//       <div style={pageContainer}>

        
//         {/* Left Side: Content with Video and Right Panel Inside */}
//         <div style={contentContainer}>
          
//            <div style={titleContainer}>
//           <h1 style={titleStyle}>English Letters Signing Practice</h1>
//         </div>
        
//           {/* Two-Column Layout Inside Content Container */}
//           <div style={contentInnerContainer}>
//             {/* Left: Video */}
//             <div style={videoContainer}>
//               <video ref={videoRef} autoPlay playsInline style={videoStyle}></video>
//             </div>

//             {/* Right: White Background Panel */}
//             <div style={contentRightPanel}>
//               <h2>Instructions</h2>
//               <p>Follow the signing instructions carefully and practice along.</p>
//             </div>
//           </div>

//           {/* Camera Controls */}
//           <div style={{ marginTop: "10px", display: "flex", gap: "10px", justifyContent: "center" }}>
//             <Button type="primary" onClick={openCamera}>Open Camera</Button>
//             <Button type="primary" danger onClick={closeCamera}>Close Camera</Button>
//           </div>
//         </div>

//         {/* Right Side: Side Panel */}
//         <div style={sidePanel}>
//         <img src={englishLetters} style={{ height: "850px", width: "100%" }} alt="English_Letters" />
//         </div>
//       </div>
//     </Layout>
//     </MainLayout>
//   );
// };

// export default EnglishLettersIdentifyPage;



import React, { useRef, useState, useEffect } from "react";
import { Layout, Button } from "antd";
import { useNavigate } from "react-router-dom"; 
import { io } from "socket.io-client"; // Socket.IO for real-time communication
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
  contentRightPanel 
} from "./EnglishLettersIdentifyPageStyle";

import { MainLayout } from "../../templates";  // Assuming this is your main layout component

import englishLetters from "/src/assets/images/english_letters.png";  // Import your English letters image

// Initialize Socket.IO connection
const socket = io("http://localhost:5000");

const EnglishLettersIdentifyPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [predictedLetter, setPredictedLetter] = useState<string>("");
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

  // Automatically open camera when component mounts
  useEffect(() => {
    openCamera(); // Open camera when component mounts

    // Handle incoming predictions from backend
    socket.on("predicted_letter", (letter: string) => {
      setPredictedLetter(letter);  // Update predicted letter
    });

    return () => {
      closeCamera(); // Cleanup: close camera when component unmounts
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
      ctx?.drawImage(video, 0, 0); // Draw the current frame to the canvas

      // Capture the frame and send to the server
      canvas.toBlob((blob: Blob | null) => {
        if (blob) {
          const reader = new FileReader();
          reader.onloadend = () => {
            socket.emit("frame", reader.result); // Send the frame data to Flask backend
          };
          reader.readAsArrayBuffer(blob);  // Convert to ArrayBuffer
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
            <h1 style={titleStyle}>English Letters Signing Practice</h1>
          </div>

          <div style={contentInnerContainer}>
            <div style={videoContainer}>
              <video ref={videoRef} autoPlay muted />
              <canvas ref={canvasRef} style={{ display: "none" }} />
            </div>

            <div style={contentRightPanel}>
              <h2>Instructions</h2>
              <p>* Follow the signing instructions carefully and practice along.</p>
              <p style={{ fontSize: "36px", fontWeight: "bold", color: "green" }}>
                Predicted Letter:{" "}
                <span style={{ fontSize: "48px", color: "red" }}>
                  {predictedLetter}
                </span>
              </p>
            </div>
          </div>

          <div style={{ marginTop: "10px", display: "flex", gap: "10px", justifyContent: "center" }}>
            <Button type="default" onClick={captureFrame}>Capture Frame</Button>
          </div>
        </div>

        {/* Right Side: Side Panel */}
        <div style={sidePanel}>
          <img
            src={englishLetters}
            style={{ height: "850px", width: "100%" }}
            alt="English_Letters"
          />
        </div>
      </div>
    </Layout>
  );
};

export default EnglishLettersIdentifyPage;

