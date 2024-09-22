import React, { ReactNode } from 'react';
import { Modal, Spin, Typography } from 'antd';
import { modalContainerStyle, modalHeaderStyle } from './CustomModalStyle';
import { CloseCircleOutlined } from '@ant-design/icons';
import './CustomModalStyle.scss';

export interface CustomModalProps {
  title: string;
  open: boolean;
  handleCancel: () => void;
  loading?: boolean;
  children?: ReactNode;
  size?: 'sm' | 'lg';
  handleAfterClose?: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({
  title,
  open,
  handleCancel,
  children,
  size,
  handleAfterClose,
  loading = false,
}) => {
  return (
    <Modal
      open={open}
      title={<Typography.Text style={modalHeaderStyle}>{title}</Typography.Text>}
      maskClosable={false}
      centered
      style={size === 'lg' ? modalContainerStyle : undefined}
      closeIcon={<CloseCircleOutlined />}
      onCancel={handleCancel}
      footer={[]}
      afterClose={handleAfterClose}
      destroyOnClose={true}
    >
      <Spin spinning={loading}>{children}</Spin>
    </Modal>
  );
};

export default CustomModal;
