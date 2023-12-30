import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../utils/hook";

type TprotectedProps = {
  onlyUnAuth?: boolean;
  component: JSX.Element;
}

const Protected = ({ onlyUnAuth = false, component}: TprotectedProps ) => {
  const isAuthChecked = useAppSelector((store) => store.user.isAuthChecked);
  const user = useAppSelector((store) => store.user.user);
  const location = useLocation();

  if (!isAuthChecked) {
    return null;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }: Pick<TprotectedProps, 'component'>) => (
  <Protected onlyUnAuth={true} component={component} />
);
