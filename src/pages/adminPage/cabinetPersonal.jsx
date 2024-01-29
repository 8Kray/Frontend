import React, { useState, useEffect } from 'react';
import './adminPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useAuth } from '../../components/AuthProvider';

export const CabinetPersonal = () => {
    const navigate = useNavigate();
    const { isAdmin, isMedia, user, setisAdmin, setisMedia, setUser } = useAuth();

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const [editing, setEditing] = useState(false);
    const [editedUsername, setEditedUsername] = useState(user.username);

    useEffect(() => {
        if (isAdmin && !isMedia) {
        } else if (!isAdmin && isMedia) {
        } else {
            navigate('/');
        }
    }, [isAdmin, isMedia, navigate]);

    const handleLogout = () => {
        setisAdmin(false);
        setisMedia(false);
    };
    const handleEditClick = () => {
        setEditing(true);
    };

    const handleSaveClick = () => {
        const updatedUserData = {
            username: editedUsername,
            password: user.password,
            email: user.email,
            level: user.level,
        };
        const fetchData = async () => {
            try {
                await axios.put(`http://localhost:8080/users/update{users}?username=${user.username}`, updatedUserData);
                const response = await axios.get(`http://localhost:8080/users/get-by-username/${editedUsername}`);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching sponsor data:', error);
            }
        };
        fetchData();

        setEditing(false);
    };

    const handleCancelClick = () => {

        setEditedUsername(user.username);
        setEditing(false);
    };

    const handleInputChange = (e) => {
        setEditedUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setNewPassword(e.target.value);
        // Verifică dacă parolele coincid
        setPasswordsMatch(e.target.value === confirmPassword);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        // Verifică dacă parolele coincid
        setPasswordsMatch(e.target.value === newPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (passwordsMatch) {
            const updatedUserData = {
                username: user.username,
                password: newPassword,
                email: user.email,
                level: user.level,
            };
            const fetchData = async () => {
                try {
                    console.log("111")
                    await axios.put(`http://localhost:8080/users/update{users}?username=${user.username}`, updatedUserData);
                    const response = await axios.get(`http://localhost:8080/users/get-by-username/${user.username}`);
                    setUser(response.data);
                } catch (error) {
                    console.error('Error fetching sponsor data:', error);
                }
            };
            fetchData();
            setNewPassword('');
            setConfirmPassword('');
        } else {
            console.error('Parolele nu coincid!');
        }
    };

    return (
        <div className='AdminContainer'>
            <div className='personal-tabel'>
                <div>
                    <h2>
                        {editing ? (
                            <>
                                <label>
                                    Username:
                                    <input
                                        className='changeUsername'
                                        type="text"
                                        value={editedUsername}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <button onClick={handleSaveClick}>Save</button>
                                <button onClick={handleCancelClick}>Cancel</button>
                            </>
                        ) : (
                            <>
                                Username: {user.username}
                                <button className="editButton" onClick={handleEditClick}>
                                    Edit
                                </button>
                            </>
                        )}
                    </h2>
                </div>
                <p>Email: {user.email}</p>
                <p>Nivel: {user.level}</p>


                <div className='changeP' >
                    <label>
                        Parolă nouă:
                        <input type="password" value={newPassword} onChange={handlePasswordChange} />
                    </label>
                    <label>
                        Confirmă parola:
                        <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                    </label>
                    {!passwordsMatch && <p style={{ color: 'red' }}>Parolele nu coincid!</p>}
                    <div>
                        <button
                            className={`changebutton ${passwordsMatch ? 'valid' : 'invalid'}`}
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Schimbă parola
                        </button>
                    </div>
                </div>


                <div className='button-container'>
                    <button onClick={handleLogout}>Logout</button>
                </div>

            </div>
        </div>
    );
};
export default CabinetPersonal;
