import { getThemeColor, Color, Intensity } from '@theme';
import { ThemeConfig } from 'antd';

export const breadcrumbTheme: ThemeConfig = {
  components: {
    Breadcrumb: {
      colorTextDescription: getThemeColor(Color.primaryColor, Intensity.Bold),
    },
  },
};
