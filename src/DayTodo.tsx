import React, { useState, ChangeEvent } from 'react';
import { FilterValuesType } from './App';
import s from './DayTodo.module.css';
import { saveDataToLocalStorage, loadDataFromLocalStorage } from './localStorageUtils';

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

const DayTodo: React.FC<DayTodoProps> = ({ title, tasks, addTask, removeTask, changeFilter, changeTaskStatus }) => {
    const storageKey = 'dayTodoData';
    const [taskTitle, setTaskTitle] = useState<string>('');
    const [tasksState, setTasksState] = useState<TaskType[]>(tasks);

    const addTaskHandler = () => {
        addTask(taskTitle);
        const newTask = { id: Date.now().toString(), title: taskTitle, isDone: false };
        const newTasks = [...tasksState, newTask];
        saveDataToLocalStorage(storageKey, { tasks: newTasks, title: taskTitle });
        setTasksState(newTasks);
        setTaskTitle('');
    };

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value);
    };

    const encryptAndSaveHandler = () => {
        saveDataToLocalStorage(storageKey, { tasks: tasksState, title: taskTitle });
    };

    const loadDataHandler = () => {
        const savedData = loadDataFromLocalStorage(storageKey);
        if (savedData && savedData.tasks) {
            const { title, tasks: loadedTasks } = savedData;
            setTasksState(loadedTasks);
            setTaskTitle(title || '');
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

    const removeTaskHandler = (taskId: string) => {
        removeTask(taskId);
        saveDataToLocalStorage(storageKey, { tasks: tasksState, title: taskTitle });
    };

    const changeTaskStatusHandler = (taskId: string) => {
        changeTaskStatus(taskId);
        saveDataToLocalStorage(storageKey, { tasks: tasksState, title: taskTitle });
    };

    return (
        <div className={s.todoDay}>
            <h3>{title}</h3>
            <div className={s.task}>
                <input className={s.inputTodo} type="text" value={taskTitle} onChange={onChangeHandler} />
                <button onClick={addTaskHandler} className={s.buttonAddTodo}>
                    +
                </button>
                <button onClick={encryptAndSaveHandler} className={s.button}>
                    Encrypt & Save
                </button>
                <button onClick={loadDataHandler} className={s.button}>
                    Load Data
                </button>
                <ul className={s.taskList}>
                    {tasksState.map((task) => (
                        <li key={task.id} className={s.taskLi}>
                            <div className={s.titleWithCheckbox}>
                                <input
                                    type="checkbox"
                                    checked={task.isDone}
                                    onChange={() => changeTaskStatusHandler(task.id)}
                                />
                                <div>{task.title}</div>
                            </div>
                            <button onClick={() => removeTaskHandler(task.id)} className={s.buttonRemoveTodo}>
                                x
                            </button>
                        </li>
                    ))}
                </ul>
                <div className={s.buttonTrio}>
                    <button onClick={onAllClickHandler} className={s.button}>
                        All
                    </button>
                    <button onClick={onActiveClickHandler} className={s.button}>
                        Active
                    </button>
                    <button onClick={onCompletedClickHandler} className={s.button}>
                        Completed
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DayTodo;