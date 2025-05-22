import React from 'react';
import { useTranslation } from 'react-i18next';
import { Layout, Card, Typography, Button } from 'antd';
import { motion } from 'framer-motion';
import { MainLayout } from '../../templates';
import { card, mainLayoutContainer } from './HomePageStyle';
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <MainLayout>
      <Layout style={mainLayoutContainer}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card style={card}>
          <img src="src/assets/images/arutha.png" style={{ width: "150px", margin: "20px auto", display: "block" }} />
            <Title level={2}>{t('homePageWelcome')}</Title>
            <Paragraph><b>{t('homePageDescription')}</b></Paragraph>
            <br></br>
            <Link to="/teacher-dashboard">
              <Button type="primary" style={{ width: 170 }}>
                Dashboard
              </Button>
            </Link>

            <Link to="/registration-student">
              <Button type="primary" style={{ marginLeft: 20, width: 170 }}>
                Register for Student
              </Button>
            </Link>
          </Card>
        </motion.div>
      </Layout>
    </MainLayout>
  );
};

export default HomePage;
