import { Button as AntButton, Dropdown, MenuProps } from 'antd';
import { BaseButtonProps } from 'antd/es/button/button';

export interface DropdownButtonProps extends BaseButtonProps {
  text?: string;
  buttonColor?: string;
  style?: React.CSSProperties;
  handleOnClick?: (
    event:
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  shape?: 'circle' | 'default' | 'round';
  isDisabled?: boolean;
  icon?: React.ReactNode;
  menuItems: MenuProps['items'];
}

const DropdownButton: React.FC<DropdownButtonProps> = ({
  text,
  icon,
  style,
  handleOnClick,
  shape,
  isDisabled = false,
  menuItems,
}) => {
  return (
    <Dropdown menu={{items: menuItems}}>
      <AntButton
        disabled={isDisabled}
        style={style}
        icon={icon}
        shape={shape}
        onClick={handleOnClick}
      >
        {text}
      </AntButton>
    </Dropdown>
  );
};

export default DropdownButton;
