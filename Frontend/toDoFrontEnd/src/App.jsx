import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/todo/', { method: 'GET' })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const deleteActionApi = (id) => {
    fetch(`http://127.0.0.1:8000/todo/${id}`, { method: 'DELETE' })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateActionApi = (id) => {
    fetch(`http://127.0.0.1:8000/todo/${id}/`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        status: 'Finished',
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleSubmit = () => {
    console.log(taskInput); // Log the input value for debugging
    fetch('http://127.0.0.1:8000/todo/', 
    { method:'POST',   
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({
        "tasks_desc": taskInput
    })
    })
    .then((response) => {
    return response.json()
    }).then((data) => {
      console.log(data); 
      // setData((prevData) => [...prevData, data]);
      setTaskInput(''); // Clear the input field
    }).catch((e)=>{
    console.log(e);
    })
  };

    const actionsApi = (value) => {
      fetch(`http://127.0.0.1:8000/todo/?actions=${value}`, { method: 'GET' })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setData(data);
        })
        .catch((e) => {
          console.log(e);
        });
      }
    
  
    const handleSelectChange = (e) => {
      const selectedValue = e.target.value;
      actionsApi(selectedValue);
    }

  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: '#eee' }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-12 col-xl-9">
              <div className="card rounded-3">
                <div className="card-body p-4">
                  <h4 className="text-center my-3 pb-3">To Do App</h4>

                  <form className="row g-3 text-center">
                    <div className="col-md-6">
                      <input
                        id="data"
                        type="text"
                        className="form-control"
                        name="tasks"
                        placeholder="Enter Your Tasks.."
                        value={taskInput}
                        onChange={(e) => setTaskInput(e.target.value)}
                      />
                    </div>
                    <div className="col-auto d-flex justify-content-end align-items-center">
                      <button
                        className="btn btn-primary"
                        type="submit"
                        onClick={handleSubmit}
                      >
                        ADD
                      </button>
                      <p className="mb-0 px-3 text-muted">Filter</p>
                      <select className="form-select form-select-sm" onChange={handleSelectChange}>
                        <option value="">All</option>
                        <option value="Finished" >Finished</option>
                        <option value="Active">Active</option>
                      </select>
                    </div>
                  </form>

                  <table className="table mt-2 text-center" id="showData">
                    <thead>
                      <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Todo item</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                        <th scope="col">Created</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.tasks_desc}</td>
                          <td>{item.status}</td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={() => deleteActionApi(item.task_id)}
                            >
                              Delete
                            </button>
                            <button
                              className="btn btn-success"
                              style={{ marginLeft: '10px' }}
                              onClick={() => updateActionApi(item.task_id)}
                            >
                              Finished
                            </button>
                          </td>
                          <td>{item.created}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
