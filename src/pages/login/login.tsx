import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../../services/userSlice";
import { useAppDispatch } from "../../utils/hook";
import s from "./login.module.css";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useAppDispatch();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(login({email, password }));
    }

    return (
        <main className={s.main}>
            <h1 className="text text_type_main-medium mb-6">Войти</h1>
            <form className={s.form} onSubmit={handleSubmit}>
                <EmailInput
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    name={'email'}
                    isIcon={false}
                    extraClass="mb-6"
                />
                <PasswordInput
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    name={'password'}
                    extraClass="mb-6"
                />
                <Button htmlType="submit" type="primary" size="medium" extraClass="ml-2 mb-20">
                    Войти
                </Button>
            </form>
            <div className={`${s.additional} pb-4`}>
                <p className="text text_type_main-default text_color_inactive">Вы — новый пользователь?</p>
                <Link to="/register">Зарегистрироваться</Link>
            </div>
            <div className={s.additional}>
                <p className="text text_type_main-default text_color_inactive">Забыли пароль?</p>
                <Link to="/forgot-password">Восстановить пароль</Link>
            </div>
        </main>
    )
}