import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../../../context/LanguageContext';
import { Layout, Select, Card, Typography } from 'antd';
import { motion } from 'framer-motion';
import { MainLayout } from '../../templates';
import { card, mainLayoutContainer, selectorDiv } from './HomePageStyle';

const { Title, Paragraph } = Typography;

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const { language, changeLanguage } = useContext(LanguageContext);

  return (
    <MainLayout>
      <Layout style={mainLayoutContainer}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card style={card}>
          <img src="src/assets/images/arutha.png" style={{ width: "150px", margin: "20px auto", display: "block" }} />
            <Title level={2}>{t('homePageWelcome')}</Title>
            <Paragraph><b>{t('homePageDescription')}</b></Paragraph>
            <br></br>
            <Select value={language} onChange={changeLanguage} style={selectorDiv}>
              <Select.Option value="en">English</Select.Option>
              <Select.Option value="si">සිංහල</Select.Option>
            </Select>
          
          </Card>
        </motion.div>
      </Layout>
    </MainLayout>
  );
};

export default HomePage;
