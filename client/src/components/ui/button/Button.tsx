import { FC, MouseEventHandler, ReactElement, ReactNode } from "react";

import { NavLink } from "react-router-dom";

import styles from "./Button.module.scss";

interface IButton {
  className?: string;
  navLink?: boolean;
  to?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  icon?: ReactElement | ReactNode;
  text?: string;
}

const Button: FC<IButton> = ({ 
  className,
  navLink,
  to="/",
  onClick,
  icon,
  text
 }) => {
  if (navLink) {
    return (
      <NavLink className={`${className} ${styles.body}`} to={to}> 
        { icon }
        { text }        
      </NavLink>
    );
  }

  return (
    <button className={`${className} ${styles.body}`} onClick={onClick}>
      { icon }
      { text }
    </button>
  );
}

export default Button;