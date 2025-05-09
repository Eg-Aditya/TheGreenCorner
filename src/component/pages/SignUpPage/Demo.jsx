import React, { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../index.css";
import LoginPageImage from "../../../assets/ImagesFolder/LoginPageImage.png";
import TheGreenCorner from "../../../assets/ImagesFolder/TheGreenCorner.png";

const initialState = {
  username: "",
  password: "",
  email: "",
  contact: "",
  confirmPassword: "",
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
    default:
      return state;
  }
};

const SignUpPage = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!state.email || !/\S+@\S+\.\S+/.test(state.email)) {
      dispatch({ type: "SET_ERROR", value: "Please enter a valid email." });
      return false;
    }
    if (state.password.length < 6) {
      dispatch({
        type: "SET_ERROR",
        value: "Password must be at least 6 characters long.",
      });
      return false;
    }
    if (state.password !== state.confirmPassword) {
      dispatch({ type: "SET_ERROR", value: "Passwords do not match!" });
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
      const response = await axios.post(
        "http://116.75.62.44:8000/adduser",
        data,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Signup successful:", response.data);

      dispatch({ type: "SET_SUCCESS", value: "Sign up successful!" });

      setTimeout(() => {
        navigate("/login"); // Redirect after showing success message
      }, 2000); // Optional delay for user feedback
    } catch (error) {
      console.error("Signup error:", error);
      dispatch({
        type: "SET_ERROR",
        value: "Signup failed! Please try again.",
      });
      navigate("/login");
    }
  };

  const handleChange = (field, value) => {
    dispatch({ type: "SET_FIELD", field, value });
  };

  return (
    <div className="container h-screen flex flex-col lg:flex-row mx-4 lg:mx-28">
      {/* Sign Up Form */}
      <div className="login-section w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center items-center bg-gray-100">
        <img
          src={TheGreenCorner}
          alt="Logo"
          className="mb-4 w-[171px] h-[42px]"
        />
        <h2 className="text-black font-poppins text-3xl font-semibold mt-4 lg:mt-[50px]">
          Sign Up
        </h2>
        <p className="mt-2">Create a new account</p>
        {state.success && <p className="text-green-500">{state.success}</p>}
        {state.error && <p className="text-red-500">{state.error}</p>}
        <form onSubmit={handleSubmit} className="w-full max-w-xs mt-4">
          {["username", "password", "email", "contact", "confirmPassword"].map(
            (field) => (
              <input
                key={field}
                type={
                  field.includes("password")
                    ? "password"
                    : field === "email"
                    ? "email"
                    : "text"
                }
                placeholder={field
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
                className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                value={state[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                required
              />
            )
          )}
          <button
            type="submit"
            className="w-full py-2 rounded-lg border-[2px] border-black mt-4"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4">
          Already have an account? <a href="/login">Login!</a>
        </p>
      </div>

      {/* Image Section */}
      <div className="image-section w-full lg:w-1/2 bg-[#e0e0e0] flex justify-center items-center">
        <img
          src={LoginPageImage}
          alt="SignUp illustration"
          className="w-full h-auto"
        />
      </div>
    </div>
  );
};

export default SignUpPage;