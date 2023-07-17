import  {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import firebase from 'firebase/compat/app';
import { getFirestore } from "firebase/firestore";
import Button from '@mui/material/Button';
import 'firebase/compat/firestore';
import '../App.css';
import { PropaneSharp } from '@mui/icons-material';
import { LeakAddTwoTone } from '@material-ui/icons';
import ResponsiveAppBar from './ResponsiveAppBar'
import React, { useEffect, useRef, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Query } from 'firebase/firestore';
import { where } from 'firebase/firestore';
const useStyles = makeStyles((theme) => ({
    root: {
      minHeight: '100vh',
      backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/music_setup_blur.jpg'})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
  }));

const auth =    firebase.auth();
const firestore = firebase.firestore();

function ChatRoom(){
    const classes = useStyles();


    const [user] = useAuthState(auth);
    const recid = window.localStorage.getItem('chatid')


  return (
    <div className="Appm">
        <ResponsiveAppBar />
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
    const recid = window.localStorage.getItem('chatid')
    const sender = messageRef.where('uid', '==', auth.currentUser.uid).where('recid', '==', recid).limit(50);
    const receiver = messageRef.where('recid', '==', auth.currentUser.uid).where('uid', '==', recid).limit(50);
    // const q = Query(messageRef, where('recid', "==", recid), where('uid', "==", auth.currentUser.uid));
    // const query = messageRef.orderBy('createdAt').limit(50);
    const [senderMessages] = useCollectionData(sender, {idField: 'id'});
    const [receiverMessages] = useCollectionData(receiver, {idField: 'id'});
    
    useEffect(() => {
        if(senderMessages){
        senderMessages.sort((a, b) => a.createdAt - b.createdAt);

        }
    }, [senderMessages]);
    // let finalMessages = {...senderMessages, ...receiverMessages}

    const [formValue, setFormValue] = useState('');
    const sendMessage = async(e) => {
        e.preventDefault();
        const { uid, photoURL } = auth.currentUser;
        await messageRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL,
            recid
        });
        setFormValue('');

        dummy.current.scrollIntoView({behavior: 'smooth'});

    }

    return (
        <>
            <main>
                {senderMessages && senderMessages.map(message => ( <ChatMessage key={message.id} message={message}/>))}
                {receiverMessages && receiverMessages.map(message => ( <ChatMessage key={message.id} message={message}/>))}

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
    const {text, uid, photoURL, recid} = props.message;
    let messageClass = 'sent'
    if(uid === auth.currentUser.uid){
        messageClass = 'sent';
    }else if(uid === window.localStorage.getItem('chatid') ){
        messageClass = 'received';
    }else{
        return(
            <></>
        )
    }
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
