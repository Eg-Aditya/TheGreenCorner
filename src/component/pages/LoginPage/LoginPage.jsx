import React, { useContext, useEffect, useReducer, useState } from "react";
import Img from "../../../assets/plant/Plant_Login_Image.jpg";
import Logo from "../../../assets/plant/TheGreenCorner2.png";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { plantContext } from "../../Context/AppContext";
import { authContext } from "../../Context/AuthContext";
import toast from "react-hot-toast";

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { isLoggedIn, setIsLoggedIn, setUserDetails, admin } = useContext(plantContext)
    const {checkUser, setCheckUser,auth, setAuth} = useContext(authContext)

    
    const initialState = {
        email: "",
        password: "",
        users: [],
        isLoggedIn: false,
        isAdmin: false,
        error: "",
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case "SET_FIELD":
                return { ...state, [action.field]: action.value };
            case "SET_USERS":
                return { ...state, users: action.value };
            case "LOGIN_SUCCESS":
                return { ...state, isLoggedIn: true, error: "" };
            case "LOGIN_FAILURE":
                return { ...state, error: action.error };
            case "isAdmin":
                return{...state, isAdmin: action.value}    
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);
    const navigate = useNavigate();
    useEffect(() => {
        axios
            // .get("http://116.75.62.44:8000/auth")
            .get("http://localhost:5000/user")
            .then((response) => {
                dispatch({ type: "SET_USERS", value: response.data });
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: "SET_FIELD", field: name, value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password, users } = state;

        // Basic validation for empty fields
        if (!email || !password) {
            dispatch({ type: "LOGIN_FAILURE", error: "Please fill in all fields." });
            return;
        }

        // Email validation regex
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            dispatch({ type: "LOGIN_FAILURE", error: "Please enter a valid email address." });
            return;
        }

        // Password validation (example: minimum 6 characters)
        if (password.length < 6) {
            dispatch({ type: "LOGIN_FAILURE", error: "Password must be at least 6 characters." });
            return;
        }

        // Find the user
        const user = users.find(
            (u) => u.email === email && u.password === password
        );

        // Find the admin
         const adminUser =  admin.find((a) => a.email === email && a.password === password);
        if (user) {
            dispatch({ type: "LOGIN_SUCCESS" });
            toast.success("Login successful!",{duration: 2000});
            setIsLoggedIn(true)
            setUserDetails({ email, password, user });
            navigate("/");
        } 
        else if (adminUser) {
            dispatch({ type: "LOGIN_SUCCESS" });
            dispatch({ type: "isAdmin", value: true }); // Set isAdmin to true
            toast.success("Admin login successful!", { duration: 2000 });
            setIsLoggedIn(true);
            setUserDetails({ email, password, adminUser });
            navigate("/admin-dash"); // Navigate to admin dashboard
        } else {
            dispatch({ type: "LOGIN_FAILURE", error: "Invalid username or password." });
        }
    };

    return (
        <div className="w-full h-screen flex flex-col lg:flex-row">
            {/* Left Section */}
            <div className="h-[60%] lg:h-full w-full lg:w-[45%] flex flex-col bg-white">
                {/* Header */}
                <div className="h-[15%] w-[80%] ml-10 flex items-center justify-start">
                    <Link to="/"><img src={Logo} alt="The Green Corner Logo" /></Link>
                </div>
                {/* Middle Section */}
                <div className="h-[35%] flex flex-col items-center justify-center gap-3 px-4 lg:px-8">
                    <h1 className="text-2xl lg:text-4xl font-bold">Welcome Back</h1>
                    <p className="text-sm lg:text-base text-gray-600">
                        Login into your account
                    </p>
                    <div className="mt-2 flex gap-4">   {/* Button Google & FaceBook */}
                        <button className="px-4 py-2 text-black bg-white flex items-center gap-2 rounded-md shadow-md hover:bg-gray-100">
                            <FcGoogle size={20} />
                            Google
                        </button>
                        <button className="px-4 py-2 text-black bg-white flex items-center gap-2 rounded-md shadow-md hover:bg-gray-100">
                            <FaFacebook className="text-blue-600" size={20} />
                            Facebook
                        </button>
                    </div>
                    <div className="w-full flex items-center gap-2">
                        <hr className="flex-grow border-t border-[#DBDBDB]" />
                        <span className="text-gray-500 text-sm font-medium">Or continue with</span>
                        <hr className="flex-grow border-t border-[#DBDBDB]" />
                    </div>
                </div>
                {/* Bottom Section */}
                <div className="h-[50%] flex flex-col items-center justify-center gap-4 px-4 lg:px-8">
                    <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-4">
                        {/* Display error message */}
                        {state.error && <p className="text-red-500 text-sm">{state.error}</p>}

                        <div className="w-[90%] lg:w-[70%]">
                            <input
                                type="email"
                                placeholder="Email"
                                value={state.email}
                                name="email"
                                required
                                onChange={handleChange}
                                className='w-full h-10 px-4 rounded-md border focus:outline-none focus:ring-2 focus:ring-green-400'
                            />
                        </div>
                        <div className="relative w-[90%] lg:w-[70%]">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                name="password"
                                value={state.password}
                                required
                                onChange={handleChange}
                                className='w-full h-10 px-4 rounded-md border focus:outline-none focus:ring-2 focus:ring-green-400'
                            />
                            {/* Eye Icon Toggle */}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                            >
                                {showPassword ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
                            </button>
                        </div>
                        <div className="w-[70%] flex items-center justify-evenly gap-2">
                            {/* Are You Admin */}
                            <div className="flex gap-1 items-center">
                                <input
                                    type="checkbox"
                                    id="admin"
                                    checked={state.isAdmin}
                                    onChange={(e)=>{dispatch({ type: "isAdmin", value: e.target.checked})}}
                                    className="w-3 h-3 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                />
                                <label htmlFor="agree" className="text-gray-700 text-xs">
                                    Are You Admin
                                </label>
                            </div>
                            {/* Remember */}
                            {/* <div className="flex gap-1 items-center">
                                <input
                                    type="checkbox"
                                    id="agree"
                                    className="w-3 h-3 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                />
                                <label htmlFor="agree" className="text-gray-700 text-xs">
                                    Remember
                                </label>
                            </div> */}
                            
                            <div>
                                <p className="text-red-500 text-xs"><Link>Forgot Password?</Link></p>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-[90%] lg:w-[70%] h-10 text-white bg-[#163020] rounded-md shadow-md hover:bg-[#163030]"
                        >
                            Log In
                        </button>
                    </form>
                    <div className="flex gap-1 text-sm">
                        <p>Don’t have an account?</p>
                        <Link to="/signup" className="text-green-700">Sign up!</Link>
                    </div>
                </div>
            </div>

            {/* Right Section */}
            <div className="h-[40%] lg:h-full w-full lg:w-[55%]">
                <img
                    src={Img}
                    alt="Login Plant"
                    className="object-cover h-full w-full"
                />
            </div>
        </div>
    );
};

export default LoginPage;
