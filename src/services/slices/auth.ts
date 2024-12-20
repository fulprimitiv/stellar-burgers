import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';

interface IngredientsState {
  user: TUser;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | undefined;
}

const initialState: IngredientsState = {
  user: { name: '', email: '' } as TUser,
  isAuthenticated: false,
  loading: false,
  error: undefined
};

export const fetchLoginUser = createAsyncThunk(
  'user/loginUser',
  async (data: TLoginData) => loginUserApi(data)
);

export const fetchRegisterUser = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData) => registerUserApi(data)
);

export const fetchGetUser = createAsyncThunk('user/getUser', async () =>
  getUserApi()
);

export const fetchUpdateUser = createAsyncThunk(
  'user/updateUser',
  async (data: Partial<TRegisterData>) => updateUserApi(data)
);

export const fetchLogoutUser = createAsyncThunk('user/logoutUser', async () =>
  logoutApi()
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    removeErrorText(state) {
      state.error = '';
    }
  },
  selectors: {
    selectLoading: (state) => state.loading,
    selectUser: (state) => state.user,
    selectIsAuthenticated: (state) => state.isAuthenticated,
    selectErrorText: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLoginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message!;
      })
      .addCase(fetchLoginUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(fetchRegisterUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRegisterUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message!;
      })
      .addCase(fetchRegisterUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(fetchGetUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGetUser.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = { name: '', email: '' };
      })
      .addCase(fetchGetUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user.name = action.payload.user.name;
        state.user.email = action.payload.user.email;
        state.isAuthenticated = true;
      })
      .addCase(fetchLogoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLogoutUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchLogoutUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success) {
          state.user = { name: '', email: '' };
          state.isAuthenticated = false;
        }
      })
      .addCase(fetchUpdateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUpdateUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success) {
          state.user.name = action.payload.user.name;
          state.user.email = action.payload.user.email;
        }
      });
  }
});

export const { removeErrorText } = authSlice.actions;
export const {
  selectLoading,
  selectUser,
  selectIsAuthenticated,
  selectErrorText
} = authSlice.selectors;

export default authSlice.reducer;
