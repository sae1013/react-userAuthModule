import React,{useReducer,useCallback} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
const authReducer = (state,action) => {
    
    if(action.type === 'SEND'){
        return {
            data:null,
            error:null,
            status:'pending'
        }        
    }
    if(action.type ==='SUCCESS'){
        return {
            data:action.payload,
            error:null,
            status:'completed'
        }
    }
    if(action.type ==='ERROR'){
        return {
            data:null,
            error:action.payload,
            status:'completed'
        }
    }
};

export const useUserAuth = (reqFunction,startWithPending,isLogin) => {
    const history = useHistory();
    const reduxDispatch = useDispatch();
    const [state,dispatch] = useReducer(authReducer,{
        status:startWithPending ? 'pending': null,
        data : null,
        error: null
    });

    const sendRequest = useCallback(async(reqParams)=>{
        dispatch({type:'SEND'});

        try{
            const data = await reqFunction(reqParams,isLogin);
            dispatch({type:'SUCCESS',payload:data});
            reduxDispatch({type:'LOGIN',payload:data.idToken});
            // localStorage.setItem('loginToken',data.idToken); redux/store로 이동
            history.replace('/');

        }catch(err){
            dispatch({type:'ERROR',payload:err.message});
        }
        
    },[isLogin]);
    
    return {
        ...state,sendRequest
    }
}
