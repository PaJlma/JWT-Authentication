import { FC, ReactElement, ReactNode } from 'react';

import { Route, Routes } from 'react-router-dom';

import TrafficLight from '@/components/router/trafficLight/TrafficLight';
import Home from '@/components/pages/home/Home';
import Login from '@/components/pages/registration-login/login';
import Registration from '@/components/pages/registration-login/registration';
import Users from '@/components/pages/users/Users';

import { useAccount } from '@/hooks/useAccount';

interface IRouter {}

const Router: FC<IRouter> = (props) => {
  const { getAccount } = useAccount();
  const account = getAccount();

  type TRoutes = Record<string, ReactElement | ReactNode>;

  type TPrivateRoutes = Record<string, {element: ReactElement | ReactNode, redirect: string, canPass: boolean}>;

  const routes: TRoutes = {
    "/": <Home />,
  }
  
  const privateRoutes: TPrivateRoutes = {
    "/registration": {element: <Registration />, redirect: "/", canPass: account === null},
    "/login": {element: <Login />, redirect: "/", canPass: account === null},
    "/users": {element: <Users />, redirect: "/login", canPass: account !== null}
  }

  return (
    <Routes>
      {
        Object.entries(routes).map(route => <Route path={route[0]} element={route[1]} key={route[0]} />)
      }

      {
        Object.entries(privateRoutes).map(route => <Route 
          path={route[0]} 
          element={
            <TrafficLight 
              element={route[1].element} 
              canPass={route[1].canPass} 
              redirect={route[1].redirect} 
            />
          } 
          key={route[0]} 
        />)
      }
    </Routes>
  );
}

export default Router;