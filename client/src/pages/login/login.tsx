import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import React from "react";
import "./Login.css";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import api from "../../shared/api";
import {login} from "../../reducers/authreducer";


const initialValues = {
    email: "",
    password: "",
};

const LoginSchemaValidation = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),

    password: Yup.string().required("Password is required"),
});

export const Login = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const submitHandler = (formValues: any) => {
        api({
            url: '/login',
            method: 'post',
            payload: formValues
        }).then((value) => {
            dispatch(login(value))
        }).catch((err) => {
        })
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={LoginSchemaValidation}
            onSubmit={submitHandler}
        >
            {(formik) => {
                const {errors, touched, isValid, dirty} = formik;
                return (
                    <div className="form-container">
                        <div className="form-wrapper">
                            <h1>Login in to continue</h1>
                            <div className="new-form">
                                <Form>
                                    <div className="form-row">
                                        <label htmlFor="email">Email</label>
                                        <Field
                                            type="email"
                                            name="email"
                                            id="email"
                                            className={
                                                errors.email && touched.email ? "input-error" : null
                                            }
                                        />
                                        <ErrorMessage
                                            name="email"
                                            component="span"
                                            className="error"
                                        />
                                    </div>

                                    <div className="form-row">
                                        <label htmlFor="password">Password</label>
                                        <Field
                                            type="password"
                                            name="password"
                                            id="password"
                                            className={
                                                errors.password && touched.password
                                                    ? "input-error"
                                                    : null
                                            }
                                        />
                                        <ErrorMessage
                                            name="password"
                                            component="span"
                                            className="error"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className={!(dirty && isValid) ? "disabled-btn" : ""}
                                        disabled={!(dirty && isValid)}
                                    >
                                        Sign In
                                    </button>
                                </Form>
                                <span>or</span>
                            </div>
                        </div>
                    </div>
                );
            }}
        </Formik>
    );

}