import React, { Component, useEffect, useState, useCallback, useRef, memo } from 'react'
import './App.css'
import { createAdd, createSet, createRemove, createToggle } from './actions'
import reducers from './reducers'

//addTodos=(payload)=>dispath(createAdd(paload))

// {addTodos:createAdd}


function bindActionCreators(actionCreators, dispatch) {
    const ret = {};
    for (let key in actionCreators) {
        ret[key] = function (...args) {
            const actionCreator = actionCreators[key];
            const action = actionCreator(...args);
            dispatch(action);
        }
    }
    return ret;
}

const Control = memo(function Control(props) {
    const { addTodos } = props;
    const inputRef = useRef();
    const onSubmit = (e) => {
        e.preventDefault();
        const newText = inputRef.current.value.trim();
        if (newText.length === 0) {
            return
        }
        addTodos(newText);
        inputRef.current.value = '';
    }

    return <div className="control">
        <h1>todos</h1>
        <form onSubmit={onSubmit}>
            <input ref={inputRef} type="text" className="new-todo" placeholder="what needs to be done?" />
        </form>
    </div>
})

const TodoItem = memo(function TodoItem(props) {
    const { todo: { id, text, complete }, removeTodo, toggleTodo } = props;

    const onChange = () => {
        toggleTodo(id);

    }

    const onRemove = () => {
        removeTodo(id);
    }
    return <li className="todo-item">
        <input type="checkbox" onChange={onChange} checked={complete} />
        <label className={complete ? 'complete' : ''}>{text}</label>
        <button onClick={onRemove}>&#xd7;</button>
    </ li>
})

const Todos = memo(function Todos(props) {
    const { todos, removeTodo, toggleTodo } = props;

    return <ul>{
        todos.map(todo => {
            return (<TodoItem key={todo.id} todo={todo} removeTodo={removeTodo} toggleTodo={toggleTodo}></TodoItem>)
        })
    }</ul>
})

const LS_KEY = "_$-todos_"
let store = {
    todos: [],
    incrementCount: 0
}
function TodoList() {
    const [todos, setTodos] = useState([]);
    const [incrementCount, setIncrementCount] = useState(0);

    useEffect(() => {
        Object.assign(store, { todos, incrementCount });
    }, [Todos, incrementCount]);

    const reducer = reducers;;
    const dispatch = (action) => {
        const setter = {
            todos: setTodos,
            incrementCount: setIncrementCount
        }
        if (typeof action === 'function') {
            action(dispatch, () => store);
            return;
        }
        const newState = reducer(store, action);
        for (let key in newState) {
            setter[key](newState[key]);
        }
    }


    useEffect(() => {
        const todos = JSON.parse(localStorage.getItem(LS_KEY)) || [];
        dispatch(createSet(todos))
    }, []);

    useEffect(() => {
        localStorage.setItem(LS_KEY, JSON.stringify(todos));
    }, [todos]);







    return (<div className="todo-list">
        <Control {
            ...bindActionCreators({ addTodos: createAdd }, dispatch)
        } />
        <Todos todos={todos} {
            ...bindActionCreators({ removeTodo: createRemove, toggleTodo: createToggle }, dispatch)
        } />
    </div>)
}


export default TodoList;



