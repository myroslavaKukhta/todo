import React from 'react';
import { DayTodo, TaskType } from './DayTodo';
import { FilterValuesType } from './App';
import { saveDataToLocalStorage, loadDataFromLocalStorage } from './localStorageUtils'; // Імпорт функцій

interface WeekTodoProps {
    title: string;
    tasks: TaskType[];
    addTask: (title: string) => void;
    removeTask: (taskId: string) => void;
    changeFilter: (value: FilterValuesType) => void;
    changeTaskStatus: (taskId: string) => void;
}

export const WeekTodo: React.FC<WeekTodoProps> = ({ title, tasks, addTask, removeTask, changeFilter, changeTaskStatus, }) => {
    const days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const [dailyTasks, setDailyTasks] = React.useState<{ [key: string]: TaskType[] }>({});

    React.useEffect(() => {
        // Завантаження даних при монтажі компонента
        const savedData = loadDataFromLocalStorage('dailyTasks');
        if (savedData) {
            // Встановлення збережених даних
            setDailyTasks(savedData);
        }
    }, []);

    const addTaskToDay = (day: string, task: string) => {
        setDailyTasks((prevTasks) => ({
            ...prevTasks,
            [day]: [...(prevTasks[day] || []), { id: Date.now().toString(), title: task, isDone: false }],
        }));
    };

    const removeTaskFromDay = (day: string, id: string) => {
        setDailyTasks((prevTasks) => ({
            ...prevTasks,
            [day]: prevTasks[day].filter((task) => task.id !== id),
        }));
    };

    return (
        <div>
            <h2>Week</h2>
            <div className="days-todo">
                {days.map((day, index) => (
                    <DayTodo
                        key={index}
                        title={day} // change 'day' to 'title'
                        tasks={dailyTasks[day] || []}
                        addTask={(text) => addTaskToDay(day, text)}
                        removeTask={(id) => removeTaskFromDay(day, id)}
                        changeFilter={changeFilter}
                        changeTaskStatus={changeTaskStatus}
                    />
                ))}
            </div>
        </div>
    );
}