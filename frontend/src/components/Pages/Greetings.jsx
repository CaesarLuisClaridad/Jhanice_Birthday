import React from "react";
import Navbar from "../layout/Navbar";
import GreetingMessage from "../layout/GreetingMessage";

const Greetings = () => {
  return (
    <>
      <div className="container-fluid greetings m-0 p-0">
        <Navbar />
        <div className="greetings-container overflow-hidden ">
          <h1 className="text-center greeting-header text-light fw-bold pt-5 mb-3 montserrat-font">
            "Greetings"
          </h1>
          <div className="greet mt-5 w-100 pb-5">
            <div className="d-flex flex-column message text-dark gap-2 w-75  border-1 mt-2 mb-4 mx-auto ">
              <GreetingMessage />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Greetings;
