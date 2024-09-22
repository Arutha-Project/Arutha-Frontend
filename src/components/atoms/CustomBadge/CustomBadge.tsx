import React, { CSSProperties } from 'react';
import { valueContainer, valueStyle } from './CustomBadgeStyles';

export interface CustomBadgeProps {
  value: string | number;
  width: number | string;
  height: number | string;
  style: CSSProperties;
}

const CustomBadge: React.FC<CustomBadgeProps> = ({ value, style, width, height }) => {
  return (
    <div style={style}>
      <div style={valueContainer(width, height)}>
        <div style={valueStyle}>{value}</div>
      </div>
    </div>
  );
};

export default CustomBadge;
