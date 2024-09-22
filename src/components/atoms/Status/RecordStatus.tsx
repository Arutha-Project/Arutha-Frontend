import { Color, DEFAULT_RECORD_STATUS_STYLES, getThemeColor, Intensity } from '@theme';
import { iconLabelStyle, mainContainer } from './RecordStatusStyle';
import {
  DirectDown as DirectDownIcon,
  DirectUp as DirectUpIcon,
  TickCircle as TickCircleIcon,
  CloseCircle as CloseCircleIcon,
  RepeatCircle as RepeatCircleIcon,
  Convertshape as ConvertIcon,
} from 'iconsax-react';
import React from 'react';

export interface StatusProps {
  iconName: RecordStatusKeys;
  width?: string;
  height?: string;
}

export enum RecordStatus {
  Outstanding = 'Outstanding',
  InProgress = 'InProgress',
  Upcoming = 'Upcoming',
  Pending = 'Pending',
  Done = 'Done',
  Generated = 'Generated',
  Completed = 'Completed',
}

export const RecordStatusLabelText = {
  [RecordStatus.Outstanding]: 'Outstanding',
  [RecordStatus.InProgress]: 'In Progress',
  [RecordStatus.Upcoming]: 'Upcoming',
  [RecordStatus.Pending]: 'Pending',
  [RecordStatus.Done]: 'Done',
  [RecordStatus.Generated]: 'Generated',
  [RecordStatus.Completed]: 'Completed',
};

export type RecordStatusKeys = keyof typeof RecordStatus;

export type RecordStatusIconStyleType = {
  label: string;
  backgroundColor: string;
  color: string;
  Icon: React.ReactElement;
};

const RecordStatusView: React.FC<StatusProps> = ({
  iconName,
  width,
  height = DEFAULT_RECORD_STATUS_STYLES.HEIGHT,
}) => {
  const recordStatusColorMapper: Record<RecordStatusKeys, RecordStatusIconStyleType> = {
    [RecordStatus.Outstanding]: {
      label: RecordStatusLabelText[RecordStatus.Outstanding],
      backgroundColor: getThemeColor(Color.dangerColor, Intensity.Light),
      color: getThemeColor(Color.dangerColor, Intensity.Bold),
      Icon: <DirectDownIcon size={24} color={getThemeColor(Color.dangerColor, Intensity.Bold)} />,
    },
    [RecordStatus.Pending]: {
      label: RecordStatusLabelText[RecordStatus.Pending],
      backgroundColor: getThemeColor(Color.upcomingColor, Intensity.Light),
      color: getThemeColor(Color.upcomingColor, Intensity.Bold),
      Icon: (
        <CloseCircleIcon size={24} color={getThemeColor(Color.upcomingColor, Intensity.Bold)} />
      ),
    },
    [RecordStatus.Upcoming]: {
      label: RecordStatusLabelText[RecordStatus.Upcoming],
      backgroundColor: getThemeColor(Color.upcomingColor, Intensity.Light),
      color: getThemeColor(Color.upcomingColor, Intensity.Bold),
      Icon: <DirectUpIcon size={24} color={getThemeColor(Color.upcomingColor, Intensity.Bold)} />,
    },
    [RecordStatus.InProgress]: {
      label: RecordStatusLabelText[RecordStatus.InProgress],
      backgroundColor: getThemeColor(Color.primaryColor, Intensity.Light),
      color: getThemeColor(Color.primaryColor, Intensity.Bold),
      Icon: (
        <RepeatCircleIcon size={24} color={getThemeColor(Color.primaryColor, Intensity.Bold)} />
      ),
    },
    [RecordStatus.Done]: {
      label: RecordStatusLabelText[RecordStatus.Done],
      backgroundColor: getThemeColor(Color.successColor, Intensity.Light),
      color: getThemeColor(Color.successColor, Intensity.Bold),
      Icon: <TickCircleIcon size={24} color={getThemeColor(Color.successColor, Intensity.Bold)} />,
    },
    [RecordStatus.Completed]: {
      label: RecordStatusLabelText[RecordStatus.Completed],
      backgroundColor: getThemeColor(Color.successColor, Intensity.Light),
      color: getThemeColor(Color.successColor, Intensity.Bold),
      Icon: <TickCircleIcon size={24} color={getThemeColor(Color.successColor, Intensity.Bold)} />,
    },
    [RecordStatus.Generated]: {
      label: RecordStatusLabelText[RecordStatus.Generated],
      backgroundColor: getThemeColor(Color.upcomingColor, Intensity.Light),
      color: getThemeColor(Color.upcomingColor, Intensity.Bold),
      Icon: <ConvertIcon size={24} color={getThemeColor(Color.upcomingColor, Intensity.Bold)} />,
    },
  };

  const selectedRecordStatusIcon = recordStatusColorMapper[iconName];

  const {
    Icon: SelectedIcon,
    label: selectedIconLabel,
    backgroundColor: selectedIconBackgroundColor,
    color: selectedIconLabelColor,
  } = selectedRecordStatusIcon;

  return (
    <div style={mainContainer(selectedIconBackgroundColor, width, height)}>
      {SelectedIcon}
      <div style={iconLabelStyle(selectedIconLabelColor)}>{selectedIconLabel}</div>
    </div>
  );
};

export default RecordStatusView;
