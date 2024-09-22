import { Color, DEFAULT_TICKET_STATUS_STYLES, Intensity, getThemeColor } from '@theme';
import { iconLabelStyle, mainContainer } from './TicketStatusStyle';
import {
    Clock as ClockIcon,
    TickCircle as TickCircleIcon,
    CloseCircle as CloseCircleIcon,
    DirectUp as DirectUpIcon,
} from 'iconsax-react';
import React from 'react';

export interface StatusProps {
    iconName: TicketStatusValues;
    width?: string;
    height?: string;
}

export enum TicketStatus {
    Open = 'open',
    Closed = 'closed',
    OnHold = 'onHold',
    Assigned = 'assigned',
}

export type TicketStatusKeys = keyof typeof TicketStatus;

export type TicketStatusIconStyleType = {
    label: string;
    backgroundColor: string;
    color: string;
    Icon: React.FC;
};

export type TicketStatusValues = (typeof TicketStatus)[keyof typeof TicketStatus];

const ticketStatusColorMapper: Record<TicketStatusValues, TicketStatusIconStyleType> = {
    [TicketStatus.Assigned]: {
        label: 'Assigned',
        backgroundColor: getThemeColor(Color.primaryColor, Intensity.Soft),
        color: getThemeColor(Color.primaryColor, Intensity.Bold),
        Icon: () => <ClockIcon size={18} color={getThemeColor(Color.primaryColor, Intensity.Bold)} />,
    },
    [TicketStatus.Closed]: {
        label: 'Closed',
        backgroundColor: getThemeColor(Color.successColor, Intensity.Soft),
        color: getThemeColor(Color.successColor, Intensity.Bold),
        Icon: () => <TickCircleIcon size={18} color={getThemeColor(Color.successColor, Intensity.Bold)} />,
    },
    [TicketStatus.OnHold]: {
        label: 'On Hold',
        backgroundColor: getThemeColor(Color.dangerColor, Intensity.Soft),
        color: getThemeColor(Color.dangerColor, Intensity.Bold),
        Icon: () => <CloseCircleIcon size={18} color={getThemeColor(Color.dangerColor, Intensity.Bold)} />,
    },
    [TicketStatus.Open]: {
        label: 'Open',
        backgroundColor: getThemeColor(Color.upcomingColor, Intensity.Soft),
        color: getThemeColor(Color.upcomingColor, Intensity.Bold),
        Icon: () => <DirectUpIcon size={18} color={getThemeColor(Color.upcomingColor, Intensity.Bold)} />,
    },
};

const TicketStatusView: React.FC<StatusProps> = ({
    iconName,
    width,
    height = DEFAULT_TICKET_STATUS_STYLES.HEIGHT,
}) => {
    const {
        Icon: SelectedIcon,
        label: selectedIconLabel,
        backgroundColor: selectedIconBackgroundColor,
        color: selectedIconLabelColor,
    } = ticketStatusColorMapper[iconName];

    return (
        <div style={mainContainer(selectedIconBackgroundColor, width, height)}>
            <SelectedIcon />
            <div style={iconLabelStyle(selectedIconLabelColor)}>{selectedIconLabel}</div>
        </div>
    );
};

export default TicketStatusView;
