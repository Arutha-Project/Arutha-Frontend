import { getThemeColor, Color, Intensity } from '@theme';
import { Col, ThemeConfig } from 'antd';
import React from 'react';

export const tableTheme: ThemeConfig = {
  components: {
    Pagination: {
      colorPrimary: getThemeColor(Color.secondaryColor, Intensity.Bold),
      colorBgContainer: getThemeColor(Color.secondaryColor, Intensity.Bold),
      colorPrimaryHover: getThemeColor(Color.secondaryColor, Intensity.Delicate),
      colorBgContainerDisabled: 'red',
      controlHeight: 38,
      borderRadius: 100,
    },
    Select: {
      colorPrimaryHover: getThemeColor(Color.primaryColor, Intensity.Bold),
      controlItemBgActive: getThemeColor(Color.primaryColor, Intensity.Bold),
      borderRadius: 100,
    },
  },
};

export const pageButtonStyle = (
  pageNumber: number,
  currentPageNumber: number
): React.CSSProperties => ({
  backgroundColor:
    pageNumber === currentPageNumber
      ? getThemeColor(Color.secondaryColor, Intensity.Bold)
      : getThemeColor(Color.secondaryColor, Intensity.Delicate),
  width: '36px',
  height: '36px',
  color:
    pageNumber === currentPageNumber
      ? getThemeColor(Color.whiteColor)
      : getThemeColor(Color.blackColor),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: `1px solid ${getThemeColor(Color.neutralColor, Intensity.Moderate)}`,
  borderStyle: pageNumber === currentPageNumber ? 'none' : 'solid',
  borderRadius: '50%',
});

export const nextButtonStyle: React.CSSProperties = {
  width: '36px',
  height: '36px',
  color: getThemeColor(Color.blackColor),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: `1px solid ${getThemeColor(Color.neutralColor, Intensity.Moderate)}`,
  borderStyle: 'solid',
  borderRadius: '50%',
};

export const prevButtonStyle: React.CSSProperties = {
  background: getThemeColor(Color.neutralColor, Intensity.Delicate),
  width: '36px',
  height: '36px',
  color: getThemeColor(Color.blackColor),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: `1px solid ${getThemeColor(Color.neutralColor, Intensity.Subtle)}`,
  borderStyle: 'solid',
  borderRadius: '50%',
};

export const jumpButtonStyle: React.CSSProperties = {
  background: getThemeColor(Color.secondaryColor, Intensity.Delicate),
  width: '36px',
  height: '36px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: `1px solid ${getThemeColor(Color.neutralColor, Intensity.Subtle)}`,
  borderStyle: 'solid',
  borderRadius: '50%',
  color: getThemeColor(Color.neutralColor, Intensity.Deep),
};

export const sortTitleContainerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  width: '150px',
};

export const sortTitleStyle: React.CSSProperties = {
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '22px',
};
