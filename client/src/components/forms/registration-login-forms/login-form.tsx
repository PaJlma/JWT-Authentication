import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { regexps } from "@/global/regexps";

import Input from "@/components/ui/input/Input";

import styles from "./registration-login-forms.module.scss";

import EmailSVG from "@/assets/svgs/email.svg?react";
import KeySVG from "@/assets/svgs/key.svg?react";
import Button from "@/components/ui/button/Button";

interface ILoginForm {}

const LoginForm: FC<ILoginForm> = (props) => {
  interface IFields {
    email: string;
    password: string;
  }

  const { register, handleSubmit, formState: {errors} } = useForm<IFields>();

  const onSubmit: SubmitHandler<IFields> = data => {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.body}>
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
          { reason: "validate", message: "Поле должно содержать валидный email адрес" },
        ]}
        errors={errors}
        />
      
      <Input 
        placeholder="Пароль"
        type="password"
        icon={<KeySVG />}
        register={register("password", {
          required: true,
        })}
        validationErrors={[
          { reason: "required", message: "Поле обязательно для заполнения" }
        ]}
        errors={errors}
        />

      <Button 
        text="Войти"
        className="card-dark-blue"
      />
    </form>
  );
}

export default LoginForm;