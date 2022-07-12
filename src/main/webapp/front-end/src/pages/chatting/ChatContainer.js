import * as React from "react";
import "./ChatContainer.scss";
import { message } from "antd";
import {useEffect} from "react";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import ChatPresenter from "./ChatPresenter";
import { useParams } from "react-router-dom";

let sockJS = new SockJS("http://172.27.1.33:8080/webSocket");
let stompClient = Stomp.over(sockJS);
stompClient.debug= () => {};


const ChatContainer = () => {

    //채팅 저장
    const [contents, setContents] = React.useState([]);
    const [username, setUsername] = React.useState('');
    const [message, setMessage] = React.useState("");

    const {room} = useParams();// 링크의 파라메타 받기
    

    useEffect(()=>{
        stompClient.connect({},()=>{
          stompClient.subscribe(`/topic/${room}`,(data)=>{
            const newMessage = JSON.parse(data.body);
            addMessage(newMessage);
          });
      });
      },[contents]);

      const handleEnter = (username, content) => {
        
        const newMessage ={username,content, room};
        stompClient.send(`/chat/${room}`,{},JSON.stringify(newMessage));
        setMessage("");
      };
      const addMessage = (message ) =>{
        setContents(prev=>[...prev, message]);
      };
    
    return (
        <div className={"container"}>
      <ChatPresenter
        contents={contents}
        handleEnter={handleEnter}
        message={message}
        setMessage={setMessage}
        username={username}
        setUsername={setUsername}
      />
    </div>
    );
};

export default ChatContainer;