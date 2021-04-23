import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import { Route } from 'react-router-dom'
import { useHistory } from "react-router-dom";

import Join from './components/Join/Join'
import Chat from './components/Chat/Chat'

const ENDPOINT = process.env.REACT_APP_ENDPOINT || `localhost:5000`

const socket = io(ENDPOINT)

const App = () => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    let history = useHistory();

    const [messages, setMessages] = useState([])
    const [users, setUsers] = useState([])
    // useEffect(() => {
    //     socket = io(ENDPOINT)

    //     // return () => {
    //     //     socket.emit('disconnect')

    //     //     socket.off()
    //     // }
    // }, [])

    // useEffect(() => {
    //     socket.on('roomData', ({ users }) => {
    //         setUsers(users)
    //     })
    // }, [socket])

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages(messages => [...messages, message])
        })

        socket.on('roomData', ({ users }) => {
            setUsers(users)
        })
    }, [])


    function signIn({ name, room }) {
        socket.emit('join', { name, room }, (error) => {
            if (error) {
                alert(error)
            } else {
                setName(name)
                setRoom(room)
                history.push('/chat')
            }
        })

    }

    return (
        <>
            <Route path="/" exact render={() => <Join signIn={signIn} />} />
            <Route path="/chat" render={() => <Chat socket={socket} name={name} room={room} initialMessages={messages} initialUsers={users} />} />
        </>
    )
}

export default App