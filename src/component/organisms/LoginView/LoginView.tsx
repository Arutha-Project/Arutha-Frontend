import React, { useContext } from 'react';
import { Card, Col, Form, Input, Row, Spin, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../../../context/LanguageContext';
import { cardStyle, inputFieldStyle, submitButtonStyle } from './LoginViewStyle';
import { useNavigate } from 'react-router-dom';
import Button from '../../atoms/Button';
import { Link } from 'react-router-dom';

interface LoginViewProps {
  onFinish: (values: any) => void;
  isLoading?: boolean;
}

const LoginView: React.FC<LoginViewProps> = ({ onFinish, isLoading }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { language, changeLanguage } = useContext(LanguageContext);


  const onclick = () => {
    form.validateFields().then((values) => {
      onFinish(values);
    }
    ).catch((errorInfo) => {
      console.error('Validation failed:', errorInfo);
    }
    );
  };

  return (
    <Card style={cardStyle}>
      <Spin spinning={isLoading} tip={t("loading")}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <Button
            type="link"
            text="English"
            style={{
              color: language === 'en' ? 'green' : undefined,
              fontWeight: language === 'en' ? 'bold' : undefined,
              width: 100,
            }}
            handleOnClick={() => changeLanguage('en')}
          />
          <Button
            type="link"
            text="සිංහල"
            style={{
              color: language === 'si' ? 'green' : undefined,
              fontWeight: language === 'si' ? 'bold' : undefined,
              width: 100,
            }}
            handleOnClick={() => changeLanguage('si')}
          />
        </div>
        <img src="src/assets/images/arutha.png" style={{ width: "150px", margin: "0px auto", display: "block" }} />
        <Typography.Title
          level={4}
          style={{ textAlign: "center", marginBottom: 20, marginTop: 0 }}
        >
          {t("welcome")}
        </Typography.Title>

        <Form form={form} onFinish={onFinish}>
          <Row>

            <Col span={24}>
              <Form.Item name="email" rules={[{ required: true, type: 'email', message: t("email_required") }]}>
                <Input style={inputFieldStyle} placeholder={t("email_placeholder")} />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item name="password" rules={[{ required: true, message: t("password_required") }]}>
                <Input style={inputFieldStyle} placeholder={t("password_placeholder")} type="password" />
              </Form.Item>
            </Col>

            <Col span={24} style={{ textAlign: 'right', marginBottom: 10 }}>
              <Typography.Link onClick={() => navigate('/ForgotPassword')}>
                {t('forgot_password')}
              </Typography.Link>
            </Col>

            <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
              <Form.Item>
                <Button
                  type="primary"
                  text={t("signin")}
                  style={{ ...submitButtonStyle, width: 200, height: 40 }}
                  handleOnClick={onclick}
                />
              </Form.Item>
            </Col>
            <Link to="/registration-teacher">Register for Teachers</Link>
          </Row>
        </Form>
      </Spin>
    </Card>
  );
};

export default LoginView;
