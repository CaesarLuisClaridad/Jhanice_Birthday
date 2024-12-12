import { getGalleryImages, getMainVideo, getSwiperImages } from "../utils/cloudinary.js";
import ErrorHandler from "../utils/errorHandler.js";

// fetching images in cloudinary
export const fetchImages = async (req, res, next) => {
  try {
    const images = await getGalleryImages();
    const imglength = images.length;
    res.status(200).json({
        imglength: imglength,
        images: images,
    }); 
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler("Failed to fetch images from Cloudinary", 500))
  }
};

//fetching the images for swiper component
export const fetchSwiperImages = async (req, res, next) => {
  try {
    const images = await getSwiperImages();
    const imagesLength = images.length;
    res.status(200).json({
      imglength: imagesLength,
      images: images,
    })
  } catch (error) {
      console.error(error);
      return next(new ErrorHandler("Failed to fetch images from Cloudinary", 500))
  }
}

//fetching the main video
export const fetchMainVideo = async (req, res, next) => {
  try {
    const videos = await getMainVideo();
    res.status(200).json({
      videos: videos
    })
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler("Failed to fetch video", 500))
  }
}
