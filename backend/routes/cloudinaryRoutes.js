import express from "express";
import { fetchImages, fetchMainVideo, fetchSwiperImages } from "../controller/Cloudinary.js";

const router = express.Router();

//routes for fetching images and video in cloudinary
router.route('/images').get(fetchImages);
router.route('/video').get(fetchMainVideo)
router.route('/swiperImages').get(fetchSwiperImages);

export default router;