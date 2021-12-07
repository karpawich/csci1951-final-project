import React from 'react'
import './MainContent.css';

import { VideoMoment, UploadFile, AudioMoment, ImageMoment } from '..';

export const MainContent = () => {

    return (
        <div>
            <h1>VideoMoment</h1>
            <VideoMoment url="https://firebasestorage.googleapis.com/v0/b/triplemisw.appspot.com/o/uploaded%2Ftest%2F1EF66578-E89B-45D4-A2D6-118C807DC7A6.mp4?alt=media&token=3f7a8a48-d196-4e3a-8e01-1cac94da968f" />
            <ImageMoment url="https://firebasestorage.googleapis.com/v0/b/triplemisw.appspot.com/o/uploaded%2Ftest%2F2(1).png?alt=media&token=58a1cdc7-5dbe-4c2e-8ed2-e6e063bf2184"/>
            <AudioMoment url="https://firebasestorage.googleapis.com/v0/b/triplemisw.appspot.com/o/uploaded%2Ftest%2FAgainst%20The%20World.mp3?alt=media&token=8c41ddd3-411b-4cbc-82ea-60d0e0c7ed8f" />
            <UploadFile />
        </div>
    );
}