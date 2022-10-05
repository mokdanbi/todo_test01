import React, { useRef, useState } from 'react'

const App = () => {
    const [todo, setTodo] = useState({});
    const [todolist, setTodolist] = useState([]);
    const num = useRef(1);
    const ipref = useRef(null)
    const handlerInput = (e) => {
        const { name, value } = e.target;
        setTodo({
            ...todo,
            [name]: value,
            id: num.current,
            done: false,
        })
    }

    const handlerList = () => {
        //正規表現式 / regular expression
        const RegExp = {
            // 6자 이상, 영문, 숫자를 포함해야 합니다.
            id: /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{6,}$/,
            //영문과 숫자로만..
            ennum: /^[a-zA-Z0-9]*$/,
            //한글과 숫자로만
            konum: /^[ㄱ-ㅎ가-힣0-9]*$/,
            // 숫자만 가능
            num: /^[0-9]*$/,
            // 한굴만 가능
            ko: /^[ㄱ-ㅎ가-힣]*$/,
            //영어만 가능
            en: /^[a-zA-Z]*$/,
            //이메일 형식으로만
            email: /[0-9a-zA-Z]+(.[_a-z0-9-]+)*@(?:\\w+\\.)+\\w+$/,

            /** 핸드폰번호인지에 대한 형식검사. 반드시 앞자리가 010,010,016~9사이를 충족해야 하며, 각 부분에 대한 자리수도 충족시켜야 한다. "-"는 허용하지 않는다. */

            ph: /^01(?:0|1|[6-9])(?:\\d{3}|\\d{4})\\d{4}$/,
            /** 전화번호인지에 대한 형식검사. 각 연결부는 "-"로 구분되어야 한다. 각 부분에 대한 자리수도 충족시켜야 한다. "-"는 허용하지 않는다. */

            tel: /^\\d{2,3}-\\d{3,4}-\\d{4}$/,

            /** 주민번호에 대한 글자수 및 뒷자리 첫글자가 1~4의 범위에 있는지에 대한 검사. "-"는 허용하지 않는다. */
            jumin: /^\\d{6}[1-4]\\d{6}/,

            // 출처: https://myeonguni.tistory.com/1555 [명우니닷컴:티스토리]
            // https://rubular.com/ 연숩하기 좋은 곳...
            // https://learn.microsoft.com/ko-kr/previous-versions/visualstudio/visual-studio-2010/ae5bf541(v=vs.100)?redirectedfrom=MSDN
        }
        if (todo.title.length < 5) {
            alert('더 입력해 주세요...');
            setTodo({
                title: "",
            });
            ipref.current.focus()
            return
        }
        if (!RegExp.en.test(todo.title)) {
            alert("영어만 입력해주세요");
            setTodo({
                title: "",
            });
            ipref.current.focus()
            return;
        }

        setTodolist([...todolist, todo]);
        setTodo({
            title: "",
            content: "",
        });

        num.current++
    }


    const handlerDelete = (id) => {
        setTodolist(todolist.filter(it => id !== it.id))
    }

    const handlerModify = (id) => {
        console.log(id);
        setTodolist(todolist.map(it => (
            id === it.id
                ? {
                    ...it,
                    done: !it.done
                }
                : it

        )))
    }

    return (
        <div>
            <ul>
                {
                    todolist.map((it, idx) => <li key={it.id} className={it.done ? 'on' : ''}>
                        <input type='checkbox' onChange={() => handlerModify(it.id)} />
                        {it.id} {it.title}  / {it.content}
                        <button onClick={() => handlerDelete(it.id)}>삭제</button>
                        {console.log(it.done)}
                    </li>)
                }
            </ul>
            <input onChange={handlerInput} name='title' value={todo.title || ''} ref={ipref} />
            <input onChange={handlerInput} name='content' value={todo.content || ''} />
            <button onClick={handlerList}>WRITE</button>
            {console.log(todo, ipref.current)}
        </div>
    )
}

export default App