import React from 'react';
import s from './Home.module.css';
import image from '././parizh.jpg';


export const Home = () => {
    return (
        <div className={s.home}>
            <img src={image} alt="Description" className={s.image}/>
        </div>
    );
};

