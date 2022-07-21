import React, {useEffect} from "react";

const Navbar = () => {


    return (
        <>
        <nav className="navbar fixed-top  bg-secondary top_navbar py-0 bg-black">
            <div className="container-fluid h-100 pe-0">

                <div className="right_content h-100 py-1 bg-black">
                    <div className="form-check form-switch mx-4 d-none d-md-block">
                        <input id="handle_toggle_sidemenu" className="form-check-input pointer"
                               type="checkbox" id="flexSwitchCheckChecked" />
                    </div>
                </div>

                <div className="left_content d-flex flex-row-reverse">
                    <i className="fas fa-grip-vertical fa-2x me-3 pointer" id="dropdownMenuButton1"
                       data-bs-toggle="dropdown" aria-expanded="false" />
                    <ul className="dropdown-menu mini_menu" aria-labelledby="dropdownMenuButton1">
                        <li className="my-2"><a className="dropdown-item d-block text-center">قاسم
                            بساکی</a></li>
                        <li className="my-2 d-flex justify-content-center align-items-center px-2">
                            <i className="fas fa-tachometer-alt" />
                            <a className="dropdown-item" href="#">داشبورد</a>
                        </li>
                        <li className="my-2 d-flex justify-content-center align-items-center px-2">
                            <i className="fas fa-paper-plane" />
                            <a className="dropdown-item" href="#">تیکت ها</a>
                        </li>
                        <li className="my-2 d-flex justify-content-center align-items-center px-2">
                            <i className="fas fa-envelope" />
                            <a className="dropdown-item" href="#">پیام ها</a>
                        </li>
                        <hr/>
                        <li className="d-flex justify-content-center align-items-center px-2">
                            <i className="fas fa-power-off" />
                            <a className="dropdown-item" href="#">خروج</a>
                        </li>
                    </ul>
                    <i className="far fa-bell fa-2x mx-3 pointer position-relative">
                        <span className="alarm_count">4</span>
                    </i>
                    <i className="fas fa-search fa-2x mx-3 pointer" />
                </div>

            </div>
        </nav>
        </>
    )
}

export default Navbar