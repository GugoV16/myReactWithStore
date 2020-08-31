import React, {Component} from "react";
import {connect} from "react-redux";
import Loading from "../componentes/Loading/Loading";
import {initUsers} from "../../Store/users/actions";
import {initPost} from "../../Store/posts/actions";
import {NavLink} from "react-router-dom";

// import classes from './Main.module.css'

class User extends Component {
    state = {
        user: this.props.state.users.find(t => t.id === parseInt(this.props.match.params.id)),
        loading: true
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
        await this.setState({
            loading: false
        })
    }

    async shouldComponentUpdate(nextProps) {
        if (nextProps.state !== this.props.state) {
            this.setState({
                user: await nextProps.state.users.find(t => t.id === parseInt(nextProps.match.params.id))
            })
            return true
        }
        return false
    }

    render() {
        const {
            user
        } = this.state
        console.log(user)
        return (
            <>
                {this.state.loading && <Loading/>}
                <div className='row'>
                    <div className='col-3 position-fixed fixed-left'>
                        <h3>{user ? user.name : 'Loading...'}</h3>
                        <h4>{user ? '@' + user.username.toLowerCase() : 'Loading...'}</h4>
                        <address>
                            Lives at: {user ? user.address.city + ', ' + user.address.street : 'Loading...'} <br />
                            Works at: {user ? user.company.name : 'Loading...'} <br />
                            Phone number: <a href={"tel:" + (user && user.phone)}>{user && user.phone}</a> <br/>
                            Email: <a href={"mailto:" + (user && user.email)}>{user && user.email}</a> <br/>
                            Site: <a href={user && (user.website && user.website)}>{user && (user.website && user.website)}</a>
                        </address>
                    </div>
                    {user ? <ul className='col-9 ml-auto list-unstyled text-left pl-5'>
                        <h4>User's Posts:</h4>
                        {this.props.state.posts.filter(t => t.userId === user.id).map(item => {
                            return (
                                <li className='mb-2 border rounded p-3' key={item.id}>
                                    <NavLink to={'/posts/' + item.id} className='text-dark text-decoration-none'>
                                        <h5 className='mb-3'>{item.title}</h5>
                                        <p>{item.body.slice(0, 50)}...</p>
                                    </NavLink>
                                </li>
                            )
                        })}
                    </ul> : <h4 className='col-9'>Loading...</h4>}

                </div>
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


export default connect(mapStateToProps, mapActionsToProps)(User)