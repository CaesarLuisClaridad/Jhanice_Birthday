import { v2 as cloudinary } from 'cloudinary'; // Correct import of the v2 API
import dotenv from 'dotenv';

dotenv.config({ path: 'backend/config/config.env' });

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

// get all the images in cloudinary
export const getGalleryImages = () => {
    return new Promise((resolve, reject) => {
      cloudinary.api.resources(
        { type: 'upload', prefix: 'jhanice-birthday/gallery', max_results: "100" },
        function (error, result) {
          if (error) {
            reject(error);
          } else {
            resolve(result.resources);
          }
        }
      );
    });
};

// get images for the swiper component
export const getSwiperImages = () => {
  return new Promise((resolve, reject) => {
    cloudinary.api.resources(
      {type: 'upload', prefix: 'jhanice-birthday/swiper', max_results: "100" },
      function(error, result){
        if(error){
          reject(error);
        }else{
          resolve(result.resources);
        }
      }
    );
  });
}

//fetch the main video
export const getMainVideo = () => {
  return new Promise((resolve, reject) => {
    cloudinary.api.resources(
      {type: 'upload', prefix: 'jhanice-birthday/main-video', resource_type: 'video', max_results: '100'},
      function(error, result) {
        if(error){
          reject(error);
        }else{
          console.log("Cloudinary API response:", result);
          resolve(result.resources);
        }
      }
    )
  })
}

export default cloudinary;
