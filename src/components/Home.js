// home.js contains an image — it’s a page we’ll redirect to after login. It’s not authenticated. The username will display with a greeting if they are logged in.

import React, { Component } from 'react';

class Home extends Component {

    constructor() {
        super()
    }

    render() {
        const imageStyle = {
            width: 1300
        }
        return (
            <div>
              <span></span>
                <img style={imageStyle} src="https://d3n817fwly711g.cloudfront.net/uploads/2018/09/The-Easy-Guide-to-UML-Deployment-Diagrams.png" />
            </div>
        )
    }
}

export default Home;