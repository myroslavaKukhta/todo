import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValuesType } from './App';
import s from './DayTodo.module.css';

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
        <div className={s.todoDay}>
            <h3>{title}</h3>
            <div className={s.task}>
                <input className={s.inputTodo}
                    type="text"
                    value={taskTitle}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <button onClick={addTaskHandler} className={s.buttonAddTodo}>+</button>
                <ul className={s.taskList}>
                    {tasks.map((task) => (
                        <li key={task.id} className={s.taskLi}>
                            <div className={s.titleWithCheckbox}> <input
                                type="checkbox"
                                checked={task.isDone}
                                onChange={() => changeTaskStatus(task.id)}
                            />
                            <div>{task.title}</div>
                        </div>
                            <button onClick={() => removeTask(task.id)} className={s.buttonRemoveTodo}>x</button>
                        </li>
                    ))}
                </ul>
                <div className={s.buttonTrio}>
                <button onClick={onAllClickHandler} className={s.button}>All</button>
                <button onClick={onActiveClickHandler} className={s.button}>Active</button>
                <button onClick={onCompletedClickHandler} className={s.button}>Completed</button>
                </div>
            </div>
        </div>
    );
};