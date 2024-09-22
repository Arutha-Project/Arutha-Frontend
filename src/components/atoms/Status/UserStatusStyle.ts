import { DEFAULT_USER_STATUS_STYLES } from '@theme';

export const mainContainer = (
  selectedIconBackgroundColor: string,
  width?: string,
  height?: string
): React.CSSProperties => {
  return {
    display: 'flex',
    flexDirection: 'row',
    width,
    height,
    maxWidth: DEFAULT_USER_STATUS_STYLES.MAX_WIDTH,
    minWidth: DEFAULT_USER_STATUS_STYLES.MIN_WIDTH,
    fontWeight: DEFAULT_USER_STATUS_STYLES.FONT_WEIGHT,
    fontSize: DEFAULT_USER_STATUS_STYLES.FONT_SIZE,
    lineHeight: DEFAULT_USER_STATUS_STYLES.LINE_HEIGHT,
    borderRadius: DEFAULT_USER_STATUS_STYLES.BORDER_RADIUS,
    backgroundColor: selectedIconBackgroundColor,
    padding: '6px 9px',
    gap: '4px',
    alignItems: 'center',
    justifyContent: 'center',
  };
};

export const iconLabelStyle = (selectedIconLabelColor: string): React.CSSProperties => {
  return {
    color: selectedIconLabelColor,
  };
};
