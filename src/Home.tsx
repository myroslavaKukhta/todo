import React, { useState, useEffect } from 'react';
import s from './Home.module.css'
import win from "./img/win.jpg";

interface TaskCounterProps {
    tasksCount: number;
}

const TaskCounter: React.FC<TaskCounterProps> = ({ tasksCount }) => (
    <div>
        <h2>I did it! {tasksCount}</h2>
    </div>
);


const Home: React.FC = () => {
    const [count, setCount] = useState<number>(0);

    // Функція для збільшення лічильника
    const increment = () => {
        setCount((prevCount) => prevCount + 1);
    };

    // Функція для збереження даних в localStorage
    const saveData = () => {
        localStorage.setItem('counterValue', count.toString());
    };

    // Функція для видалення даних з localStorage
    const clearData = () => {
        localStorage.removeItem('counterValue');
        setCount(0); // Скидання лічильника
    };

    // Відновлення даних при завантаженні компоненти
    useEffect(() => {
        const savedCount = localStorage.getItem('counterValue');
        if (savedCount !== null) {
            setCount(parseInt(savedCount, 10));
        }
    }, []); // Порожній масив залежностей означає, що ефект викликається тільки при монтажі компоненти

    return (
        <div className={s.counter}>
            <div className={s.imageContainer}>
                <img
                    src={win}
                    alt="win"
                />
            </div>
            <div className={s.counterContent}>
                <h2>I did tasks: {count}</h2>
                <button onClick={increment}>One more did</button>
                <button onClick={clearData}>Clear</button>
                <button onClick={saveData}>Save</button>
            </div>
        </div>
    );
};

export default Home;
