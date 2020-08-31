import React, {Component} from "react";
import {connect} from "react-redux";
import {initPost} from "../../Store/posts/actions";
import Post from "../componentes/Post/Post";
import Loading from "../componentes/Loading/Loading";
import {initUsers} from "../../Store/users/actions";
import classes from './Main.module.css'


class Posts extends Component {
    state = {
        posts: this.props.posts,
        loading: false
    }

    async componentDidMount() {
        const {
            getInitPosts,
            getInitUsers
        } = this.props

        await this.setState({
            loading: true
        })

        if (this.props.posts.length === 0) {
            await setTimeout(() => {
                fetch('https://jsonplaceholder.typicode.com/posts/?_limit=100')
                    .then(response => response.json())
                    .then(json => {
                        getInitPosts(json)
                    })
            })
        }

        if(this.props.users.length === 0) {
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

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextProps.posts !== this.state.posts) {
            this.setState({
                posts: nextProps.posts
            })
            return true
        }
        return false
    }

    render() {
        const {posts} = this.state
        return (
            <>
                {this.state.loading && <Loading/>}
                <div className={'d-flex flex-wrap justify-content-between mx-auto ' + classes.post_keeper}>
                    {posts.map(t => (
                        <Post key={t.id} item={t}/>
                    ))}
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts,
        users: state.users
    }
}

const mapActionsToProps = (dispatch) => {
    return {
        getInitPosts: payload => dispatch(initPost(payload)),
        getInitUsers: payload => dispatch(initUsers(payload))
    }
}

export default connect(mapStateToProps, mapActionsToProps)(Posts)