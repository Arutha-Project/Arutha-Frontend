import React, { useState } from 'react';
import { Card, Form, Input, Typography, Button, message, Result } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const ResetPasswordPage: React.FC = () => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const email = (location.state as { email?: string })?.email || '';

    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

    const API_URL = 'http://localhost:8080/api';

    const handleSubmit = async (values: { password: string; confirmPassword: string }) => {
        if (values.password !== values.confirmPassword) {
            message.error(t('passwords_dont_match'));
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.post(`${API_URL}/password/reset`, {
                password: values.password,
                email: email,
            });

            if (response.data.success) {
                setIsSuccess(true);
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            }
        } catch (error: any) {
            if (error.response?.data?.message) {
                message.error(error.response.data.message);
            } else {
                message.error(t('reset_password_failed') || 'Failed to reset password. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <Card style={{ maxWidth: 400, margin: 'auto', marginTop: 100 }}>
                <Result
                    status="success"
                    title={t('password_reset_success')}
                    subTitle={t('redirect_message')}
                    extra={
                        <Button type="primary" onClick={() => navigate('/login')}>
                            {t('go_to_login')}
                        </Button>
                    }
                />
            </Card>
        );
    }

    return (
        <Card style={{ maxWidth: 400, margin: 'auto', marginTop: 100 }}>
            <Typography.Title level={4} style={{ textAlign: 'center' }}>
                {t('reset_password_title')}
            </Typography.Title>

            <Form form={form} onFinish={handleSubmit}>
                <Form.Item
                    label={t('email')}
                    name="email"
                    initialValue={email} 
                >
                    <Input disabled />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: t('password_required_1'),
                        },
                        {
                            pattern: passwordRegex,
                            message: t('password_strength'),
                        },
                    ]}
                >
                    <Input.Password placeholder={t('new_password')} />
                </Form.Item>

                <Form.Item
                    name="confirmPassword"
                    dependencies={['password']}
                    rules={[
                        {
                            required: true,
                            message: t('confirm_password_required'),
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error(t('passwords_dont_match')));
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder={t('confirm_password')} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block loading={isLoading}>
                        {t('reset_password')}
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default ResetPasswordPage;
