import { FC } from "react";

import RegistrationLoginLayout from "@/components/pages/registration-login/registration-login-layout/Registration-Login-Layout";
import RegistrationForm from "@/components/forms/registration-login-forms/registration-form";

import styles from "./registration-login.module.scss";

interface IRegistration {}

const Registration: FC<IRegistration> = (props) => {
  return (
    <main className={styles.body}>
      <RegistrationLoginLayout
        title="Регистрация"
        message="Уже есть аккаунт?"
        linkText="Войти"
        to="/login"
      >
        <RegistrationForm />
      </RegistrationLoginLayout>
    </main>
  );
}

export default Registration;