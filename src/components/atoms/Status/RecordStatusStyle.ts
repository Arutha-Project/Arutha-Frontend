import { DEFAULT_RECORD_STATUS_STYLES } from '@theme';

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
    maxWidth: DEFAULT_RECORD_STATUS_STYLES.MAX_WIDTH,
    fontWeight: DEFAULT_RECORD_STATUS_STYLES.FONT_WEIGHT,
    fontSize: DEFAULT_RECORD_STATUS_STYLES.FONT_SIZE,
    lineHeight: DEFAULT_RECORD_STATUS_STYLES.LINE_HEIGHT,
    borderRadius: DEFAULT_RECORD_STATUS_STYLES.BORDER_RADIUS,
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
