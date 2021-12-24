import Authentication from "../../stores/auth.store";
import { observer } from "mobx-react";
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import "./index.scss";
import { Form, Input, Button } from 'antd';
import activityImage from '../../assets/activity.png';

// Login page for access to home page or activity page
const Login = () => {
    let navigate = useNavigate();
    const [form] = Form.useForm();
    const auth = useContext(Authentication);
    const { login, currentUserValue } = auth;

    if (currentUserValue) {
        navigate("/");
    }

    const loginFinish = (values: any) => {
        const username = values.username;
        login(username);
    };
    const loginFormFail = (error: any) => {
        console.log(error);
    }
    return (
        <div className='login'>
            <div className='container'>
                <div className='title'>TODO<div className='text'>Login to TODO list website and enjoy create the activities.</div></div>

                <div>
                    <Form form={form} name="login-form" onFinish={loginFinish} onFinishFailed={loginFormFail}>
                        <Form.Item name="username" className='input'>
                            <Input placeholder='Username' />
                        </Form.Item>
                        <div className='box-submit'>
                            <Button type="primary" htmlType="submit" className='submit'>
                                LOGIN
                            </Button>
                        </div>
                    </Form>
                </div>
                <div className="box-image">
                    <img src={activityImage} alt="" className='image' />
                </div>
            </div>
        </div>
    )
}

export default observer(Login);