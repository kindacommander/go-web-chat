import React, { Component } from "react";
import { sendMsg } from "../../api";
import "./ChatInput.scss";

class ChatInput extends Component {

    handleSend = event => {
        if(event.keyCode === 13) {
            sendMsg(this.props.userName, event.target.value);
            event.target.value = "";
          }
    }

    render() {
        return (
            <div className="ChatInput">
                <input onKeyDown={this.handleSend} />
            </div>
        );
    }
}

export default ChatInput;