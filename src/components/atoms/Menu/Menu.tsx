import { Menu as AntMenu } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';

export interface MenuProps {
  menuItems: Array<ItemType>;
}

const Menu: React.FC<MenuProps> = ({ menuItems }) => {
  if (menuItems.length > 0) return <></>;

  return (
    <AntMenu defaultActiveFirst={true}>
      <AntMenu.Item />
    </AntMenu>
  );
};

export default Menu;
