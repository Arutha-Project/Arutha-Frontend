import { SVGIconProps } from '@components/atoms/Icon/SVGs';
import { DEFAULT_ICON_STYLES } from '@theme';

const NotificationBingIcon: React.FC<SVGIconProps> = ({
  height = DEFAULT_ICON_STYLES.HEIGHT,
  width = DEFAULT_ICON_STYLES.WIDTH,
  color = DEFAULT_ICON_STYLES.COLOR,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 6.44v3.33M12.02 2C8.34 2 5.36 4.98 5.36 8.66v2.1c0 .68-.28 1.7-.63 2.28l-1.27 2.12c-.78 1.31-.24 2.77 1.2 3.25a23.34 23.34 0 0 0 14.73 0 2.22 2.22 0 0 0 1.2-3.25l-1.27-2.12c-.35-.58-.63-1.61-.63-2.28v-2.1C18.68 5 15.68 2 12.02 2Z"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      ></path>
      <path
        d="M15.33 18.82c0 1.83-1.5 3.33-3.33 3.33-.91 0-1.75-.38-2.35-.98-.6-.6-.98-1.44-.98-2.35"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
      ></path>
    </svg>
  );
};

export default NotificationBingIcon;
