import { useEffect, useState } from "react";
import { PasswordInput, Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import s from "./reset-password.module.css";
import { resetPasswordRequest } from "../../utils/api";

export default function ResetPassword() {
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    
    const location = useLocation();
    const navigate =useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        resetPasswordRequest({password, token});
    };

    useEffect(() => {
        if (location.state?.from?.pathname !== '/forgot-password') {
            navigate('/forgot-password')
        }
    }, []);

    return (
        <main className={s.main}>
            <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
            <form className={s.form} onSubmit={handleSubmit}>
                <PasswordInput
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    name={'password'}
                    placeholder={'Введите новый пароль'}
                    extraClass="mb-6"
                />
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={e => setToken(e.target.value)}
                    value={token}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mb-6"
                />
                <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
                    Сохранить
                </Button>
            </form>
            <div className={`${s.additional} pb-4`}>
                <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
                <Link to="/login">Войти</Link>
            </div>
        </main>
    )
};