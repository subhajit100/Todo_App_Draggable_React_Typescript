import React, { useState, useRef, useEffect } from "react";
import "./styles.css";
import { Todo } from "../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";

type SingleTodoProps = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  index: number;
};

const SingleTodo: React.FC<SingleTodoProps> = ({
  todo,
  todos,
  setTodos,
  index,
}) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editedValue, setEditedValue] = useState<string>(todo.todo);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [editMode]);

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    // taking the editedValue and updating the todo given id above
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, todo: editedValue } : todo
      )
    );

    // close the edit mode
    setEditMode(false);
  };

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`todos__single ${snapshot.isDragging ? 'drag' : ''}`}
          onSubmit={(e) => handleEdit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {editMode ? (
            <input
              className={`todos__single--text`}
              type="text"
              value={editedValue}
              //   autoFocus
              ref={inputRef}
              onChange={(e) => setEditedValue(e.target.value)}
            />
          ) : (
            <span
              className={`todos__single--text ${
                todo.isDone ? "strike-through" : ""
              }`}
            >
              {todo.todo}
            </span>
          )}

          <div>
            <span
              className="icon"
              onClick={(e) => {
                if (!editMode && !todo.isDone) {
                  setEditMode(true);
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span className="icon" onClick={(e) => handleDelete(todo.id)}>
              <AiFillDelete />
            </span>
            <span
              className="icon"
              onClick={(e) => {
                if (!editMode) {
                  toggleDone(todo.id);
                }
              }}
            >
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
