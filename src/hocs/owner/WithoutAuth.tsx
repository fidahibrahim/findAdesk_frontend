import { RootState } from "@/redux/store/store";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


interface WithoutAuthProps {
    component: React.ComponentType
}

const WithoutAuth: React.FC<WithoutAuthProps> = ({
    component: Component
}) => {
    const ownerInfo = useSelector(
        (state: RootState) => state.owner.ownerInfo
    );
    return ownerInfo ? <Navigate to="/owner/dashboard" /> : <Component />
}

export default WithoutAuth


