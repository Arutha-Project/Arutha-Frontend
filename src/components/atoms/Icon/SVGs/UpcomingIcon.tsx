import { SVGIconProps } from '@components/atoms/Icon/SVGs';

const UpcomingIcon: React.FC<SVGIconProps> = ({ height = 18, width = 18 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.87747 3.5325L2.30247 12.225C1.21497 14.2875 3.41247 16.53 5.49747 15.4875L7.92747 14.2725C8.60247 13.935 9.39747 13.935 10.0725 14.2725L12.5025 15.4875C14.5875 16.53 16.7775 14.2875 15.6975 12.225L11.1225 3.5325C10.2225 1.8225 7.77747 1.8225 6.87747 3.5325Z"
        stroke="#5295E2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default UpcomingIcon;
