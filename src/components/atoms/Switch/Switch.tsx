import { Switch as AntSwitch, SwitchProps } from 'antd';

const CustomSwitch: React.FC<SwitchProps> = ({
  style,
  onChange,
  checked = true,
  disabled = false,
}) => {
  return (
    <AntSwitch
      defaultChecked
      disabled={disabled}
      checked={checked}
      style={style}
      onChange={onChange}
    />
  );
};

export default CustomSwitch;
