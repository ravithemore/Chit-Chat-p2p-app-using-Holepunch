import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
};

export const user = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setUserName: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.userName = action.payload;
      //   console.log("state", action);
    },
    logout: () => {
      // From here we can take action only at this "counter" state
      // But, as we have taken care of this particular "logout" action
      // in rootReducer, we can use it to CLEAR the complete Redux Store's state
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserName, logout } = user.actions;

export default user.reducer;
