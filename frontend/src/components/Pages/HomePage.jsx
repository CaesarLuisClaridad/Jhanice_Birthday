import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { RiErrorWarningLine } from "react-icons/ri";
import Navbar from "../layout/Navbar";
import Swiper from "../layout/SwiperComponent";
import MoreInfoModal from "../layout/MoreInfoModal";
import MetaData from "../layout/MetaData";

const HomePage = () => {
  const navigate = useNavigate();

  const playTheVideo = () => {
    navigate("/video");
  };

  return (
    <>
    <MetaData title={"Homepage 😘"} />
    <div className="homepage">
      <Navbar />
      <div className="homepage-content container montserrat-font fw-bold shadow-lg">
        <h1>
          To my favorite weirdo, <br /> Happy Birthday!
        </h1>
        <p className="fs-3 fs-md-4 m-0">Forever grateful for you 💖</p>
        <div className="d-flex mt-3 buttons">
          <button type="button" className="playbtn me-3" onClick={playTheVideo}>
            <FaPlay className="Faplay" /> Play
          </button>
          <button className="warningbtn" data-bs-toggle="modal" data-bs-target="#exampleModal" >
              <RiErrorWarningLine className="info" /> More Info
          </button>
        </div>
      </div>
      <Swiper />
      <MoreInfoModal/>
    </div>
    </>
  );
};

export default HomePage;
