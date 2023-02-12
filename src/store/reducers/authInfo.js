const myAuth = {};

const reducers = (state = myAuth, action) => {
  if (action.type === "firebaseAuth") {
    return action.payload;
  } else {
    return state;
  }
};

export default reducers;
