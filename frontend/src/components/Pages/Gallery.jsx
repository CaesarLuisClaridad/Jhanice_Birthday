import React from "react";
import Navbar from "../layout/Navbar";
// import { images } from "../../constants/images";
import { useState, useEffect } from "react";
import MetaData from "../layout/MetaData";
import Footer from "../layout/Footer";

const Gallery = () => {
  const [loading, setIsLoading] = useState(true);
  const [images, setImages] = useState([]);

  //fetching the images
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/api/v1/images")
        const data = await response.json();
        setImages(data.images || [])
      } catch (error) {
        console.error("Error fetching images", error)
      } 
    }

    fetchImages()
  }, [])

  //loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
    <MetaData title={"Gallery 📸"} />
      {loading && (
        <div className="loading-screen">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {!loading && (
        <div className={`container-fluid bg-black gallery overflow-hidden ${!loading? "visible" : ""}`}>
          <Navbar />

          <div className="pt-lg-3 pt-3 px-lg-5 px-md-4 px-3 text-light opacity-100">
            <h4>Movies to explore: Jhanice Molano</h4>
          </div>
          <div className="row px-lg-5 px-md-4 px-3 py-3 overflow-hidden">
            {images.map((image, index) => (
              <div className="col-sm-2 col-md-3 col-lg-2 col-6 py-lg-3 py-2 mb-lg-3 mb-2 gallery-img overflow-hidden" key={index}>
                <img src={image.url} alt={image.public_id} />
              </div>
            ))}
          </div>
          <Footer/>
        </div>

      )}
      
    </>
  );
};

export default Gallery;
