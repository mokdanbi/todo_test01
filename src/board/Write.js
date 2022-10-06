import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';

const Write = ({ input, setInput, boardList, setBoardList, id }) => {

    const GO = useNavigate()
    const inputHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
            date: new Date().toLocaleDateString(),
            id: id.current
        })
    }

    const submitHandler = () => {
        setBoardList([
            ...boardList,
            input
        ])
        id.current++;
        setInput({
            name: "",
            title: "",
            content: "",
        });
        GO('/board')
    }
    return (
        <div>
            <input name='name' onChange={inputHandler} value={input.name || ''} />
            <input name='title' onChange={inputHandler} value={input.title || ''} />
            <textarea name='content' onChange={inputHandler} value={input.content || ''} />
            <button onClick={submitHandler}>WRITE</button>
        </div>
    )
}

export default Write;