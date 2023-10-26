import { FC, useCallback, useMemo } from "react";

import Router from "@/components/router/Router";
import Header from "@/components/composite/header/Header";

import styles from "./App.module.scss";
import { useAccount } from "@/hooks/useAccount";

interface IApp {}

const App: FC<IApp> = (props) => {
  const { getAccount, autoLogin } = useAccount();
  const account = getAccount();

  const cachedAutoLogin = useCallback(() => autoLogin(), [account]);

  cachedAutoLogin();

  return (
    <div className={styles.body}>
      <Header />
      <Router />
    </div>
  )
}

export default App;
