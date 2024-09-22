import React from 'react';
import { getThemeColor, Color, Intensity } from '@theme';

export const autoCompleteInputStyle: React.CSSProperties = {
  color: 'black',
  display: 'flex',
  width: '100%',
  marginRight: '10px',
  backgroundColor: getThemeColor(Color.whiteColor),
  borderRadius: '37px',
  border: `1px solid ${getThemeColor(Color.neutralColor, Intensity.Moderate)}`,
  alignItems: 'center',
};

export const autoCompleteChildInput: React.CSSProperties = {
  boxShadow: 'none',
  display: 'flex',
  border: 'none',
  background: 'transparent',
  width: '100%',
};
