import { SVGIconProps } from '@components/atoms/Icon/SVGs';
import { DEFAULT_ICON_STYLES } from '@theme';

const LogoutIcon: React.FC<SVGIconProps> = ({
  height = DEFAULT_ICON_STYLES.HEIGHT,
  width = DEFAULT_ICON_STYLES.WIDTH,
  color = DEFAULT_ICON_STYLES.COLOR,
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
        d="M7.8999 7.07C8.2099 3.47 10.0599 2 14.1099 2H14.2399C18.7099 2 20.4999 3.79 20.4999 8.26V14.78C20.4999 19.25 18.7099 21.04 14.2399 21.04H14.1099C10.0899 21.04 8.2399 19.59 7.9099 16.05"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 11.51L14 11.51"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.6499 8.15991L14.9999 11.5099L11.6499 14.8599"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LogoutIcon;
