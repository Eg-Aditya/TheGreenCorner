import React, { useReducer, useState } from "react";
import Img from "../../../assets/plant/Plant_Login_Image.jpg";
import Logo from "../../../assets/plant/TheGreenCorner2.png";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordTip, setShowPasswordTip] = useState(false);


  const initialState = {
    username: "",
    password: "",
    email: "",
    contact: "",
    isChecked: false,
    error: "",
    success: "",
  };

  const formReducer = (state, action) => {
    switch (action.type) {
      case "SET_FIELD":
        return { ...state, [action.field]: action.value };
      case "SET_ERROR":
        return { ...state, error: action.value, success: "" };
      case "SET_SUCCESS":
        return { ...state, success: action.value, error: "" };
      case "TOGGLE_CHECKBOX":
        return { ...state, isChecked: !state.isChecked };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(formReducer, initialState);
  const navigate = useNavigate();
  const [passwordMessage, setPasswordMessage] = useState("Password must be at least 6 characters long.");
  const handlePasswordChange = (value) => {
    handleChange("password", value);

    if (value.length < 6) {
      setPasswordMessage("Password must be at least 6 characters long.");
      setShowPasswordTip(true);
    } else {
      setPasswordMessage("✅ Password looks good!");
      setShowPasswordTip(true);

      // Hide the message after 2 seconds if the condition is met
      setTimeout(() => setShowPasswordTip(false), 2000);
    }
  };


  const validateForm = () => {
    if (!state.username || !state.email || !state.password || !state.contact) {
      dispatch({ type: "SET_ERROR", value: "All fields are required" });
      return false;
    }

    if (!state.username || state.username.length < 3) {
      dispatch({ type: "SET_ERROR", value: "Username must be at least 3 characters long." });
      return false;
    }

    if (!state.email || !/\S+@\S+\.\S+/.test(state.email)) {
      dispatch({ type: "SET_ERROR", value: "Please enter a valid email." });
      return false;
    }

    if (state.password.length < 6) {
      dispatch({ type: "SET_ERROR", value: "Password must be at least 6 characters long." });
      return false;
    }

    if (!/^\d{10}$/.test(state.contact)) {
      dispatch({ type: "SET_ERROR", value: "Contact number must be exactly 10 digits." });
      return false;
    }

    if (!state.isChecked) {
      dispatch({ type: "SET_ERROR", value: "You must agree to the Terms & Conditions." });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const data = {
      username: state.username,
      password: state.password,
      email: state.email,
      contact: state.contact,
    };

    try {
      // Check if the user already exists
      const existingUser = await axios.get(`http://localhost:5000/user?email=${state.email || state.username ||state.contact}`);

      if (existingUser.data.length > 0) {
        dispatch({ type: "SET_ERROR", value: "User with this email already exists!" });
        return;
      }

      // Proceed with registration if user does not exist
      const response = await axios.post("http://localhost:5000/user", data, {
        headers: { "Content-Type": "application/json" }
      });

      dispatch({ type: "SET_SUCCESS", value: "Sign up successful!" });
      alert("Sign Up successfully")

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Signup error:", error);
      dispatch({
        type: "SET_ERROR",
        value: "Signup failed! Please try again."
      });
    }
  };

  const handleChange = (field, value) => {
    dispatch({ type: "SET_FIELD", field, value });
  };

  return (
    <div className="w-full h-screen flex flex-col lg:flex-row">
      {/* Left Section */}
      <div className="h-[70%] lg:h-full w-full lg:w-[45%] flex flex-col bg-white">
        <div className="h-[8%] flex items-center justify-start px-4">
          <Link to="/"><img src={Logo} alt="The Green Corner Logo" /></Link>
        </div>

        <div className="h-[30%] flex flex-col items-center justify-center gap-2 px-4 lg:px-8">
          <h1 className="text-lg lg:text-xl font-bold">Welcome to The Green Corner!</h1>
          <p className="text-xs lg:text-sm text-gray-600">
            Sign up for exclusive offers, plant care tips, and more!
          </p>
          <div className="mt-2 flex gap-4">
            <button className="px-4 py-2 text-black bg-white flex items-center gap-2 rounded-md shadow-md hover:bg-gray-100">
              <FcGoogle size={20} /> Google
            </button>
            <button className="px-4 py-2 text-black bg-white flex items-center gap-2 rounded-md shadow-md hover:bg-gray-100">
              <FaFacebook className="text-blue-600" size={20} /> Facebook
            </button>
          </div>
        </div>

        <div className="h-[55%] flex flex-col items-center justify-center gap-4 px-4 lg:px-8">
          {state.error && <p className="text-red-500">{state.error}</p>}
          {state.success && <p className="text-green-500">{state.success}</p>}

          <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-4">
            <div className="w-[90%] lg:w-[70%]">
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={state.username}
                onChange={(e) => handleChange("username", e.target.value)}
                className="w-full h-8 px-4 rounded-md border"
              />
            </div>

            <div className="relative w-[90%] lg:w-[70%]">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                name="password"
                value={state.password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                onFocus={() => setShowPasswordTip(true)} // Show tooltip on focus
                onBlur={() => setShowPasswordTip(false)} // Hide tooltip on blur
                className="w-full h-8 px-4 rounded-md border"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-600"
              >
                {showPassword ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
              </button>
              {showPasswordTip && (
                <div className="absolute top-10 left-0 bg-gray-700 text-white text-xs px-2 py-1 rounded-md">
                  {passwordMessage}
                </div>
              )}
            </div>


            <div className="w-[90%] lg:w-[70%]">
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={state.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full h-8 px-4 rounded-md border"
              />
            </div>

            <div className="w-[90%] lg:w-[70%]">
              <input
                type="text"
                placeholder="Contact"
                name="contact"
                value={state.contact}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d{0,10}$/.test(value)) {
                    handleChange("contact", value);
                  }
                }}
                className="w-full h-8 px-4 rounded-md border"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="agree"
                checked={state.isChecked}
                onChange={() => dispatch({ type: "TOGGLE_CHECKBOX" })}
                className="w-3 h-3 text-green-600" />
              <label htmlFor="agree" className="text-gray-700 text-xs">
                I agree to the <a href="#" className="text-blue-600 underline">T&C</a> and <a href="#" className="text-blue-600 underline">Privacy Policy</a>.
              </label>
            </div>

            <button type="submit" className="w-[90%] lg:w-[70%] h-10 text-white bg-[#163020] rounded-md shadow-md hover:bg-[#163030]">
              Create Account
            </button>
          </form>

          <div className="flex gap-1 text-sm">
            <p>Already have an account?</p>
            <Link to='/login' className="text-green-700">Sign In</Link>
          </div>
        </div>
      </div>

      <div className="h-[30%] lg:h-full w-full lg:w-[55%]">
        <img src={Img} alt="Login Plant" className="object-cover h-full w-full" />
      </div>
    </div>
  );
};
export default SignUpPage;
