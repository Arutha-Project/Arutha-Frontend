import { RootState } from '../../store';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface AuthTokensSliceState {
  accessToken: string;
}

const initialState: AuthTokensSliceState = {
  accessToken: '',
};

export const authTokensSlice = createSlice({
  name: 'authTokensSlice',
  initialState,
  reducers: {
    setAuthToken: (state, action: PayloadAction<AuthTokensSliceState>) => {
      state.accessToken = action.payload.accessToken;
    },
    clearAllAuthTokens: (state) => {
      state.accessToken = '';
    },
  },
});

export const { setAuthToken, clearAllAuthTokens } = authTokensSlice.actions;

export const accessTokenSelector = (state: RootState) => state.authTokenReducer.accessToken;

export default authTokensSlice.reducer;
