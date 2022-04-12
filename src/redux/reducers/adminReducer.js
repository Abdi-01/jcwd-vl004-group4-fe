const INIT_STATE = {
  id: null,
  email: "",
  username: "",
  password: "",
  createdAt: "",
  updatedAt: "",
};

export const authAdminLogin = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "ADMIN_LOGIN_SUCCESS":
      return { ...state, ...action.payload };
    case "ADMIN_LOGOUT_SUCCESS":
      return { ...INIT_STATE };
    default:
      return state;
  }
};
