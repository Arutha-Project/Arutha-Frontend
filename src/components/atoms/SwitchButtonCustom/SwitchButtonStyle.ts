import { Color, Intensity, getThemeColor } from '@theme';
import React from 'react';

export const switchButtonStyle = (checked: boolean, disabled?: boolean): React.CSSProperties => ({
  borderRadius: '38px',
  height: '35px',
  maxHeight: '35px',
  minWidth: '80px',
  width: 'auto',
  marginLeft: 2,
  marginRight: 2,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor:
    checked && disabled
      ? getThemeColor(Color.secondaryColor, Intensity.Bold)
      : checked
      ? getThemeColor(Color.primaryColor, Intensity.Bold)
      : getThemeColor(Color.secondaryColor, Intensity.Light),
  color: getThemeColor(Color.whiteColor),
});

export const switchButtonContentStyle: React.CSSProperties = {
  paddingTop: 5,
  paddingBottom: 3,
};
