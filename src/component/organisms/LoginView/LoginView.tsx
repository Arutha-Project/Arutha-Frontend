import React from 'react';
import { Card, Col, Form, Input, Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { cardStyle, inputFieldStyle, submitButtonStyle } from './LoginViewStyle';
import Button from '../../atoms/Button';
import { Link } from 'react-router-dom';

interface LoginViewProps {
  onFinish: (values: any) => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onFinish }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

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
          <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
            <Form.Item>
              <Button type="primary" text={t("signin")} style={submitButtonStyle}
                handleOnClick={onclick} />
            </Form.Item>
          </Col>
          <Link to="/registration-teacher">Register for Teachers</Link>
        </Row>
      </Form>
    </Card>
  );
};

export default LoginView;
