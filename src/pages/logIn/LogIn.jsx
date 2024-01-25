import React, { useState } from 'react';
import './logIn.css';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import { common } from '@mui/material/colors';
import { useNavigate } from 'react-router';
import axios from 'axios';


export const LogIn = () => {
    const navigate = useNavigate();

    const [loginError, setLoginError] = useState(null);

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onChange'
    })

    const onSubmit = async (values) => {
        const { email, password } = values;

        try {
            // nu functioneaza, intoarce status 200 mereu
            const response = await axios.post('http://localhost:8080/users/login', {
                email: email,
                password: password,
            });
            if (response.status === 200) {
                const response = await axios.get(`http://localhost:8080/users/get-by-email/${email}`);
                if (response.status === 200 && response.data.level === "admin") {
                    localStorage.setItem('isAdmin', 'true');
                    localStorage.setItem('isMedia', 'false');
                    navigate('/admin-page');

                }
                else if (response.status === 200 && response.data.level === "media") {
                    localStorage.setItem('isMedia', 'true');
                    localStorage.setItem('isAdmin', 'false');
                    navigate('/');
                }
                else {
                    setLoginError("Datele de autentificare sunt incorecte.");

                }
            }
            else if (response.status !== 200) {
                setLoginError("Datele de autentificare sunt incorecte.");

            }

        } catch (error) {
            console.error('Error fetching sponsor data:', error);
            setLoginError("Datele de autentificare sunt incorecte.");

        }
    };


    return (
        <div className="login-all">
            <div className="container">
                <div className="left-side"
                    style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/Logo_CSU_Suceava.png)` }} />
                <div className="right-side">
                    <Typography className="title" variant="h5">
                        Log In
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            className="field"
                            label="E-Mail"
                            error={Boolean(errors.email?.message)}
                            helperText={errors.email?.message}
                            type='email'
                            {...register('email', { required: " Insert E-mail" })}
                            fullWidth
                        />
                        <TextField
                            className="field"
                            label="Password"
                            type="password"
                            error={Boolean(errors.password?.message)}
                            helperText={errors.password?.message}
                            {...register('password', { required: " Insert Password" })}
                            fullWidth />
                        <Button
                            type="submit"
                            size="large"
                            variant="contained"
                            sx={{
                                backgroundColor: common.white,
                                color: '#000',
                                '&:hover': {
                                    backgroundColor: common.white,
                                    color: '#000',
                                    cursor: 'pointer',
                                },
                            }}
                            fullWidth>
                            LogIn
                        </Button>

                    </form>
                    {loginError && <p style={{ color: 'black' }}>{loginError}</p>}
                </div>
            </div >
        </div>
    );

}
