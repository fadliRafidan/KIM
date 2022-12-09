const initialState = {
    token: null,
    user: {
        name: '',
        status: ''
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user,
            }
        case 'LOGOUT':
            return {
                ...initialState
            }
        case 'SET_USER':
            return {
                ...state,
                user: action.payload,
            }
        
        default:
            return state;
    }
}