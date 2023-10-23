import { FC } from "react";

import { useAccount } from "@/hooks/useAccount";

import Logotype from "@/components/ui/logotype/Logotype";
import Button from "@/components/ui/button/Button";
import ThemeToggler from "@/components/ui/themeToggler/ThemeToggler";
import AccountMenu from "@/components/ui/accountMenu/AccountMenu";

import styles from "./Header.module.scss";

import LoginSVG from "@/assets/svgs/login.svg?react";
import RegistrationSVG from "@/assets/svgs/registration.svg?react";

interface IHeader {}

const Header: FC<IHeader> = (props) => {
  const { getAccount } = useAccount();
  const account = getAccount();

  return (
    <header className={`${styles.body} wrapper`}>
      <Logotype />

      <section>
        {
          account
          ?
          <AccountMenu />
          :
          <>
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
          </>
        }


        <ThemeToggler />
      </section>
    </header>
  );
}

export default Header;