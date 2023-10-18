import { FC, ReactElement, ReactNode } from "react";

import { Link } from "react-router-dom";

import styles from "./Registration-Login-Layout.module.scss";

interface IRegistrationLoginLayout {
  title?: string;
  message?: string;
  linkText?: string;
  to?: string;
  children?: ReactElement | ReactNode;
}

const RegistrationLoginLayout: FC<IRegistrationLoginLayout> = ({ 
  title, 
  message, 
  linkText,
  to="/",
  children
}) => {
  return (
    <div className={styles.body}>
      <div className={styles.header}>
        <h6>{ title }</h6>
        <div className={styles.flex}>
          <p>{ message }</p>
          <Link to={to}>{ linkText }</Link>
        </div>
      </div>
      { children }
    </div>
  );
}

export default RegistrationLoginLayout;