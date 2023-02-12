export const sendAdminData = (data) => {
  return (dispatch) => {
    dispatch({
      type: "adminData",
      payload: data,
    });
  };
};

export const isAuthenticatedData = (is) => {
  return (dispatch) => {
    dispatch({
      type: "firebaseLoggined",
      payLoad: is,
    });
  };
};

export const admintExists = (is) => {
  return (dispatch) => {
    dispatch({
      type: "isAdmin",
      payload: is,
    });
  };
};

export const authData = (auth) => {
  return (dispatch) => {
    dispatch({
      type: "firebaseAuth",
      payload: auth,
    });
  };
};
