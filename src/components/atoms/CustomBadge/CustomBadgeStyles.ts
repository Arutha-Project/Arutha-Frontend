import React from 'react';
import { Color, getThemeColor } from '@theme';

export const valueContainer = (
  width: number | string,
  height: number | string
): React.CSSProperties => {
  return {
    borderRadius: 180,
    borderWidth: 2,
    backgroundColor: '#223645',
    width,
    height,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
};

export const valueStyle: React.CSSProperties = {
  fontSize: 12,
  color: getThemeColor(Color.whiteColor),
};
