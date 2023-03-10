import React, { useState } from "react";
import "../App.css";
import InpputField from "./InpputField";
import TodoList from "./TodoList";
import { Todo } from "../model";
import { DragDropContext } from 'react-beautiful-dnd'

const MyApp: React.FC = () => {
    const [todo, setTodo] = useState<string>("");
    const [todos, setTodos] = useState<Todo[]>([]);
    const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();

        if (todo) {
            setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
            setTodo("");
        }
    };
    console.log(todos);

    return (
      <DragDropContext onDragEnd={()=> {}}>
<div className="App">
            <span className="heading">My Todo-App</span>
            <h3 className="task-app">Welcome to my TaskApp</h3>
            <InpputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />

            <TodoList
                todos={todos}
                setTodos={setTodos}
                completedTodos={completedTodos}
                setCompletedTodos={setCompletedTodos}
            />
        </div>
      </DragDropContext>
    );
};

export default MyApp;
