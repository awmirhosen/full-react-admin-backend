import React, {useEffect} from "react";
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";


const Index = () => {

    useEffect(()=>{
        require('../../../utils/js/toggleSlidebar')
    },[])

return (
    <>
        {/*start making Navbar*/}
        <Navbar />
        {/*end of navbar*/}



        {/*start making Sidebar*/}
        <Sidebar />
        {/*end of Sidebar*/}


        {/*main section start*/}
        <section id="content_section" className="bg-light py-2 px-3">
        </section>
        {/*end of main section*/}

    </>
)}

export default Index