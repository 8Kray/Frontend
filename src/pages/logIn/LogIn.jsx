import React from 'react';
import './logIn.css';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import { common } from '@mui/material/colors';


export const LogIn = () => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onChange'
    })

    const onSubmit = async (value) => {
        //     const data = await dispatch(fetchAuth(value));

        //     if(!data.payload){
        //       return  alert('Unouthorized');
        //     }

        //    if('token' in data.payload){
        //     window.localStorage.setItem('token', data.payload.token);
        //    }
    }


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
                </div>
            </div >
        </div>
    );

}
