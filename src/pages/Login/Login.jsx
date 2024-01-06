import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginUsingSocialMedia from "./LoginUsingSocialMedia";
import {
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";
import BasicModal from "../../components/BasicModal/BasicModal";
export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const email = useRef();
    const password = useRef();
    const navigate = useNavigate();
    const [invalidInput, setInvalidInput] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading((prev) => !prev);
        const loginResult = await login(
            email.current.value,
            password.current.value
        );
        if (typeof loginResult === "string") {
            setInvalidInput(loginResult);
        } else {
            // navigate()
            
            navigate("/dashboard");
        }
        setLoading((prev) => !prev);
    };

    return (
        <div className="login-form-container">
            <Typography variant="h3">Welcome Back</Typography>

            <form id="login-form" onSubmit={handleSubmit}>
                <FormControl sx={{ m: 1, width: 1 }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-email">
                        Email
                    </InputLabel>
                    <OutlinedInput
                        required
                        id="outlined-adornment-email"
                        label="Email"
                        inputRef={email}
                        type="email"
                        sx={{ height: "50px" }}
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: 1 }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                        Password
                    </InputLabel>
                    <OutlinedInput
                        required
                        inputRef={password}
                        id="outlined-adornment-password"
                        label="Password"
                        sx={{ height: "50px" }}
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>

                <Button variant="contained" type="submit" disabled={loading}>
                    Log In
                </Button>

                {invalidInput && (
                    <BasicModal msg={invalidInput} setMsg={setInvalidInput} />
                )}
            </form>
            <LoginUsingSocialMedia />
        </div>
    );
}