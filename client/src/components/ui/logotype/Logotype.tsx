import { FC } from "react";

import { Link } from "react-router-dom";

import styles from "./Logotype.module.scss";

import LogotypeSVG from "@/assets/svgs/jwt.svg?react";

interface ILogotype {}

const Logotype: FC<ILogotype> = (props) => {
  return (
    <Link className={styles.body} to="/">
      <LogotypeSVG />
      <h6>JWT Authentication</h6>
    </Link>
  );
}

export default Logotype;
