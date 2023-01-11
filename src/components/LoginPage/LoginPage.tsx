import React, { useState } from "react";
import axios from "axios";
import "./login.css"
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const url = "https://jsonplaceholder.typicode.com/users";

const LoginPage: React.FC = () => {
    const [loginLoading, setLoginLoading] = useState<String>("Login")
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm({});

    const navigate = useNavigate();

    const onSubmit_ = (data: any) => {
        setLoginLoading("Loading.....")
        console.log(data);
        
        axios
            .post(url, data, {
                headers: { "Content-Type": "application/json",
                           "Access-Control-Allow-Origin": true,
            },
            })
            .then((response) => {
                console.log(response);

                setTimeout(()=>{
                    toast.success(response.data.msg)
                }, 1000)
                
                    navigate("/my-app");
            

            })
            .catch((error) => {
                console.log(error)
                console.log(error.response.data.msg)

                setTimeout(()=>{
                    toast.error(error.response.data.msg)
                }, 1000)
                
                
            });
        reset();
        };


  return (
    <div className="login">
            <div className="login-left">
                <h2 style={{ color: "gray" }}>TODO APP</h2>
                <br />
                <h1 style={{ color: "gray" }}>Welcome Back</h1>
                {/* <div id="login-google">
                    <FcGoogle className="googleicon" /> Login with Google
                    {user && (
                        <div>
                            <img src={user.picture} alt="" />
                            <h3>{user.name}</h3>
                        </div>
                    )}
                </div> */}
                <div className="email-login">
                    <div className="email-login-left"></div>
                    <div className="email-login-middle">
                        OR LOGIN WITH EMAIL
                    </div>
                    <div className="email-login-right"></div>
                </div>

                <form className="login-form" onSubmit={handleSubmit(onSubmit_)}>
                {/* <form className="login-form" onSubmit={(e) => {e.preventDefault(), console.log(e)}}> */}
                    <label
                        htmlFor="email-adress"
                        style={{ paddingRight: "3vw" }}
                    >
                        Email Adress
                    </label>
                    <br />
                    <input
                        className="login-input"
                        type="email"
                        placeholder="Email Adress"
                        {...register("email", {
                            // required: true,
                            // pattern:
                            //     /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        })}
                    />
                    <p className="errormessage">
                        {errors.email?.type === "required" &&
                            "please enter an email address"}
                    </p>
                    <p className="errormessage">
                        {errors.email?.type === "pattern" &&
                            "your email is not valid"}
                    </p>

                    <br />
                    <br />

                    <label htmlFor="password" style={{ paddingRight: "5vw" }}>
                        Password
                    </label>
                    <input
                        type="password"
                        className="login-input"
                        placeholder="password"
                        {...register("password", {
                            required: true,
                            // pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
                        })}
                    />
                    <div className="keep">
                        <input type="checkbox" />
                        <p style={{ marginRight: "10vw" }}>Keep me logged in</p>
                        <Link className="profile-link" to="/forgot-password">
                            <p style={{ color: "red" }}>
                                forgot your password?
                            </p>
                        </Link>
                    </div>
                    <button className="login-button" type="submit">
                        {loginLoading}
                    </button>

                    <div className="line"></div>
                    <div className="dont">
                        Dont have an account?{" "}
                        <Link className="profile-link" to="/">
                            <span
                                className="waste-signup"
                                style={{ color: "red" }}
                            >
                                Sign up
                            </span>{" "}
                        </Link>
                    </div>
                </form>
            </div>
            <div className="login-right">
                <div className="login-writeup">
                    {/* <h4>Schedule a pick-up day</h4> */}
                    <br />
                    {/* <p>
                        Tell us where and when you want your waste to be pick up
                    </p> */}
                    {/* <button className="login-btn">Pick a schedule</button> */}
                </div>
            </div>
            <ToastContainer />
        </div>
  )
}

export default LoginPage
