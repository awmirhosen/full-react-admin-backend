import React from "react";
import {useFormik} from "formik";
import * as Yup from 'yup'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { Alert } from "../../utils/alert";
import {loginService} from "../../services/auth";




// formik functions
const initialValue = {
    phone: '',
    password: '',
    remember: true
}

const validationSchema = Yup.object({
    phone: Yup.number('تلفن همراه شامل حروف نمیباشد').required("لطفا این قسمت را پر کنید"),
    password: Yup.string()
        .required("لطفا این قسمت را پر کنید")
        .matches(/^[a-zA-Z0-9@!%$?&]+$/, "فقط از حروف و اعداد استفاده شود"),
    remember: Yup.boolean(),
});

const onSubmit = async (values, navigate) => {
    try {
        const res = await loginService(values);
        if (res.status === 200) {
            localStorage.setItem("loginToken", JSON.stringify(res.data));
            navigate("/");
        } else {
            Alert("متاسفم...!", 'اطلاعات وارد شده صحیح نمیباشد', "error");
        }
    } catch (error) {
        Alert("متاسفم...!", "متاسفانه مشکلی از سمت سرور رخ داده", "error");
        console.log(error.status)
    }
};

// ------------------------------------

const Login = () => {

    const navigate = useNavigate()

    // use formik -----------------
    const Formik = useFormik({
        initialValues : initialValue,
        validationSchema,
        onSubmit: (values) => onSubmit(values, navigate),

    })


    return (
        <div className='w-100 d-flex justify-content-center align-items-center h-full'>
            <div>
                {/*login section*/}
                <div className='login-section'>
                    <span />

                    <h2 className='text-center mt-4 text-blue'>
                        وروود به حساب کاربری
                    </h2>

                    <div className='p-4'>
                        <form className='w-100 h-100' onSubmit={Formik.handleSubmit} >

                            <div className='w-100 h-100 text-center'>

                            <input type="text" name='phone' className='mt-4 text-center'  placeholder='شماره تلفن خود را وارد کنید'
                                   {...Formik.getFieldProps('phone')}
                            />
                                {Formik.errors.phone && Formik.touched.phone ?
                                    <small className='text-danger d-block'>
                                        {Formik.errors.phone}
                                    </small> : null
                                }
                            <input type="password" name='password' className='mt-5 text-center' placeholder='رمز عبور را وارد کنید'
                                   {...Formik.getFieldProps('password')}
                            />
                                {Formik.errors.password && Formik.touched.password ?
                                    <small className='text-danger d-block'>
                                        {Formik.errors.password}
                                    </small> : null
                                }




                                <div className="form-check form-switch p-5 mx-5">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name='remember'
                                        {...Formik.getFieldProps('remember')}
                                    />
                                    <label  className="form-check-label">مرا به خاطر بسپار</label>
                                </div>

                                <div>
                                    <input type="submit" className="btn btn-info form-control"  />
                                </div>

                            </div>

                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default Login;