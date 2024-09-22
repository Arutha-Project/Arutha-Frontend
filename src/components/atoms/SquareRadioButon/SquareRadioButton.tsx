import { Radio as AntRadio,  RadioProps } from 'antd';
import { squareRadioStyle } from './SquareRadioButtnStyle';

const SquareRadio: React.FC<RadioProps> = ({
  style,
  onChange,
  checked = true,
  disabled = false,
}) => {
  return (
      <AntRadio
        disabled={disabled}
        checked={checked}
        style={{...style, ...squareRadioStyle}}
        onChange={onChange}
      />
  );
};

export default SquareRadio;
