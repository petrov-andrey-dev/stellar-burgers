import { useState } from "react";
import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import s from "./forgot-password.module.css";
import { forgotPasswordRequest } from "../../utils/api";

export default function ForgotPassword() {
    const [email, setEmail] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = e => {
        e.preventDefault();
        forgotPasswordRequest(email)
            .then(navigate('/reset-password', {state:{from: location}}))
    }
    
  
    return (
        <main className={s.main}>
            <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
            <form className={s.form} onSubmit={handleSubmit}>
                <EmailInput
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    name={'email'}
                    isIcon={false}
                    placeholder={'Укажите e-mail'}
                    extraClass="mb-6"
                />
                <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
                Восстановить
                </Button>
            </form>
            <div className={`${s.additional} pb-4`}>
                <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
                <Link to="/login">Войти</Link>
            </div>
        </main>
    )
}