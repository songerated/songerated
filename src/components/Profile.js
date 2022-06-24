import React from 'react'
import { useAuth } from "../contexts/authContexts"

export const Profile = () => {
   const {currentUser} = useAuth() 

   const mail = currentUser.email
    var emailSplit = mail.split('@')
    var username = emailSplit[0]
    const id = currentUser.uid
    console.log(id);
   console.log(currentUser.email);
    return (
        <>{username}</>
    )
}
