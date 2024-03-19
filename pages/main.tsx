import { useState } from "react";
import "../styles/style.css";

type Todo = {
  id: number;
  title: string;
  description: string;
  isEditing: boolean;
};

let nextId = 0;

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputTitle, setInputTitle] = useState("");
  const [inputDesc, setInputDesc] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const handleSave = (id: number, editTitle: string, editDesc: string) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          title: editTitle,
          description: editDesc,
          isEditing: false,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };
  return (
    <div className="ToDo">
      <div className="text">ToDo List</div>
      <div>
        <input
          type="text"
          placeholder="Enter the title"
          value={inputTitle}
          onChange={(e) => setInputTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter the description"
          value={inputDesc}
          onChange={(e) => setInputDesc(e.target.value)}
        />
        <button
          onClick={() => {
            if (inputTitle === "" || inputDesc === "") {
              alert("Title and description are required");
              return;
            }
            const newTask = {
              id: nextId++,
              title: inputTitle,
              description: inputDesc,
              isEditing: false,
            };
            setTodos((todos) => [...todos, newTask]);
            setInputTitle("");
            setInputDesc("");
          }}
        >
          Add
        </button>
      </div>
      <div>
        {todos.map((todo) => (
          <div className="todo-item" key={todo.id}>
            {todo.isEditing ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <input
                  type="text"
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                />
                <button
                  onClick={() => {
                    if (editTitle === "" || editDesc === "") {
                      alert("Title and description are required");
                      return;
                    }
                    handleSave(todo.id, editTitle, editDesc)}}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <h3>{todo.title}</h3>
                <p>{todo.description}</p>
                <button
                  onClick={() =>
                    setTodos(
                      todos.map((t) =>
                        t.id === todo.id ? { ...t, isEditing: true } : t
                      )
                    )
                  }
                >
                  Edit
                </button>
                <button
                  onClick={() =>
                    setTodos(todos.filter((t) => t.id !== todo.id))
                  }
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
