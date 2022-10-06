import React, { useRef, useState } from 'react';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import List from './board/List';
import Modify from './board/Modify';
import View from './board/View';
import Write from './board/Write';

const App = () => {

    const [input, setInput] = useState({});
    const [boardList, setBoardList] = useState([]);
    const id = useRef(1);
    return (
        <div>

            <header>
                <nav>
                    <ul>
                        <li><NavLink to='/'>HOME</NavLink></li>
                        <li><NavLink to='/board'>board</NavLink></li>
                        <li><NavLink to='/view'>view</NavLink></li>
                        <li><NavLink to='/write'>write</NavLink></li>
                    </ul>
                </nav>
            </header>
            <Routes>
                <Route path='/' element={<div>HOme</div>} />
                <Route path='/board' element={<List boardList={boardList} />} />
                <Route path='/view/:id' element={<View boardList={boardList} setBoardList={setBoardList} />} />
                <Route path='/modify/:id' element={<Modify boardList={boardList} setBoardList={setBoardList} />} />
                <Route path='/write' element={<Write input={input} setInput={setInput} boardList={boardList} setBoardList={setBoardList} id={id} />} />
            </Routes>




            {console.log(input)}

        </div >
    )
}

export default App