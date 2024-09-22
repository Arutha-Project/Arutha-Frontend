// Icons load
import {
  ApplyFilterTickIcon,
  ApprovalIcon,
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowSquareDown,
  ArrowUpIcon,
  CalendarIcon,
  DashboardIcon,
  DeleteIcon,
  DisabledIcon,
  DocumentForwardIcon,
  DocumentStoreIcon,
  DoneIcon,
  EditIcon,
  FilterAddIcon,
  LogoutIcon,
  MoreIcon,
  OutstandingIcon,
  PendingIcon,
  PrintIcon,
  PrinterIcon,
  RecordsIcon,
  SVGIconProps,
  SortIcon,
  SuccessIcon,
  SunbeamLogoIcon,
  TicketIcon,
  UpcomingIcon,
  UsersIcon,
  EditIcon2,
  DeleteIcon2,
  VerifyIcon,
  NotificationBingIcon,
  CornerDownRightArrowIcon,
  LockIcon,
} from '@components/atoms/Icon/SVGs';

// When adding a static icon make sure to add the name in the enum
enum IconTypes {
  SunbeamLogoIcon = 'SunbeamLogoIcon',
  DashboardIcon = 'DashboardIcon',
  UsersIcon = 'UsersIcon',
  RecordsIcon = 'RecordsIcon',
  DocumentStoreIcon = 'DocumentStoreIcon',
  ApprovalIcon = 'ApprovalIcon',
  LogoutIcon = 'LogoutIcon',
  TicketIcon = 'TicketIcon',
  DisabledIcon = 'DisabledIcon',
  DoneIcon = 'DoneIcon',
  OutstandingIcon = 'OutstandingIcon',
  PendingIcon = 'PendingIcon',
  SuccessIcon = 'SuccessIcon',
  UpcomingIcon = 'UpcomingIcon',
  EditIcon = 'EditIcon',
  DeleteIcon = 'DeleteIcon',
  PrintIcon = 'PrintIcon',
  DocumentForwardIcon = 'DocumentForwardIcon',
  ArrowDownIcon = 'ArrowDownIcon',
  ArrowUpIcon = 'ArrowUpIcon',
  SortIcon = 'SortIcon',
  MoreIcon = 'MoreIcon',
  ArrowLeftIcon = 'ArrowLeftIcon',
  ArrowRightIcon = 'ArrowRightIcon',
  ArrowSquareDown = 'ArrowSquareDown',
  CalendarIcon = 'CalendarIcon',
  ApplyFilterTickIcon = 'ApplyFilterTickIcon',
  FilterAddIcon = 'FilterAddIcon',
  PrinterIcon = 'PrinterIcon',
  EditIcon2 = 'EditIcon2',
  DeleteIcon2 = 'DeleteIcon2',
  VerifyIcon = 'VerifyIcon',
  NotificationBingIcon = 'NotificationBingIcon',
  CornerDownRightArrowIcon = 'CornerDownRightArrowIcon',
  LockIcon = 'LockIcon',
}

type IconKeys = keyof typeof IconTypes;

export interface IconProps {
  iconName: IconKeys;
  rootContainerStyle?: React.CSSProperties;
  iconStyle?: SVGIconProps;
  className?: string;
  handleOnClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export default function Icon({
  iconName,
  iconStyle,
  className,
  rootContainerStyle,
  handleOnClick,
}: IconProps) {
  const groupSvgByIconName: { [key in IconKeys]: React.FC<SVGIconProps> } = {
    SunbeamLogoIcon: SunbeamLogoIcon,
    DashboardIcon: DashboardIcon,
    UsersIcon: UsersIcon,
    RecordsIcon: RecordsIcon,
    DocumentStoreIcon: DocumentStoreIcon,
    ApprovalIcon: ApprovalIcon,
    LogoutIcon: LogoutIcon,
    TicketIcon: TicketIcon,
    DisabledIcon: DisabledIcon,
    DoneIcon: DoneIcon,
    OutstandingIcon: OutstandingIcon,
    PendingIcon: PendingIcon,
    SuccessIcon: SuccessIcon,
    UpcomingIcon: UpcomingIcon,
    EditIcon: EditIcon,
    DeleteIcon: DeleteIcon,
    PrintIcon: PrintIcon,
    DocumentForwardIcon: DocumentForwardIcon,
    ArrowDownIcon: ArrowDownIcon,
    ArrowUpIcon: ArrowUpIcon,
    SortIcon: SortIcon,
    MoreIcon: MoreIcon,
    ArrowLeftIcon: ArrowLeftIcon,
    ArrowRightIcon: ArrowRightIcon,
    ArrowSquareDown: ArrowSquareDown,
    CalendarIcon: CalendarIcon,
    ApplyFilterTickIcon: ApplyFilterTickIcon,
    FilterAddIcon: FilterAddIcon,
    PrinterIcon: PrinterIcon,
    EditIcon2: EditIcon2,
    DeleteIcon2: DeleteIcon2,
    VerifyIcon: VerifyIcon,
    NotificationBingIcon: NotificationBingIcon,
    CornerDownRightArrowIcon: CornerDownRightArrowIcon,
    LockIcon: LockIcon,
  };

  const CustomImportIcon = groupSvgByIconName[iconName];

  return (
    <div className={className} style={rootContainerStyle} onClick={handleOnClick}>
      <CustomImportIcon
        width={iconStyle?.width}
        height={iconStyle?.height}
        color={iconStyle?.color}
        // these colors is for sort icon
        downArrowColor={iconStyle?.downArrowColor}
        upArrowColor={iconStyle?.upArrowColor}
      />
    </div>
  );
}
