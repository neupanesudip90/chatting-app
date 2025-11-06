import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { verifyUser } from "../redux/authSlice";

const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { user, bootstrapped } = useSelector((state) => state.auth);

  // Verify user on mount
  useEffect(() => {
    if (!bootstrapped) {
      dispatch(verifyUser());
    }
  }, [dispatch, bootstrapped]);

  // Show loading while session is being verified
  if (!bootstrapped) {
    return <p>Loading...</p>;
  }

  // Render children if logged in, otherwise redirect
  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
