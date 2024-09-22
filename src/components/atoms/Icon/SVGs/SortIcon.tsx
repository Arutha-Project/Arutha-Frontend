import { SVGIconProps } from '@components/atoms/Icon/SVGs';

const SortIcon: React.FC<SVGIconProps> = ({
  height = 20,
  width = 20,
  upArrowColor = '#292D32',
  downArrowColor = '#292D32',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Arrow Up */}
      <path
        d="M8.7083 5.59998L5.60828 2.5L2.5083 5.59998"
        stroke={upArrowColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.6084 17.5V2.5"
        stroke={upArrowColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Arrow Down */}
      <path
        d="M11.2915 14.3999L14.3915 17.4999L17.4915 14.3999"
        stroke={downArrowColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.3916 2.5V17.5"
        stroke={downArrowColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SortIcon;
