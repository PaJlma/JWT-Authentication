import { FC } from "react";

import Logotype from "@/components/ui/logotype/Logotype";
import Button from "@/components/ui/button/Button";
import ThemeToggler from "@/components/ui/themeToggler/ThemeToggler";

import styles from "./Header.module.scss";

import LoginSVG from "@/assets/svgs/login.svg?react";
import RegistrationSVG from "@/assets/svgs/registration.svg?react";

interface IHeader {}

const Header: FC<IHeader> = (props) => {
  return (
    <header className={`${styles.body} wrapper`}>
      <Logotype />

      <section>
        <Button 
          className="card-emerald"
          navLink
          to="/login"
          icon={<LoginSVG />}
          text="Войти"
        />

        <Button 
          className="card-red"
          navLink
          to="/registration"
          icon={<RegistrationSVG />}
          text="Зарегистрироваться"
        />

        <ThemeToggler />
      </section>
    </header>
  );
}

export default Header;