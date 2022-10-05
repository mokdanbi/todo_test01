import React from 'react'

const TodoList = ({ list }) => {
    return (
        <div>
            <h2>list</h2>
            <ul>
                {
                    list.map((li, idx) => <li key={li.id}>{li.title} {li.content}  <button>DEL</button></li>)
                }
            </ul>
            <hr />
        </div>
    )
}

export default TodoList