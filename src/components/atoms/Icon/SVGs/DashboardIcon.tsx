import { SVGIconProps } from '@components/atoms/Icon/SVGs';
import { DEFAULT_ICON_STYLES } from '@theme';

const DashboardIcon: React.FC<SVGIconProps> = ({
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
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.67987 11.9101L10.3299 12.32L9.37988 16.1601C9.15988 17.0601 9.59986 17.36 10.3599 16.83L15.5399 13.2401C16.1699 12.8001 16.0799 12.2901 15.3299 12.1001L13.6799 11.6901L14.6299 7.85006C14.8499 6.95006 14.4099 6.65007 13.6499 7.18007L8.46988 10.7701C7.83988 11.2101 7.92987 11.7201 8.67987 11.9101Z"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DashboardIcon;
