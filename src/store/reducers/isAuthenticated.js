const isLoggined = false;

const reducers = (state = isLoggined, action) => {
  if (action.type === "firebaseLoggined") {
    return action.payLoad;
  } else {
    return state;
  }
};
export default reducers;
