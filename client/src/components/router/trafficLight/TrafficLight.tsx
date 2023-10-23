import { FC, ReactElement, ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface IPrivateRoute {
  canPass: boolean;
  redirect: string;
  element: ReactElement | ReactNode;
}

const TrafficLight: FC<IPrivateRoute> = ({ canPass, redirect, element }) => {
  return (
    <>
      {
        canPass
        ?
        element
        :
        <Navigate to={redirect} />
      }
    </>
  );
}

export default TrafficLight;