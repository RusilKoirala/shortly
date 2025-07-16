import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
    originalUrl: {
        type : String,
        required: true,
        trim: true,
    },
    shortUrl : {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    clicks : {
        type: Number,
        default: 0,
    },
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    }

},
    {
        timestamps: true
    }
);

const Link = mongoose.model('Link', linkSchema);

export default Link;
