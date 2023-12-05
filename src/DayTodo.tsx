import React, { useState, ChangeEvent, useEffect } from 'react';
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


const DayTodo: React.FC<DayTodoProps> = ({
                                             title,
                                             tasks,
                                             addTask,
                                             removeTask,
                                             changeFilter,
                                             changeTaskStatus,
                                         }) => {
    const storageKey = 'dayTodoData';
    const [taskTitle, setTaskTitle] = useState<string>('');
    const [tasksState, setTasksState] = useState<TaskType[]>(tasks);
    const [filter, setFilter] = useState<FilterValuesType>('all');
    const [error, setError] = useState<string | null>(null)

    const addTaskHandler = () => {
        if (taskTitle.trim() === '') {
            alert('Title is required');
            return;
        }

        addTask(taskTitle.trim());
        setTaskTitle('');
        setError(null);

        const newTask = { id: Date.now().toString(), title: taskTitle, isDone: false };
        const newTasks = [...tasksState, newTask];
        saveDataToLocalStorage(storageKey, { tasks: newTasks, title: taskTitle });
        setTasksState(newTasks);
    };

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value);
        setError(null);
    };

    // const encryptAndSaveHandler = () => {
    //     saveDataToLocalStorage(storageKey, { tasks: tasksState, title: taskTitle });
    // };

    const saveData = () => {
        localStorage.setItem('taskValue', taskTitle.toString());
    };

    // Функція для видалення даних з localStorage
    const clearData = () => {
        localStorage.removeItem('taskValue');
        setTaskTitle(''); // Скидання лічильника
    };

    // Відновлення даних при завантаженні компоненти
    useEffect(() => {
        const savedTask = localStorage.getItem('taskValue');
        if (savedTask !== null) {
            setTaskTitle((savedTask));
        }
    }, []);


    const loadDataHandler = () => {
        const savedData = loadDataFromLocalStorage(storageKey);
        if (savedData && savedData.tasks) {
            const { title, tasks: loadedTasks } = savedData;
            setTasksState(loadedTasks);
            setTaskTitle(title || '');
        }
    };

    const onFilterButtonClick = (value: FilterValuesType) => {
        changeFilter(value);
        setFilter(value);
        filterTasks(value);
    };

    const removeTaskHandler = (taskId: string) => {
        removeTask(taskId);
        const newTasks = tasksState.filter((task) => task.id !== taskId);
        saveDataToLocalStorage(storageKey, { tasks: newTasks, title: taskTitle });
        setTasksState(newTasks);
    };

    const changeTaskStatusHandler = (taskId: string) => {
        changeTaskStatus(taskId);
        const newTasks = tasksState.map((task) =>
            task.id === taskId ? { ...task, isDone: !task.isDone } : task
        );
        saveDataToLocalStorage(storageKey, { tasks: newTasks, title: taskTitle });
        setTasksState(newTasks);
    };

    const filterTasks = (value: FilterValuesType) => {
        if (value === 'all') {
            setTasksState(tasks);
        } else if (value === 'active') {
            setTasksState(tasksState.filter((task) => !task.isDone));
        } else if (value === 'completed') {
            setTasksState(tasksState.filter((task) => task.isDone));
        }
    };


    return (
        <div className={s.todoDay}>
            <h3>{title}</h3>
            {error && <div className={s.error}>{error}</div>}
            <div className={s.task}>
                <input className={s.inputTodo} type="text" value={taskTitle} onChange={onChangeHandler} />
                <button onClick={addTaskHandler} className={s.buttonAddTodo}>
                    +
                </button>
                <button onClick={saveData} className={s.button}>
                    Save
                </button>
                <button onClick={loadDataHandler} className={s.button}>
                    Load
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
                    <button onClick={() => onFilterButtonClick('all')} className={s.button}>
                        All
                    </button>
                    <button onClick={() => onFilterButtonClick('active')} className={s.button}>
                        Active
                    </button>
                    <button onClick={() => onFilterButtonClick('completed')} className={s.button}>
                        Completed
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DayTodo;