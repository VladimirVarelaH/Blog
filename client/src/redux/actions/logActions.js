const LOGIN = 'LOGIN';

const logIn = (obj)=>{
    return {
        type: LOGIN,
        payload: {
            jwt:obj.jwt,
            is_loged:obj.is_loged
        }
    }
}

export default logIn;