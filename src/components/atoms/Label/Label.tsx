import { Skeleton, Typography } from 'antd';
import { textStyle, titleStyle } from './LabelStyle';
import React from 'react';

export interface LabelProps {
  title: string;
  text?: string;
  style?: React.CSSProperties;
  isLoading?: boolean;
}

const Label: React.FC<LabelProps> = ({ title, text, style, isLoading = false }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', ...style }}>
      <Typography style={titleStyle}>{title}</Typography>
      {!isLoading && <Typography style={textStyle}>{text}</Typography>}
      {isLoading && <Skeleton.Button active block size={'small'} shape={'default'} style={{width:100}}/>}
    </div>
  );
};

export default Label;
