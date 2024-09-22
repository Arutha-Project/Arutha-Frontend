import Sider, { CollapseType } from 'antd/es/layout/Sider';
import React from 'react';

export interface SideLayoutProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onBreakpoint?: (broken: boolean) => void;
  onCollapse?: (collapsed: boolean, type: CollapseType) => void;
  width?: string;
}

const SideLayout: React.FC<SideLayoutProps> = ({
  children,
  onBreakpoint,
  onCollapse,
  style,
  width,
}) => {
  return (
    <Sider
      width={width}
      style={style}
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={onBreakpoint}
      onCollapse={onCollapse}
    >
      {children}
    </Sider>
  );
};

export default SideLayout;
