import React from 'react'

import  {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import firebase from 'firebase/compat/app';
import { getFirestore } from "firebase/firestore";
import Button from '@mui/material/Button';
import 'firebase/compat/firestore';
import { useState } from 'react';
import { useRef } from 'react';
import '../App.css';
import { PropaneSharp } from '@mui/icons-material';

const auth =    firebase.auth();
const firestore = firebase.firestore();

function ChatRoom(){

    const [user] = useAuthState(auth);
    const recid = window.localStorage.getItem('chatid')


  return (
    <div className="Appm">
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
    const dummy = useRef();
    const messageRef = firestore.collection('messages');
    const query = messageRef.orderBy('createdAt').limit(50);
    const [messages] = useCollectionData(query, {idField: 'id'});
    const [formValue, setFormValue] = useState('');

    const sendMessage = async(e) => {
        e.preventDefault();
        const { uid, photoURL } = auth.currentUser;
        await messageRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL
        });
        setFormValue('');

        dummy.current.scrollIntoView({behavior: 'smooth'});

    }

    return (
        <>
            <main>
                {messages && messages.map(message => ( <ChatMessage key={message.id} message={message}/>))}

                <div ref={dummy}></div>
            </main>

            <form className="formm" onSubmit={sendMessage}>
                <input className="inputm" value={formValue} onChange={(e) => setFormValue(e.target.value)}/>
                <button type='submit'>🕊️</button>

            </form>
        </>
    )
}

function ChatMessage(props){
    const {text, uid, photoURL } = props.message;
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return (
        <>
            <div className={`message ${messageClass}`}>
            <img className="imgm" src={photoURL || 'https://i.ibb.co/rt2D67C/pngwing-com.png'} />
                <p className='pm'>{text}</p>
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
