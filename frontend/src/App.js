import React, { Component } from "react";
import { connect, sendMsg } from "./api";
import Header from "./components/Header/Header";
import ChatHistory from "./components/ChatHistory/ChatHistory";
import ChatInput from "./components/ChatInput/ChatInput";
import Auth from "./components/Auth/Auth";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatHistory: [],
      auth: false,
      userName: ""
    }
  }

  componentDidMount() {
    connect((msg) => {
      console.log("New Message")
      this.setState(prevState => ({
        chatHistory: [...this.state.chatHistory, msg]
      }))
      console.log(this.state);
    });
  }

  handleAuth = userName => {
    sendMsg(userName);
    this.setState({ userName: userName, auth: true })
  }

  sendMessage(event) {
    if(event.keyCode === 13) {
      let sender = this.state.userName
      sendMsg(sender, event.target.value);
      event.target.value = "";
    }
  }

  render() {
    if (this.state.auth) {
      return (
        <div className="App">
          <Header />
          <ChatHistory chatHistory={this.state.chatHistory} />
          <ChatInput userName={this.state.userName} />
        </div>
      );
    } else {
      return (
        <div className="Auth">
          <Header />
          <Auth send={this.handleAuth} />
        </div>
        );
    }

  }
}

export default App;