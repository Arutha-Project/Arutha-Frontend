import { DEFAULT_USER_STATUS_STYLES, getThemeColor, Color, Intensity } from '@theme';
import { iconLabelStyle, mainContainer } from './UserStatusStyle';
import {
  Clock as ClockIcon,
  TickCircle as TickCircleIcon,
  CloseCircle as CloseCircleIcon,
  DirectUp as DirectUpIcon,
  InfoCircle as InfoCircleIcon,
} from 'iconsax-react';
import React from 'react';

export interface StatusProps {
  iconName: UserStatusValues;
  width?: string;
  height?: string;
}

// TODO: This unknown needs to be removed in future
export enum UserStatus {
  Pending = 'pending',
  Success = 'success',
  Disabled = 'disabled',
  Upcoming = 'upcoming',
  Unknown = 'unknown',
}

export type UserStatusKeys = keyof typeof UserStatus;

export type UserStatusIconStyleType = {
  label: string;
  backgroundColor: string;
  color: string;
  Icon: React.FC;
};

export type UserStatusValues = (typeof UserStatus)[keyof typeof UserStatus];

const userStatusColorMapper: Record<UserStatusValues, UserStatusIconStyleType> = {
  [UserStatus.Pending]: {
    label: 'Pending',
    backgroundColor: getThemeColor(Color.primaryColor, Intensity.Soft),
    color: getThemeColor(Color.primaryColor, Intensity.Bold),
    Icon: () => <ClockIcon size={18} color={getThemeColor(Color.primaryColor, Intensity.Bold)} />,
  },
  [UserStatus.Success]: {
    label: 'Success',
    backgroundColor: getThemeColor(Color.successColor, Intensity.Light),
    color: getThemeColor(Color.successColor, Intensity.Deep),
    Icon: () => (
      <TickCircleIcon size={18} color={getThemeColor(Color.successColor, Intensity.Deep)} />
    ),
  },
  [UserStatus.Disabled]: {
    label: 'Disabled',
    backgroundColor: getThemeColor(Color.dangerColor, Intensity.Light),
    color: getThemeColor(Color.dangerColor, Intensity.Bold),
    Icon: () => (
      <CloseCircleIcon size={18} color={getThemeColor(Color.dangerColor, Intensity.Bold)} />
    ),
  },
  [UserStatus.Upcoming]: {
    label: 'Upcoming',
    backgroundColor: getThemeColor(Color.upcomingColor, Intensity.Light),
    color: getThemeColor(Color.upcomingColor, Intensity.Bold),
    Icon: () => (
      <DirectUpIcon size={18} color={getThemeColor(Color.upcomingColor, Intensity.Bold)} />
    ),
  },
  // TODO: This unknown item needs to be removed in future.
  [UserStatus.Unknown]: {
    label: 'Unknown',
    backgroundColor: getThemeColor(Color.warningColor, Intensity.Light),
    color: getThemeColor(Color.warningColor, Intensity.Bold),
    Icon: () => (
      <InfoCircleIcon size={18} color={getThemeColor(Color.warningColor, Intensity.Bold)} />
    ),
  },
};

const UserStatusView: React.FC<StatusProps> = ({
  iconName,
  width,
  height = DEFAULT_USER_STATUS_STYLES.HEIGHT,
}) => {
  const iconStyle = userStatusColorMapper[iconName] || userStatusColorMapper[UserStatus.Unknown];

  const {
    Icon: SelectedIcon,
    label: selectedIconLabel,
    backgroundColor: selectedIconBackgroundColor,
    color: selectedIconLabelColor,
  } = iconStyle;

  return (
    <div style={mainContainer(selectedIconBackgroundColor, width, height)}>
      <SelectedIcon />
      <div style={iconLabelStyle(selectedIconLabelColor)}>{selectedIconLabel}</div>
    </div>
  );
};

export default UserStatusView;
