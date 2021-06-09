import {createStore} from 'redux';

const initialState = {
    idToken:null,
    isLoggedIn :false
}

const loginReducer = (state = initialState,action) => {
    if(action.type ==='LOGIN'){
        return {
            idToken:action.payload,
            isLoggedin: true           
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