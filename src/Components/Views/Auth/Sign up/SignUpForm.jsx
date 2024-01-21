import React, { useState, useEffect } from "react";

//Formik
import { Formik, Field, ErrorMessage, Form } from "formik";

//Yup
import * as Yup from "yup";

//React router dom
import { Link, useNavigate } from "react-router-dom";

//Libraries
import axios from "axios";
import Cookies from "js-cookie";

//Css
import "../auth-styles.css";

//Redux
import {
  registeredSuccess,
  registeredFailure,
} from "../../../../redux/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

//Components
import { SwalError } from "../../../../utils/Swal";
import { checkPasswordStrength } from "../utilities/checkPasswordStrength";

//const url = import.meta.env.VITE_DEV_URL;

const url = "https://wecolor-api-rest.onrender.com/api";

const SignUpForm = () => {
  //const url = REACT_APP_API_DEV_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorSwal, setErrorSwal] = useState("");
  const { darkmode } = useSelector((state) => state.darkmode);

  const handleSignUp = async (user) => {
    const { email, name, password } = user;

    try {
      const userRegistered = await axios.post(`${url}/auth/signup`, {
        email,
        name,
        password,
      });

      navigate("/signIn", { replace: true });
      dispatch(registeredSuccess());
    } catch (error) {
      setErrorSwal(error.response?.data.message);
    }
  };
  

  useEffect(() => {
    setErrorSwal("");
  }, [errorSwal]);

  //Validation Schema
  const required = "* Required field";

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(5, "Must have more than 5 characters")
      .required(required),
    email: Yup.string().email("Must be a valid email").required(required),
    password: Yup.string()
      .min(8, "Must be atleast 8 characters long")
      .required(required)
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, "It must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.")
      .test('passwordStrength', 'La contraseña debe ser lo suficientemente fuerte', function (value) {
        const { path, createError } = this;
        //console.log(this.parent)
        const strength = checkPasswordStrength(this.parent.password);
        //console.log(strength)
        if (strength !== 'Extremadamente difícil. ') {
          createError({ path, message: 'La contraseña debe ser lo suficientemente fuerte' });
        }
        return true;
      }),
    confirmPassword: Yup.string()
      .min(8, "Must be atleast 8 characters long")
      .required(required)
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, "It must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.")
      .oneOf([Yup.ref("password")], "Passwords does not match"),
  });

  return (
    <div
      className="auth-container"
      style={{ backgroundColor: darkmode ? "#2f2f2f" : "#ededed" }}
    >
      {errorSwal != "" ? <SwalError message={errorSwal}></SwalError> : ""}
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          resetForm();
          let user = {};

          user = {
            email: values.email,
            name: values.name,
            password: values.password,
          };
          //Function

          handleSignUp(user);
          console.log("SENT");
        }}
      >
        {({ errors }) => (
          <Form style={{ backgroundColor: darkmode ? "#292929" : "#ffff" }}>
            <h2>Sign Up</h2>
            <div>
              <Field
                type="text"
                name="name"
                placeholder="Name"
                className={errors.name ? "input error-border" : "input"}
              />
              <ErrorMessage
                name="name"
                component={() => {
                  return <div className="error">{errors.name}</div>;
                  
                }}
              />
            </div>
            <div>
              <Field
                type="text"
                name="email"
                placeholder="Email"
                className={errors.email ? "input error-border" : "input"}
              />
              <ErrorMessage
                name="email"
                component={() => {
                  return <div className="error">{errors.email}</div>;
                }}
              />
            </div>
            <div>
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className={errors.password ? "input error-border" : "input"}
              />
              <ErrorMessage
                name="password"
                component={() => {
                  return <div className="error">{errors.password}</div>;
                }}
              />
            </div>
            <div>
              <Field
                type="password"
                name="confirmPassword"
                placeholder="Repeat password"
                className={
                  errors.confirmPassword ? "input error-border" : "input"
                }
              />
              <ErrorMessage
                name="confirmPassword"
                component={() => {
                  return <div className="error">{errors.confirmPassword}</div>;
                }}
              />
            </div>
            <p>
              Already have an account?,{" "}
              <Link
                to="/signin"
                style={{ textDecoration: "none", color: "#6c60ff" }}
              >
                Sign In!
              </Link>
            </p>
            <button type="submit" className="sign-button">
              Create account
            </button>
            <button className="sign-with-google-button">
              Sign in with Google
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpForm;
