import {createStore} from 'redux';
import {useEffect} from 'react';
const initialToken = localStorage.getItem('loginToken');
const initialisLoggedIn = !!initialToken;
const initialState = {
    idToken : initialToken,
    isLoggedIn : initialisLoggedIn
}
const loginReducer = (state = initialState,action) => {
    if(action.type ==='LOGIN'){
        localStorage.setItem('loginToken',action.payload);
        return {
            idToken:action.payload,
            isLoggedIn: true           
        }
    }   

    if(action.type === 'LOGOUT') {
        return {
            idToken:null,
            isLoggedIn:false
        }
    }    
    return state
}

const store = createStore(loginReducer);

export default store;