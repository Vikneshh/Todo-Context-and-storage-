import { useEffect, useState } from "react";
import { TodoProvider } from "./contexts";
import { TodoForm, TodoItems } from "./components";

// How he didnt specify which file but yet it works ("./contexts/index or /TodoContext")

const App = () => {
  const [todos, setTodos] = useState([]);
  const addTodo = (todo) => {
    setTodos((prev) => [
      {
        id: Date.now(),
        // Provides current timestamp in milliseconds
        ...todo,
      },
      ...prev,
    ]);
  };

  // These are some simple js operations
  // Remember one important thing we are setting todo for all the items instaed of one so be careful with that you are handling an aray of items
  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  // This is the first project i have seen two useeffect in one component but hitesh said it is quite common to see this so keep in mind you can use two effects in same cmpnt.

  // Getting local storage as soon as the componenet mounts
  // Only mounted on initial render
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
// Converting string to object
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  // Setting the todos whenever todo usestae gets updated.
  //Mounted evertime when the todo is set
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            {/* Todo Form comes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Looping through the values */}
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItems todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
};

export default App;
