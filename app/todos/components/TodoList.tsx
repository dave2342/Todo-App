"use client"; //client component, runs in browser and uses hooks like useState

import React, { useState } from "react";
import { Todo } from "../lib/types";
import { v4 as uuidv4 } from "uuid"; //for unique IDs, changed the id to a string (wouldnt work otherwise)

//Define the props for TodoList to accept initialTodos: Todo[]
type Props = {
  initialTodos: Todo[];
};

//defines TodoList component, intitialTodos as props
export default function TodoList({ initialTodos }: Props) {
  //Initialize state variable called todos (the list of todos)
  //and input field(initialTodos)
  //setTodos is the state updating function
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  //State to add a todo
  const [inputTask, setInput] = useState("");

  //State to edit a todo
  //null if no todo is being edited
  const [editingTodo, setEditingTodo] = useState<string | null>(null);

  //Add or Edit a Todo (in input)
  function handleAddOrEdit() {
    //Bonus: ensure title is not empty
    if (!inputTask.trim()) return;

    if (editingTodo) {
      //use map for edit
      const updatedTodos = todos.map((todo) =>
        todo.id === editingTodo ? { ...todo, title: inputTask } : todo
      );
      setTodos(updatedTodos);
      setEditingTodo(null);
    } else {
      const newTodo: Todo = {
        id: uuidv4(),
        title: inputTask,
        completed: false,
        userId: 1,
      };
      //spread syntax to add new todo
      setTodos([...todos, newTodo]);
    }
    //clear the input
    setInput("");
  }

  //Start Editing a Todo Function
  function startEdit(todoId: string) {
    //find todo with specified ID
    const todoToEdit = todos.find((todo) => todo.id === todoId);
    if (todoToEdit) {
      //put todos title into input box
      setInput(todoToEdit.title);
      //store ID of edited todo
      setEditingTodo(todoId);
    }
  }

  //Delete Todo
  function deleteTodo(todoId: string) {
    //filter to delete
    const filtered = todos.filter((todo) => todo.id !== todoId);
    setTodos(filtered);
  }

  //JSX to render input field, button, todos
  return (
    //holds elements
    <div className="todo-container">
      <h1>Todo List</h1>
      {/* adding/editing todos */}
      <div className="todo-form">
        {/*Input and button to add a todo*/}
        <input
          type="text"
          placeholder={editingTodo ? "Edit Todo" : "Add Todo"}
          value={inputTask}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <button className="add-btn" onClick={handleAddOrEdit}>
          {editingTodo ? "Update" : "Add"}
        </button>
      </div>

      {/* in the unordered list, contains list of todos */}
      <ul className="todo-list">
        {todos.map((todo) => (
          //separate todos
          <li key={todo.id} className="todo-item">
            {/* todo content (title, buttons) */}
            <div className="todo-content">
              <span>{todo.title}</span>
              {/* holds the edit/delete buttons */}
              <div className="todo-actions">
                <button className="edit-btn" onClick={() => startEdit(todo.id)}>
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
