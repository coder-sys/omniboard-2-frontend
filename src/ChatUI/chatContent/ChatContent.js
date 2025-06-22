import React, { Component, useState, createRef, useEffect } from "react";

import "./chatContent.css";
import Avatar from "../chatList/Avatar";
import ChatItem from "./ChatItem";
import ScaleLoader  from "react-spinners/ScaleLoader";

const DOMAIN = 'https://25xdhfsbmi.execute-api.us-east-2.amazonaws.com/prod'
export default class ChatContent extends Component {
  messagesEndRef = createRef(null);
  chatItms = [
    {
      key: 1,
      image:
        "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
      type: "other",
      msg: "Hi, I'm Omniboard, how can I help you?",
    },
    
  ];

  constructor(props) {
    super(props);
    this.state = {
      chat: this.chatItms,
      msg: "",
      loading:"false"
    };
  }

  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {
    window.addEventListener("keydown", async(e) => {
      if (e.keyCode == 13) {
        if (this.state.msg != "") {
          
          this.setState({ loading:"true"})

          this.chatItms.push({
            key: 1,
            type: "",
            msg: this.state.msg,
            image:
              "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
          });
          let api = await fetch(`${DOMAIN}/response_ai/${e.target.value.replace('/',' ')}`)
              api = await api.json()
              console.log(this.state.loading)
          this.setState({ chat: [...this.chatItms] });
          this.setState({ msg: "" });
                /*  Response 
                Perform API Call
                change load state
                */ 
              
          this.chatItms.push({
            key: 2,
            type: "other",
            msg: api['data'],
            image:
              "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
          });
          this.setState({ chat: [...this.chatItms] });
          this.scrollToBottom();
          this.setState({ msg: "" });
        }
        this.setState({ loading:"false" })
        /*Change load state */
      }
    });
  }
  onStateChange = (e) => {
    this.setState({ msg: e.target.value });
  };

  render() {
    return (
      <div className="main__chatcontent">
        <div className="content__header">
          <div className="blocks">
            <div className="current-chatting-user">
              <Avatar
                isOnline="active"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU"
              />
              <p>Omniboard</p>
            </div>
          </div>

          <div className="blocks">
            <div className="settings">
            {[1].map((data)=>{
          if(this.state.loading==='true'){
          return(<ScaleLoader color="#A020F0" />
          )
          }
          })}
            </div>
          </div>
        </div>
        <div className="content__body">
          
        
          <div className="chat__items"><br></br><br></br>
            {this.state.chat.map((itm, index) => {
              return (
                <ChatItem
                  animationDelay={index + 2}
                  key={itm.key}
                  user={itm.type ? itm.type : "me"}
                  msg={itm.msg}
                  image={itm.image}
                />
              );
            })}
            <div ref={this.messagesEndRef} />
          </div>
        </div>
        <div className="content__footer">
          <div className="sendNewMessage">
           
            <input
              type="text"
              placeholder="Type a message here"
              onChange={this.onStateChange}
              value={this.state.msg}
            />
          
          </div>
        </div>
      </div>
    );
  }
}
