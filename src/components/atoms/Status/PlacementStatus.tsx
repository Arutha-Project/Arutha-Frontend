import { DEFAULT_USER_STATUS_STYLES, getThemeColor, Color, Intensity } from '@theme';
import { iconLabelStyle, mainContainer } from './PlacementStatusStyle';
import {
  Clock as ClockIcon,
  TickCircle as TickCircleIcon,
  CloseCircle as CloseCircleIcon,
  DirectUp as DirectUpIcon,
  InfoCircle as InfoCircleIcon,
} from 'iconsax-react';
import React from 'react';

export interface StatusProps {
  iconName: PlacementStatusValues;
  width?: string;
  height?: string;
}

// TODO: This unknown needs to be removed in future
export enum PlacementStatus {
  Pending = 'pending',
  Success = 'success',
  Disabled = 'disabled',
  Upcoming = 'upcoming',
  Unknown = 'unknown',
}

export type PlacementStatusKeys = keyof typeof PlacementStatus;

export type PlacementStatusIconStyleType = {
  label: string;
  backgroundColor: string;
  color: string;
  Icon: React.FC;
};

export type PlacementStatusValues = (typeof PlacementStatus)[keyof typeof PlacementStatus];

const PlacementStatusColorMapper: Record<PlacementStatusValues, PlacementStatusIconStyleType> = {
  [PlacementStatus.Pending]: {
    label: 'Matched',
    backgroundColor: getThemeColor(Color.primaryColor, Intensity.Soft),
    color: getThemeColor(Color.primaryColor, Intensity.Bold),
    Icon: () => <ClockIcon size={18} color={getThemeColor(Color.primaryColor, Intensity.Bold)} />,
  },
  [PlacementStatus.Success]: {
    label: 'Active Ref.',
    backgroundColor: getThemeColor(Color.successColor, Intensity.Light),
    color: getThemeColor(Color.successColor, Intensity.Deep),
    Icon: () => (
      <TickCircleIcon size={18} color={getThemeColor(Color.successColor, Intensity.Deep)} />
    ),
  },
  [PlacementStatus.Disabled]: {
    label: 'Closed',
    backgroundColor: getThemeColor(Color.dangerColor, Intensity.Light),
    color: getThemeColor(Color.dangerColor, Intensity.Bold),
    Icon: () => (
      <CloseCircleIcon size={18} color={getThemeColor(Color.dangerColor, Intensity.Bold)} />
    ),
  },
  [PlacementStatus.Upcoming]: {
    label: 'Placed',
    backgroundColor: getThemeColor(Color.upcomingColor, Intensity.Light),
    color: getThemeColor(Color.upcomingColor, Intensity.Bold),
    Icon: () => (
      <DirectUpIcon size={18} color={getThemeColor(Color.upcomingColor, Intensity.Bold)} />
    ),
  },
  // TODO: This unknown item needs to be removed in future.
  [PlacementStatus.Unknown]: {
    label: 'Unknown',
    backgroundColor: getThemeColor(Color.warningColor, Intensity.Light),
    color: getThemeColor(Color.warningColor, Intensity.Bold),
    Icon: () => (
      <InfoCircleIcon size={18} color={getThemeColor(Color.warningColor, Intensity.Bold)} />
    ),
  },
};

const PlacementStatusView: React.FC<StatusProps> = ({
  iconName,
  width,
  height = DEFAULT_USER_STATUS_STYLES.HEIGHT,
}) => {
  const {
    Icon: SelectedIcon,
    label: selectedIconLabel,
    backgroundColor: selectedIconBackgroundColor,
    color: selectedIconLabelColor,
  } = PlacementStatusColorMapper[iconName];

  return (
    <div style={mainContainer(selectedIconBackgroundColor, width, height)}>
      <SelectedIcon />
      <div style={iconLabelStyle(selectedIconLabelColor)}>{selectedIconLabel}</div>
    </div>
  );
};

export default PlacementStatusView;
