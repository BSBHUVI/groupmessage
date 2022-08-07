import React from 'react'
import './App.css'

function Chat({chat,name}) {
 
  return (

    <div className='container1'>
    {chat.map((chats)=>{
        return <div  className={`chat ${chats.user===name && "chatrecieved"}`}>
        <span className='user'>{chats.user}</span>
        <span className='mess'>{chats.message}</span>
        
        <span className='time'>{chats.Time}</span>
        </div>
    })}
      
    </div>
  )
}

export default Chat
