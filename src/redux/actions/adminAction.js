export const authAdminLogin = (data) => {
  return {
    type: "ADMIN_LOGIN_SUCCESS",
    payload: data,
  };
};

export const authAdminLogout = () => {
  localStorage.removeItem("token_shutter_admin");
  return {
    type: "ADMIN_LOGOUT_SUCCESS",
  };
};
