import React from "react";
import { useEffect, useState } from "react";
import MetaData from "./MetaData";

const GreetingMessage = () => {
  const [loading, setLoading] = useState(true);
  const [greetings, setGreetings] = useState([]);

  //fetching the greetings
  useEffect(() => {
    const fetchGreetings = async () => {
      try {
        const response = await fetch("/api/v1/AllGreetings");
        const data = await response.json();

        setGreetings(data.greetings || []);
        console.log(data.greetings);
      } catch (error) {
        console.log("Error getting greetings", error);
      }
    };
    fetchGreetings();
  }, []);

  //loading effect
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timeout) 
  })

  return (
    <>
      <MetaData title={"View Greetings! 😁"} />

      {loading && (
        <div className="loading-screen">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {!loading && greetings
        .slice()
        .reverse()
        .map((greet, index) => (
          <div
            className="d-flex flex-column flex-lg-row  align-items-center mb-4 message-container rounded-2"
            key={index}
          >
            <div className="greet-photo col-12 col-lg-4">
              <img
                src={greet.image}
                className="h-50 img-fluid rounded-lg-2 rounded-0"
              />
            </div>
            <div className="w-100 w-lg-75 m-lg-auto px-lg-5 px-3 py-3 rounded-3">
              <label className="fw-bold bebas-font fs-lg-5 fs-6 text-light message">
                Message:{" "}
              </label>
              <p className="d-block bg-light px-lg-2 py-2 px-3 rounded-lg-5 rounded-4 text-center m-0 montserrat-font my-2 shadow-sm">
                "{greet.message}"
              </p>

              <p className="d-block text-end text-light mt-4 mb-0 fw-bold ">
                - {greet.name}
              </p>
            </div>
          </div>
        ))}
    </>
  );
};

export default GreetingMessage;
