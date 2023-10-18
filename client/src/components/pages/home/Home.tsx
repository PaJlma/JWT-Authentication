import { FC } from "react";

import Card from "@/components/ui/card/Card";

import styles from "./Home.module.scss";

import UsersSVG from "@/assets/svgs/users.svg?react";

interface IHome {}

const Home: FC<IHome> = (props) => {
  return (
    <main className={styles.body}>
      <div className={styles["card-box"]}>
        <Card 
          className="card-green"
          navLink
          to="/users"
          icon={<UsersSVG />}
          title="Пользователи"
          text="Посмотреть список зарегистрированных пользователей"
        />
      </div>
    </main>
  );
}

export default Home;