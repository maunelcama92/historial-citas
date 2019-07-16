import React, { Component } from "react";

class App extends Component {
  constructor() {
    super();
    this.state = {
      nombre: "",
      numero_canal: "",
      HD: "",
      _id: "",
      tasks: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  addTask(e) {
    e.preventDefault();
    if (this.state._id) {
      fetch(`/api/tasks/${this.state._id}`, {
        method: "PUT",
        body: JSON.stringify({
          nombre: this.state.nombre,
          numero_canal: this.state.numero_canal,
          HD: this.state.HD
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          window.M.toast({
            html: "Task Updated"
          });
          this.setState({
            _id: "",
            nombre: "",
            numero_canal: "",
            HD: ""
          });
          this.fetchTasks();
        });
    } else {
      fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify(this.state),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          window.M.toast({
            html: "Task Saved"
          });
          this.setState({
            nombre: "",
            numero_canal: "",
            HD: ""
          });
          this.fetchTasks();
        })
        .catch(err => console.error(err));
    }
  }

  deleteTask(id) {
    if (confirm("Are you sure you want to delete it?")) {
      fetch(`/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          M.toast({
            html: "Task deleted"
          });
          this.fetchTasks();
        });
    }
  }

  editTask(id) {
    fetch(`/api/tasks/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          nombre: data.nombre,
          numero_canal: data.numero_canal,
          HD: data.HD,
          _id: data._id
        });
      });
  }

  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks() {
    fetch("/api/tasks")
      .then(res => res.json())
      .then(data => {
        this.setState({
          tasks: data
        });
        console.log(this.state.tasks);
      });
  }
  //HTML de React
  render() {
    return (
      <div>
        {" "}
        {/* NAVIGATION */}{" "}
        <nav className="light-blue darken-4">
          <div className="container">
            <div className="nav-wrapper">
              <a href="#" className="brand-logo">
                {" "}
                Historial de Citas Medicas{" "}
              </a>{" "}
            </div>{" "}
          </div>{" "}
        </nav>
        <div className="container">
          <div className="row">
            <div className="col s5">
              <div className="card">
                <div className="card-content">
                  <form onSubmit={this.addTask}>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          name="nombre"
                          onChange={this.handleChange}
                          value={this.state.nombre}
                          type="text"
                          placeholder="Nombre Paciente"
                          autoFocus
                        />
                      </div>{" "}
                    </div>

                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          name="numero_canal"
                          onChange={this.handleChange}
                          value={this.state.numero_canal}
                          type="text"
                          placeholder="Nombre Medico"
                        />
                      </div>{" "}
                    </div>

                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          name="HD"
                          onChange={this.handleChange}
                          value={this.state.HD}
                          placeholder="Fecha CIta"
                          type="date"
                        />
                      </div>{" "}
                    </div>

                    <button type="submit" className="btn light-blue darken-4">
                      {" "}
                      Enviar{" "}
                    </button>
                  </form>{" "}
                </div>{" "}
              </div>{" "}
            </div>
            <div className="col s7">
              <table>
                <thead>
                  <tr>
                    <th> Paciente </th> <th> Medico </th> <th> Fecha </th>{" "}
                  </tr>{" "}
                </thead>
                <tbody>
                  {" "}
                  {this.state.tasks.map(task => {
                    return (
                      <tr key={task._id}>
                        <td> {task.nombre} </td> <td> {task.numero_canal} </td>{" "}
                        <td> {task.HD} </td>
                        <td>
                          <button
                            onClick={() => this.deleteTask(task._id)}
                            className="btn light-blue darken-4"
                          >
                            <i className="material-icons"> delete </i>{" "}
                          </button>
                          <button
                            onClick={() => this.editTask(task._id)}
                            className="btn light-blue darken-4"
                            style={{
                              margin: "4px"
                            }}
                          >
                            <i className="material-icons"> edit </i>{" "}
                          </button>{" "}
                        </td>
                      </tr>
                    );
                  })}{" "}
                </tbody>{" "}
              </table>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>
    );
  }
}

export default App;
