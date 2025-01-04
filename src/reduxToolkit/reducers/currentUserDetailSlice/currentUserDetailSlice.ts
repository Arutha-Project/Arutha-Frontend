import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export interface CurrentUserDetail {
  id: number;
  profileName: string;
  dob: string;
  gender: string;
  contactNumber: string;
  email: string;
  sexuality: string;
  ethnicity: string;
  religion: string;
  role: string;
  permissionsList: string[];
  selectedRegions: string[];
  regionList: string[];
  userSignatureImageId: number;
  profilePictureId: any
}

export interface CurrentUserDetailSliceState {
  userDetail: CurrentUserDetail;
}

const initialState: CurrentUserDetailSliceState = {
  userDetail: {
    id: 0,
    profileName: '',
    dob: '',
    gender: '',
    contactNumber: '',
    email: '',
    sexuality: '',
    ethnicity: '',
    religion: '',
    role: '',
    permissionsList: [],
    selectedRegions: [],
    regionList: [],
    userSignatureImageId: 0,
    profilePictureId: 0,
  },
};

export const currentUserDetailSlice = createSlice({
  name: 'currentUserDetailSlice',
  initialState,
  reducers: {
    updateCurrentUserDetail: (state, action: PayloadAction<CurrentUserDetailSliceState>) => {
      state.userDetail = action.payload.userDetail;
    },
    clearCurrentUserDetail: (state) => {
      state.userDetail = initialState.userDetail;
    },
  },
});

export const { updateCurrentUserDetail, clearCurrentUserDetail } = currentUserDetailSlice.actions;

export const currentUserDetailSelector = (state: RootState) =>
  state.currentUserDetailReducer.userDetail;

export default currentUserDetailSlice.reducer;
