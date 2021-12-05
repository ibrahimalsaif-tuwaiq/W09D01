import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./style.css";

const Todos = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const Storgetoken = localStorage.getItem("token");
    setToken(Storgetoken);
    getTodos(Storgetoken);
  }, []);

  const getTodos = async (token) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/todos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos(res.data);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  const addTodo = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/todos`,
        {
          name: todo,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
    getTodos(token);
  };

  const updateTodo = async (id) => {
    try {
      const { value: updatedTodo } = await Swal.fire({
        title: "Input the new todo",
        input: "text",
        inputLabel: "Updated Todo",
        inputPlaceholder: "todo",
      });

      if (updatedTodo) {
        await axios.put(
          `${process.env.REACT_APP_BASE_URL}/todos/${id}`,
          {
            name: updatedTodo,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        getTodos(token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getTodos(token);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="wrapper">
      {!token ? (
        <h1>
          You are not logeddin yet, so <Link to="/login">login</Link> or
          <Link to="/signup">signup</Link>
        </h1>
      ) : (
        <div className="todosCon">
          <div>
            <input
              className="addInput"
              onChange={(e) => setTodo(e.target.value)}
              placeholder="Add a new todo"
            />
            <button className="add" onClick={addTodo}>
              ADD
            </button>
            <button className="add" onClick={logout}>
              logout
            </button>
          </div>
          {todos ? (
            <ul className="list">
              {todos.map((todo) => (
                <div key={todo._id} className="listItem">
                  <li>{todo.name}</li>
                  <div>
                    <button
                      className="update"
                      onClick={() => updateTodo(todo._id)}
                    >
                      Update
                    </button>
                    <button
                      className="delete"
                      onClick={() => deleteTodo(todo._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </ul>
          ) : (
            <div className="message">{message}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Todos;
