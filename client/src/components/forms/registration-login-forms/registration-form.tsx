import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { regexps } from "@/global/regexps";
import axios, { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import accountSlice from "@/store/reducers/account.reducer";
import jwtDecode from "jwt-decode";
import IAccount from "@/types/account.interface";
import TokenPayload from "@/types/tokenPayload.interface";
import IErrorResponseData from "@/types/responseErrorData.interface";
import { useNavigate } from "react-router-dom";

import Input from "@/components/ui/input/Input";
import Button from "@/components/ui/button/Button";

import styles from "./registration-login-forms.module.scss";

import AccountSVG from "@/assets/svgs/account.svg?react";
import EmailSVG from "@/assets/svgs/email.svg?react";
import PasswordSVG from "@/assets/svgs/key.svg?react";

interface IRegistrationForm {}

const RegistrationForm: FC<IRegistrationForm> = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  interface IFields {
    nick: string;
    email: string;
    password: string;
    repeatPassword: string;
  }

  const { register, handleSubmit, getValues, setError, formState: { errors } } = useForm<IFields>(); 

  const onSubmit: SubmitHandler<IFields> = async data => {
    try {
      const response = await axios.post<string>("http://localhost:5000/auth/register", data, { withCredentials: true });

      localStorage.setItem("access", response.data);
      const { iat, exp, ...account } = jwtDecode<TokenPayload<IAccount>>(response.data);

      dispatch(accountSlice.actions.login(account));
      navigate("/");
    } catch (error) {
        const responseError = error as AxiosError<IErrorResponseData>;

        setError("email", { type: "409", message: responseError.response?.data.message });
        return;
    }
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
          { reason: "409", message: errors.email?.message }
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
          { reason: "maxLength", message: "Пароль должен состоять максимум из 25 символов" } 
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