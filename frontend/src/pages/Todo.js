import React, { useState, useEffect, useContext } from "react";

// Components
import Header from "../components/Header";

// Context
import AuthContext from "../context/AuthContext";

const Todo = () => {
  let { user, tokens } = useContext(AuthContext);
  const [state, setState] = useState({
    todoList: [],
    activeItem: {
      user: user.pk,
      id: null,
      title: "",
      completed: false,
    },
    editing: false,
  });

  const handleFormInput = (e) => {
    // let name = e.target.name;
    let value = e.target.value;
    setState({
      ...state,
      activeItem: { ...state.activeItem, title: value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var url = "http://127.0.0.1:8000/api/task-create/";
    if (state.editing === true) {
      url = `http://127.0.0.1:8000/api/task-update/${state.activeItem.id}/`;
    }
    const csrftoken = getCookie("csrftoken");
    async function submitTask() {
      try {
        await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokens.access}`,
            "X-CSRFToken": csrftoken,
          },
          body: JSON.stringify(state.activeItem),
        });
        setState({
          ...state,
          editing: false,
        });
        fetchTasks();
      } catch {
        console.log("ERROR!");
      }
    }
    submitTask();
  };

  const startEdit = (task) => {
    setState({ ...state, activeItem: task, editing: true });
  };

  const handleDelete = (id) => {
    const deleteTask = async () => {
      try {
        await fetch(`http://127.0.0.1:8000/api/task-delete/${id}/`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokens.access}`,
          },
        });
        fetchTasks();
      } catch {
        console.log("ERROR!");
      }
    };
    deleteTask();
  };

  const handleCompleted = (task) => {
    task.completed = !task.completed;
    const completeTask = async () => {
      let response = await fetch(
        `http://127.0.0.1:8000/api/task-update/${task.id}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokens.access}`,
          },
          body: JSON.stringify(task),
        }
      );
      if (response.status === 200) {
        fetchTasks();
      } else {
        console.log("ERROR updating task completion!");
      }
    };
    completeTask();
  };

  async function fetchTasks() {
    let response = await fetch(`http://127.0.0.1:8000/api/task-list/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokens.access}`,
      },
    });

    let data = await response.json();

    if (response.status === 200) {
      setState({
        todoList: data,
        // Reset the activeItem object
        activeItem: {
          user: user.pk,
          id: null,
          title: "",
          completed: false,
        },
        editing: false,
      });
    }
  }

  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  useEffect(() => {
    if (state.editing === false) fetchTasks();
  }, [state.editing]);

  return (
    <>
      <Header />
      <div className="container">
        <div className="task-container">
          <div id="form-wrapper">
            <form id="form" onSubmit={handleSubmit}>
              <div className="flex-wrapper">
                <div style={{ flex: 6 }}>
                  <input
                    className="form-control"
                    id="title"
                    name="title"
                    onChange={handleFormInput}
                    placeholder="Title"
                    type="text"
                    value={state.activeItem.title}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <input
                    className="btn btn-warning"
                    id="submit"
                    name="Add"
                    type="submit"
                  />
                </div>
              </div>
            </form>
            <div className="list-wrapper">
              {state.todoList.length > 0 &&
                state.todoList.map((task) => (
                  <div key={task.id} className="task-wrapper">
                    <div
                      className={task.completed ? "completed" : null}
                      style={{ flex: 7 }}
                      onClick={() => handleCompleted(task)}
                    >
                      {task.title}
                    </div>
                    <div style={{ flex: 1 }}>
                      <button
                        className="btn btn-success"
                        onClick={() => startEdit(task)}
                      >
                        Edit
                      </button>
                    </div>
                    <div style={{ flex: 1 }}>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(task.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
