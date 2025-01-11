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
    const ownerInfo = useSelector(
        (state: RootState) => state.owner.ownerInfo
    )
    return ownerInfo ? <Component/> : <Navigate to='/owner/' />
}

export default WithAuth