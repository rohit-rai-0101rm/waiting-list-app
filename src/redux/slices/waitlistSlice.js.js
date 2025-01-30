import { createSlice } from "@reduxjs/toolkit";

const loadFromLocalStorage = () => {
  const data = localStorage.getItem("waitingList");
  return data ? JSON.parse(data) : [];
};

const initialState = {
  users: loadFromLocalStorage(),
};

const validInviteCodes = ["austin234", "alvin145", "karthik321"];

const waitlistSlice = createSlice({
  name: "waitlist",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const { name, inviteCode } = action.payload;
      const isValidCode = validInviteCodes.includes(inviteCode);

      const newUser = {
        id: name + Math.random().toString(36).substr(2, 9),
        name,
        inviteCode: isValidCode ? inviteCode : null,
        isInvited: isValidCode,
      };

      const invitedUsers = state.users.filter((user) => user.isInvited);
      const generalUsers = state.users.filter((user) => !user.isInvited);

      if (isValidCode) {
        invitedUsers.push(newUser);
      } else {
        generalUsers.push(newUser);
      }

      state.users = [...invitedUsers, ...generalUsers];

      localStorage.setItem("waitingList", JSON.stringify(state.users));
    },
  },
});

export const { addUser } = waitlistSlice.actions;
export default waitlistSlice.reducer;
