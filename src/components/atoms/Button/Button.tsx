import { Button as AntButton} from 'antd';
import { BaseButtonProps } from 'antd/es/button/button';

export interface ButtonProps extends BaseButtonProps {
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
}

const Button: React.FC<ButtonProps> = ({
  text,
  icon,
  style,
  handleOnClick,
  shape,
  isDisabled = false,
}) => {
  return (
    <AntButton
      disabled={isDisabled}
      style={style}
      icon={icon}
      shape={shape}
      onClick={handleOnClick}
    >
      {text}
    </AntButton>
  );
};

export default Button;
