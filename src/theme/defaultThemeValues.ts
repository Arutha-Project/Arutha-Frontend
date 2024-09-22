import { getThemeColor, Color, Intensity } from '@theme';

// Default values of Icons
export const DEFAULT_ICON_STYLES = {
  WIDTH: 24,
  HEIGHT: 24,
  FONT_SIZE: '12px',
  COLOR: getThemeColor(Color.primaryColor, Intensity.Moderate),
  TRANSFORM: '1000ms',
};

/**
 *
 * STATUS
 *
 */

// Default User Status style values
export const DEFAULT_USER_STATUS_STYLES = {
  MIN_WIDTH: '120px',
  MAX_WIDTH: '120px',
  HEIGHT: '36px',
  FONT_WEIGHT: 500,
  LINE_HEIGHT: '24px',
  FONT_SIZE: '16px',
  BORDER_RADIUS: '36px',
  TRANSFORM: '1000ms',
};

export const DEFAULT_TICKET_STATUS_STYLES = {
  MIN_WIDTH: '120px',
  MAX_WIDTH: '120px',
  HEIGHT: '36px',
  FONT_WEIGHT: 500,
  LINE_HEIGHT: '24px',
  FONT_SIZE: '16px',
  BORDER_RADIUS: '36px',
  TRANSFORM: '1000ms',
};

export const DEFAULT_APPROVAL_STATUS_STYLES = {
  MIN_WIDTH: '120px',
  MAX_WIDTH: '120px',
  HEIGHT: '36px',
  FONT_WEIGHT: 500,
  LINE_HEIGHT: '24px',
  FONT_SIZE: '16px',
  BORDER_RADIUS: '36px',
  TRANSFORM: '1000ms',
};

// Default User Status style values
export const DEFAULT_RECORD_STATUS_STYLES = {
  MAX_WIDTH: '135px',
  HEIGHT: '36px',
  FONT_WEIGHT: 500,
  LINE_HEIGHT: '24px',
  FONT_SIZE: '16px',
  BORDER_RADIUS: '36px',
  TRANSFORM: '1000ms',
};
