import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValuesType } from './App';
import './DayTodo.css';

export interface TaskType {
    id: string;
    title: string;
    isDone: boolean;
}

interface DayTodoProps {
    title: string;
    tasks: TaskType[];
    addTask: (title: string) => void;
    removeTask: (taskId: string) => void;
    changeFilter: (value: FilterValuesType) => void;
    changeTaskStatus: (taskId: string) => void;
}

export const DayTodo: React.FC<DayTodoProps> = ({ title, tasks, addTask, removeTask, changeFilter, changeTaskStatus })  => {
    const [taskTitle, setTaskTitle] = useState('');

    const addTaskHandler = () => {
        addTask(taskTitle);
        setTaskTitle('');
    };

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value);
    };

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler();
        }
    };

    const onAllClickHandler = () => {
        changeFilter('all');
    };

    const onActiveClickHandler = () => {
        changeFilter('active');
    };

    const onCompletedClickHandler = () => {
        changeFilter('completed');
    };

    return (
        <div className='todo'>
            <h3>{title}</h3>
            <div>
                <input
                    type="text" // Изменено на тип "text"
                    value={taskTitle}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <button onClick={addTaskHandler}>+</button>
                <ul className='task-list'>
                    {tasks.map((task) => (
                        <li key={task.id} style={{ color: 'black' }}>
                            <input
                                type="checkbox"
                                checked={task.isDone}
                                onChange={() => changeTaskStatus(task.id)}
                            />
                            <div>{task.title}</div>
                            <button onClick={() => removeTask(task.id)}>x</button>
                        </li>
                    ))}
                </ul>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
};