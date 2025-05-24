
import React from 'react';
import { Col, Row, Typography } from 'antd';
import { buttonDivStyle, buttonStyle, messageStyle, titleContainer, titleStyle } from './NotFoundPageStyle';
import { ArrowCircleLeft, NoteRemove } from 'iconsax-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../atoms';

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Row gutter={16}>
      <Col span={24} style={titleContainer}>
        <NoteRemove size="120" color="#FF8A65" />
        <Typography.Title style={titleStyle} level={1}>
          {t('Page Not Found 404')}
        </Typography.Title>
      </Col>
      <Col span={24} style={messageStyle}>
        <Typography.Text>{t("Sorry, the page you're looking for doesn't exist")}</Typography.Text>
      </Col>
      <Col span={24} style={messageStyle}>
        <Typography.Text>{t("Please check the URL or return to the homepage")}</Typography.Text>
      </Col>
      <Col span={24} style={messageStyle}>
        <Typography.Text>{t("Thank you for your understanding!")}</Typography.Text>
      </Col>
      <Col span={24} style={buttonDivStyle}>
        <Button
          style={buttonStyle}
          type="primary"
          icon={<ArrowCircleLeft
            size="32"
            color="#FF8A65"
          />}
          text={t("Go to Home")}
          handleOnClick={() => window.location.href = '/'}
        />
      </Col>
    </Row>
  );
};

export default NotFoundPage;
