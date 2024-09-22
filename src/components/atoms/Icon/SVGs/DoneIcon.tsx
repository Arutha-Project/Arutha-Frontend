import { SVGIconProps } from '@components/atoms/Icon/SVGs';

const DoneIcon: React.FC<SVGIconProps> = ({ height = 18, width = 18 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.5 16.5C13.625 16.5 17 13.125 17 9C17 4.875 13.625 1.5 9.5 1.5C5.375 1.5 2 4.875 2 9C2 13.125 5.375 16.5 9.5 16.5Z"
        stroke="#47B881"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.3125 8.99994L8.435 11.1224L12.6875 6.87744"
        stroke="#47B881"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DoneIcon;
