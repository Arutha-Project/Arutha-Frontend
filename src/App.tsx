import { ConfigProvider, ThemeConfig } from "antd";
import Router from "./router/Router";
import { Provider } from "react-redux";
import { store } from "./reduxToolkit/store";
import { LanguageProvider } from "./context/LanguageContext";

import { io } from 'socket.io-client';
import { useEffect, useRef, useState } from "react";
const socket = io('http://localhost:5000');  // Connect to Flask backend

function App() {
  const customTheme: ThemeConfig = {
    token: {
      fontFamily: "Poppins, sans-serif",
    },

    components: {
      Typography: {
        fontFamily: "Poppins, sans-serif",
      },
      Input: {
        fontSize: 18,
        lineHeight: 2.3,

      },
    },
  };

  const videoRef = useRef<any>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [predictedLetter, setPredictedLetter] = useState('');

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
    socket.on('processed_frame', (frameData: BlobPart) => {
      const img = new Image();
      img.src = URL.createObjectURL(new Blob([frameData]));
      img.onload = () => {
        if (canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0);
          }
        }
      };
    });

    // Handle incoming predictions
    socket.on('predicted_letter', (letter: any) => {
      setPredictedLetter(letter);
    });

    return () => {
      socket.off('processed_frame');
      socket.off('predicted_letter');
    };
  }, []);

  const captureFrame = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
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
            socket.emit('frame', reader.result);
          };
          reader.readAsArrayBuffer(blob);
        }
      });
    }
  };

  return (
    <div>
      <h1>Sign Language Recognition</h1>
      <video ref={videoRef} autoPlay muted />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <button onClick={captureFrame}>Capture Frame</button>
      <p>Predicted Letter: {predictedLetter}</p>
    </div>
  );

  //return (
    // <Provider store={store}>
    //   <LanguageProvider>
    //     <ConfigProvider theme={customTheme}>
    //       <Router />
    //     </ConfigProvider>
    //   </LanguageProvider>
    // </Provider>
  //);
}

export default App;
