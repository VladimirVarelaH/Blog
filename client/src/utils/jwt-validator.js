// import axios from 'axios';

const jwtValidator = (jwt)=>{
    jwt = jwt?jwt:localStorage.getItem('__token');
    // axios.defaults.headers.common['_token'] = `${localStorage.getItem('__token')}`;
    // Add call to validation API
    if (jwt){
        return true;
    } else {
        localStorage.setItem('__token', '');
        return false;
    }
}
export default jwtValidator;
