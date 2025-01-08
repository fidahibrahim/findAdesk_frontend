import { RootState } from "@/redux/store/store";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


interface WithAuthProps {
    component: React.ComponentType
}

const WithAuth: React.FC<WithAuthProps> = ({
    component: Component,
}) => {
    const adminInfo = useSelector(
        (state: RootState) => state.admin.adminInfo
    )
    return adminInfo ? <Component/> : <Navigate to='/admin/' />
}

export default WithAuth