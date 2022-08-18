import React from 'react';
import { getLogout } from '../api/getLogout';

function Logout({setIsLogin}) {
    setIsLogin(!getLogout());
    return (
        <>
        <h1>로그아웃 완료</h1>
        </>
    )
}

export default Logout;