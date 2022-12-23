import React, { useState, useRef } from "react";
import "./styles.css";

interface props {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void;
}

const InpputField = ({ todo, setTodo, handleAdd }: props) => {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <form className="input" onSubmit={(e) => {handleAdd(e); inputRef.current?. blur();}}>
            <input
                ref={inputRef}
                type="input"
                placeholder="Enter a task"
                className="input__box"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />
            <button className="input_submit" type="submit">
                GO
            </button>
        </form>
    );
};

export default InpputField;
