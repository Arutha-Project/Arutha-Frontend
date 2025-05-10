import { NotificationInstance } from "antd/es/notification/interface";

export enum NotificationTypeIndex {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
}

export type NotificationType =
  | NotificationTypeIndex.SUCCESS
  | NotificationTypeIndex.ERROR
  | NotificationTypeIndex.WARNING;

export const CommonErrorNotificationNotes = {
  systemError: 'Please contact system administrator.',
  validationError: 'Invalid input provided.',
};

export type openNotificationType = (
  type: NotificationType,
  message: string,
  notice: string
) => void;

export const ApprovalUserType = {
  REQUEST_FROM: 'request_from',
  REQUEST_BY: 'request_by',
};

export const commonNotificationBody = (
  alertApi: NotificationInstance,
  type: NotificationType,
  message: string,
  description: React.ReactNode,
  duration = 4
) => {
  const notificationObject = { message: message, description: description, duration: duration };
  if (type == NotificationTypeIndex.SUCCESS) {
    alertApi.success(notificationObject);
  } else if (type == NotificationTypeIndex.ERROR) {
    alertApi.error(notificationObject);
  } else if (type == NotificationTypeIndex.WARNING) {
    alertApi.warning(notificationObject);
  }
};