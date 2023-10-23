import { FC } from "react";

import * as dayjs from "dayjs";
import * as customParseFormat from "dayjs/plugin/customParseFormat";
import * as utc from "dayjs/plugin/utc";

import styles from "./UserStrip.module.scss";

import AccountSVG from "@/assets/svgs/account_round.svg?react";

dayjs.extend(customParseFormat);
dayjs.extend(utc);

interface IUserStrip {
  nick?: string;
  email?: string;
  createdAt?: string;
}

const UserStrip: FC<IUserStrip> = ({ nick, email, createdAt }) => {
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
        <AccountSVG />
        <div className={styles.column}>
          <h6>{ nick }</h6>
          <p>{ email }</p>
        </div>

        <p>{ dayjs(createdAt, "DD-MM-YYYY HH:mm:ss").add(3, "hours").format("DD-MM-YYYY HH:mm:ss") }</p>
      </div>
    </div>
  );
}

export default UserStrip;