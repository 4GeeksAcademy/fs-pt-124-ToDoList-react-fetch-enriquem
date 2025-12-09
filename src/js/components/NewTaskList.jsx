import React, { useEffect, useState } from "react";

const NewTaskList = () => {
    const [task, setTask] = useState([])
    const [inputValue, setInputValue] = useState("")

    const createNewUser = () => {
        fetch("https://playground.4geeks.com/todo/users/enrique", {
            method: "POST"
        });
    }

    const getTask = () => {
        fetch("https://playground.4geeks.com/todo/users/enrique")
            .then(resp => resp.json())
            .then(data => {
                setTask(data.todos)
            })
    }

    const createTask = (e) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "label": inputValue,
            "is_done": false
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"

        };

        fetch("https://playground.4geeks.com/todo/todos/enrique", requestOptions)
            .then(response => response.json())
            .then(data => getTask()) //esto esta bien?
            .catch((err) => console.error(err));

        setInputValue("")
    }


    const deleteTask = (id) => {
        const requestOptions = {
            method: "DELETE",
        };

        fetch("https://playground.4geeks.com/todo/todos/" + id, requestOptions)
            .then(data => getTask()) //esto esta bien?
            .catch(err => console.error(err));
        getTask()
    }

    const handleSubmit = e => {
        e.preventDefault()
        const cleanValue = inputValue.trim();
        if (cleanValue === "") {
            alert("El input está vacío, no se envía");
            setInputValue("")
            return;
        }
        if (inputValue) {
            createTask()
        }
    }

    useEffect(() => {
        createNewUser()
        getTask()
    }, [])

    return (
        <>
            <div className="glass container my-5">
                <div className="row m-5 d-flex justify-content-center">
                    <div className="col-md-6">
                        <h1>Task List</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">New Task</label>
                                <input required type="text" placeholder="add new task pressing enter on keyboard" className="form-control" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                            </div>
                            {/*                             <button className="btn btn-primary" type="submit">Agregar</button>
 */}                        </form>

                    </div>
                </div>
                <div className="row m-5 d-flex justify-content-center">
                    <div className="col-md-6">
                        <ul className="list-group">
                            {task ? task.map(task => (
                                <li key={task.id} className="list-group-item d-flex justify-content-between liOfCard">{task.label}
                                    <button className="border border-0 bg-transparent" type="button" onClick={() => deleteTask(task.id)}>
                                        <i className="fa-solid fa-trash-can trashCan"></i>
                                    </button>
                                </li>
                            ))
                                : null}
                        </ul>
                    </div>
                </div>
            </div>
        </>


    )
}

export default NewTaskList