import React, { useRef, useState } from 'react';
import { Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import TodoList from './TodoList';
import TodoWrite from './TodoWrite';


const App = () => {

    const [word, setWord] = useState({});
    const [list, setList] = useState([]);

    const num = useRef(1);
    const inputTtitle = useRef(null)
    const inputContent = useRef(null);

    const navi = useNavigate();

    const handlerWord = (e) => {
        const { name, value } = e.target;
        setWord({
            ...word,
            [name]: value,
            id: num.current
        })
    }
    const handlerList = () => {
        if (!word.title || !word.content) {
            alert('내용을 입력해주세요');
            return
        }
        if (word.title.length < 5) {
            alert('더입력해');
            // 1. 입력창을 비운다. , 2. 그 입력창에 포커스를 준다
            setWord({
                ...word,
                title: "",
            });
            inputTtitle.current.focus();
            return
        }
        const hg = /^[ㄱ-ㅎ가-힣]*$/;
        if (!hg.test(word.title)) {
            alert('한글만 입력해주세요...');
            setWord({
                ...word,
                title: "",
            });
            inputTtitle.current.focus();
            return
        }
        if (word.content.length < 5) {
            alert('더입력해');
            // 1. 입력창을 비운다. , 2. 그 입력창에 포커스를 준다.
            setWord({
                ...word,
                content: "",
            });
            inputContent.current.focus();
            return
        }
        setList([...list, word]);
        setWord({
            title: "",
            content: "",
        })
        num.current++
        navi('/Board')
    }
    return (
        <div>
            <nav>
                <NavLink to='/'>home</NavLink>
                <NavLink to='/Board'>Board</NavLink>
                <NavLink to='/Write'>Write</NavLink>
            </nav>
            <Routes>
                <Route path='/' element={<TodoList list={list} setList={setList} />} />
                <Route path='/Board' element={<TodoList list={list} setList={setList} />} />
                <Route path='/Write' element={<TodoWrite list={list} word={word} handlerWord={handlerWord} handlerList={handlerList} inputTtitle={inputTtitle} inputContent={inputContent} />} />
            </Routes>




        </div>
    )
}

export default App