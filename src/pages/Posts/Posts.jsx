import React, {Component} from "react";
import {connect} from "react-redux";
import Loading from "../componentes/Loading/Loading";
import {initUsers} from "../../Store/users/actions";
import {initPost} from "../../Store/posts/actions";
import {Card} from "react-bootstrap";

// import classes from './Main.module.css'

class Posts extends Component {
    state = {
        user: this.props.user,
        post: this.props.state.posts.find(t => t.id === parseInt(this.props.match.params.id)),
        loading: false
    }

    async componentDidMount() {
        this.setState({
            loading: true
        })
        const {
            getInitPosts,
            getInitUsers
        } = this.props
        if (this.props.state.posts.length === 0) {
            await setTimeout(() => {
                fetch('https://jsonplaceholder.typicode.com/posts/?_limit=100')
                    .then(response => response.json())
                    .then(json => {
                        getInitPosts(json)
                    })
            })
        }
        if(this.props.state.users.length === 0) {
            await setTimeout(() => {
                fetch('https://jsonplaceholder.typicode.com/users/?_limit=10')
                    .then(response => response.json())
                    .then(json => {
                        getInitUsers(json)
                    })
            })
        }
        this.setState({
            loading: false
        })
    }

    async shouldComponentUpdate(nextProps) {
        if (nextProps.state !== this.props.state) {
            this.setState({
                post: await nextProps.state.posts.find(t => t.id === parseInt(nextProps.match.params.id))
            })
            return true
        }
        return false
    }

    render() {
        const {
            post, user
        } = this.state
        return (
            <>
                {this.state.loading && <Loading/>}
                <Card>
                    <Card.Body className='d-flex flex-column align-items-start' >
                        <Card.Subtitle className='mb-3 text-secondary' >{user && user.username}</Card.Subtitle>
                        <Card.Title className='text-capitalize'>{post ? post.title : 'loading...'}</Card.Title>
                        <Card.Text className='flex-grow-1'>
                            {post ? post.body : 'loading'}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state: state
    }
}
const mapActionsToProps = (dispatch) => {
    return {
        getInitPosts: payload => dispatch(initPost(payload)),
        getInitUsers: payload => dispatch(initUsers(payload))
    }
}


export default connect(mapStateToProps, mapActionsToProps)(Posts)