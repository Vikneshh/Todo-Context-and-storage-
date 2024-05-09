import { useState } from "react";
import { useTodo } from "../contexts/TodoContext";

const TodoItems = ({ todo }) => {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  const { updateTodo, deleteTodo, toggleComplete } = useTodo();

  const editTodo = () => {
    // updateTodo accepts two arguments remember
    updateTodo(todo.id, { ...todo, todo: todoMsg });
    setIsTodoEditable(false);
  };
  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };

  return (
    // If the todo is completed then we give them different colours.
    <div
      className={`border flex border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration/300 text-black ${
        todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer "
        checked={todo.completed}
        onChange={toggleCompleted}
      />

      <input
        type="text"
        placeholder="Enter "
        className={`border w-full bg-transparent rounded-lg outline-none ${
          isTodoEditable ? "border-black/10 px-2" : "border-transparent"
        }`}
        value={todoMsg}
        readOnly={!isTodoEditable}
        onChange={(e) => setTodoMsg(e.target.value)}
      />
      {/* It will gives a feeling of there is no input unless it is tapped */}

      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-500 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={() => {
          if (todo.completed) return;
        //   The first line is for to say is todo is checked then it is uneditable

          if (isTodoEditable) {
            editTodo();
          } else {
            setIsTodoEditable((prev) => !prev);
          }
        }}
        // The disabling option is based on the todo checked part.
        disabled={todo.completed}
      >
        {isTodoEditable ? "📁" : "✏️"}{" "}
      </button>

      <button className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
      onClick={()=>deleteTodo(todo.id)}>
        ❌
      </button>
    </div>
  );
};

export default TodoItems;
