import React, { useRef, useState, useEffect } from "react";
import { Layout, Button } from "antd";
import { useNavigate } from "react-router-dom"; 
import { 
  mainLayoutContainer, 
  backButton, 
  backButtonHover, 
} from "./ActivityLetterIdentifyPageStyle";

import englishLetters from "/src/assets/images/english_letters.png"; 


const ActivityLetterIdentifyPage: React.FC = () => {
  const navigate = useNavigate(); 
  const [isHovered, setIsHovered] = useState(false); 



  return (
    <Layout style={mainLayoutContainer}>
      {/* Back Button */}
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

     
    </Layout>
  );
};

export default ActivityLetterIdentifyPage;
