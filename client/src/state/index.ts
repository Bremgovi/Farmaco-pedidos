import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialStateTypes {
  isSidebarCollapsed: boolean;
  isDarkMode: boolean;
  success: boolean;
  userInfo: {}; 
  userToken: string | null;
}

const initialState: InitialStateTypes = {
  isSidebarCollapsed: false,
  isDarkMode: false,
  userInfo: {},
  userToken: null,
  success: false,
};

export const logout = createAction("logout");
export const login = createAction<{ userInfo: {}; userToken: string }>("login");

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCollapsed = action.payload;
    },
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
    setUserToken: (state, action: PayloadAction<string>) => {
      state.userToken = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<{}>) => {
      state.userInfo = action.payload;
    },
    logoutUser: (state) => {
      state.userToken = null;
      state.userInfo = {};
    },
  },
  extraReducers(builder) {
    builder
      .addCase(logout, (state) => {
        return initialState;
      })
      .addCase(login, (state, action) => {
        state.userInfo = action.payload.userInfo;
        state.userToken = action.payload.userToken;
      });
  },
});

export const { setIsSidebarCollapsed, setIsDarkMode, setUserToken, setUserInfo, logoutUser } = globalSlice.actions;

export default globalSlice.reducer;
