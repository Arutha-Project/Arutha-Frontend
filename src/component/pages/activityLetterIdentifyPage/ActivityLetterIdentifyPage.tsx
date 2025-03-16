import React, { useContext } from "react";
import { Layout, Button, Tabs, Select } from "antd";
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
  rightSideSinhala,
  selectorDiv
} from "./ActivityLetterIdentifyPageStyle";
import { MainLayout } from "../../templates";
import { LanguageContext } from "../../../context/LanguageContext";
import { useTranslation } from "react-i18next";

const { TabPane } = Tabs;

const ActivityLetterIdentifyPage: React.FC = () => {
  const { t } = useTranslation();
  const { language, changeLanguage } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <MainLayout>
      <Layout style={mainLayoutContainer}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", padding: "10px 20px" }}>
  
  {/* Back Button */}
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
        <div style={contentContainer}>
          <Tabs defaultActiveKey="1" centered>
            <TabPane tab={<span style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif", fontSize: "20px" }}>{t("EnglishActivity")}</span>} key="1">
              <div style={activitySection}>
                <div style={leftSideEnglish}>

                </div>

                <div style={rightSideEnglish}>

                </div>
              </div>
            </TabPane>

            {/* Sinhala Signing Activity */}
            <TabPane tab={<span style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif", fontSize: "20px" }}>{t("SinhalaActivity")}</span>} key="2">
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
