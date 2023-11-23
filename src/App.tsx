import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { v1 } from 'uuid';
import './App.css';
import NavBar from './NavBar';
import { DayTodo } from './DayTodo';
import { WeekTodo } from './WeekTodo';
import {Home} from "./Home";

export type FilterValuesType = 'all' | 'active' | 'completed';



function App() {
    let [tasks, setTasks] = useState([
        { id: v1(), title: 'Study', isDone: false },
        { id: v1(), title: 'JS', isDone: true },
        { id: v1(), title: 'ReactJS', isDone: false },
    ]);

    let [filter, setFilter] = useState<FilterValuesType>('all');
    let tasksForTodoList = tasks;

    if (filter === 'active') {
        tasksForTodoList = tasks.filter((task) => !task.isDone);
    }

    if (filter === 'completed') {
        tasksForTodoList = tasks.filter((task) => task.isDone);
    }

    function addTask(title: string) {
        let task = { id: v1(), title: title, isDone: false };
        let newTasks = [task, ...tasks];
        setTasks(newTasks);
    }

    function removeTask(id: string) {
        let filteredTasks = tasks.filter((task) => task.id !== id);
        setTasks(filteredTasks);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    const changeTaskStatus = (taskId: string) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, isDone: !task.isDone } : task
            )
        );
    };

    return (
        <Router>
            <div className="App">
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/week"
                        element={
                            <WeekTodo
                                title="What to do this week"
                                tasks={tasksForTodoList}
                                addTask={addTask}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                changeTaskStatus={changeTaskStatus}
                            />
                        }
                    />
                    <Route
                        path="/day"
                        element={
                            <DayTodo
                                title="What to do"
                                tasks={tasksForTodoList}
                                addTask={addTask}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                changeTaskStatus={changeTaskStatus}
                            />
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
