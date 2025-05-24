import React, { useContext } from "react";
import { Layout, Select } from "antd";
import { useNavigate } from "react-router-dom";
import {
  mainLayoutContainer,
  cardContainer,
  englishCard,
  sinhalaCard,
  activitiesCard,
  cardText,
  cardImage,
  overlayContainer,
  languageSelector,
  selectorDiv
} from "./LettersIdentifyPageStyle";
import { MainLayout } from "../../templates";

import englishImg from "/src/assets/images/english_sign.png";
import sinhalaImg from "/src/assets/images/sinhala_sign.png";
import activitiesImg from "/src/assets/images/activities.png";
import arutheImg from "/src/assets/images/arutha.png";
import { LanguageContext } from "../../../context/LanguageContext";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";


const splitText = (text: string) => {
  return text.split("").map((char, index) => (
    <motion.span
      key={index}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.1,
        type: "spring",
        stiffness: 120,
        damping: 25,
      }}
      style={{ display: "inline-block" }}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  ));
};

const LettersIdentifyPage: React.FC = () => {
  const { t } = useTranslation();
  const { language, changeLanguage } = useContext(LanguageContext);
  const navigate = useNavigate();

  return (
    <MainLayout>

      <Layout style={mainLayoutContainer}>
        <div style={languageSelector}>
          <Select value={language} onChange={changeLanguage} style={selectorDiv}>
            <Select.Option value="en">English</Select.Option>
            <Select.Option value="si">සිංහල</Select.Option>
          </Select>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "10px",
            marginTop: "70px",
          }}
        >


          <motion.img
            src={arutheImg}
            alt="Arutha Icon"
            style={{ marginRight: "15px", width: "200px", height: "200px" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          />
          <h1 style={{ fontSize: "45px", color: "#164673", fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>{splitText(t("SignLettersPractice"))}</h1>
        </div>

        <div style={cardContainer}>

          <div style={{ backgroundColor: "black", borderRadius: "15px", padding: "20px" }}>
            <motion.div
              style={englishCard}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate("/english-signing")}
            >
              <div style={overlayContainer}></div>
              <img src={englishImg} alt="English Signing" style={cardImage} />
              <p style={cardText}>{t("EnglishSigningPractice")}</p>
            </motion.div>
          </div>


          <div style={{ backgroundColor: "black", borderRadius: "15px", padding: "20px" }}>
            <motion.div
              style={sinhalaCard}
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate("/sinhala-signing")}
            >
              <div style={overlayContainer}></div>
              <img src={sinhalaImg} alt="Sinhala Signing" style={cardImage} />
              <p style={cardText}>{t("SinhalaSigningPractice")}</p>
            </motion.div>
          </div>

          <div style={{ backgroundColor: "black", borderRadius: "15px", padding: "30px" }}>
            <motion.div
              style={activitiesCard}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate("/letter-identify-activities")}
            >
              <div style={overlayContainer}></div>
              <img src={activitiesImg} alt="Activities" style={cardImage} />
              <p style={cardText}>{t("Activities")}</p>
            </motion.div>
          </div>
        </div>


      </Layout>
    </MainLayout>
  );
};

export default LettersIdentifyPage;
