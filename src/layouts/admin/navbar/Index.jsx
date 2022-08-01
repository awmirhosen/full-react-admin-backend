import React from "react";
import Leftcontent from "./LeftContent";
import Rightcontent from "./RightContent";

const Index = () => {
  return (
    <nav className="navbar fixed-top bg-secondary top_navbar py-0">
      <div className="container-fluid h-100 pe-0">
        
        <Rightcontent/>

        <Leftcontent/>


      </div>
    </nav>
  );
};

export default Index;
