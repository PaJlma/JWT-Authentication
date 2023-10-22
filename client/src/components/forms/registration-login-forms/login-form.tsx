import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { regexps } from "@/global/regexps";
import axios, { AxiosError } from "axios";
import jwtDecode from "jwt-decode";
import TokenPayload from "@/types/tokenPayload.interface";
import IAccount from "@/types/account.interface";
import accountSlice from "@/store/reducers/account.reducer";
import { useDispatch } from "react-redux";
import IErrorResponseData from "@/types/responseErrorData.interface";
import { useNavigate } from "react-router-dom";

import Input from "@/components/ui/input/Input";

import styles from "./registration-login-forms.module.scss";

import EmailSVG from "@/assets/svgs/email.svg?react";
import KeySVG from "@/assets/svgs/key.svg?react";
import Button from "@/components/ui/button/Button";

interface ILoginForm {}

const LoginForm: FC<ILoginForm> = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  interface IFields {
    email: string;
    password: string;
  }

  const { register, handleSubmit, setError, formState: {errors} } = useForm<IFields>();

  const onSubmit: SubmitHandler<IFields> = async data => {
    try {
      const response = await axios.post<string>("http://localhost:5000/auth/login", data, { withCredentials: true });

      localStorage.setItem("access", response.data);
      const { iat, exp, ...account } = jwtDecode<TokenPayload<IAccount>>(response.data);

      dispatch(accountSlice.actions.login(account));
      navigate("/");
    } catch (error) {
        const responseError = error as AxiosError<IErrorResponseData>;

        switch (responseError.response?.status) {
          case 404:
            setError("email", { type: "404", message: responseError.response?.data.message });
            return;
            
          case 401:
            setError("password", { type: "401", message: responseError.response?.data.message });
            return;  
        }
    }
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
          { reason: "404", message: errors.email?.message }
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
          { reason: "required", message: "Поле обязательно для заполнения" },
          { reason: "401", message: errors.password?.message }
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