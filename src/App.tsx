import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavBar } from './NavBar';
import DayTodo from './DayTodo';
import WeekTodo from './WeekTodo';
import Start from './Start';
import { saveDataToLocalStorage, loadDataFromLocalStorage } from './localStorageUtils';
import { v1 } from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';

interface Task {
    id: string;
    title: string;
    isDone: boolean;
}

function App() {
    const [isRegistered, setIsRegistered] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filter, setFilter] = useState<FilterValuesType>('all');

    let tasksForTodoList: Task[] = tasks;

    if (filter === 'active') {
        tasksForTodoList = tasks.filter((task) => !task.isDone);
    }

    if (filter === 'completed') {
        tasksForTodoList = tasks.filter((task) => task.isDone);
    }

    const addTask = (title: string) => {
        let task: Task = { id: v1(), title: title, isDone: false };
        let newTasks = [task, ...tasks];
        setTasks(newTasks);
        saveDataToLocalStorage('tasks', newTasks);
    };

    const removeTask = (id: string) => {
        let filteredTasks = tasks.filter((task) => task.id !== id);
        setTasks(filteredTasks);
        saveDataToLocalStorage('tasks', filteredTasks);
    };

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value);
    };

    const changeTaskStatus = (taskId: string) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => (task.id === taskId ? { ...task, isDone: !task.isDone } : task))
        );
        saveDataToLocalStorage('tasks', tasks);
    };

    const handleRegistration = () => {
        setIsRegistered(true);
    };

    return (
        <Router>
            <div className="App">
                <NavBar />
                <Routes>
                    <Route path="/start" element={<Start handleRegistration={handleRegistration} isRegistered={isRegistered} />} />
                    {isRegistered && (
                        <>
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
                                        title="What to do today"
                                        tasks={tasksForTodoList}
                                        addTask={addTask}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        changeTaskStatus={changeTaskStatus}
                                    />
                                }
                            />
                        </>
                    )}
                </Routes>
            </div>
        </Router>
    );
}

export default App;