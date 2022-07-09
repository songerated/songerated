import React from 'react'

import  {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import firebase from 'firebase/compat/app';
import { getFirestore } from "firebase/firestore";
import Button from '@mui/material/Button';
import 'firebase/compat/firestore';
import { useState } from 'react';
import { useRef } from 'react';
import './chatroom.css';


const auth =    firebase.auth();
const firestore = firebase.firestore();

const ChatRoom = () => {

    const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header>
        <h1>⚛️🔥💬</h1>
        <SignOut />
      </header>

      <section>
        {user ? <Chat /> : <SignIn />}
      </section>

    </div>
  )
}

function Chat(){
    const messageRef = firestore.collection('messages');
    const query = messageRef.limit(10);
    const [messages] = useCollectionData(query, {idField: 'id'});
    const [formValue, setFormValue] = useState('');

    const sendMessage = async(e) => {
        e.preventDefault();
        const {uid} = auth.currentUser;
        await messageRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid
        });
        setFormValue('');

    }

    return (
        <>
            <main>
                {messages && messages.map(message => ( <ChatMessage key={message.id} message={message}/>))}
            </main>

            <form onSubmit={sendMessage}>
                <input value={formValue} onChange={(e) => setFormValue(e.target.value)}/>
                <button type='submit'>Send</button>

            </form>
        </>
    )
}

function ChatMessage(props){
    const {text, uid} = props.message;
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return (
        <>
            <div className={`message ${messageClass}`}>
                <p>{text}</p>
            </div>

            
        </>
    )
}

function SignIn(){

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider)
        
    }
    return (
        
        <Button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</Button>
    )

}

function SignOut(){
    return auth.currentUser && (
        <button className="sign-out" onClick={() => auth.signOut()}>Sign out</button>
    )
}

export default ChatRoom
