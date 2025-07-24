import { Navigate } from "react-router-dom";

type PrivateRouterProps = {
    children: React.ReactNode
    isAdmin: any
};

const PrivateRouter = ({ children, isAdmin }: PrivateRouterProps) => {
    return isAdmin ? children : <Navigate to="/" replace />;
}

export default PrivateRouter