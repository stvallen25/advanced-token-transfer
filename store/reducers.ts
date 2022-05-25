import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  walletAddress: '',
  ethBalance: 0,
  daiBalance: 0,
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setWalletAddress: (state, action) => {
      state.walletAddress = action.payload;
    },

    setDaiBalance: (state, action) => {
      state.daiBalance = action.payload;
    },

    setEthBalance: (state, action) => {
      state.ethBalance = action.payload;
    },
  },
});

// Action creators are generate for each case reducer function
export const { setWalletAddress, setDaiBalance, setEthBalance } =
  accountSlice.actions;

export default accountSlice.reducer;
