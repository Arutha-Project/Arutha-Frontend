import { SVGIconProps } from '@components/atoms/Icon/SVGs';

const CornerDownRightArrowIcon: React.FC<SVGIconProps> = ({
  height = 40,
  width = 40,
  color = '#FF8900',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`-10 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke={color}
      strokeWidth="0.00024000000000000003"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="#CCCCCC"
        strokeWidth="0.8160000000000001"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M6.85059 13.4006C5.74602 13.4006 4.85059 12.5052 4.85059 11.4006V3.40063H2.85059V11.4006C2.85059 13.6098 4.64145 15.4006 6.85059 15.4006H17.1561L13.3715 19.1853L14.7857 20.5995L21.1497 14.2355L14.7857 7.87158L13.3715 9.2858L17.4863 13.4006H6.85059Z"
          fill={color}
        ></path>
      </g>
    </svg>
  );
};

export default CornerDownRightArrowIcon;
