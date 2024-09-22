import { SVGIconProps } from '@components/atoms/Icon/SVGs';

const DisabledIcon: React.FC<SVGIconProps> = ({ height = 18, width = 18 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 16.5C13.125 16.5 16.5 13.125 16.5 9C16.5 4.875 13.125 1.5 9 1.5C4.875 1.5 1.5 4.875 1.5 9C1.5 13.125 4.875 16.5 9 16.5Z"
        stroke="#F64C4C"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.87744 11.1224L11.1224 6.87744"
        stroke="#F64C4C"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.1224 11.1224L6.87744 6.87744"
        stroke="#F64C4C"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DisabledIcon;