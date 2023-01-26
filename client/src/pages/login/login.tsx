import React, {useState} from "react";
import "./Login.css";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import api from "../../shared/api";
import {login} from "../../shared/reducers/authreducer";
import {Input} from "antd/lib";
import {Button, Checkbox, Form} from "antd";


export const Login = () => {

    const navigate = useNavigate();
    const [err, setErr] = useState();
    const dispatch = useDispatch();

    const onFinish = (formValues: any) => {
        api({
            url: 'user/login',
            method: 'post',
            payload: formValues
        }).then((value) => {
            dispatch(login(value));
            navigate('/home')
        }).catch((err) => {
            setErr(err?.msg);
            console.log(err)
        })
    };


    return (
        <div className="login-form-container">

            <span>
                <h1>Login in to continue</h1>
            </span>
            <Form name="basic"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 16}}
                  style={{maxWidth: 600}}
                  initialValues={{remember: true}}
                  onFinish={onFinish}
                  autoComplete="off"
            >

                <div className="form-row">
                    <Form.Item
                        label="email"
                        name="email"
                        rules={[{required: true, message: 'Please input your username!'}]}
                    >
                        <Input/>
                    </Form.Item>
                </div>

                <div className="form-row">

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{required: true, message: 'Please input your password!'}]}
                    >
                        <Input.Password/>
                    </Form.Item>
                </div>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{offset: 8, span: 16}}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>

        </div>
    );
}