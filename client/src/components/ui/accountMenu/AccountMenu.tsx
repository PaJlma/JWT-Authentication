import { FC, useState } from "react";
import { useAppSelector } from "@/hooks/redux";
import { useDispatch } from "react-redux";
import accountSlice from "@/store/reducers/account.reducer";

import styles from "./AccountMenu.module.scss";

import AccountSVG from "@/assets/svgs/account_round.svg?react";
import LogoutSVG from "@/assets/svgs/logout.svg?react";

interface IAccountMenu {}

const AccountMenu: FC<IAccountMenu> = (props) => {
  const [ menuActive, setMenuActive ] = useState(false);
  const { nick } = useAppSelector(state => state.account);
  const dispatch = useDispatch();

  return (
    <button onClick={() => setMenuActive(!menuActive)} className={styles.body}>
      <AccountSVG />
      <p>{ nick }</p>

      {
        menuActive &&
        <div className={styles.menu}>
          <div onClick={() => dispatch(accountSlice.actions.logout())} className={styles["menu-item"]}>
            <LogoutSVG />
            <p>Выйти</p>
          </div>
        </div>
      }
    </button>
  );
}

export default AccountMenu;