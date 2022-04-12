export const authUserLogin = (data) => {
  return {
    type: "USER_LOGIN_SUCCESS",
    payload: data,
  };
};

export const authUserLogout = () => {
  localStorage.removeItem("token_shutter");
  return {
    type: "USER_LOGOUT_SUCCESS",
  };
};
