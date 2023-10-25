import { FC } from "react";

import styles from "./UserStrip.module.scss";

import AccountSVG from "@/assets/svgs/account_round.svg?react";
import getTimeAgo from "@/scripts/getTimeAgo";

interface IUserStrip {
  nick?: string;
  email?: string;
  createdAt?: string;
}

const UserStrip: FC<IUserStrip> = ({ nick, email, createdAt }) => {
  const timeAgo = getTimeAgo(createdAt);

  const style = [
    "card-emerald",
    "card-green",
    "card-red",
    "card-dark-blue",
    "card-blue",
    "card-pink",
    "card-purple",
    "card-yellow",
  ][Math.floor(Math.random() * 8)];

  return (
    <div className={`${styles.body} ${style}`}>
      <div className={styles.row}>
        <div className={styles.left}>
          <AccountSVG />
          <div className={styles.column}>
            <h6>{ nick }</h6>
            <p>{ email }</p>
          </div>
        </div>

        <p>{ `Создан ${timeAgo} назад` }</p>
      </div>
    </div>
  );
}

export default UserStrip;