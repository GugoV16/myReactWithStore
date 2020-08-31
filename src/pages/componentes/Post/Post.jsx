import React from "react";
import {Card} from "react-bootstrap";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";

const Post = (props) => {
    const {item, users} = props
    const user = users.find(obj => obj.id === item.userId)
    return (
        <Card key={item.id}>
            <Card.Body className='d-flex flex-column align-items-start' >
                <Card.Subtitle className='mb-3 text-secondary' ><NavLink to={'/User/' + item.userId}>@{user && user.username}</NavLink></Card.Subtitle>
                <Card.Title className='text-capitalize'>{item.title}</Card.Title>
                <Card.Text className='flex-grow-1'>
                    {item.body}
                </Card.Text>
                <NavLink to={'/posts/' + item.id} className='mt-auto btn btn-primary'>Go to post</NavLink>
            </Card.Body>
        </Card>
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps, null)(Post)