import { Color, DEFAULT_APPROVAL_STATUS_STYLES, Intensity, getThemeColor } from '@theme';
import { iconLabelStyle, mainContainer } from './ApprovalStatusStyle';
import {
    Clock as ClockIcon,
    TickCircle as TickCircleIcon,
    CloseCircle as CloseCircleIcon,
    Repeat,
    DirectUp,
} from 'iconsax-react';
import React from 'react';

export interface StatusProps {
    iconName: ApprovalStatusValues | undefined;
    width?: string;
    height?: string;
}

export enum ApprovalStatus {
    Pending = 'PENDING',
    Rejected = 'REJECTED',
    ApprovedAndSigned = 'APPROVED_AND_SIGNED',
    ChangesRequired = 'CHANGES_REQUIRED',
    ApprovedAndForwarded = 'APPROVED_AND_FORWARDED'
}

export type ApprovalStatusIconStyleType = {
    label: string;
    backgroundColor: string;
    color: string;
    Icon: React.FC;
};

export type ApprovalStatusValues = (typeof ApprovalStatus)[keyof typeof ApprovalStatus];

const approvalStatusColorMapper: Record<ApprovalStatusValues, ApprovalStatusIconStyleType> = {
    [ApprovalStatus.Rejected]: {
        label: 'Rejected',
        backgroundColor: getThemeColor(Color.dangerColor, Intensity.Soft),
        color: getThemeColor(Color.dangerColor, Intensity.Bold),
        Icon: () => <CloseCircleIcon size={18} color={getThemeColor(Color.dangerColor, Intensity.Bold)} />,
    },
    [ApprovalStatus.Pending]: {
        label: 'Pending',
        backgroundColor: getThemeColor(Color.upcomingColor, Intensity.Soft),
        color: getThemeColor(Color.upcomingColor, Intensity.Bold),
        Icon: () => <ClockIcon size={18} color={getThemeColor(Color.upcomingColor, Intensity.Bold)} />,
    },
    [ApprovalStatus.ApprovedAndSigned]: {
        label: 'Approved',
        backgroundColor: getThemeColor(Color.successColor, Intensity.Soft),
        color: getThemeColor(Color.successColor, Intensity.Bold),
        Icon: () => <TickCircleIcon size={18} color={getThemeColor(Color.successColor, Intensity.Bold)} />,
    },
    [ApprovalStatus.ChangesRequired]: {
        label: 'Revised',
        backgroundColor: getThemeColor(Color.warningColor, Intensity.Soft),
        color: getThemeColor(Color.warningColor, Intensity.Bold),
        Icon: () => <Repeat size={18} color={getThemeColor(Color.warningColor, Intensity.Bold)} />,
    },
    [ApprovalStatus.ApprovedAndForwarded]: {
        label: 'Forwarded',
        backgroundColor: getThemeColor(Color.purpleColor, Intensity.Soft),
        color: getThemeColor(Color.purpleColor, Intensity.Bold),
        Icon: () => <DirectUp size={18} color={getThemeColor(Color.purpleColor, Intensity.Bold)} />,
    },
};

const ApprovalStatusView: React.FC<StatusProps> = ({
    iconName,
    width,
    height = DEFAULT_APPROVAL_STATUS_STYLES.HEIGHT,
}) => {
    if (!iconName) {
        return null;
    }

    const {
        Icon: SelectedIcon,
        label: selectedIconLabel,
        backgroundColor: selectedIconBackgroundColor,
        color: selectedIconLabelColor,
    } = approvalStatusColorMapper[iconName];

    return (
        <div style={mainContainer(selectedIconBackgroundColor, width, height)}>
            <SelectedIcon />
            <div style={iconLabelStyle(selectedIconLabelColor)}>{selectedIconLabel}</div>
        </div>
    );
};

export default ApprovalStatusView;
