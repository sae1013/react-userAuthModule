import React from 'react'
import ReactDOM from 'react-dom';
import classes from './AuthModal.module.css';
import Modal from './Modal';
function AuthModal(props) { // 상태값에 따라 내용 만들고, Modal안에 넣어주면됨
    const {onShowModal,status,data,error,isLogin} = props
    
    let content;
    if(!isLogin){ //회원가입 모듈일때
        if(status === 'pending'){
            content = <div className={classes.content}>
                <p>Loading...</p>
            </div>
        }
        if(error){
            content = <div className={classes.content}>
            <p>{error}</p>
            <div className={classes.action}>
                    <button onClick={onShowModal}>확인</button>
            </div>
        </div>
        }

        if(data && !error){
        
            content = (
            <div className={classes.content}>
                <p>회원가입이 완료 되었습니다.</p>
                <div className={classes.action}>
                    <button onClick={onShowModal}>확인</button>
                </div>
            </div>
            )
        }
    }
    if(isLogin){ // 로그인 모듈일때
        if(status === 'pending'){
            content = <div className={classes.content}>
                <p>Loading...</p>
            </div>
        }
        if(error){
            content = <div className={classes.content}>
            <p>로그인 실패</p>
            <p>{error}</p>
            <div className={classes.action}>
                    <button onClick={onShowModal}>확인</button>
            </div>
        </div>
        }

        if(data && !error){
        
            content = (
            <div className={classes.content}>
                <p>로그인 성공</p>
                <div className={classes.action}>
                    <button onClick={onShowModal}>확인</button>
                </div>
            </div>
            )
        }
    }    
    
    return (
        <div>
            <Modal>
                {content}
            </Modal>
        </div>
    )
}

export default AuthModal
