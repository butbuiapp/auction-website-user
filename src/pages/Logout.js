import { useNavigate } from "react-router-dom";
import { AuthContext } from "../services/AuthProvider";
import { useContext, useEffect } from 'react';

const Logout = () => {
    const { handleLogout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        handleLogout();
        navigate("/login", { replace: true });
    }, []);

    return (
        <div>Logging out...</div>
    )
};

export default Logout;