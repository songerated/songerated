import React from 'react'

import  {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import firebase from 'firebase/compat/app';
import { getFirestore } from "firebase/firestore";
import Button from '@mui/material/Button';
import 'firebase/compat/firestore';
import { useState } from 'react';


const auth =    firebase.auth();
const firestore = firebase.firestore();

const ChatRoom = () => {

    const [user] = useAuthState(auth);
  return (
    <div>
      {user? <Chat /> : <SignIn />}
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
            <div>
                {messages && messages.map(message => ( <ChatMessage key={message.id} message={message}/>))}
            </div>

            <form onSubmit={sendMessage}>
                <input value={formValue} onChange={(e) => setFormValue(e.target.value)}/>
                <button type='submit'>Send</button>

            </form>
        </>
    )
}

function ChatMessage(props){
    const {text, uid} = props.message;
    const messageClass = uid === auth.currentUser.uid ? 'message-self' : 'message-other';

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
        
        <Button onClick={signInWithGoogle}>Sign in with Google</Button>
    )

}

function SignOut(){
    return auth.currentUser && (
        <button onClick={() => auth.signOut()}>Sign out</button>
    )
}

export default ChatRoom
