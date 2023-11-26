import React, { useState, ChangeEvent, FormEvent } from 'react';
import './Start.module.css';

interface StartProps {
    handleRegistration: () => void;
    isRegistered: boolean;
}

const Start: React.FC<StartProps> = ({ handleRegistration, isRegistered }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
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
        return <p>You are already registered!</p>;
    }

    return (
        <div>
            <h2>Hello! You need to be registered before use this secret App</h2>
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
                <br />
                <label>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" required />
                </label>
                <br />
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
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};
export default Start;
