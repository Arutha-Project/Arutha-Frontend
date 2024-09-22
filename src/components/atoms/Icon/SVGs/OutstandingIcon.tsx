import { SVGIconProps } from '@components/atoms/Icon/SVGs';

const OutstandingIcon: React.FC<SVGIconProps> = ({ height = 18, width = 18 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.87747 14.4676L2.30247 5.77511C1.21497 3.71261 3.41247 1.47011 5.49747 2.51261L7.92747 3.72761C8.60247 4.06511 9.39747 4.06511 10.0725 3.72761L12.5025 2.51261C14.5875 1.47011 16.7775 3.71261 15.6975 5.77511L11.1225 14.4676C10.2225 16.1776 7.77747 16.1776 6.87747 14.4676Z"
        stroke="#F64C4C"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default OutstandingIcon;
