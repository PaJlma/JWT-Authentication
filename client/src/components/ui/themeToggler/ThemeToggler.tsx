import { FC } from "react";
import useTheme from "@/hooks/useTheme";

import styles from "./ThemeToggler.module.scss";

import SunSVG from "@/assets/svgs/sun.svg?react";
import MoonSVG from "@/assets/svgs/moon.svg?react";

interface IThemeToggler {}

const ThemeToggler: FC<IThemeToggler> = (props) => {
  const [ theme, toggleTheme ] = useTheme();

  return (
    <button className={styles.body} onClick={toggleTheme}>
      {
        theme === "light"
        ?
        <SunSVG />
        :
        <MoonSVG />
      }
    </button>
  );
}

export default ThemeToggler;