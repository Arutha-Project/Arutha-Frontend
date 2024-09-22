import { getThemeColor, Color, Intensity } from '@theme';
import { ThemeConfig } from 'antd';

export const tabsTheme: ThemeConfig = {
  components: {
    Tabs: {
      colorPrimary: getThemeColor(Color.whiteColor),
      colorText: getThemeColor(Color.whiteColor),
      colorBgContainer: getThemeColor(Color.primaryColor,Intensity.Bold),
      colorFillAlter: getThemeColor(Color.secondaryColor,Intensity.Bold),
    },
  },
};

export const subTabsTheme: ThemeConfig = {
  components: {
    Tabs: {
      colorPrimary: getThemeColor(Color.whiteColor),
      colorText: getThemeColor(Color.whiteColor),
      colorBgContainer: getThemeColor(Color.secondaryColor,Intensity.Moderate),
      colorFillAlter: getThemeColor(Color.secondaryColor,Intensity.Subtle),
    },
  },
};

export const tabBarStyle : React.CSSProperties = {
    margin: 0,
};
