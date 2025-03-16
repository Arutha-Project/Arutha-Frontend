import React from "react";
import { Layout, Button, Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import {
  mainLayoutContainer,
  backButton,
  backButtonHover,
  contentContainer,
  activitySection,
  leftSideEnglish,
  leftSideSinhala,
  rightSideEnglish,
  rightSideSinhala
} from "./ActivityLetterIdentifyPageStyle";
import { MainLayout } from "../../templates";

const { TabPane } = Tabs;

const ActivityLetterIdentifyPage: React.FC = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <MainLayout>
      <Layout style={mainLayoutContainer}>
        {/* Back Button */}
        <div style={{ padding: "10px" }}>
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
        <div style={contentContainer}>
          <Tabs defaultActiveKey="1" centered>
            <TabPane tab={<span style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif", fontSize: "20px" }}>English Signing Activity</span>} key="1">
              <div style={activitySection}>
                <div style={leftSideEnglish}>

                </div>

                <div style={rightSideEnglish}>

                </div>
              </div>
            </TabPane>

            {/* Sinhala Signing Activity */}
            <TabPane tab={<span style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif", fontSize: "20px" }}>Sinhala Signing Activity</span>} key="2">
              <div style={activitySection}>
                {/* Left Side Content */}
                <div style={leftSideSinhala}>

                </div>

                {/* Right Side Content */}
                <div style={rightSideSinhala}>

                </div>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </Layout>
    </MainLayout>
  );
};

export default ActivityLetterIdentifyPage;
