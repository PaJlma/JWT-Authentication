import { FC, MouseEventHandler, ReactElement, ReactNode } from "react";

import { NavLink } from "react-router-dom";

import styles from "./Card.module.scss";

interface ICard {
  className?: string;
  navLink?: boolean;
  to?: string;
  icon?: ReactElement | ReactNode;
  title?: string;
  text?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Card: FC<ICard> = ({
  className,
  navLink,
  to="/",
  icon,
  title,
  text,
  onClick
}) => {
  if (navLink) {
    return (
      <NavLink className={`${className} ${styles.body}`} to={to}>
        <div className={styles.header}>
          { icon }
          <h6>{ title }</h6>
        </div>
        <p>{ text }</p>
      </NavLink>
    );
  }

  return (
    <button className={`${className} ${styles.body}`} onClick={onClick}>
      <div className={styles.header}>
        { icon }
        <h6>{ title }</h6>
      </div>
      <p>{ text }</p>
    </button>
  );
}

export default Card;