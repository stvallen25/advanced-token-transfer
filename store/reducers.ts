import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  walletAddress: '',
  tokens: [],
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setWalletAddress: (state, action) => {
      state.walletAddress = action.payload;
    },
  },
});

// Action creators are generate for each case reducer function
export const { setWalletAddress } = accountSlice.actions;

export default accountSlice.reducer;
