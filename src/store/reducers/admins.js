const adminsData = [];

const reducers = (state = adminsData, action) => {
  if (action.type === "adminData") {
    return action.payload;
  } else {
    return state;
  }
};
export default reducers;
