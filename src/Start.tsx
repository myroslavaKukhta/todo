import React, {useState, ChangeEvent, FormEvent} from 'react';
import s from './Start.module.css';
import samur from './img/samur.jpg'

interface StartProps {
    handleRegistration: () => void;
    isRegistered: boolean;
}

const Start: React.FC<StartProps> = ({handleRegistration, isRegistered}) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (formData.password.length >= 6 && formData.username && formData.email) {
            handleRegistration();
            setFormData({
                username: '',
                email: '',
                password: '',
            });
            alert('Congratulation! Registration successful!');
        } else {
            console.error('Registration error! Check the entered data!');
        }
    };

    if (isRegistered) {
        return <>
            <div className={s.text}>
                <h2>You are already registered!</h2>
                <h3>Go to your tasks!</h3>
            </div>
            <img
                src={samur}
                alt="samur"
            />
        </>
    }

    return (
        <div>
            <h2>Hello! Samurai, you need to be registered before use this App</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                    />
                </label>
                <br/>
                <label>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange}
                           placeholder="Enter email" required/>
                </label>
                <br/>
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter password (min 6 symbols)"
                        minLength={6}
                        required
                    />
                </label>
                <br/>
                <button className={s.button} type="submit">Submit</button>
            </form>
        </div>
    );
};
export default Start;
