import { RootState } from "@/redux/store/store";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


interface WithoutAuthProps {
    component: React.ComponentType
}

const WithoutAuth: React.FC <WithoutAuthProps> = ({
    component: Component
}) => {
    const adminInfo = useSelector(
        (state: RootState) => state.admin.adminInfo
    );
    return adminInfo ? <Navigate to="/admin/dashboard" /> : <Component/>
}

export default WithoutAuth


