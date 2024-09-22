import { Layout as AntLayout } from 'antd';
import React from 'react';

export interface LayoutProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const Layout: React.FC<LayoutProps> = ({ children, style }) => {
  const [screenHeight, setScreenHeight] = React.useState(window.innerHeight);
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = () => {
      setScreenHeight(window.innerHeight);
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <AntLayout style={{ ...style }}>{children}</AntLayout>;
};

export default Layout;
