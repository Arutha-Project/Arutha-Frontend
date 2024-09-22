import { SVGIconProps } from '@components/atoms/Icon/SVGs';

const ArrowSquareDown: React.FC<SVGIconProps> = ({
  height = 16,
  width = 16,
  color = '#FF8900',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.00016 14.6666H10.0002C13.3335 14.6666 14.6668 13.3333 14.6668 9.99992V5.99992C14.6668 2.66659 13.3335 1.33325 10.0002 1.33325H6.00016C2.66683 1.33325 1.3335 2.66659 1.3335 5.99992V9.99992C1.3335 13.3333 2.66683 14.6666 6.00016 14.6666Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.64648 7.09326L7.99982 9.43993L10.3532 7.09326"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowSquareDown;
