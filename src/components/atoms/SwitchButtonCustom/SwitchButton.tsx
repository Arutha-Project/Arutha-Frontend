import React, { useState } from 'react';
import { Button as AntButton } from 'antd';
import { BaseButtonProps } from 'antd/es/button/button';
import { switchButtonContentStyle, switchButtonStyle } from './SwitchButtonStyle';

export interface SwitchButtonProps extends BaseButtonProps {
  text?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}

const SwitchButton: React.FC<SwitchButtonProps> = ({
  text,
  checked = false,
  disabled = false,
  onChange,
}) => {
  const handleButtonClick = () => {
    if (onChange) {
      onChange(!checked);
    }
  };

  return (
    <AntButton
      style={switchButtonStyle(checked, disabled)}
      onClick={handleButtonClick}
      disabled={disabled}
    >
      <span style={switchButtonContentStyle}>{text}</span>
    </AntButton>
  );
};

export default SwitchButton;
