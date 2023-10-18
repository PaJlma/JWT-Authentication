import { FC, ReactElement, ReactNode } from "react";

import { Route, Routes } from "react-router-dom";
import Home from "@/components/pages/home/Home";
import Registration from "@/components/pages/registration-login/registration";
import Login from "@/components/pages/registration-login/login";

interface IRouter {}

const Router: FC<IRouter> = (props) => {
  type TRoutes = Record<string, ReactElement | ReactNode>;

  const routes: TRoutes = {
    "/": <Home />,
    "/registration": <Registration />,
    "/login": <Login />
  }

  return (
    <Routes>
      {
        Object.entries(routes).map(route => <Route path={route[0]} element={route[1]} key={route[0]} />)
      }
    </Routes>
  );
}

export default Router;