import React from 'react';
import './App.module.css';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Header from "./partials/Header";
import Main from "./pages/Main/Main";
import Footer from "./partials/Footer";
import NotFound from "./pages/NotFound/NotFound";
import Posts from "./pages/Posts/Posts";
import About from "./pages/About/About";
import {Container} from "react-bootstrap";
import User from "./pages/User/User";


function App() {
    return (
        <div className="App">
            <Router>
                <Header/>
                <Container className='py-5'>
                    <Switch>
                        <Route path="/user/:id" component={User} />
                        <Route path="/posts/:id" component={Posts} />
                        <Route path="/about" component={About} />
                        <Route path="/" component={Main} />
                        <Route path='*' component={NotFound} />
                    </Switch>
                </Container>
                <Footer/>
            </Router>
        </div>
    );
}

export default App;
