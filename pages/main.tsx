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

  const handleSave = (id: number, newTitle: string, newDesc: string) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          title: newTitle,
          description: newDesc,
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
                  defaultValue={todo.title}
                  onChange={(e) => (todo.title = e.target.value)}
                />
                <input
                  type="text"
                  defaultValue={todo.description}
                  onChange={(e) => (todo.description = e.target.value)}
                />
                <button
                  onClick={() =>
                    handleSave(todo.id, todo.title, todo.description)
                  }
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
