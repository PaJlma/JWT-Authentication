import { FC, useState } from 'react';

import AccountSVG from '@/assets/svgs/account_round.svg?react';
import LogoutSVG from '@/assets/svgs/logout.svg?react';

import { useAccount } from '@/hooks/useAccount';

import styles from './AccountMenu.module.scss';

interface IAccountMenu {}

const AccountMenu: FC<IAccountMenu> = (props) => {
  const [ menuActive, setMenuActive ] = useState(false);
  const { getAccount, logout } = useAccount();
  const account = getAccount();

  return (
    <>
      {
        account && 
        <button onClick={() => setMenuActive(!menuActive)} className={styles.body}>
          <AccountSVG />
          <p>{ account.nick }</p>
    
          {
            menuActive &&
            <div className={styles.menu}>
              <div onClick={() => logout(account.id, { redirect: true })} className={styles["menu-item"]}>
                <LogoutSVG />
                <p>Выйти</p>
              </div>
            </div>
          }
        </button>
      }
    </>
  );
}

export default AccountMenu;