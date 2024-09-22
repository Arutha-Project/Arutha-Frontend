import { Breadcrumb as AntdBreadcrumb, ConfigProvider } from 'antd';
import {
  BreadcrumbItemType,
  BreadcrumbSeparatorType,
  ItemType,
} from 'antd/es/breadcrumb/Breadcrumb';
import { breadcrumbTheme } from './BreadcrumbStyles';
import React from 'react';

export interface BreadcrumbProps {
  items: Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[];
  itemRender?: (
    route: ItemType,
    params: any,
    routes: ItemType[],
    paths: string[]
  ) => React.ReactNode;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, itemRender }) => {
  return (
    <ConfigProvider theme={breadcrumbTheme}>
      <AntdBreadcrumb itemRender={itemRender} separator={'>'} items={items} />
    </ConfigProvider>
  );
};

export default Breadcrumb;
