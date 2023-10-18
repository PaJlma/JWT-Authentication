import { FC } from "react";

import RegistrationLoginLayout from "@/components/pages/registration-login/registration-login-layout/Registration-Login-Layout";
import LoginForm from "@/components/forms/registration-login-forms/login-form";

import styles from "./registration-login.module.scss";

interface ILogin {}

const Login: FC<ILogin> = (props) => {
  return (
    <main className={styles.body}>
      <RegistrationLoginLayout
        title="Авторизация"
        message="Ещё нет аккаунта?"
        linkText="Создать аккаунт"
        to="/registration"
      >
        <LoginForm />
      </RegistrationLoginLayout>
    </main>
  );
}

export default Login;