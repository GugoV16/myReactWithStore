import React from "react";
import classes from './Loading.module.css'
import {Spinner} from "react-bootstrap";

const Loading = () => {
    return (
        <div className={classes.loading + ' d-flex justify-content-center align-items-center'} >
            <Spinner animation="grow" variant='secondary' />
        </div>
    )
}

export default Loading