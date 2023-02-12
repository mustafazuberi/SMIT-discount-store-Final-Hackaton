const isAdmin = false

const reducers = (state = isAdmin, action) => {
    if (action.type === 'isAdmin') {
        return action.payload
    }
    else {
        return state
    }
}
export default reducers