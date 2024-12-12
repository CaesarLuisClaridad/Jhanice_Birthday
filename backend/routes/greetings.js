import express from 'express'
import multer from "multer";
import { greetJhanice, getAllGreetings } from '../controller/greetingsController.js';

// const upload = multer({ limits: { fileSize: 10 * 1024 * 1024 } }); // Limit to 10MB
const upload = multer()

const router = express.Router();

//router
router.route('/AllGreetings').get(getAllGreetings);
router.route('/PostGreetings').post(upload.none(), greetJhanice);

export default router;