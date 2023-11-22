import React, {useState} from 'react';
import {FilterValuesType} from "./App";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    addTask: (title: string) => void
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
}

export function Todolist(props: PropsType) {
    let [title, setTitle] = useState('')

    const addTask = () => {
        props.addTask(title)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title} onChange={(event)=> {
                setTitle(event.currentTarget.value)
            }}/>
            <ul>
                {props.tasks.map((task) => (
                    <li key={task.id}>
                        <input type='checkbox' checked={task.isDone}/>
                        <span>{task.title}</span>
                        <button onClick={addTask}>+</button>
                        <button onClick={() => { props.removeTask(task.id) }}>✖️</button>
                    </li>
                ))}
            </ul>

            <button onClick={()=> {
                props.changeFilter('all')
            }}>All</button>
            <button onClick={()=> {
                props.changeFilter('active')
            }}>Active</button>
            <button onClick={()=> {
                props.changeFilter('completed')
            }}>Completed</button>
        </div>
    </div>
}
