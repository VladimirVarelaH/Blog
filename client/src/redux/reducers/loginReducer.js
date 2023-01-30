const initialState = {
    jwt: '',
    is_loged: true
}

const loginReducer = (state = initialState, action)=>{
    switch (action.type){
        case 'LOGIN':
            return {
                ...state,
                jwt: action.payload.jwt,
                is_loged: action.payload.is_loged
            }
        default:
            return state;
    }
}

export default loginReducer;