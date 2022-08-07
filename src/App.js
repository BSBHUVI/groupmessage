import { useEffect, useState } from 'react';
import './App.css';
import axios from './axios'
import Chat from './Chat';
import Pusher from 'pusher-js'

function App() {
  
  
const [status,setstatus]=useState(true);
  
  let t=new Date();
  let time=t.getHours()+":"+t.getMinutes()+":"+t.getSeconds();
  const [messages,setMessages]=useState("");
  const [chat,setChat]=useState([]);
  const[name,setName]=useState("");
 

 

 useEffect(()=>{
  axios.get('/messages/sync').then((response)=>{
    setChat(response.data);
  })
 },[])
 const entername=()=>{
  let namee=prompt("enter the name");
  setName(namee);
  setstatus(false);
 }
 const send=(e)=>{
  
     
  e.preventDefault();
  if(messages==="" && name===""){
    alert("enter the input");
  }else{
  axios.post('/messages/new',{
    user:name,
    message:messages,
    Time:time,
    recieved:true
  })
  setMessages("");
 
  }
 }
 useEffect(()=>{
  const pusher = new Pusher('7ce1e74809f4f8aa6fc5', {
    cluster: 'ap2'
  });

  const channel = pusher.subscribe('chat');
  channel.bind('inserted',(newMessage)=> {
       
    setChat([...chat,newMessage]);
  });
  return ()=>{
    channel.unbind_all();
    channel.unsubscribe();
  }

},[chat]);

  
  return (
<>
<button className={`button ${!status && "block"}`} onClick={entername}>Enter your Name</button>
  <div className={`container ${status && "block"}`}>


  <h1>Group Chat</h1>
  <Chat name={name} chat={chat}/>
    <form>
   
      <input placeholder='enter the chat' type="text" value={messages} onChange={(e)=>{e.preventDefault(); setMessages(e.target.value)} }/>
     <button className='but' onClick={send} >send</button>
    </form>
  </div>
</>
  );
}

export default App;
