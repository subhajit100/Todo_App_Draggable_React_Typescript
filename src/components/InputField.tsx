import React, { useRef } from "react";
import "./styles.css";

interface InputFieldProps {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAddTodo: (e: React.FormEvent) => void;
}

// We can also write ({todo, setTodo} : InputFieldProps) inside the paranthesis , and that should work equally well.
const InputField: React.FC<InputFieldProps> = ({
  todo,
  setTodo,
  handleAddTodo,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form
      className="input"
      onSubmit={(e) => {
        handleAddTodo(e);
        inputRef.current?.blur();
      }}
    >
      <input
        type="text"
        placeholder="Enter your text"
        className="input__box" // using BEM convention CSS
        value={todo}
        ref={inputRef}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button type="submit" className="input_submit">
        Go
      </button>
    </form>
  );
};

export default InputField;
