import React, { useState } from "react";
import styled from "@emotion/styled";
import PageLayout from "../PageLayout/PageLayout";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";

export default function LoginPage() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmail = (e) => {
        setEmail(e.currentTarget.value);
    };

    const handlePassword = (e) => {
        setPassword(e.currentTarget.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            email,
            password
        };

        dispatch(loginUser(data)).then((res) => {
            if (res.payload.loginSuccess) {
                window.location.href = "/";
            } else {
                alert(res.payload.message);
            }
        });
    };

    return (
        <PageLayout>
            <form onSubmit={handleSubmit}>
                <InputBox>
                    <label className="label-wrap">
                        <span className="label">E-mail</span>
                        <input
                            className="input"
                            type="email"
                            value={email}
                            onChange={handleEmail}
                        />
                    </label>
                </InputBox>

                <InputBox>
                    <label className="label-wrap">
                        <span className="label">Password</span>
                        <input
                            className="input"
                            type="password"
                            value={password}
                            onChange={handlePassword}
                        />
                    </label>
                </InputBox>

                <Button>로그인하기</Button>
            </form>
        </PageLayout>
    );
}

const InputBox = styled.div`
    margin-top: 20px;
    margin-bottom: 20px;

    .label-wrap {
        display: block;
    }

    .label {
        display: block;
    }

    .input {
        width: 100%;
        height: 60px;
        font-size: 20px;
    }
`;

const Button = styled.button`
    width: 100%;
    height: 60px;
    background-color: indianred;
    color: #fff;
    border: 0;
    font-size: 18px;
    font-weight: 600;
`;
