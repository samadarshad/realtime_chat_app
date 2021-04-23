import React, { useState } from 'react'

import './Join.css'

const Join = ({ signIn }) => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')

    function joinRoom(event) {
        if (name && room) {
            event.preventDefault()
            console.log("sign in", name, room);
            signIn({ name, room })
        }
    }

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>
                <div><input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} /></div>
                <div><input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} /></div>
                <button className="button mt-20" type="submit" onClick={(event) => joinRoom(event)}>Sign In</button>
            </div>
        </div>
    )
}

export default Join