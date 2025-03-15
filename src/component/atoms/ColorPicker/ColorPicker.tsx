import { ColorPicker as AntColorPicker } from 'antd';
import { ColorPickerProps as AntColorPickerProps } from 'antd/es/color-picker';
import React from 'react';

export interface ColorPickerProps extends AntColorPickerProps {
  defaultValue?: string;
  onChange?: (value: any, css: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  defaultValue,
  onChange,
  className,
  style,
  ...rest
}) => {
  return (
    <AntColorPicker
      showText
      defaultValue={defaultValue}
      onChange={(value, css) => onChange?.(value, css)}
      className={className}
      style={style}
      {...rest}
    />
  );
};

export default ColorPicker;
