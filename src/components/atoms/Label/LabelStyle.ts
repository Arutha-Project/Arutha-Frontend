import { getThemeColor, Color, Intensity } from '@theme';

export const titleStyle: React.CSSProperties = {
  height: '20px',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '20px',
  color: getThemeColor(Color.neutralColor, Intensity.Bold),
};

export const textStyle: React.CSSProperties = {
  height: '24px',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '16px',
  lineHeight: '24px',
  color: getThemeColor(Color.secondaryColor, Intensity.Bold),
};
