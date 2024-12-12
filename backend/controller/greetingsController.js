import catchAsyncError from "../middleware/catchAsyncError.js";
import Greeting from "../model/greeting.js";
import ErrorHandler from "../utils/errorHandler.js";
import cloudinary from "../utils/cloudinary.js";

// Get all greetings
export const getAllGreetings = catchAsyncError(async (req, res, next) => {
    const greetings = await Greeting.find();

    res.status(200).json({
        greetings
    });
});

// Create a new greeting
export const greetJhanice = catchAsyncError(async (req, res, next) => {
    const { name, message } = req.body;
    const fileStr = req.body.file; // base64 image string
    // kapag tinest sa postman. hindi sya mag wwork dahil ang sinesend sa frontend ay string as a JSON BODY 
    // Pero the code expects the file field to contain the actual file or a base64 string
    // kaya nagkakaroon ng error na "Missing required parameter - file" sa postman

    // Validate required fields
    if (!name || !message) {
        return next(new ErrorHandler("Please provide all required fields", 400));
    }

    try {
        // Upload the image to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            folder: 'jhanice-birthday/greetings',
            upload_preset: "Greetings",
            resource_type: "auto", // auto-detect file type (image/video)
        });

        // Create a new greeting with the uploaded image URL
        const greeting = new Greeting({
            name,
            message,
            image: uploadResponse.secure_url, // Cloudinary URL
        });

        // Save the greeting
        await greeting.save();

        // Send response with the created greeting
        res.status(201).json({
            greeting,
        });
    } catch (error) {
        console.error("Error uploading image or creating greeting:", error);
        return next(new ErrorHandler("Error uploading image or creating greeting", 500));
    }
});

