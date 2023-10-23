import { FC } from 'react';

import { AxiosError } from 'axios';

import { SubmitHandler, useForm } from 'react-hook-form';

import AccountSVG from '@/assets/svgs/account.svg?react';
import EmailSVG from '@/assets/svgs/email.svg?react';
import PasswordSVG from '@/assets/svgs/key.svg?react';

import Button from '@/components/ui/button/Button';
import Input from '@/components/ui/input/Input';

import { regexps } from '@/global/regexps';

import { useAccount } from '@/hooks/useAccount';

import IErrorResponseData from '@/types/responseErrorData.interface';

import styles from './registration-login-forms.module.scss';

interface IRegistrationForm {}

const RegistrationForm: FC<IRegistrationForm> = (props) => {
  const { registration } = useAccount();

  interface IFields {
    nick: string;
    email: string;
    password: string;
    repeatPassword: string;
  }

  const { register, handleSubmit, getValues, setError, formState: { errors } } = useForm<IFields>(); 

  const onSubmit: SubmitHandler<IFields> = async ({ repeatPassword, ...data }) => {
    try {
      await registration(data, { redirect: true });
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