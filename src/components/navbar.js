import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Route, Link } from 'react-router-dom'
import logo from '../logo.svg';
import '../App.css';
import axios from 'axios'

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this)
    }

    logout(event) {
        event.preventDefault()
        console.log('logging out')
        axios.get('/user/logout').then(response => {
            console.log(response.data); // Only for debugging
            if (response.status === 200) {
                this.props.updateUser({
                    loggedIn: false,
                    username: null
                })
            }
        }).catch(error => {
            console.log('Error in Logging out');
        })
    }



    render() {
        const loggedIn = this.props.loggedIn;

            const imageStyle = {
                width: 100
            }
        return (
            <div>
                <header className="navbar App-header" id="nav-container">
                    {/* the below div will hold the section for home login signup */}
                    <div className="col-4">
                        {loggedIn ? (
                            <section className="navbar-section">
                                <Link to="#" className="btn btn-link text-secondary" onClick={this.logout}>
                                    <span className="text-secondary">Logout</span>
                                </Link>

                            </section>
                        ) : (
                  
                            <section className="navbar-section">
                                {/* <Link to="/" className="btn btn-link text-secondary" >
                                    <span className="text-secondary">Home</span>
                                    </Link> */}
                                <Link to="/login" className="btn btn-link text-secondary" >
                                    <span className="text-secondary">Login</span>
                                    </Link>
                                <Link to="/Signup" className="btn btn-link text-secondary" >
                                    <span className="text-secondary">Signup</span>
                                    </Link>
                                    <Link to="/uml" className="btn btn-link text-secondary" >
                                    <button className="text">What is UML?</button>
                                    </Link>
                            </section>
                            
                        )}
                        
                        <Link to="/" className="btn btn-link text-secondary" >
                                    <span className="text-secondary"><img style={imageStyle} src='logo.png'/></span>
                                    </Link> 
                                    
                        {/* <div> <img style={imageStyle} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRaXh77ncNJPRn_z7XNWG3C1jWA6KG7dFphA&usqp=CAU'/> NAME</div>
                         */}
                </div>
                    {/* <div className="col-4 col-mr-auto">
                            <div id="top-filler"></div>
                                <img src={logo} className="App-logo" alt="logo"/>
                                <h1 className="App-title">MERN Passport bcrypt express-session Auth</h1>
                        </div> */}
                </header>
            </div>
        );
    }
}


export default Navbar;

/* 1> this.props.loggedIn - loggedIn is a state in App.js and I am passing it down in App.js to Navbar component with

<Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />


2> https://picturepan2.github.io/spectre/layout.html#navbar

The navbar component can include logo brand, nav links and buttons, search box or any combination of those elements. Each section with the navbar-section class will be evenly distributed in the container.

"proxy": {
    "/user": {
      "target": "http://localhost:8080/user",
      "secure": false
    }
  }

*/