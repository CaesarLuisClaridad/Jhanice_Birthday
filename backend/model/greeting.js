import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const greetingSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please enter your name"],
    },

    message: {
        type: String,
        required: [true, "Please enter your message"],
    },

    image: {
        type: Schema.Types.Mixed,
        required: true
    },

}, {timestamps: true})

export default mongoose.model('Greeting', greetingSchema);