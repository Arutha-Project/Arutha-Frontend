import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export interface NotificationDetailsSliceState {
  userNotifications: any[];
  isFetchingUserNotifications: boolean;
}

const initialState: NotificationDetailsSliceState = {
  userNotifications: [],
  isFetchingUserNotifications: false,
};

export const userNotificationsSlice = createSlice({
  name: 'userNotificationsSlice',
  initialState,
  reducers: {
    setUserNotifications: (state, action: PayloadAction<NotificationDetailsSliceState>) => {
      state.userNotifications = action.payload.userNotifications;
      state.isFetchingUserNotifications = action.payload.isFetchingUserNotifications;
    },
    clearUserNotifications: (state) => {
      state.userNotifications = initialState.userNotifications;
      state.isFetchingUserNotifications = initialState.isFetchingUserNotifications;
    },
    removeUserNotification: (state, action: PayloadAction<number>) => {
      state.userNotifications = state.userNotifications.filter(
        (notification) => notification['id'] !== action.payload
      );
    },
    setNotificationRead: (state, action: PayloadAction<number>) => {
      const index = state.userNotifications.findIndex(
        (notification) => notification.id === action.payload
      );
      if (index !== -1) {
        state.userNotifications[index].isRead = true;
      }
    },
  },
});

export const { 
  setUserNotifications, 
  clearUserNotifications, 
  removeUserNotification, 
  setNotificationRead 
} = userNotificationsSlice.actions;

export const userNotificationsSelector = (state: RootState) => {
  return {
    userNotifications: state.userNotificationsReducer.userNotifications,
    isFetchingUserNotifications: state.userNotificationsReducer.isFetchingUserNotifications,
  };
};

export default userNotificationsSlice.reducer;
