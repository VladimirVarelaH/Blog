const LOGIN = 'LOGIN';

const logIn = (jwt, is_loged)=>{
    return {
        type: LOGIN,
        payload: {
            jst,
            is_loged
        }
    }
}

export default logIn;