import React, { Component } from "react";
import "./Auth.scss";

class Auth extends Component {

    handleAuthChange = event => {
        if (event.keyCode === 13) {
            this.props.send(event.target.value)
            return (event.target.value)
        }
    }

    render() {
        return (
            <div className="Auth">
                <h1>Enter your username:</h1>
                <input onKeyDown={this.handleAuthChange} />
            </div>
        );
    }
}

export default Auth;