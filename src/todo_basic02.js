import React, { useState } from 'react'

const App = () => {
    const [todo, setTodo] = useState({});
    const [todolist, setTodolist] = useState([]);
    return (
        <div>
            <ul>
                {
                    todolist.map((it, idx) => <li key={idx}>{it.title}  / {it.content}</li>)
                }
            </ul>
            <input onChange={e => setTodo({ ...todo, [e.target.name]: e.target.value })} name='title' />
            <input onChange={e => setTodo({ ...todo, [e.target.name]: e.target.value })} name='content' />
            <button onClick={() => setTodolist([...todolist, todo])}>WRITE</button>
            {console.log(todo)}
        </div>
    )
}

export default App