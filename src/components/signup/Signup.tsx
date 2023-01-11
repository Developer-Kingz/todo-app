import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./signup.css"
import "react-toastify/dist/ReactToastify.css"
import {ToastContainer, toast} from "react-toastify"
import { Link, useParams } from "react-router-dom";


const url = "https://jsonplaceholder.typicode.com/users";

const Signup: React.FC = () => {
  return (
    <div className="fullpage">
            <div className="left"></div>
            <div className="right">
                <h2>Welcome</h2>
                <br />
                <p style={{ color: "black" }}>
                    {/* Become part of a better community by disposing your waste
                    properly */}
                    Welcome to my TODO App
                </p>
                <p style={{ color: "black" }}>
                    {/* Find waste management agencies in your location to pick up
                    your waste on schedule */}
                </p>
                <Form/> 
            </div>
        </div>
  )
};


const Form =()=>{
    const [signLoading, setSignLoading] = useState<String>("Create Account")
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm({});

    const navigate = useNavigate();

    const onSubmit = (data: any) => {
        setSignLoading("Loading.......")
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
                
                navigate("/login")

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
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="names">
                <div className="inputleft">
                    <label htmlFor="name">Full Name</label>
                    <br />
                    <input
                        className="inputemail"
                        type="text"
                        // name="name"
                        placeholder="Enter full name"
                        {...register("name", {
                            required: true,
                            maxLength: 30,
                        })}
                    />
                    <p className="errormessage">
                        {errors.name?.type === "required" &&
                            "your name is required"}
                    </p>
                    <p className="errormessage">
                        {errors.name?.type === "maxLength" &&
                            "your name should not be more than 30 character long"}
                    </p>
                </div>
                
            </div>

            <div className="email">
                <label htmlFor="email">Email</label>
                <br />
                <input
                    className="inputemail"
                    type="text"
                    // name="email"
                    placeholder="Enter a valid email"
                    {...register("email", {
                        required: true,
                        pattern:
                            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
            </div>

            <div className="password">
                <div className="inputleft">
                    <label htmlFor="password">Password</label>
                    <br />
                    <input
                        type="password"
                        // name="password"
                        placeholder="Create a password"
                        {...register("password", {
                            required: true,
                            pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
                        })}
                    />
                    <p className="errormessage">
                        {errors.password?.type === "required" &&
                            "Please enter a password"}
                    </p>
                    <p className="errormessage">
                        {errors.password?.type === "pattern" &&
                            "Password must contain letters,Uppercase, Numbers, special character and should not be less than 6 and more than 15 characters"}
                    </p>
                </div>
                <div className="inputright">
                    <label htmlFor="confirm password">Confirm password</label>
                    <br />
                    <input
                        type="password"
                        // name="confirmPassword"
                        placeholder="Type password again"
                        {...register("confirmPassword", {
                            required: true,
                            validate: (value) => {
                                if (watch("password") != value) {
                                    return "Your passwords do no match";
                                }
                            },
                        })}
                    />
                    <p className="errormessage">
                        {errors.confirmPassword?.type === "validate" &&
                            "Password does not match"}
                    </p>

                </div>
            </div>
            <div className="option">
            
            </div>
            <div className="checkbox">
                <input type="checkbox" required />
                <span className="agreement" style={{ fontSize: "small", color: "black" }}>
                    Yes, i understand and agree to the Terms of Services,
                    including the user Agreement and Privacy.
                </span>
            </div>

            <button className="btn" type="submit">
                {signLoading}
            </button>
            <p className="question">Already have an account? <Link to="/login">Log in.</Link></p>

            <ToastContainer />
        </form>
    )
}

export default Signup
