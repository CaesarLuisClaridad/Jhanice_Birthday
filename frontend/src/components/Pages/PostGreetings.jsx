import React from "react";
import GreetingCard from "../layout/GreetingCard";
import Navbar from "../layout/Navbar";
import MetaData from "../layout/MetaData";

const PostGreetings = () => {
  return (
    <>
    <MetaData title={"Post Greetings! 📸"} />
      <div className="container-fluid w-100 overflow-hidden m-0 p-0">
        <Navbar/>
        <div className="d-flex flex-column justify-content-center align-items-center py-5 m-0 card-container">
          <GreetingCard />
        </div>
      </div>
    </>
  );
};

export default PostGreetings;
