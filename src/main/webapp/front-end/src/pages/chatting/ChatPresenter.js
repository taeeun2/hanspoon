import * as React from "react";
import "./ChatPresenter.scss";
import { Button, Input } from "antd";
import { message } from "./ChatContainer";

const ChatPresenter = ({
    contents,
    message,
    username,
    setMessage,
    setUsername,
    handleEnter,
  }) => {
    return (
        <div className={"chat-box"}>
        <div className='header'>
          유저이름 : 
          <Input
            style={{flex : 1}}
            value={username}
            onChange={e=>setUsername(e.target.value)}
          />
        </div>
        <div className={"contents"}>
          {contents.map((message) => (
            //message.userId 체크 후 textAlign right or left 정하기
            <div>{message.username} : {message.content} </div>
          ))}
        </div>
        <div>
          <Input.Search
            placeholder="input your messages..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onSearch={(value) => handleEnter(username,value)}
            enterButton={"Enter"}
          />
        </div>
      </div>
    );
};

export default ChatPresenter;