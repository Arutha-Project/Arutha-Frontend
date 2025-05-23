import React, { useState } from 'react';
import { Card, Form, Input, Typography, Button, message, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgotPasswordPage: React.FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');

  const API_URL = 'http://localhost:8080/api';

  const handleSubmit = async (values: { email: string }) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/password/forgot`, {
        email: values.email,
      });

      const { exists, email: responseEmail } = response.data;

      if (exists) {
        setEmail(responseEmail);
        setIsModalVisible(true);
      } else {
        message.error(t('email_not_found'));
      }
    } catch (error: any) {
      message.error(t('email_not_found'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirm = () => {
    setIsModalVisible(false);
    // message.success(t('password_reset_email_sent') || 'Password reset email sent!');
    form.resetFields();
    navigate('/reset-password', { state: { email } });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    navigate('/');
  };

  return (
    <>
      <Card style={{ maxWidth: 400, margin: 'auto', marginTop: 100 }}>
        <Typography.Title level={4} style={{ textAlign: 'center' }}>
          {t('forgot_password_title') || 'Forgot Password'}
        </Typography.Title>
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type: 'email',
                message: t('email_required') || 'Enter a valid email.',
              },
            ]}
          >
            <Input placeholder={t('email_placeholder') || 'Enter your email'} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={isLoading}>
              {t('submit')}
            </Button>
          </Form.Item>

          <Form.Item>
            <Button block onClick={() => navigate('/')}>
              {t('back')}
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Modal
        title={t('email_found')}
        open={isModalVisible}
        onOk={handleConfirm}
        onCancel={handleCancel}
        okText={t('confirm')}
        cancelText={t('cancel')}
      >
        <p>
          {t('We_found_your_email')}
        </p>
      </Modal>
    </>
  );
};

export default ForgotPasswordPage;
