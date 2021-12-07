import React from 'react'
import './LoginPage.css';

import { Input } from '@mui/material'

export const LoginPage = () => {


    return (
        <div className="login-container">
            <Input type="email" placeholder="Enter email" />
            <span className="name-input-flex">
                <Input placeholder="First Name"/>
                <Input placeholder="Last Name"/>
            </span>
        </div>
    );
}