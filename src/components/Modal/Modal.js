import React from 'react'
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

const portalElement = document.querySelector('#overlays');

const Backdrop = (props) => {
    return <div className={classes.backdrop}></div>
}

const ModalOverlay = (props) => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    )
}
function Modal(props) {

    return (
        <React.Fragment>
            {ReactDOM.createPortal(<Backdrop/>,portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,portalElement)}
        </React.Fragment>
        
    )
}

export default Modal
