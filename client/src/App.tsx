import { FC } from "react";

import Router from "@/components/router/Router";
import Header from "@/components/composite/header/Header";

import styles from "./App.module.scss";

interface IApp {}

const App: FC<IApp> = (props) => {
  return (
    <div className={styles.body}>
      <Header />
      <Router />
    </div>
  )
}

export default App;
