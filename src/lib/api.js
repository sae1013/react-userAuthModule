import dotenv from 'dotenv';
dotenv.config();

const APIKEY = process.env.REACT_APP_API_KEY;

export const UserAuthSend = async(params,isLogin) => {
    try{
        const reqUrl = isLogin ? 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
        :'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
        
        const response = await fetch(`${reqUrl}${APIKEY}`,{
            method:'POST',
            body:JSON.stringify({
                email:params.email,
                password:params.password,
                returnSecureToken:true 
            }),
            header:{
                'Content-Type':'application/json'
            }
        });
        const data = await response.json(); 
        if(data.error){
            throw new Error(data.error.message);
        }
        return data;
    }
    catch(err){
        throw new Error(err.message);
    }
};

    
