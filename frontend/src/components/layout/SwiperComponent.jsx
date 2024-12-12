import React from 'react';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const SwiperComponent = () => {
  const [images, setImages] = useState([]);

  //fetching swiperimages in cloudinary
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('api/v1/swiperImages');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data)
        setImages(data.images || []);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
    fetchImages();
  }, []);

  return (
    <>
    <div className="pb-lg-4 pb-2 px-lg-5 ps-1 swiper-container">
    <Swiper
        slidesPerView={4}
        spaceBetween={1}
        navigation={{
          clickable: true,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
        breakpoints={{
          540:{
            slidesPerView: 5,
          },
          768: {
            slidesPerView: 4,
          },
          994: {
            slidesPerView: 4,
          },

          1200: {
            slidesPerView: 5,
          },
          1700: {
            slidesPerView: 6,
          },
        }}
      >
      
        {/*--getting and mapping the images--*/}
        {images.map((image, index) => (
           <SwiperSlide key={index}>
           <img src={image.secure_url} alt="jhanice-picture" />
         </SwiperSlide>
        ))}
      </Swiper>
    </div>  
    </>
  );
};

export default SwiperComponent;
