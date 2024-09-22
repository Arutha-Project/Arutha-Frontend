import { Tab } from '@node_modules/rc-tabs/lib/interface';
import { Tabs as AntdTabs, ConfigProvider } from 'antd';
import { subTabsTheme, tabBarStyle, tabsTheme } from './TabsStyle';
import React from 'react';
import './Tab.css';

export interface TabItems extends Tab {
  totalRowCount?: number;
  label: any;
  key: string;
  children: any;
}

export interface TabsProps {
  activeKey?: string;
  items: Array<TabItems>;
  handleTabChanges: (activeKey: string) => void;
  isVisible?: boolean;
  tabBarExtraContent?: React.ReactNode;
  isSubTabs?: boolean;
}

const Tabs: React.FC<TabsProps> = ({
  activeKey,
  items,
  handleTabChanges,
  isVisible = true,
  tabBarExtraContent = undefined,
  isSubTabs
}) => {

  return (
    <ConfigProvider theme={!isSubTabs ? tabsTheme : subTabsTheme}>
      <AntdTabs
        tabBarExtraContent={tabBarExtraContent}
        activeKey={activeKey}
        
        tabBarStyle={
          !isVisible ?
            { ...tabBarStyle, display: 'none' } : tabBarStyle
        }
        type={'card'}
        onChange={handleTabChanges}
        items={items}
      />
    </ConfigProvider>
  );
};

export default Tabs;
