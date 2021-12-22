import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Authentication from "../stores/auth.store";

type Props = {
    children: any;
}

// Private route (access through accessToken )
const PrivateRoute = ({ children }: Props) => {
    const auth = useContext(Authentication);
    const { currentUserValue } = auth;
    return currentUserValue ? children : <Navigate to="/login" />;
}

export default (PrivateRoute);