import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';
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

export const DayTodo: React.FC<DayTodoProps> = ({
                                             title,
                                             tasks: initialTasks, // Оголошення як initialTasks
                                             addTask,
                                             removeTask,
                                             changeFilter,
                                             changeTaskStatus,
                                         }) => {
    const storageKey = 'dayTodoData';

    const [taskTitle, setTaskTitle] = useState<string>('');
    const [tasks, setTasks] = useState<TaskType[]>(initialTasks); // Використовуємо стан

    useEffect(() => {
        const savedData = loadDataFromLocalStorage(storageKey);
        if (savedData && savedData.tasks) {
            setTaskTitle(savedData.tasks.title || '');
        }
    }, []);

    const addTaskHandler = () => {
        addTask(taskTitle);
        const newTask = { id: Date.now().toString(), title: taskTitle, isDone: false };
        const newTasks = [...tasks, newTask];
        saveDataToLocalStorage(storageKey, { tasks: newTasks, title });
        setTasks(newTasks); // Оновлюємо стан tasks
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

    const encryptAndSaveHandler = () => {
        saveDataToLocalStorage(storageKey, { tasks, title: taskTitle });
    };

    const loadDataHandler = () => {
        const savedData = loadDataFromLocalStorage(storageKey);
        if (savedData && savedData.tasks) {
            const { title, tasks: loadedTasks } = savedData;

            // Використання setTasks для встановлення завантажених даних
            setTasks(loadedTasks);
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
                <input
                    className={s.inputTodo}
                    type="text"
                    value={taskTitle}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <button onClick={addTaskHandler} className={s.buttonAddTodo}>
                    +
                </button>
                <button onClick={encryptAndSaveHandler} className={s.button}>
                    Encrypt & Save Data
                </button>
                <button onClick={loadDataHandler} className={s.button}>
                    Load Data
                </button>
                <ul className={s.taskList}>
                    {tasks.map((task) => (
                        <li key={task.id} className={s.taskLi}>
                            <div className={s.titleWithCheckbox}>
                                {' '}
                                <input
                                    type="checkbox"
                                    checked={task.isDone}
                                    onChange={() => changeTaskStatus(task.id)}
                                />
                                <div>{task.title}</div>
                            </div>
                            <button onClick={() => removeTask(task.id)} className={s.buttonRemoveTodo}>
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
