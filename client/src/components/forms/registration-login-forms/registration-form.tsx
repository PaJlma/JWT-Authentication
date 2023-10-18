import { FC } from "react";

import Input from "@/components/ui/input/Input";

import styles from "./registration-login-forms.module.scss";

import AccountSVG from "@/assets/svgs/account.svg?react";
import EmailSVG from "@/assets/svgs/email.svg?react";
import PasswordSVG from "@/assets/svgs/key.svg?react";
import Button from "@/components/ui/button/Button";
import { SubmitHandler, useForm } from "react-hook-form";

interface IRegistrationForm {}

const RegistrationForm: FC<IRegistrationForm> = (props) => {
  interface IFields {
    nick: string;
    email: string;
    password: string;
    repeatPassword: string;
  }

  const { register, handleSubmit, formState: { errors } } = useForm<IFields>(); 

  const onSubmit: SubmitHandler<IFields> = data => {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.body}>
      <Input 
        placeholder="Псевдоним"
        type="text"
        icon={<AccountSVG />}
        register={register("nick", {
          required: true,
        })}
        validationErrors={[
          { reason: "required", message: "Поле обязательно для заполнения" }
        ]}
        errors={errors}
      />

      <Input 
        placeholder="Почта"
        type="email"
        icon={<EmailSVG />}
        register={register("email", {
          required: true,
          pattern: /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/,
        })}
        validationErrors={[
          { reason: "required", message: "Поле обязательно для заполнения" },
          { reason: "pattern", message: "Поле должно содержать валидный Email адрес" }
        ]}
        errors={errors}
      />

      <Input 
        placeholder="Пароль"
        type="password"
        icon={<PasswordSVG />}
      />

      <Input 
        placeholder="Повторите пароль"
        type="password"
        icon={<PasswordSVG />}
      />
      
      <Button  
        text="Создать аккаунт"
        className="card-red"
      />
    </form>
  );
}

export default RegistrationForm;