import { createStore } from 'redux';
import { calculateRemaningTime } from '../utils/authFunctions';


let logoutTimer;

const retrieveStoredToken = ()=> {
    const storedToken = localStorage.getItem('loginToken');
    const storedExpirationTime = localStorage.getItem('expirationTime');

    const remainingDuration = calculateRemaningTime(storedExpirationTime);
    if(remainingDuration<600000){
        localStorage.removeItem('loginToken');
        localStorage.removeItem('expirationTime');
        return null
    } 
    
    setTimeout(() => {
        localStorage.removeItem('loginToken');
        localStorage.removeItem('expirationTime');
    }, remainingDuration);

    return storedToken
}
const initialToken = retrieveStoredToken();
const initialisLoggedIn = !!initialToken;

const initialState = {
    idToken : initialToken,
    isLoggedIn : initialisLoggedIn,
}


const loginReducer = (state = initialState,action) => {
    if(action.type ==='LOGIN'){
        const dispatch = action.payload.dispatch;
        const expirationTime = (new Date(new Date().getTime() + (+action.payload.expiresIn*1000))).toISOString();
        const remainingDuration = calculateRemaningTime(expirationTime);
        
        logoutTimer = setTimeout(()=>{
            dispatch({type:'LOGOUT'});
        },remainingDuration); 

        localStorage.setItem('loginToken',action.payload.idToken);
        localStorage.setItem('expirationTime',expirationTime);

        return {
            idToken:action.payload.idToken,
            isLoggedIn: true           
        }
    }   

    if(action.type === 'LOGOUT') {
        clearTimeout(logoutTimer); // 직접 로그아웃할경우 타임아웃해제
        localStorage.removeItem('loginToken');
        localStorage.removeItem('expirationTime');

        return {
            idToken:null,
            isLoggedIn:false
        }
    }    
    return state
}

const store = createStore(loginReducer);

export default store;