import React from "react";
import {Navigate, Route, Routes} from 'react-router-dom';
import {bindReporter} from "web-vitals/dist/modules/lib/bindReporter";
import Login from "../../pages/auth/Login";
import {useIsLogin} from "../../hooks/authHook";


const AuthLayout = () => {

    const [loading, isLogin] = useIsLogin();

    return (
        <>

            {
                loading ? (
                    <div className="load">
                        <hr />
                        <hr />
                        <hr />
                        <hr />
                    </div>
                ) : !isLogin ? (
                    <div className='w-100 h-full d-flex justify-content-center align-items-center bg-white'>
                        <Routes>
                            <Route path='/auth/login' element={<Login />}/>
                        </Routes>
                    </div>
                ) : (
                    <Navigate to={'/'}/>
                )
            }

        </>
    )
}
export default AuthLayout;
