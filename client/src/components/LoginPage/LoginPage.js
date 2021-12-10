import React, {useState} from 'react'
import './LoginPage.css';

import { Input, Button } from '@mui/material'

import { createUser, login } from '../../actions';

export const LoginPage = (props) => {
    const {setIsLoggedIn} = props

    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')


    const addUser = async () => {
        const res = await createUser(email, firstName, lastName)
        await loginUser();
    }

     const loginUser = async () => setIsLoggedIn(await login(email))


    return (
        <div className="login-container">
            <Input type="email" placeholder="Enter email" required onChange={(e) => setEmail(e.target.value)}/>
            <span className="name-input-flex">
                <Input placeholder="First Name" required onChange={(e) => setFirstName(e.target.value)}/>
                <Input placeholder="Last Name" required onChange={(e) => setLastName(e.target.value)}/>
            </span>
            <Button onClick={() => addUser()}>Create User</Button>
            <Button onClick={() => loginUser()}>Login</Button>
        </div>
    );
}