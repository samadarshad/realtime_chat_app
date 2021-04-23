import React, { useState, useEffect } from 'react'
// import queryString from 'query-string'
import io from 'socket.io-client'
import './Chat.css'
import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Input'
import Messages from '../Messages/Messages'
import TextContainer from '../TextContainer/TextContainer'

// let socket

// const ENDPOINT = process.env.REACT_APP_ENDPOINT || `localhost:5000`

const Chat = ({ socket, name, room, initialMessages, initialUsers }) => {
    // const [name, setName] = useState('')
    // const [room, setRoom] = useState('')
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState(initialMessages)
    const [users, setUsers] = useState(initialUsers)

    // useEffect(() => {
    //     // const { name, room } = queryString.parse(location.search)
    //     setName(name)
    //     setRoom(room)

    //     // socket = io(ENDPOINT)

    //     // socket.emit('join', { name, room }, (error) => {
    //     //     if (error) {
    //     //         alert(error)
    //     //     } else {
    //     //         setName(name)
    //     //         setRoom(room)
    //     //     }
    //     // })

    //     // return () => {
    //     //     socket.emit('disconnect')

    //     //     socket.off()
    //     // }
    // }, [location.search])

    useEffect(() => {
        console.log({ socket, name, room });
    }, [])

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages(messages => [...messages, message])
        })

        socket.on('roomData', ({ users }) => {
            setUsers(users)
        })
    }, [socket])

    const sendMessage = (event) => {
        event.preventDefault()

        if (message) {
            socket.emit('sendMessage', message, () => {
                setMessage('')
            })
        }
    }

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <TextContainer users={users} />
        </div>
    )
}

export default Chat