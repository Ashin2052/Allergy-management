import React from "react";
import AllergyList from "../allergy/AllergyList";
import {Button} from "antd";
import api from "../../shared/api";
import {logout} from "../../shared/reducers/authreducer";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {LogoutOutlined} from "@ant-design/icons";

export const Home = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onLogout = () => {
        api({
            url: 'user/logout',
            method: 'post',
        }).then((value) => {
            dispatch(logout());
            navigate('/login')
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className={'page-container'}>
            <div className={'pb-24'}>
                <Button
                    style={{float: "right"}}
                    type="primary"
                    danger
                    icon={<LogoutOutlined/>}
                    onClick={onLogout}
                />
            </div>
            <div>
                <AllergyList/>
            </div>
        </div>
    )
}