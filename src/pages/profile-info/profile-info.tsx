import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { FormEvent, useEffect, useState } from "react";
import { updateUser } from "../../services/userSlice";
import { useAppDispatch, useAppSelector } from "../../utils/hook";
import s from "./profile-info.module.css";
import { TUser } from "../../types/types";

export default function ProfileInfo() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [changed, setChanged] = useState(false);

  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.user);

  const currentInfo = (user: TUser) => {
    setName(user.name);
    setEmail(user.email);
  };

  useEffect(() => {
    if (user) currentInfo(user);
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateUser({ email, password, name }));
    setChanged(false);
  };

  const clickCancelHandler = () => {
    if (user) {
      currentInfo(user);
      setChanged(false);
    }
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Имя"
        value={name}
        name="name"
        icon="EditIcon"
        onChange={e => {
          setName(e.target.value);
          setChanged(true);
        }}
      />
      <EmailInput
        placeholder="Логин"
        value={email}
        name="email"
        isIcon={true}
        extraClass="mt-6"
        onChange={e => {
          setEmail(e.target.value);
          setChanged(true);
        }}
      />
      <PasswordInput
        value={password}
        name="password"
        icon="EditIcon"
        extraClass="mt-6"
        onChange={e => {
          setPassword(e.target.value);
          setChanged(true);
        }}
      />
      <div className={`${s.buttons} mt-6`}>
        {changed && (
          <Button
            htmlType="button"
            type="secondary"
            onClick={clickCancelHandler}
          >
            Отмена
          </Button>
        )}
        {changed && <Button htmlType="submit">Сохранить</Button>}
      </div>
    </form>
  )
};