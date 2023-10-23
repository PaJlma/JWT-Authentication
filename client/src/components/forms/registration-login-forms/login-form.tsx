import { FC } from 'react';

import { AxiosError } from 'axios';

import { SubmitHandler, useForm } from 'react-hook-form';

import EmailSVG from '@/assets/svgs/email.svg?react';
import KeySVG from '@/assets/svgs/key.svg?react';

import Button from '@/components/ui/button/Button';
import Input from '@/components/ui/input/Input';

import { regexps } from '@/global/regexps';

import { useAccount } from '@/hooks/useAccount';

import IErrorResponseData from '@/types/responseErrorData.interface';

import styles from './registration-login-forms.module.scss';

interface ILoginForm {}

const LoginForm: FC<ILoginForm> = (props) => {
  const { login } = useAccount();

  interface IFields {
    email: string;
    password: string;
  }

  const { register, handleSubmit, setError, formState: {errors} } = useForm<IFields>();

  const onSubmit: SubmitHandler<IFields> = async data => {
    try {
      await login(data, { redirect: true });
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
    <form noValidate onSubmit={handleSubmit(onSubmit)} className={styles.body}>
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