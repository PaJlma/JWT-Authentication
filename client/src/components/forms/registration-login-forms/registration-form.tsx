import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { regexps } from "@/global/regexps";

import Input from "@/components/ui/input/Input";
import Button from "@/components/ui/button/Button";

import styles from "./registration-login-forms.module.scss";

import AccountSVG from "@/assets/svgs/account.svg?react";
import EmailSVG from "@/assets/svgs/email.svg?react";
import PasswordSVG from "@/assets/svgs/key.svg?react";

interface IRegistrationForm {}

const RegistrationForm: FC<IRegistrationForm> = (props) => {
  interface IFields {
    nick: string;
    email: string;
    password: string;
    repeatPassword: string;
  }

  const { register, handleSubmit, getValues, formState: { errors } } = useForm<IFields>(); 

  const onSubmit: SubmitHandler<IFields> = data => {
    console.log(data);
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className={styles.body}>
      <Input 
        placeholder="Псевдоним"
        type="text"
        icon={<AccountSVG />}
        register={register("nick", {
          required: true,
        })}
        validationErrors={[
          { reason: "required", message: "Поле обязательно для заполнения" },
        ]}
        errors={errors}
      />

      <Input 
        placeholder="Почта"
        type="email"
        icon={<EmailSVG />}
        register={register("email", {
          required: true,
          pattern: regexps.email,
        })}
        validationErrors={[
          { reason: "required", message: "Поле обязательно для заполнения" },
          { reason: "pattern", message: "Поле должно содержать валидный email адрес" },
        ]}
        errors={errors}
      />

      <Input 
        placeholder="Пароль"
        type="password"
        icon={<PasswordSVG />}
        register={register("password", {
          required: true,
          minLength: 6,
          maxLength: 25,
        })}
        validationErrors={[
          { reason: "required", message: "Поле обязательно для заполнения" },
          { reason: "minLength", message: "Пароль должен состоять минимум из 6 символов" },
          { reason: "maxLength", message: "Пароль должен состоять максимум из 25 символов" },
        ]}
        errors={errors}
        />

      <Input 
        placeholder="Повторите пароль"
        type="password"
        icon={<PasswordSVG />}
        register={register("repeatPassword", {
          required: true,
          validate: (repeatedPassword) => repeatedPassword === getValues().password, 
        })}
        validationErrors={[
          { reason: "required", message: "Поле обязательно для заполнения" },
          { reason: "validate", message: "Пароли не совпадают" },
        ]}
        errors={errors}
      />
      
      <Button  
        text="Создать аккаунт"
        className="card-dark-blue"
      />
    </form>
  );
}

export default RegistrationForm;