import React from 'react'
import './MainView.css';

import { UploadFile } from '../UploadFile/UploadFile'
import { MainContent } from '../MainContent/MainContent'

export const MainView = () => {
    return (
        <div className="main-grid">
            <div className="header">header</div>
            <div className="left-menu"><UploadFile /></div>
            <div className="main"><MainContent /></div>
        </div>
    );
}