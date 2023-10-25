import { FC, MouseEventHandler } from "react";

import styles from "./RefreshButton.module.scss";

import RefreshSVG from "@/assets/svgs/refresh.svg?react";

interface IRefreshButton {
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const RefreshButton: FC<IRefreshButton> = ({ onClick }) => {
  const onClickHandler: MouseEventHandler<HTMLButtonElement> = async (event) => {
    const target = event.currentTarget;
    target.classList.add(styles.rotation);
    
    await delay(600);
    
    target.classList.remove(styles.rotation);
    onClick && onClick(event);
  }

  return (
    <button onClick={onClickHandler} className={styles.body}>
      <RefreshSVG />
    </button>
  );
}

export default RefreshButton;